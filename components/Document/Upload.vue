<template>
  <v-dialog
    v-model="dialog"
    scrollable
    max-width="60%"
    persistent
    no-click-animation
    :fullscreen="isMobile">
    <v-card>
      <v-card-title>
        New Documents
        <v-spacer />
        <v-icon
          color="red"
          :disabled="isUploading || isGenerating"
          @click="close"
          >mdi-close</v-icon
        >
      </v-card-title>
      <v-card-text class="py-5">
        <v-stepper v-model="step" outlined>
          <v-stepper-header>
            <v-stepper-step :complete="step > 1" step="1">
              Browse and Upload Document Files
            </v-stepper-step>
            <v-divider />
            <v-stepper-step :complete="step > 2" step="2">
              Generate Content
            </v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card :loading="isUploading">
                <v-card-text class="px-0">
                  <v-sheet>
                    <v-sheet
                      id="file-input-wrapper"
                      class="mb-3"
                      outlined
                      @dragover.prevent="isDraggingFile = true"
                      @dragleave.prevent="isDraggingFile = false"
                      @drop.prevent="onDropFiles">
                      <label :for="isUploading ? '' : 'file-input'">
                        <v-sheet height="80">
                          <v-sheet class="pt-6" color="transparent">
                            <h3
                              v-if="isUploading"
                              class="text-center transparent">
                              <v-icon left>mdi-refresh-circle</v-icon>
                              {{ files.length }} file(s) is being uploaded...
                              Please wait.
                            </h3>
                            <h3
                              v-else-if="isDraggingFile"
                              class="text-center transparent">
                              <v-icon left>mdi-file</v-icon>
                              Drop to start uploading
                            </h3>
                            <h3 v-else class="text-center transparent">
                              <v-icon left>mdi-file-multiple</v-icon>
                              Drop PDF files here
                            </h3>
                          </v-sheet>
                        </v-sheet>
                      </label>
                      <!-- <v-file-input
                        v-model="files"
                        label="Browse PDF File"
                        :multiple="multiple"
                        :loading="isUploading"
                        @change="onAutoUpload" /> -->
                      <input
                        id="file-input"
                        ref="file"
                        type="file"
                        name="file"
                        class="d-none"
                        multiple
                        accept=".pdf"
                        @change="onChangeFile" />
                    </v-sheet>
                    <v-row v-if="uploadedFiles.length > 0">
                      <v-col
                        v-for="file in uploadedFiles"
                        :key="'file' + file.id"
                        cols="12"
                        :sm="multiple ? 4 : 12">
                        <v-card outlined>
                          <v-sheet
                            class="d-flex justify-space-between align-center pa-2">
                            <span class="text-truncate">{{ file.name }}</span>
                            <v-btn
                              color="red"
                              icon
                              title="Delete"
                              @click="onDeleteUploadedFile(file.id)">
                              <v-icon>mdi-close-circle</v-icon>
                            </v-btn>
                          </v-sheet>
                          <v-divider />
                          <v-sheet class="py-3">
                            <v-sheet class="text-center" height="120">
                              <a
                                link
                                target="_blank"
                                title="Download"
                                :href="`/api/file/path?path=${file.path}`">
                                <v-icon size="120" color="grey">
                                  mdi-file
                                </v-icon>
                              </a>
                            </v-sheet>
                          </v-sheet>
                          <v-divider />
                          <v-sheet class="d-flex align-center pa-1 grey--text">
                            <span>
                              Size:
                              {{ formatNumber(file.size / 1000 / 1024) }}Mb
                            </span>
                            <v-spacer />
                            <span>
                              {{ formatDate(file.createdAt, 'lll') }}
                            </span>
                          </v-sheet>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-sheet>
                </v-card-text>
              </v-card>
            </v-stepper-content>
            <v-stepper-content step="2">
              <v-sheet>
                <v-sheet class="text-center">
                  <v-btn
                    large
                    color="primary"
                    :loading="isGenerating"
                    :disabled="uploadedFiles.length === 0"
                    @click="onGenerate">
                    <v-icon left>mdi-refresh</v-icon>
                    Generate document information
                  </v-btn>
                </v-sheet>
                <v-sheet v-if="isGenerating" class="my-5 text-center">
                  Please wait while the system generate the uploaded PDF
                  content.
                  <v-progress-linear
                    color="blue accent-4"
                    indeterminate
                    rounded
                    height="6" />
                </v-sheet>

                <v-row v-if="generatedFiles.length" class="my-3">
                  <v-col
                    v-for="file in generatedFiles"
                    :key="'generated-file-' + file.id"
                    cols="3">
                    <v-sheet class="pa-3" outlined>
                      <v-img
                        sizes="cover"
                        :height="120"
                        :src="`/api/file/preview?path=${file.preview}`" />
                    </v-sheet>
                  </v-col>
                </v-row>
              </v-sheet>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-card-text>
      <v-card-actions class="mx-2">
        <v-btn
          text
          large
          :disabled="isUploading || isGenerating"
          @click="close">
          Cancel
        </v-btn>
        <v-spacer />
        <v-btn
          v-if="step === 1"
          outlined
          text
          :disabled="isUploading || isGenerating || uploadedFiles.length === 0"
          @click="step = step + 1">
          Next
          <v-icon right>mdi-chevron-right</v-icon>
        </v-btn>
        <v-btn
          v-else-if="step === 2"
          outlined
          text
          :disabled="isUploading || isGenerating || uploadedFiles.length === 0"
          @click="step = step - 1">
          <v-icon left>mdi-chevron-left</v-icon>
          Previous
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import globalMixin from '@/mixins/global';

export default {
  name: 'DocumentUpload',
  mixins: [globalMixin],
  props: {
    open: {
      type: Boolean,
    },
    formValue: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      isSaving: false,
      step: 1,
      formData: {},
      multiple: true,
      maxFile: 10,
      api: '/api/document/upload',
      label: 'PDF File',
      autoUpload: true,
      defaultFiles: [],
      files: [],
      type: 'image',
      isUploading: false,
      isDeletingAttachment: false,
      uploadedFiles: [],
      isGenerating: false,
      generatedFiles: [],
      isDraggingFile: false,
    };
  },

  computed: {
    dialog: {
      get() {
        return this.open;
      },
      set() {
        this.$emit('toggle');
      },
    },

    requiredField: () => [v => !!v || 'Field is required'],
    requiredArrayField: () => [v => (v && v.length > 0) || 'Field required'],
  },

  beforeDestroy() {
    if (this.uploadedFiles.length) {
      this.onCancelUploadedFiles();
    }
  },

  created() {
    this.defaultFormData = JSON.stringify(this.formData);
  },

  methods: {
    close() {
      if (this.uploadedFiles.length) {
        if (!confirm('This will delete the uploaded files?')) {
          return;
        }
        this.onCancelUploadedFiles();
      }
      this.$emit('toggle');
      this.formData = JSON.parse(this.defaultFormData);
      this.files = [];
      this.generatedFiles = [];
      this.uploadedFiles = [];
      this.step = 1;
    },

    onDropFiles(event) {
      this.$refs.file.files = event.dataTransfer.files;
      this.isDraggingFile = false;
      this.onChangeFile();
    },

    onChangeFile() {
      this.files.push(...this.$refs.file.files);
      this.onAutoUpload();
    },

    onAutoUpload() {
      if (this.autoUpload) {
        this.onUploadFiles();
      }
    },

    async onUploadFiles() {
      const files = this.files;
      if (this.isUploading || files.length === 0 || !this.files) {
        return;
      }
      this.isUploading = true;
      try {
        if (files.length > this.maxFile) {
          throw new Error(`A maximum of ${this.maxFile} files can be uploaded`);
        }
        const form = new FormData();
        files.forEach(file => {
          form.append('files[]', file, file.name);
        });
        const { data } = await this.$axios.post(this.api, form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const currentFiles = this.uploadedFiles;
        if (currentFiles.length === 0) {
          this.uploadedFiles = data;
        } else if (currentFiles.length < this.maxFile) {
          this.uploadedFiles = currentFiles.concat(data);
        } else {
          throw new Error(`A maximum of ${this.maxFile} files can be uploaded`);
        }
        this.files = [];
      } catch (error) {
        this.apiErrorMessage(error);
      } finally {
        this.isUploading = false;
      }
    },

    async onDeleteUploadedFile(id) {
      if (this.isDeletingAttachment) {
        return;
      }
      this.isDeleting = true;
      try {
        await this.$axios.delete(`/api/file/${id}`);
        const files = this.uploadedFiles.filter(file => file.id !== id);
        this.uploadedFiles = files;
        this.systemInfoMessage('File deleted.');
      } catch (error) {
        this.apiErrorMessage(error);
      } finally {
        this.isDeletingAttachment = false;
      }
    },

    async onCancelUploadedFiles() {
      if (this.isDeletingAttachment) {
        return;
      }
      this.isDeleting = true;
      try {
        const ids = this.uploadedFiles.map(record => record.id);
        await this.$axios.post(`/api/file/delete/`, { ids });
        this.uploadedFiles = [];
        // this.systemInfoMessage('Files deleted.');
      } catch (error) {
        this.apiErrorMessage(error);
      } finally {
        this.isDeletingAttachment = false;
      }
    },

    async onGenerate() {
      if (this.isGenerating) {
        return;
      }
      this.isGenerating = true;
      try {
        const ids = this.uploadedFiles.map(record => record.id);
        const { data } = await this.$axios.post(
          '/api/document/generate/information',
          { ids },
        );
        this.generatedFiles = data.files;
        this.$emit('success');
        this.uploadedFiles = [];
        this.files = [];
        this.systemInfoMessage(
          'The uploaded documents was successfully generated.',
        );
      } catch (error) {
        this.apiErrorMessage(error);
      } finally {
        this.isGenerating = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  #file-input-wrapper {
    cursor: pointer;
    :hover {
      background: rgba(82, 81, 81, 0.049);
    }
  }
}
</style>
