<template>
  <v-dialog
    v-model="dialog"
    scrollable
    max-width="600"
    persistent
    fullscreen
    no-click-animation>
    <v-card :loading="isSaving || isFeatureLoading" loader-height="7">
      <v-card-title class="primary darken-1">
        <h4 class="text-truncate white--text">
          {{ layerTypeName }}
        </h4>
        <v-spacer />
        <v-btn icon dark :disabled="isSaving || isDrawing" @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="pa-0">
        <div id="map-ui">
          <v-navigation-drawer
            v-model="formDrawer"
            absolute
            hide-overlay
            width="400"
            :permanent="formDrawer">
            <!-- Map Form -->
            <v-form
              ref="form"
              v-model="formValid"
              class="ma-0"
              lazy-validation
              @submit.prevent="onSubmitForm">
              <v-list-item class="grey lighten-3">
                <v-list-item-content>
                  <v-list-item-title>Map Information</v-list-item-title>
                </v-list-item-content>
                <v-list-item-avatar v-if="isEditMode">
                  <v-icon color="red" @click="showDeleteFormPrompt = true">
                    mdi-delete
                  </v-icon>
                </v-list-item-avatar>
              </v-list-item>

              <v-divider class="mb-3" />
              <v-sheet class="pa-6">
                <v-text-field
                  v-model="formData.name"
                  label="Name"
                  outlined
                  :rules="requiredField" />

                <v-text-field
                  v-for="(attr, i) in formData.attributes"
                  :key="`attr-form-key${i}`"
                  v-model="attr.value"
                  outlined
                  :label="attr.name" />

                <v-sheet class="d-flex justify-space-between">
                  <v-switch
                    v-model="formData.isPublic"
                    label="Public"
                    class="mr-1"
                    messages="Check if this will be available in public" />
                  <v-switch
                    v-model="formData.isPublish"
                    class="ml-1"
                    label="Publish"
                    messages="Check to display on the map" />
                </v-sheet>
              </v-sheet>

              <v-divider />
              <v-sheet class="d-flex pa-6 justify-space-between align-center">
                <a
                  href="#"
                  class="text-decoration-none"
                  :disabled="isSaving"
                  @click.prevent="onToggleForm">
                  <v-icon>mdi-chevron-left</v-icon>
                  Hide
                </a>
                <div>
                  <v-btn
                    type="button"
                    color="red"
                    text
                    @click="onToggleCancelFormPrompt">
                    <v-icon>mdi-close</v-icon>
                    Cancel
                  </v-btn>
                  <v-btn type="submit" color="primary" :loading="isSaving">
                    <v-icon>mdi-content-save</v-icon>
                    {{ isEditMode ? 'Update' : 'Save' }}
                  </v-btn>
                </div>
              </v-sheet>
            </v-form>
            <!-- End of Map Form -->
          </v-navigation-drawer>
        </div>
      </v-card-text>
      <v-card-actions class="grey darken-3 justify-space-between">
        <v-sheet color="transparent">
          <!-- Bottom Left buttons -->
          <v-sheet color="transparent">
            <v-menu offset-y top>
              <template #activator="{ on, attrs }">
                <v-btn text outlined dark v-bind="attrs" v-on="on">
                  <v-icon>mdi-menu</v-icon>
                  Actions
                </v-btn>
              </template>
              <v-list>
                <v-list-item v-if="!isDrawing">
                  <v-list-item-title>
                    <v-menu v-if="!isDrawing" offset-y top open-on-hover>
                      <template #activator="{ on, attrs }">
                        <v-btn
                          text
                          plain
                          class="pa-0 black--text"
                          v-bind="attrs"
                          v-on="on">
                          Add Map
                        </v-btn>
                      </template>

                      <v-list>
                        <v-list-item
                          v-for="(item, i) in featureTypes"
                          :key="i"
                          @click="onAddMap(item.type)">
                          <v-list-item-title class="text-capitalize">
                            {{ item.name }}
                          </v-list-item-title>
                          <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                          </v-list-item-icon>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-list-item-title>
                  <v-list-item-icon>
                    <v-icon>mdi-plus</v-icon>
                  </v-list-item-icon>
                </v-list-item>
                <v-list-item v-if="!isDrawing" @click="onToggleMapImport">
                  <v-list-item-title> Import </v-list-item-title>
                  <v-list-item-icon>
                    <v-icon>mdi-import</v-icon>
                  </v-list-item-icon>
                </v-list-item>
                <v-list-item v-if="isDrawing" @click="onToggleCancelFormPrompt">
                  <v-list-item-title>
                    <v-icon>mdi-close</v-icon>
                    Cancel Drawing
                  </v-list-item-title>
                </v-list-item>
                <v-list-item v-if="showFormButton" @click="onToggleForm">
                  <v-list-item-title>
                    <v-icon>mdi-pencil</v-icon>
                    Form Data
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-sheet>
          <!-- End -->
        </v-sheet>
        <v-sheet color="transparent" class="d-flex">
          <v-switch
            v-if="selectedFeatureId"
            class="mt-0 white--text"
            label="Drag"
            hide-details
            color="blue"
            dark
            @change="onToggleDragFeature" />
          <v-switch
            v-model="isEnableEdit"
            class="mt-0 ml-1 white--text"
            label="Edit Map"
            hide-details
            color="blue"
            title="Click the map you want to edit"
            dark />
        </v-sheet>
      </v-card-actions>
    </v-card>
    <YesNoDialog
      description="Are you sure you want to cancel this form?"
      :width="400"
      :open="showCancelFormPrompt"
      @yes="onCancelForm"
      @no="onToggleCancelFormPrompt" />
    <ModalsDelete
      title="Delete"
      message="Are you sure you want to delete this map?"
      :width="400"
      :open="showDeleteFormPrompt"
      :loading="isDeleting"
      @toggle="showDeleteFormPrompt = !showDeleteFormPrompt">
      <template #actions>
        <v-btn color="red" dark :loading="isDeleting" @click="onDeleteForm">
          <v-icon>mdi-delete</v-icon>
          Delete
        </v-btn>
        <v-btn
          text
          :disabled="isDeleting"
          @click="showDeleteFormPrompt = false">
          Cancel
        </v-btn>
      </template>
    </ModalsDelete>
    <MapsLayerMapImport
      :layer-type="layerType"
      :open="showImportDialog"
      @success="onImportSuccess"
      @toggle="onToggleMapImport" />
  </v-dialog>
</template>

<script>
import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import { XYZ as TileXYZ, Vector as VectorSource, TileWMS } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import GroupLayer from 'ol/layer/Group';
import { GeoJSON } from 'ol/format';
import { Draw, Modify, Select, Translate } from 'ol/interaction';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';
import _ from 'lodash';

import globalMixin from '~/mixins/global.js';
export default {
  name: 'MapsLayerMapForm',
  mixins: [globalMixin],
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    layerType: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    formData: {
      name: '',
      layerTypeId: null,
      isPublic: true,
      isPublish: true,
      userId: null,
      attributes: [],
    },
    formValid: false,
    isSaving: false,
    map: null,
    isDrawing: false,
    formDrawer: false,
    defaultForm: null,
    showCancelFormPrompt: false,
    showFormButton: false,
    isEnableEdit: false,
    isEditMode: false,
    showDeleteFormPrompt: false,
    isDeleting: false,

    // OL Data
    drawLayer: null,
    drawInteraction: null,
    selectedFeatureId: null,
    featureDragger: null,
    mapLayer: null,
    isFeatureLoading: false,
    showImportDialog: false,
  }),

  computed: {
    dialog: {
      get() {
        return this.open;
      },
      set() {
        this.$emit('toggle');
      },
    },
    layerTypeName() {
      return this.layerType?.name || '';
    },
    requiredField: () => [v => !!v || 'Field is required'],
    featureTypes: () => [
      /* {
        icon: 'mdi-circle-outline',
        name: 'Circle',
        type: 'Circle',
      }, */
      {
        icon: 'mdi-chart-line-variant',
        name: 'Line',
        type: 'LineString',
      },
      {
        icon: 'mdi-circle-small',
        name: 'Point',
        type: 'Point',
      },
      {
        icon: 'mdi-vector-polygon',
        name: 'Polygon',
        type: 'Polygon',
      },
    ],
  },

  watch: {
    open(isTrue) {
      if (isTrue) {
        this.formData = {
          ...this.formData,
          layerTypeId: this.layerType.id,
          attributes: JSON.parse(JSON.stringify(this.layerType.attributes)),
        };
        this.defaultForm = JSON.stringify(this.formData);
        this.$nextTick(this.initMap);
      } else if (!isTrue && this.map) {
        this.map.setTarget(null);
        this.map = null;
        this.drawLayer = null;
        this.drawInteraction = null;
        this.featureDragger = null;
        this.showFormButton = false;
        this.formDrawer = false;
        this.drawLayer = null;
        this.formData = JSON.parse(this.defaultForm);
        this.$refs.form.resetValidation();
        this.$emit('refresh');
      }
    },

    isEnableEdit(isChecked) {
      if (isChecked) {
        this.systemInfoMessage('Please click on the map you want to edit.');
      }
    },
  },

  methods: {
    initMap() {
      this.map = new Map({
        layers: [
          new GroupLayer({
            title: 'Base Layer',
            layers: [
              new TileLayer({
                title: 'Open Streetmap',
                source: new OSM({
                  attributions: 'Open Streetmap',
                }),
                visible: false,
                baseLayer: true,
              }),
              new TileLayer({
                title: 'Google Maps',
                source: new TileXYZ({
                  url: 'https://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga',
                  attributions: 'Google Maps',
                }),
                baseLayer: true,
              }),
            ],
          }),
        ],
        view: new View({
          center: [124.7, 8],
          zoom: 8,
          projection: 'EPSG:4326',
        }),
      });

      this.drawLayer = new VectorLayer({
        title: 'Draw Layer',
        displayInLayerSwitcher: false,
        source: new VectorSource({}),
      });

      const featureSelect = new Select({
        layers: [this.drawLayer],
      });

      const featureModify = new Modify({
        features: featureSelect.getFeatures(),
      });

      this.featureDragger = new Translate();
      this.featureDragger.setActive(false);

      // MapLayer
      this.mapLayer = new TileLayer({
        title: 'Map Layers',
        source: new TileWMS({
          url: `${process.env.GEOSERVER_URL}/wms`,
          params: {
            LAYERS: 'savethechildren:map_layer',
            FORMAT: 'image/png',
            cql_filter: `layer_type_id = ${this.layerType.id}`,
            time: Date.now(),
          },
          crossOrigin: 'anonymous',
          serverType: 'geoserver',
        }),
      });

      this.map.addLayer(this.mapLayer);
      this.map.addLayer(this.drawLayer);
      this.map.addControl(new LayerSwitcher());
      this.map.addInteraction(featureSelect);
      this.map.addInteraction(featureModify);
      this.map.addInteraction(this.featureDragger);

      this.map.on('singleclick', evt => {
        if (this.isEnableEdit) {
          const viewResolution = this.map.getView().getResolution();
          const projection = this.map.getView().getProjection();
          const coordinate = evt.coordinate;

          const url = this.mapLayer
            .getSource()
            .getFeatureInfoUrl(coordinate, viewResolution, projection, {
              INFO_FORMAT: 'application/json',
            });
          this.fetchFeatureInfo(url, coordinate);
        }
      });

      this.$nextTick(() => {
        this.map.setTarget('map-ui');
      });
    },

    close() {
      this.$emit('toggle');
    },

    onCancelForm() {
      this.isDrawing = false;
      this.formDrawer = false;
      this.showCancelFormPrompt = false;
      this.isEditMode = false;
      if (this.selectedFeatureId) {
        const layerSource = this.drawLayer.getSource();
        const feature = layerSource.getFeatureById(this.selectedFeatureId);
        layerSource.removeFeature(feature);
      }
      this.showFormButton = false;
      this.featureDragger.setActive(false);
      this.selectedFeatureId = null;
      if (this.drawInteraction) {
        this.map.removeInteraction(this.drawInteraction);
      }

      this.formData = JSON.parse(this.defaultForm); /* {
        ...this.formData,
        name: '',
        isPublic: true,
        isPublish: true,
        userId: null,
        attributes: this.formData.attributes.map(record => ({
          name: record.name,
          value: '',
        })),
      } */
    },

    onToggleCancelFormPrompt() {
      this.showCancelFormPrompt = !this.showCancelFormPrompt;
    },

    async onSubmitForm() {
      const validated = this.$refs.form.validate();
      if (this.isSaving || !validated) {
        return;
      }
      this.isSaving = true;
      try {
        const layerSource = this.drawLayer.getSource();
        const feature = layerSource.getFeatureById(this.selectedFeatureId);

        const geom = new GeoJSON().writeFeatureObject(feature);

        const formData = {
          ...JSON.parse(JSON.stringify(this.formData)),
          attributes: _.merge(
            ...this.formData.attributes.map(attr => ({
              [attr.name]: attr.value,
            })),
          ),
          geom: geom.geometry,
        };

        // const url = this.isEditMode ? `/maplayer/update/${formData.id}` : '/maplayer/create'
        const { data } = !this.isEditMode
          ? await this.$axios.post('/api/maplayer/create', formData)
          : await this.$axios.patch(
              `/api/maplayer/update/${formData.id}`,
              formData,
            );
        if (data) {
          this.systemInfoMessage('Map saved.', 'mdi-check');
          this.onCancelForm();
          this.mapLayer.getSource().updateParams({ time: Date.now() });
        } else {
          throw new Error('Data was not saved. Please try again.');
        }
      } catch (error) {
        this.apiErrorMessage(error);
      } finally {
        this.isSaving = false;
      }
    },

    onAddMap(featureType) {
      if (this.drawInteraction) {
        this.map.removeInteraction(this.drawInteraction);
      }
      this.isDrawing = true;

      this.drawInteraction = new Draw({
        source: this.drawLayer.getSource(),
        type: featureType,
        geometryName: 'geom',
      });
      this.map.addInteraction(this.drawInteraction);
      this.drawInteraction.addEventListener('drawend', ({ feature }) => {
        const id = Date.now();
        this.selectedFeatureId = id;
        feature.setId(id);
        this.showFormButton = true;
        this.formDrawer = true;
        this.drawInteraction.setActive(false);
      });
    },

    onToggleForm() {
      this.formDrawer = !this.formDrawer;
    },

    onCancelDrawing() {
      this.isDrawing = false;
      if (this.drawInteraction) {
        this.drawInteraction.setActive(false);
      }
      this.onCancelForm();
    },

    onToggleDragFeature(value) {
      this.featureDragger.setActive(value);
    },

    async fetchFeatureInfo(url) {
      if (this.isFeatureLoading) {
        return;
      }
      this.isFeatureLoading = true;
      try {
        const request = await fetch(url, { credentials: 'same-origin' });
        if (request.ok) {
          const { features } = await request.json();
          const drawLayerSource = this.drawLayer.getSource();
          drawLayerSource.clear();
          if (features.length) {
            const feature = new GeoJSON().readFeature(features[0]);
            const properties = feature.getProperties();
            const attributes = JSON.parse(properties.attributes);
            this.formData = {
              id: properties.id,
              name: properties.name,
              layerTypeId: properties.layer_type_id,
              isPublic: properties.is_public,
              isPublish: properties.is_publish,
              createdById: properties.created_by_id,
              attributes: Object.keys(attributes).map(key => ({
                name: key,
                value: attributes[key],
              })),
            };
            drawLayerSource.addFeature(feature);
            // feature.setId(properties.id)
            this.selectedFeatureId = feature.getId();
            this.showFormButton = true;
            this.formDrawer = true;
            this.isEditMode = true;
            this.isDrawing = true;
            this.isEnableEdit = false;
          } else {
            this.selectedFeatureId = null;
            this.showFormButton = false;
            this.formDrawer = false;
            this.isEditMode = false;
            this.isDrawing = false;
            this.formData = JSON.parse(this.defaultForm);
          }
        } else {
          throw request;
        }
      } catch (error) {
        this.apiErrorMessage(error);
      } finally {
        this.isFeatureLoading = false;
      }
    },

    async onDeleteForm() {
      if (this.isDeleting) {
        return;
      }
      this.isDeleting = true;
      try {
        await this.$axios.delete(`/api/maplayer/delete/${this.formData.id}`);
        this.onCancelForm();
        this.showDeleteFormPrompt = false;
        this.systemInfoMessage('Map was deleted.', 'mdi-delete');
        this.mapLayer.getSource().updateParams({ time: Date.now() });
      } catch (error) {
        this.apiErrorMessage(error);
      } finally {
        this.isDeleting = false;
      }
    },

    onToggleMapImport() {
      this.showImportDialog = !this.showImportDialog;
    },

    onImportSuccess(affectedRows) {
      this.onToggleMapImport();
      this.systemInfoMessage(`${affectedRows} records imported.`, 'mdi-check');
      this.mapLayer.getSource().updateParams({ time: Date.now() });
    },
  },
};
</script>

<style lang="scss" scoped>
#map-ui {
  width: 100%;
  height: calc(100vh - 114px);
}

html {
  overflow-y: hidden;
}
</style>
