<template>
  <v-card :loading="isFetching">
    <v-card-title>Manage System Permissions</v-card-title>
    <v-card-text class="d-flex align-center">
      <v-sheet max-width="200">
        <v-text-field
          placeholder="Search..."
          outlined
          append-icon="mdi-magnify"
          hide-details
          dense />
      </v-sheet>
      <v-btn
        color="primary"
        class="mx-2"
        :loading="isFetching"
        @click="fetchData">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
      <v-btn color="primary" @click="onToggleFormModal">
        <v-icon left>mdi-plus</v-icon> Add
      </v-btn>
    </v-card-text>
    <v-divider />
    <v-card-text>
      <v-data-table :headers="tableHeader" :items="systemPermissions">
        <template #item.links="{ item }">
          <v-menu>
            <template #activator="{ on, attrs }">
              <v-btn color="teal" dark small v-bind="attrs" v-on="on">
                <v-icon>mdi-menu</v-icon>
              </v-btn>
            </template>
            <v-card max-width="800">
              <v-card-title class="subtitle-1 teal--text">
                <v-icon left>mdi-key</v-icon>
                {{ item.title }}
              </v-card-title>
              <v-divider />
              <v-data-table
                disable-pagination
                hide-default-footer
                :items-per-page="100"
                :headers="linkTableHeader"
                :items="item.links">
                <template #item.description="data">
                  <div class="teal--text">{{ data.item.path }}</div>
                  <div class="grey--text">{{ data.item.description }}</div>
                </template>
                <template #item.type="data">
                  <div class="teal--text">
                    {{ data.item.isUserMenu ? 'Page' : 'API' }}
                  </div>
                </template>
              </v-data-table>
            </v-card>
          </v-menu>
        </template>
        <template #item.actions="{ item }">
          <v-icon color="blue" @click="onSelectPermission(item)">
            mdi-pencil
          </v-icon>
          <v-icon color="red" @click="onToggleDeletePermission(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card-text>
    <!-- Form Modal -->
    <v-dialog
      v-model="showFormModal"
      scrollable
      max-width="600"
      :fullscreen="isMobile">
      <v-form ref="permissionForm">
        <v-card>
          <v-card-title class="primary white--text">
            <span>Permissions</span>
            <v-spacer />
            <v-icon
              color="white"
              :disabled="isFormSaving"
              @click="onToggleFormModal">
              mdi-close
            </v-icon>
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-text-field
              v-model.trim="formData.title"
              label="Title"
              dense
              outlined
              :rules="[formRequired]" />
            <v-textarea
              v-model.trim="formData.description"
              label="Description"
              dense
              outlined
              auto-grow
              rows="2" />
            <v-sheet class="d-flex align-center">
              <v-autocomplete
                v-model="formData.links"
                label="Pages & API"
                clearable
                item-value="id"
                item-text="title"
                outlined
                dense
                hide-details
                prepend-icon="mdi-database-search"
                multiple
                :items="linkList">
                <template #selection="{ attr, on, item, selected }">
                  <v-chip
                    v-bind="attr"
                    :input-value="selected"
                    color="blue-grey"
                    class="white--text my-2"
                    v-on="on">
                    <v-icon left>
                      {{ item.isUserMenu ? item.icon : 'mdi-web' }}
                    </v-icon>
                    <span v-text="item.title"></span>
                  </v-chip>
                </template>
                <template #item="{ item }">
                  <v-list-item-avatar>
                    <v-icon>
                      {{ item.isUserMenu ? item.icon : 'mdi-web' }}
                    </v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                    <v-list-item-subtitle>{{ item.path }}</v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </v-autocomplete>
              <v-btn icon @click="fetchMenus">
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </v-sheet>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn text :disabled="isFormSaving" @click="onToggleFormModal">
              Cancel
            </v-btn>
            <v-btn color="primary" :loading="isFormSaving" @click="onFormSave">
              <v-icon left>mdi-content-save</v-icon> Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
    <ModalsDelete
      title="Delete"
      :width="400"
      :open="showDeleteModal"
      :message="`Delete ${selectedPermissionName} permission?`"
      :loading="isDeleting"
      @toggle="onToggleDeletePermission(null)"
      @delete="onDeletePermission" />
  </v-card>
</template>

<script>
import _ from 'lodash';
import globalMixin from '@/mixins/global';
export default {
  name: 'SystemPermission',
  mixins: [globalMixin],
  data: () => ({
    formData: {
      id: null,
      title: '',
      description: '',
      links: [],
    },
    defaultFormData: null,
    showFormModal: false,
    isFormSaving: false,
    systemPermissions: [],
    isFetching: false,
    isFetchingMenu: false,
    selectedPermission: null,
    showPermissionFilter: 'All',
    showDeleteModal: false,
    isDeleting: false,
    linkList: [],
    searchMenu: '',
  }),

  computed: {
    tableHeader() {
      return [
        {
          value: 'links',
          text: 'Pages & API',
          class: 'teal--text',
          width: 120,
        },
        {
          value: 'title',
          text: 'Title',
          class: 'teal--text',
        },
        {
          value: 'description',
          text: 'Description',
          class: 'teal--text',
        },
        {
          value: 'actions',
          text: 'Actions',
          class: 'blue--text',
        },
      ];
    },

    linkTableHeader() {
      return [
        {
          value: 'title',
          text: 'Title',
          class: 'blue--text',
        },
        {
          value: 'description',
          text: 'Description',
          class: 'blue--text',
        },
        {
          value: 'module',
          text: 'Module',
          class: 'blue--text',
        },
        {
          value: 'type',
          text: 'Type',
          class: 'blue--text',
        },
      ];
    },

    selectedPermissionName() {
      return this.selectedPermission?.title || '';
    },
  },

  watch: {
    showFormModal(isTrue) {
      if (!isTrue) {
        this.$refs.permissionForm.resetValidation();
        this.formData = JSON.parse(this.defaultFormData);
      }
    },
  },

  created() {
    this.defaultFormData = JSON.stringify(this.formData);
    this.fetchData();
    this.fetchMenus();
  },

  methods: {
    async fetchData() {
      if (this.isFetching) {
        return;
      }
      this.isFetching = true;
      try {
        const { data } = await this.$axios.get('/api/system/permission/list');
        this.systemPermissions = data.data;
      } catch (error) {
        this.apiErrorMessage(error);
      } finally {
        this.isFetching = false;
      }
    },

    async fetchMenus() {
      if (this.isFetchingMenu) {
        return;
      }
      this.isFetchingMenu = true;
      try {
        const limit = 1000;
        const { data } = await this.$axios.get(
          `/api/system/menu/list?limit=${limit}`,
        );
        const systemModules = _.groupBy(data.data, 'module');

        const groups = [];
        Object.keys(systemModules).forEach(group => {
          groups.push({
            header: group,
          });
          systemModules[group].forEach(record => {
            if (record.subMenus && record.subMenus.length) {
              record.subMenus.forEach(subMenu => groups.push(subMenu));
            } else {
              groups.push(record);
            }
          });
        });
        this.linkList = groups;
      } catch (error) {
        this.apiErrorMessage(error);
      } finally {
        this.isFetchingMenu = false;
      }
    },

    onToggleFormModal() {
      this.showFormModal = !this.showFormModal;
    },

    formRequired(v) {
      return !!v || 'Field required';
    },

    async onFormSave() {
      if (this.isFormSaving) {
        return;
      }
      const validated = this.$refs.permissionForm.validate();
      if (!validated) {
        return;
      }
      this.isFormSaving = true;
      try {
        const form = this.formData;
        if (form.id) {
          await this.$axios.patch(
            `/api/system/permission/update/${form.id}`,
            form,
          );
        } else {
          await this.$axios.post('/api/system/permission/create', form);
        }
        this.onToggleFormModal();
        this.systemInfoMessage('Record was successfully saved.');
        this.fetchData();
      } catch (error) {
        this.apiErrorMessage(error);
      } finally {
        this.isFormSaving = false;
      }
    },

    onSelectPermission(permission) {
      this.formData = {
        id: permission.id,
        title: permission.title,
        description: permission.description,
        links: permission.links ? permission.links.map(l => l.id) : [],
      };
      this.onToggleFormModal();
    },

    onToggleDeletePermission(permission = null) {
      this.selectedPermission = permission;
      this.showDeleteModal = !this.showDeleteModal;
    },

    async onDeletePermission() {
      if (this.isDeleting) {
        return;
      }
      this.isDeleting = true;
      try {
        const permission = this.selectedPermission;
        await this.$axios.delete(
          `/api/system/permission/delete/${permission.id}`,
        );
        this.systemInfoMessage('Permission was deleted.');
        this.onToggleDeletePermission();
        this.fetchData();
      } catch (error) {
        this.apiErrorMessage(error);
      } finally {
        this.isDeleting = false;
      }
    },
  },
};
</script>

<style></style>
