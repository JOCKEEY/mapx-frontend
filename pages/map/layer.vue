<template>
  <v-sheet class="pa-3">
    <v-menu offset-y>
      <template #activator="{ on, attrs }">
        <v-btn color="primary" class="mt-1" v-bind="attrs" v-on="on">
          Add Map Layer
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item @click="onToggleCreateMapType">
          <v-list-item-title class="teal--text">
            Create Map Type
          </v-list-item-title>
          <v-list-item-icon>
            <v-icon color="teal">mdi-plus</v-icon>
          </v-list-item-icon>
        </v-list-item>
        <v-divider />
        <v-list-item
          v-for="(item, i) in mapLayerTypes"
          :key="i"
          @click="onToggleMapForm(item)">
          <v-list-item-title>{{ item.name }}</v-list-item-title>
          <v-list-item-icon>
            <v-icon>mdi-chevron-right</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-row v-if="isFetchingLayerType" class="mt-3">
      <v-col cols="12" sm="3">
        <v-skeleton-loader type="card" />
      </v-col>
      <v-col cols="12" sm="3">
        <v-skeleton-loader type="card" />
      </v-col>
      <v-col cols="12" sm="3">
        <v-skeleton-loader type="card" />
      </v-col>
      <v-col cols="12" sm="3">
        <v-skeleton-loader type="card" />
      </v-col>
    </v-row>
    <v-row v-else class="mt-3" align="stretch">
      <v-col
        v-for="(item, i) in mapLayerTypes"
        :key="`layer-type-${i}`"
        class="pa-3 d-flex flex-column"
        sm="12"
        md="3">
        <v-card class="flex d-flex flex-column" outlined>
          <v-card-title>
            <v-toolbar-title>{{ item.name }}</v-toolbar-title>
          </v-card-title>
          <v-divider />
          <v-card-text class="flex">
            <!-- <p class="subtitle-2">Map Entries: {{ item.layerCount }}</p> -->
            <p class="subtitle-2">
              Attributes:
              {{ getAttributes(item) }}
            </p>
          </v-card-text>
          <v-divider />
          <v-card-actions class="justify-space-between">
            <v-btn text color="primary" @click="onToggleMapForm(item)">
              <v-icon>mdi-chevron-right</v-icon> Map Data
            </v-btn>
            <v-btn
              icon
              color="primary"
              title="Edit"
              @click="onSelectDataToEdit(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <MapsLayerTypeForm
      :open="showLayerTypeForm"
      :form-value="selectedDataToEdit"
      @toggle="onToggleCreateMapType"
      @saved="onFormSaved"
      @deleted="onDeleted" />
    <MapsLayerMapForm
      :open="showMapForm"
      :layer-type="layerType"
      @toggle="onToggleMapForm"
      @refresh="fetchLayerTypes" />
  </v-sheet>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import globalMixin from '~/mixins/global.js';

export default {
  name: 'MapLayer',
  mixins: [globalMixin],
  data: () => ({
    showLayerTypeForm: false,
    isFetchingLayerType: false,
    selectedDataToEdit: null,

    showMapForm: false,
    layerType: null,
  }),

  computed: {
    ...mapState(['mapLayerTypes']),
  },

  beforeMount() {
    this.getLayerTypes();
  },

  mounted() {
    this.$store.dispatch('setPageTitle', 'Map Layer');
  },

  methods: {
    ...mapActions(['fetchLayerTypes']),
    onToggleCreateMapType() {
      this.showLayerTypeForm = !this.showLayerTypeForm;
      if (!this.showLayerTypeForm) {
        this.selectedDataToEdit = null;
      }
    },

    async getLayerTypes() {
      if (this.isFetchingLayerType) {
        return;
      }
      this.isFetchingLayerType = true;
      try {
        await this.fetchLayerTypes();
      } catch (error) {
        this.apiErrorMessage(error);
      } finally {
        this.isFetchingLayerType = false;
      }
    },

    onFormSaved() {
      this.systemInfoMessage('Data saved.', 'mdi-check');
      this.fetchLayerTypes();
    },

    onSelectDataToEdit(data) {
      this.selectedDataToEdit = JSON.parse(JSON.stringify(data));
      this.showLayerTypeForm = true;
    },

    onToggleMapForm(layerType = null) {
      this.showMapForm = !this.showMapForm;
      this.layerType = layerType;
    },

    onDeleted() {
      this.fetchLayerTypes();
    },

    getAttributes(item) {
      return Array.isArray(item.attributes)
        ? item.attributes
            .map(attr => attr.name)
            .flat()
            .join(', ')
        : '';
    },
  },
};
</script>

<style lang="scss" scoped></style>
