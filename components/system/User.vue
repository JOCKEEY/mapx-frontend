<template>
  <v-card>
    <v-card-title>Users</v-card-title>
    <v-card-text>
      <v-sheet class="d-sm-flex justify-space-between d-block">
        <v-sheet class="d-sm-flex">
          <v-sheet max-width="400" min-width="300">
            <v-text-field
              v-model="searchText"
              prepend-inner-icon="mdi-magnify"
              outlined
              hide-details
              label="Search..."
              dense
              @keydown.enter="onSearch" />
          </v-sheet>
          <div class="d-sm-flex mt-2 mt-sm-0">
            <v-btn
              color="primary"
              class="ml-0 ml-sm-2"
              height="40"
              outlined
              @click="getData">
              <v-icon>mdi-refresh</v-icon>
            </v-btn>

            <v-btn
              color="primary"
              height="40"
              class="mx-2"
              @click="onToggleFormModal">
              <v-icon>mdi-plus</v-icon>
              Add User
            </v-btn>
          </div>
        </v-sheet>
      </v-sheet>
    </v-card-text>
    <v-divider />
    <v-card-text>
      <v-data-table
        hide-default-footer
        :headers="tableHeaders"
        :items="tableData"
        :loading="isDataLoading"
        :items-per-page="pagination.limit">
        <template #item.isActive="{ item }">
          <span :class="{ 'red--text': !item.isActive }">{{
            item.isActive ? 'Yes' : 'No'
          }}</span>
        </template>
        <template #item.createdAt="{ item }">
          {{ dateFormat(item.createdAt) }}
        </template>
        <template #item.actions="{ item }">
          <v-sheet color="transparent">
            <v-icon title="Edit" color="blue" @click="onSelectDataToEdit(item)">
              mdi-pencil
            </v-icon>
            <v-icon
              title="Delete"
              color="red"
              @click="onSelectDataToDelete(item)">
              mdi-delete
            </v-icon>
          </v-sheet>
        </template>
      </v-data-table>
      <v-divider />
      <v-sheet class="float-sm-left d-block pt-3 pl-sm-4 grey--text">
        Total: {{ totalRecords.toLocaleString() }}
      </v-sheet>
      <v-sheet
        class="d-flex justify-sm-end justify-space-between align-center py-2">
        <v-sheet width="80">
          <v-select
            v-model="pagination.limit"
            color="primary"
            outlined
            dense
            hide-details
            :items="[10, 15, 20]"
            :disabled="isDataLoading" />
        </v-sheet>
        <v-pagination
          v-model="pagination.page"
          :total-visible="$vuetify.breakpoint.mobile ? 4 : 6"
          :disabled="isDataLoading"
          :length="pageTotal" />
      </v-sheet>
    </v-card-text>

    <UserFormModal
      :open="showFormModal"
      :form-value="selectedDataToEdit"
      :user-admin="userAdministrator"
      @toggle="onToggleFormModal"
      @success="onUserSaved" />

    <ModalsDelete
      title="Delete"
      :width="400"
      :open="showDeleteModal"
      :message="`Delete the selected user?`"
      :loading="isDeleting"
      @toggle="onToggleDeleteModal"
      @delete="onDelete" />
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import moment from 'moment';
import globalMixin from '@/mixins/global';
export default {
  name: 'SystemUser',
  mixins: [globalMixin],
  data() {
    return {
      showFormModal: false,
      isDataLoading: false,
      showDeleteModal: false,
      selectedDataToEdit: null,
      selectedDataToDelete: null,
      userAdministrator: false,
      isDeleting: false,
      pagination: {
        limit: 10,
        page: 1,
      },
      searchText: '',
      showSignatoryModal: false,
    };
  },
  computed: {
    ...mapState('user', ['users']),

    tableHeaders: () => [
      {
        text: 'Farm ID',
        value: 'farmId',
      },
      {
        text: 'Name',
        value: 'name',
      },
      {
        text: 'Username',
        value: 'username',
      },
      {
        text: 'E-mail',
        value: 'email',
      },
      {
        text: 'Active',
        value: 'isActive',
      },
      {
        text: 'Created',
        value: 'createdAt',
      },
      {
        value: 'actions',
        sortable: false,
      },
    ],
    tableData() {
      return this.users?.data;
    },

    pageTotal() {
      return Math.ceil((this.users?.total || 0) / this.pagination.limit);
    },

    totalRecords() {
      return this.users?.total || 0;
    },
  },

  watch: {
    pagination: {
      handler() {
        this.getData();
      },
      deep: true,
    },
  },

  mounted() {
    this.getData();
  },

  methods: {
    ...mapActions('user', ['fetchUsers']),
    onToggleFormModal() {
      this.showFormModal = !this.showFormModal;
      this.selectedDataToEdit = null;
    },

    onSearch() {
      this.$set(this.pagination, 'page', 1);
      this.getData();
    },

    async getData() {
      if (this.isDataLoading) {
        return;
      }
      this.isDataLoading = true;
      try {
        await this.fetchUsers({
          page: this.pagination.page,
          limit: this.pagination.limit,
          search: this.searchText,
        });
      } catch (error) {
        this.apiErrorMessage(error);
      } finally {
        this.isDataLoading = false;
      }
    },

    onUserSaved() {
      this.getData();
    },

    onSelectDataToEdit(data) {
      this.showFormModal = true;
      this.selectedDataToEdit = data;
    },

    onSelectDataToDelete(data) {
      this.selectedDataToDelete = data;
      this.showDeleteModal = true;
    },

    onToggleDeleteModal() {
      this.showDeleteModal = !this.showDeleteModal;
      if (!this.showDeleteModal) {
        this.selectedDataToDelete = null;
      }
    },

    async onDelete() {
      if (this.isDeleting) {
        return;
      }
      this.isDeleting = true;
      try {
        await this.$axios.delete(
          `/api/user/delete/${this.selectedDataToDelete.id}`,
        );
        this.systemInfoMessage('User was deleted.', 'mdi-delete');
        this.onToggleDeleteModal();
        this.fetchUsers();
      } catch (error) {
        this.apiErrorMessage(error);
      } finally {
        this.isDeleting = false;
      }
    },

    onToggleSignatories() {
      this.showSignatoryModal = !this.showSignatoryModal;
    },

    dateTimeFormat(date) {
      return moment(date).format('MMM DD, YYYY h:ma');
    },

    dateFormat(date) {
      return moment(date).format('MMM DD, YYYY');
    },
  },
};
</script>

<style></style>
