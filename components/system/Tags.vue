<template>
  <v-card :loading="isFetching">
    <v-card-title>Manage Tags</v-card-title>
    <v-card-text class="d-flex align-center">
      <v-sheet max-width="200">
        <v-text-field
          v-model.trim="search"
          placeholder="Search..."
          outlined
          append-icon="mdi-magnify"
          hide-details
          dense
          @keyup.enter="fetchData" />
      </v-sheet>
      <v-sheet>
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
      </v-sheet>
    </v-card-text>
    <v-divider />
    <v-card-text>
      <v-sheet outlined>
        <v-data-table :items="tagList" :headers="tableHeaders">
          <template #item.actions="{ item }">
            <v-menu offset-y>
              <template #activator="{ attrs, on }">
                <v-btn text outlined v-bind="attrs" v-on="on"
                  >Actions <v-icon right>mdi-chevron-down</v-icon></v-btn
                >
              </template>
              <v-list dense>
                <v-list-item @click="onEdit(item)">
                  <v-icon left>mdi-pencil</v-icon> Edit
                </v-list-item>
                <v-list-item @click="onToggleDeleteTag(item)">
                  <v-icon left>mdi-delete</v-icon> Delete
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
      </v-sheet>
    </v-card-text>
    <!-- Form Modal -->
    <v-dialog
      v-model="showFormModal"
      scrollable
      max-width="600"
      persistent
      :fullscreen="isMobile">
      <v-form ref="tagForm">
        <v-card>
          <v-card-title class="primary white--text">
            <span>Tags</span>
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
              v-model.trim="formData.name"
              label="Name"
              dense
              outlined
              :rules="[formRequired]" />
            <v-textarea
              v-model.trim="formData.contents"
              label="Contents"
              dense
              outlined
              messages="* Match words to be resolved via the name field"
              :rules="[formRequired]" />
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
      :message="`Delete the tag?`"
      :loading="isDeleting"
      @toggle="onToggleDeleteTag(null)"
      @delete="onDeleteTag" />
  </v-card>
</template>

<script>
import globalMixin from '@/mixins/global';
export default {
  name: 'SystemTag',
  mixins: [globalMixin],
  data: () => ({
    formData: {
      id: null,
      name: '',
      contents: '',
    },
    defaultFormData: null,
    showFormModal: false,
    isFormSaving: false,
    tagList: [],
    isFetching: false,
    selectedTag: null,
    showDeleteModal: false,
    isDeleting: false,
    search: '',
  }),

  computed: {
    tableHeaders() {
      return [
        {
          text: 'Name',
          value: 'name',
        },
        {
          text: 'Contents',
          value: 'contents',
        },
        {
          text: 'Actions',
          value: 'actions',
        },
      ];
    },
  },

  watch: {
    showFormModal(isTrue) {
      if (!isTrue) {
        this.$refs.tagForm.resetValidation();
        this.formData = JSON.parse(this.defaultFormData);
      }
    },
  },

  created() {
    this.fetchData();
    this.defaultFormData = JSON.stringify(this.formData);
  },

  methods: {
    async fetchData() {
      if (this.isFetching) {
        return;
      }
      this.isFetching = true;
      try {
        const limit = 1000;
        const search = this.search;
        const { data } = await this.$axios.get(
          `/api/system/tag/list?limit=${limit}&search=${search}`,
        );
        this.tagList = data.data?.tags;
      } catch (error) {
        this.apiErrorMessage(error);
      } finally {
        this.isFetching = false;
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
      const validated = this.$refs.tagForm.validate();
      if (!validated) {
        return;
      }
      this.isFormSaving = true;
      try {
        const form = this.formData;
        if (form.id) {
          await this.$axios.patch(`/api/system/tag/update/${form.id}`, form);
        } else {
          await this.$axios.post('/api/system/tag/create', form);
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

    onEdit(tag) {
      this.formData = {
        id: tag.id,
        name: tag.name,
        contents: tag.contents,
      };
      this.onToggleFormModal();
    },

    onToggleDeleteTag(tag = null) {
      this.selectedTag = tag;
      this.showDeleteModal = !this.showDeleteModal;
    },

    async onDeleteTag() {
      if (this.isDeleting) {
        return;
      }
      this.isDeleting = true;
      try {
        const menu = this.selectedTag;
        await this.$axios.delete(`/api/system/tag/delete/${menu.id}`);
        this.systemInfoMessage(`Tag was deleted.`);
        this.onToggleDeleteTag();
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
