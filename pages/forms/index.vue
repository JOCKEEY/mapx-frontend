<template>
  <v-card flat>
    <v-card-title>Submitted Forms</v-card-title>
    <v-card-subtitle>
      All of the submitted DQAT forms are reflected here including the
      duplicated submissions.
    </v-card-subtitle>
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
              @click="fetchData">
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </div>
        </v-sheet>
      </v-sheet>
    </v-card-text>
    <v-divider />
    <v-card-text>
      <v-sheet outlined>
        <v-data-table
          hide-default-footer
          multi-sort
          :headers="tableHeaders"
          :items="barangayList"
          :loading="isFetching"
          :items-per-page="pagination.limit"
          :options.sync="tableOption">
          <template #item.isActive="{ item }">
            <span :class="{ 'red--text': !item.isActive }">{{
              item.isActive ? 'Yes' : 'No'
            }}</span>
          </template>
          <template #item.date_assessed="{ item }">
            {{ dateFormat(item.date_assessed) }}
          </template>
          <template #item.actions="{ item }">
            <v-sheet color="transparent">
              <v-btn
                class="mx-2"
                fab
                dark
                x-small
                color="primary"
                @click="onToggleQasFormPrintModal(item)"
              >
                <v-icon dark>
                  mdi-eye
                </v-icon>
              </v-btn>
            </v-sheet>
          </template>
        </v-data-table>
      </v-sheet>
      <v-divider />
      <v-sheet class="float-sm-left d-block pt-3">
        <v-chip> Total: {{ totalRecords.toLocaleString() }} </v-chip>
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
            :disabled="isFetching" />
        </v-sheet>
        <v-pagination
          v-model="pagination.page"
          :total-visible="$vuetify.breakpoint.mobile ? 4 : 6"
          :disabled="isFetching"
          :length="pageTotal" />
      </v-sheet>
    </v-card-text>

    <UserFormModal
      :open="showFormModal"
      :form-value="selectedDataToEdit"
      @toggle="onToggleFormModal"
      @success="onFormSaved" />

    <ModalsDelete
      title="Delete"
      :width="400"
      :open="showDeleteModal"
      :message="`Delete the selected user?`"
      :loading="isDeleting"
      @toggle="onToggleDeleteModal"
      @delete="onDelete" />

    <Qatformprint
      :open="showQasFormPrintModal"
      @toggle="onToggleQasFormPrintModal"
    />
  </v-card>
</template>

<script>
import qs from 'qs';
import moment from 'moment';
import { mapActions } from 'vuex';
import globalMixin from '@/mixins/global';
export default {
  name: 'FormsPage',
  mixins: [globalMixin],
  data() {
    return {
      showFormModal: false,
      isFetching: false,
      showDeleteModal: false,
      showQasFormPrintModal: false,
      selectedDataToEdit: null,
      selectedDataToDelete: null,
      isDeleting: false,
      pagination: {
        limit: 10,
        page: 1,
      },
      searchText: '',
      showSignatoryModal: false,
      barangayList: [],
      totalRecords: 0,
      tableOption: {},
    };
  },
  computed: {
    tableHeaders: () => [
      {
        text: 'Region',
        value: 'barangay.region',
      },
      {
        text: 'Province',
        value: 'barangay.province',
      },
      {
        text: 'City/Municipality',
        value: 'barangay.municipality',
      },
      {
        text: 'Barangay',
        value: 'barangay.barangay',
      },
      {
        text: 'Total Score',
        value: 'total_score',
      },
      {
        text: 'Years Covered',
        value: 'years_covered',
      },
      {
        text: 'Date Assessed',
        value: 'date_assessed',
      },
      {
        value: 'actions',
        sortable: false,
      },
    ],

    pageTotal() {
      return Math.ceil((this.totalRecords || 0) / this.pagination.limit);
    },
  },

  watch: {
    pagination: {
      handler() {
        this.fetchData();
      },
      deep: true,
    },

    tableOption: {
      deep: true,
      handler() {
        this.fetchData();
      },
    },
  },

  mounted() {
    this.fetchData();
    this.$store.dispatch('setPageTitle', 'QAS Forms');
  },

  methods: {
    ...mapActions('qat',[
      'setQat',
      'resetStore',
    ]),
    onToggleFormModal() {
      this.showFormModal = !this.showFormModal;
      this.selectedDataToEdit = null;
    },

    onSearch() {
      this.$set(this.pagination, 'page', 1);
      this.fetchData();
    },

    async fetchData() {
      if (this.isFetching) {
        return;
      }
      this.isFetching = true;
      try {
        const params = qs.stringify({
          page: this.pagination.page,
          limit: this.pagination.limit,
          search: this.searchText,
          sortBy: this.tableOption.sortBy,
          sortOrder: this.tableOption.sortDesc,
          userId: +this.authUser.id,
        });
        const { data } = await this.$axios(`/api/qas-form/list?${params}`);
        this.barangayList = data?.data || [];
        this.totalRecords = data?.count;
      } catch (error) {
        this.apiErrorMessage(error);
      } finally {
        this.isFetching = false;
      }
    },

    onFormSaved() {
      this.fetchData();
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
    onToggleQasFormPrintModal(item){     
      this.showQasFormPrintModal = !this.showQasFormPrintModal;
      if (!this.showQasFormPrintModal) {
        this.resetStore();
      }else{
        const value = JSON.parse(JSON.stringify(item)); 
        this.setQat(value);
      }
    },

  },
};
</script>

<style></style>
