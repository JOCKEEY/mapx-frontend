<template>
  <v-dialog v-model="dialog" max-width="900" :persistent="isUploading">
    <v-card :loading="isUploading">
      <v-toolbar outlined flat>
        <v-toolbar-title>Import</v-toolbar-title>
        <v-spacer />
        <v-btn icon :disabled="isUploading" @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="pt-4">
        <v-file-input
          v-model="file"
          truncate-length="15"
          label="File"
          show-size
          placeholder="Choose GeoJSON file..."
          messages="Please upload a valid GeoJSON file with CRS84 - EPSG:4326"
          :rules="[
            value =>
              !value ||
              value.size < 10000000 ||
              'Size should be less than 10 MB!',
          ]"
          :disabled="isUploading"
          @change="onChooseFile" />
        <v-sheet v-if="geoJSON" class="mt-2">
          <span>To be imported: {{ geoJSON.features.length }}</span>
        </v-sheet>
      </v-card-text>
      <v-divider />
      <v-card-actions class="justify-space-between">
        <v-btn text :disabled="isUploading" @click="close">Cancel</v-btn>
        <v-btn
          color="primary"
          :disabled="geoJSON === null"
          :loading="isUploading"
          @click="onImport">
          Import
          <v-icon>mdi-import</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import globalMixin from '~/mixins/global.js';
export default {
  name: 'MapsLayerMapImport',
  mixins: [globalMixin],
  props: {
    open: Boolean,
    layerType: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    isUploading: false,
    geoJSON: null,
    file: null,
  }),
  computed: {
    dialog: {
      get() {
        return this.open;
      },
      set() {
        return this.$emit('toggle');
      },
    },
  },
  watch: {
    dialog(isTrue) {
      if (!isTrue) {
        this.isUploading = false;
        this.geoJSON = null;
      }
    },
  },
  methods: {
    close() {
      this.$emit('toggle');
    },

    onChooseFile(file) {
      if (!file) {
        return;
      }
      this.geoJSON = null;
      const fileReader = new FileReader();
      fileReader.onload = () => {
        try {
          const geoJSON = JSON.parse(fileReader.result);

          if (
            geoJSON.type === 'FeatureCollection' &&
            // geoJSON.crs.properties.name.split(':').pop() === '4326' &&
            geoJSON.features.length
          ) {
            this.geoJSON = {
              ...geoJSON,
              features: geoJSON.features.map(feature => ({
                ...feature,
                properties: {
                  ...feature.properties,
                  // attributes: this.layerType.attributes,
                },
              })),
            };
          } else {
            throw new Error('error');
          }
        } catch (error) {
          this.systemInfoMessage('Invalid GeoJSON file format.', 'mdi-alert');
        }
      };
      fileReader.readAsText(file);
    },

    async onImport() {
      if (this.isUploading) {
        return;
      }
      this.isUploading = true;
      try {
        const { data } = await this.$axios.post(
          '/api/maplayer/import-feature-collection',
          {
            mapLayerTypeId: this.layerType.id,
            featureCollection: this.geoJSON,
          },
        );
        if (data) {
          this.$emit('success', data.data?.length || 0);
          this.file = null;
        }
      } catch (error) {
        this.apiErrorMessage(error);
      } finally {
        this.isUploading = false;
      }
    },
  },
};
</script>

<style></style>
