<template>
  <v-sheet>
    <div id="map">
      <v-slide-x-transition>
        <v-sheet v-if="!showMapMenu" class="menu-icon" rounded elevation="1">
          <v-icon size="32" color="primary" @click="onToggleMapMenu">
            mdi-chevron-right
          </v-icon>
        </v-sheet>
      </v-slide-x-transition>
      <v-sheet
        class="active-layer-info px-2"
        elevation="1"
        dark
        color="primary">
        {{ activeLayerTitle }}
      </v-sheet>
    </div>
    <v-slide-x-transition>
      <v-card v-if="showMapMenu" class="map-menu-card" width="320">
        <v-sheet class="pa-2 d-flex justify-space-between align-center">
          <span class="primary--text font-weight-bold">Maps</span>
          <v-icon size="30" color="primary" @click="onToggleMapMenu">
            mdi-chevron-left
          </v-icon>
        </v-sheet>
        <v-divider />
        <v-expansion-panels v-model="selectedLayerPanel" accordion>
          <v-expansion-panel
            v-for="(layer, i) in layers"
            :key="i"
            active-class="primary--text font-weight-medium">
            <v-expansion-panel-header class="pl-2">
              <div class="d-flex align-center">
                <span class="mr-1">
                  <v-icon size="18" :color="layer.enabled ? 'primary' : 'grey'">
                    mdi-circle
                  </v-icon>
                </span>
                {{ layer.title }}
              </div>
            </v-expansion-panel-header>
            <v-divider />
            <v-expansion-panel-content>
              <div class="d-flex justify-space-between align-center">
                <v-switch
                  v-model="layer.enabled"
                  label="Show on map"
                  @change="onChangeEnableLayer($event, layer)" />
                <template v-if="layer.enabled && layer.id === 'qas'">
                  <v-btn text small @click="showMunicipalityPicker = true">
                    Filter <v-icon right>mdi-filter</v-icon>
                  </v-btn>
                </template>
              </div>
              <v-sheet v-if="layer.enabled">
                <v-sheet class="d-flex justify-space-between align-center">
                  <v-sheet class="mr-1">
                    <v-select
                      v-model="layer.symbology"
                      label="Symbology"
                      :items="colorSymbol"
                      hide-details
                      dense
                      outlined />
                  </v-sheet>
                  <v-menu
                    v-if="layer.symbology === 'single'"
                    offset-y
                    left
                    :close-on-content-click="false">
                    <template #activator="{ on, attrs }">
                      <v-sheet outlined>
                        <v-btn
                          text
                          class="mr-1"
                          v-bind="attrs"
                          :color="layer.color ? layer.color.hex : '#dddddd'"
                          v-on="on">
                          <v-icon>mdi-ellipse</v-icon>
                          <span class="black--text">Color</span>
                        </v-btn>
                      </v-sheet>
                    </template>
                    <v-sheet>
                      <v-color-picker
                        v-model="layer.color"
                        dot-size="15"
                        mode="hexa"
                        canvas-height="100"
                        swatches-max-height="100" />
                    </v-sheet>
                  </v-menu>
                </v-sheet>
                <v-select
                  v-if="layer.symbology === 'categorized'"
                  v-model="layer.categorizedBy"
                  class="mt-3 mr-1"
                  label="Categorized By"
                  hide-details
                  dense
                  outlined
                  clearable
                  :items="layer.categorized"
                  @change="onChangeLayerCategory(layer)" />
                <v-sheet
                  v-if="
                    layer.symbology === 'categorized' && layer.categorizedBy
                  "
                  outlined
                  class="mt-2 mr-1">
                  <div class="small grey--text text-center mt-1">
                    Limited to 20 records.
                  </div>
                  <v-sheet
                    v-for="(symbology, j) in layer.symbologyCategories"
                    :key="j">
                    <v-sheet class="d-flex align-center py-1">
                      <v-menu offset-y left :close-on-content-click="false">
                        <template #activator="{ on, attrs }">
                          <v-sheet>
                            <v-btn
                              text
                              class="mr-1"
                              v-bind="attrs"
                              small
                              :color="
                                symbology.color
                                  ? symbology.color.hex
                                  : '#dddddd'
                              "
                              v-on="on">
                              <v-icon>mdi-ellipse</v-icon>
                            </v-btn>
                          </v-sheet>
                        </template>
                        <v-sheet>
                          <v-color-picker
                            v-model="symbology.color"
                            dot-size="15"
                            mode="hexa"
                            canvas-height="100"
                            swatches-max-height="100" />
                        </v-sheet>
                      </v-menu>
                      <span
                        class="text-truncate font-weight-light"
                        :title="symbology.text">
                        {{ symbology ? symbology.text : '' }}
                      </span>
                    </v-sheet>
                    <v-divider />
                  </v-sheet>
                </v-sheet>
                <v-sheet class="mt-3">
                  <v-select
                    v-model="layer.geometryType"
                    label="Geometry Type"
                    :items="['Polygon', 'Point', 'Line']"
                    hide-details
                    dense
                    outlined />
                  <v-select
                    v-model="layer.textField"
                    label="Label"
                    class="mt-3"
                    dense
                    hide-details
                    outlined
                    :items="
                      layer.labels.length ? layer.labels : layer.categorized
                    " />
                </v-sheet>
                <v-btn
                  small
                  class="mt-2"
                  block
                  color="primary"
                  @click="onChangeLayerColor(layer)">
                  <v-icon left>mdi-play</v-icon>
                  Apply Style
                </v-btn>
              </v-sheet>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </v-slide-x-transition>
    <v-slide-x-transition origin="top right">
      <v-sheet
        v-if="showFeatureInfo"
        class="feature-information"
        width="400"
        elevation="1">
        <v-card class="mb-3" elevation="0" :loading="isFeatureLoading">
          <v-card-title>
            <span class="primary--text">Information</span>
            <v-spacer />
            <v-icon color="red" @click="onCloseFeatureInformation">
              mdi-close
            </v-icon>
          </v-card-title>
          <v-divider />
          <v-simple-table>
            <template #default>
              <thead>
                <tr>
                  <th class="subtitle-2 primary--text">Attribute</th>
                  <th class="subtitle-2 primary--text">Value</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="selectedFeatureAttributes">
                  <tr
                    v-for="key in Object.keys(selectedFeatureAttributes)"
                    :key="key">
                    <td>{{ key }}</td>
                    <td>{{ selectedFeatureAttributes[key] }}</td>
                  </tr>
                </template>
                <tr v-else>
                  <td colspan="2">No Attributes.</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-sheet>
    </v-slide-x-transition>
    <ReportPickerMunicipality
      optional
      :open="showMunicipalityPicker"
      @toggle="showMunicipalityPicker = false"
      @selected="onSelectMunicipality" />
  </v-sheet>
</template>

<script>
import qs from 'qs';
import Map from 'ol/Map';
import { GeoJSON } from 'ol/format';
import {
  OSM,
  XYZ as TileXYZ,
  TileWMS,
  Vector as VectorSource,
} from 'ol/source';
import {
  Tile as TileLayer,
  Group as GroupLayer,
  Vector as VectorLayer,
} from 'ol/layer';
import View from 'ol/View';
import { Style, Fill, Stroke } from 'ol/style';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';

import globalMixin from '~/mixins/global.js';

export default {
  name: 'MapInterActive',
  mixins: [globalMixin],
  layout: 'public',
  data() {
    return {
      map: null,
      showMapMenu: false,
      layers: [
        {
          id: 'qas',
          title: 'Quality Assurance Map',
          type: 'standalone',
          enabled: false,
          layerName: 'savethechildren:qas_map',
          filter: {},
          fixedFilter: [],
          color: {
            hex: '#E6E6E6',
          },
          textField: 'id',
          symbology: 'single',
          categorizedBy: null,
          symbologyCategories: [],
          categorized: [
            {
              text: 'Quality Assessment',
              value: 'total_assessment',
            },
          ],
          labels: [
            {
              text: 'Quality Assessment',
              value: 'total_assessment',
            },
            {
              text: 'City/Municipality',
              value: 'municipality',
            },
            {
              text: 'Barangay',
              value: 'barangay',
            },
          ],
          api: '/api/qas-map/form/distinct',
          geometryType: 'Polygon',
        },
      ],
      highlightLayer: null,
      selectedLayerPanel: null,
      colorSymbol: [
        {
          text: 'Single Color',
          value: 'single',
        },
        {
          text: 'Categorized',
          value: 'categorized',
        },
      ],
      isFeatureLoading: false,
      selectedFeature: null,
      showFeatureInfo: false,
      mapLayerTypes: [],
      showMunicipalityPicker: false,
      selectedRegion: null,
      selectedProvince: null,
      selectedMunicipality: null,
    };
  },

  computed: {
    activeLayerTitle() {
      return this.layers[this.selectedLayerPanel]?.title;
    },

    activeLayerType() {
      return this.layers[this.selectedLayerPanel]?.type;
    },

    selectedFeatureAttributes() {
      return JSON.parse(this.selectedFeature?.attributes || null);
    },
  },

  watch: {
    mapLayerTypes(value) {
      const _layers = value.map(layer => ({
        id: layer.id,
        title: layer.name,
        type: 'maplayers',
        enabled: false,
        layerName: 'savethechildren:map_layer',
        filter: {},
        fixedFilter: [`layer_type_id = ${layer.id}`],
        color: {
          hex: '#E6E6E6',
        },
        symbology: 'single',
        symbologyCategories: [],
        categorizedBy: null,
        categorized: [],
        labels: [],
        api: `/api/maplayer/distinct/attribute/${layer.id}`,
        geometryType: 'Polygon',
        textField: '',
      }));
      this.layers = [...this.layers, ..._layers];
      this.fetchMapLayerProperties();
    },
  },

  mounted() {
    this.$store.dispatch('setPageTitle', 'Inter-Active Map');
    this.map = new Map({
      layers: [
        new GroupLayer({
          title: 'Base Layer',
          layers: [
            new TileLayer({
              title: 'Open Streetmap',
              source: new OSM(),
              visible: false,
              baseLayer: true,
            }),
            new TileLayer({
              title: 'Google Maps',
              source: new TileXYZ({
                url: 'https://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga',
                /*
                  The available Google Maps layers are:

                  Roadmap
                  http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}

                  Terrain
                  http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}

                  Altered roadmap
                  http://mt0.google.com/vt/lyrs=r&hl=en&x={x}&y={y}&z={z}

                  Satellite only
                  http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}

                  Terrain only
                  http://mt0.google.com/vt/lyrs=t&hl=en&x={x}&y={y}&z={z}

                  Hybrid
                  http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}
                */
              }),
              baseLayer: true,
            }),
          ],
        }),
      ],
      target: 'map',
      view: new View({
        center: [124.7, 8],
        zoom: 8,
        projection: 'EPSG:4326',
      }),
    });

    this.highlightLayer = new VectorLayer({
      title: 'Highlight',
      displayInLayerSwitcher: false,
      zIndex: 100,
      source: new VectorSource(),
      style: () =>
        new Style({
          fill: new Fill({
            color: 'rgba(255,255, 102, .8)',
          }),
          stroke: new Stroke({
            width: 2,
            color: '#FF0000',
          }),
        }),
    });

    this.map.addLayer(this.highlightLayer);

    this.map.addControl(new LayerSwitcher());
    this.getLayerTypes();

    this.map.on('singleclick', evt => {
      const viewResolution = this.map.getView().getResolution();
      const projection = this.map.getView().getProjection();
      const coordinate = evt.coordinate;

      const selectedLayer = this.layers[this.selectedLayerPanel];

      if (selectedLayer) {
        const layer = this.map
          .getLayers()
          .getArray()
          .find(_layer => _layer.get('title') === selectedLayer.title);
        if (layer) {
          const url = layer
            .getSource()
            .getFeatureInfoUrl(coordinate, viewResolution, projection, {
              INFO_FORMAT: 'application/json',
            });
          this.fetchFeatureInfo(selectedLayer, url, coordinate);
        }
      }
    });
  },

  methods: {
    onToggleMapMenu() {
      this.showMapMenu = !this.showMapMenu;
    },

    async getLayerTypes() {
      try {
        const { data } = await this.$axios.get(
          '/api/maplayer/available-layers',
        );
        this.mapLayerTypes = data?.data || [];
      } catch (error) {
        this.apiErrorMessage(error);
      }
    },

    async fetchMapLayerProperties() {
      try {
        const { data } = await this.$axios.get('/api/maplayer/type/attributes');
        if (data) {
          this.layers = this.layers.map(layer => {
            if (Array.isArray(data[layer.id])) {
              layer.categorized = data[layer.id].map(attribute => ({
                text: attribute,
                value: attribute,
              }));
              layer.textField = data[layer.id][0];
            }
            return layer;
          });
        }
      } catch (error) {
        this.apiErrorMessage(error);
      }
    },

    onChangeEnableLayer(isEnabled, selectedLayer) {
      if (isEnabled) {
        const params = {
          LAYERS: selectedLayer.layerName,
          FORMAT: 'image/png',
          time: Date.now(),
        };
        if (selectedLayer.fixedFilter.length) {
          params.cql_filter = selectedLayer.fixedFilter.join(' AND ');
        }
        const layer = new TileLayer({
          title: selectedLayer.title,
          source: new TileWMS({
            url: `${process.env.GEOSERVER_URL}/wms`,
            params,
            crossOrigin: 'anonymous',
            serverType: 'geoserver',
          }),
        });
        this.map.addLayer(layer);
      } else {
        this.map
          .getLayers()
          .getArray()
          .forEach(layer => {
            if (layer.get('title') === selectedLayer.title) {
              this.map.removeLayer(layer);
            }
          });
        selectedLayer.color = { hex: '#ffffff' };
      }
    },

    async onChangeLayerColor(selectedLayer) {
      try {
        // For PostGIS json filtering: https://docs.geoserver.org/latest/en/user/data/database/postgis.html?highlight=store
        const color = selectedLayer.color.hex;
        let styleName = selectedLayer.layerName;
        const textField =
          selectedLayer.type === 'maplayers'
            ? `<ogc:Function name="jsonPointer"><ogc:PropertyName>attributes</ogc:PropertyName><ogc:Literal><![CDATA[/${selectedLayer.textField}]]></ogc:Literal></ogc:Function>`
            : selectedLayer.textField
            ? `<ogc:PropertyName>${selectedLayer.textField}</ogc:PropertyName>`
            : null;        
        const polygonSymbolizer = `<PolygonSymbolizer>
              <Fill><CssParameter name="fill">${color}</CssParameter></Fill>
              <Stroke>
                <CssParameter name="stroke">#000000</CssParameter>
                <CssParameter name="stroke-width">0.5</CssParameter>
              </Stroke>
            </PolygonSymbolizer>`;

        const lineSymbolizer = `<LineSymbolizer>
              <Stroke>
                <CssParameter name="stroke">${color}</CssParameter>
                <CssParameter name="stroke-width">2</CssParameter>
                <CssParameter name="stroke-dasharray">4 2</CssParameter>
            </Stroke>
            </LineSymbolizer>`;

        const symbolizer =
          selectedLayer.geometryType === 'Polygon'
            ? polygonSymbolizer
            : selectedLayer.geometryType === 'Line'
            ? lineSymbolizer
            : null;
        const label = `<TextSymbolizer>
          <Label>
            ${textField}
          </Label>
          <Font>
            <CssParameter name="font-family">Arial</CssParameter>
             <CssParameter name="font-size">
              <ogc:Function name="Categorize">
                <!-- Value to transform -->
                <ogc:Function name="env">
                  <ogc:Literal>wms_scale_denominator</ogc:Literal>
                </ogc:Function>
                <!-- Output values and thresholds -->
                <!-- Ranges: -->
                <!-- [scale <= 300, font 12] -->
                <!-- [scale 300 - 2500, font 10] -->
                <!-- [scale > 2500, font 8] -->
                <ogc:Literal>20</ogc:Literal>
                <ogc:Literal>300</ogc:Literal>
                <ogc:Literal>20</ogc:Literal>
                <ogc:Literal>2500</ogc:Literal>
                <ogc:Literal>18</ogc:Literal>
              </ogc:Function>
            </CssParameter>
          </Font>
          <Fill><CssParameter name="fill">#000000</CssParameter></Fill>
          <Halo>
            <Radius>1</Radius>
            <Fill><CssParameter name="fill">#ffffff</CssParameter></Fill>
          </Halo>
          <VendorOption name="maxDisplacement">200</VendorOption>
          <VendorOption name="group">true</VendorOption>
          <VendorOption name="spaceAround">10</VendorOption>
          <VendorOption name="autoWrap">50</VendorOption>
          <VendorOption name="charSpacing">2</VendorOption>
        </TextSymbolizer>`;
        const defaultRule = [
          `<Rule>
            <Title>Polygon</Title>
            ${symbolizer}
            ${label}
          </Rule>`,
        ];

        if (
          selectedLayer.symbology === 'categorized' &&
          selectedLayer.symbologyCategories.length
        ) {
          // defaultRule.pop()
          const categorizedBy = selectedLayer.categorizedBy;
          selectedLayer.symbologyCategories.forEach(symbology => {
            const polygonSymbolizer = `<PolygonSymbolizer>
              <Fill><CssParameter name="fill">${
                symbology.color?.hex || '#DDDDDD'
              }</CssParameter></Fill>
              <Stroke>
                <CssParameter name="stroke">#000000</CssParameter>
                <CssParameter name="stroke-width">0.5</CssParameter>
              </Stroke>
            </PolygonSymbolizer>`;

            const lineSymbolizer = `<LineSymbolizer>
              <Stroke>
                <CssParameter name="stroke">${
                  symbology.color?.hex || '#DDDDDD'
                }</CssParameter>
                <CssParameter name="stroke-width">2</CssParameter>
                <CssParameter name="stroke-dasharray">4 2</CssParameter>
            </Stroke>
            </LineSymbolizer>`;
            const symbolizer =
              selectedLayer.geometryType === 'Polygon'
                ? polygonSymbolizer
                : selectedLayer.geometryType === 'Line'
                ? lineSymbolizer
                : null;
            if (selectedLayer.type === 'maplayers') {
              // console.log(symbology)
              defaultRule.push(`<Rule>
                <Name><![CDATA[${symbology.text}]]></Name>
                  <ogc:Filter>
                    <ogc:PropertyIsEqualTo>
                      <ogc:Function name="jsonPointer">
                        <ogc:PropertyName>attributes</ogc:PropertyName>
                        <ogc:Literal><![CDATA[/${categorizedBy}]]></ogc:Literal>
                      </ogc:Function>
                      <ogc:Literal><![CDATA[${symbology.value}]]></ogc:Literal>
                    </ogc:PropertyIsEqualTo>
                  </ogc:Filter>
                ${symbolizer}
                ${label}
              </Rule>`);
            } else {
              defaultRule.push(`
                <Rule>
                <Name><![CDATA[${symbology.text}]]></Name>
                <Title><![CDATA[${symbology.text}]]></Title>
                <ogc:Filter>
                  <ogc:PropertyIsEqualTo>
                    <ogc:PropertyName><![CDATA[${categorizedBy}]]></ogc:PropertyName>
                    <ogc:Literal><![CDATA[${symbology.value}]]></ogc:Literal>
                  </ogc:PropertyIsEqualTo>
                </ogc:Filter>
                ${symbolizer}
                ${label}
              </Rule>
              `);
            }
          });
          styleName = 'ictrm_interactive_style_' + selectedLayer.id;
        }

        const xml = `<StyledLayerDescriptor
          version="1.0.0"
          xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"
          xmlns="http://www.opengis.net/sld"
          xmlns:ogc="http://www.opengis.net/ogc"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        >
          <NamedLayer><Name>${selectedLayer.layerName}</Name>
          <UserStyle>
            <Name>${styleName}</Name>
            <Title>Style</Title>
            <IsDefault>1</IsDefault>
            <FeatureTypeStyle>
              ${defaultRule.join('')}
            </FeatureTypeStyle>
          </UserStyle>
        </NamedLayer>
      </StyledLayerDescriptor>`;

        if (selectedLayer.symbology === 'categorized') {
          // Save the style on the GeoServer to refrain from using the URL based SLD_BODY
          try {
            await this.$axios.delete(`/api/geoserverapi/style/${styleName}`);
          } catch (error) {
            console.log(
              'Continue even if the deletion of style is not successful',
              error,
            );
          }

          const { data } = await this.$axios.post(
            '/api/geoserverapi/create-style',
            {
              name: styleName,
              style: `<?xml version="1.0" encoding="UTF-8"?>${xml}`,
            },
          );

          this.map
            .getLayers()
            .getArray()
            .forEach(layer => {
              if (layer.get('title') === selectedLayer.title) {
                layer.getSource().updateParams({
                  STYLES: data,
                  t: Date.now(),
                  SLD_BODY: null,
                });
              }
            });
          return;
        }

        this.map
          .getLayers()
          .getArray()
          .forEach(layer => {
            if (layer.get('title') === selectedLayer.title) {
              layer.getSource().updateParams({ SLD_BODY: xml });
            }
          });
      } catch (error) {
        this.apiErrorMessage(error);
      }
    },

    async onChangeLayerCategory(layer) {
      if (!layer.categorizedBy) {
        return;
      }
      try {
        const url = `${layer.api}/${layer.categorizedBy}`;
        const { data } = await this.$axios.get(url);
        this.layers = this.layers.map(_layer => {
          if (_layer.title === layer.title) {
            return {
              ..._layer,
              symbologyCategories: data.map(symbology => {
                const defaultColor = Math.floor(
                  Math.random() * 16777215,
                ).toString(16);
                return {
                  ...symbology,
                  color: { hex: `#${defaultColor}` },
                };
              }),
            };
          }
          return _layer;
        });
      } catch (error) {
        this.apiErrorMessage(error);
      }
    },

    async fetchFeatureInfo(selectedLayer, url) {
      this.showFeatureInfo = true;
      if (this.isFeatureLoading) {
        return;
      }
      const highLightLayerSource = this.highlightLayer.getSource();
      highLightLayerSource.clear();
      this.isFeatureLoading = true;
      this.selectedFeature = null;
      try {
        const { data } = await this.$axios(url, { credentials: 'same-origin' });
        if (data && data.numberReturned > 0) {
          const feature = new GeoJSON().readFeature(data.features[0]);
          highLightLayerSource.addFeature(feature);
          let props = feature.getProperties();

          // if the selectedlayer is standalone then fetch from the backend api
          if (selectedLayer.type === 'standalone') {
            switch (selectedLayer.id) {
              case 'qas': {
                const params = qs.stringify({
                  regioncode: 'region',
                  provincecode: 'province',
                  municipalitycode: 'municipality',
                  psgc_code: props.psgc_code,
                });
                const { data } = await this.$axios.get(
                  `/api/qas-form/report/scorecard/barangay?${params}`,
                );

                if (data.data) {
                  const form = data.data;
                  const attributes = {
                    Region: props.region,
                    Province: props.province,
                    'City/Municipality': props.municipality,
                    Barangay: form.barangay,
                    'Total Score': props.total_score,
                    'Quality Assessment': props.total_assessment,
                    'Date Assessed': this.formatDate(props.date_assessed),
                  };

                  Object.keys(this.assessmentForm).forEach(section => {
                    attributes[this.assessmentForm[section].category] =
                      props[section];
                  });
                  props = {
                    ...props,
                    attributes: JSON.stringify(attributes),
                  };
                }
                break;
              }
            }
          }

          this.selectedFeature = props;
        }
      } catch (error) {
        this.apiErrorMessage(error);
      } finally {
        this.isFeatureLoading = false;
      }
    },

    onCloseFeatureInformation() {
      const highLightLayerSource = this.highlightLayer.getSource();
      highLightLayerSource.clear();
      this.selectedFeature = null;
      this.showFeatureInfo = false;
    },

    onSelectMunicipality({ region, province, municipality }) {
      this.showMunicipalityPicker = false;

      const fixedFilter = [];

      if (region) {
        fixedFilter.push(`region='${region.region}'`);
      }
      if (province) {
        fixedFilter.push(`province='${province.province}'`);
      }
      if (municipality) {
        fixedFilter.push(`municipality='${municipality.municipality}'`);
      }

      const layerData = this.layers[this.selectedLayerPanel];
      this.layers[this.selectedLayerPanel] = {
        ...layerData,
        fixedFilter,
      };

      // eslint-disable-next-line camelcase
      const CQL_FILTER = fixedFilter.join(' AND ');
      this.map
        .getLayers()
        .getArray()
        .forEach(layer => {
          if (layer.get('title') === layerData.title) {
            // eslint-disable-next-line camelcase
            layer.getSource().updateParams({ CQL_FILTER });
          }
        });
    },
  },
};
</script>

<style scoped lang="scss">
#map {
  height: calc(100vh - 110px);
  width: 100%;
  background-color: rgb(243, 243, 243);
}
::v-deep {
  .ol-zoom {
    display: flex;
    left: auto !important;
    right: 0.5em;
  }

  .v-main {
    background-color: #00392e !important;
  }
}

.menu-icon {
  position: absolute;
  z-index: 1;
  top: 124px;
  left: 0.5em;
}

.map-menu-card {
  position: absolute;
  left: 0;
  top: 120px;
  z-index: 1;
  height: calc(100vh - 110px);
  overflow-y: auto;
}

.active-layer-info {
  position: absolute;
  top: 130px;
  right: 65px;
  z-index: 1;
}

.feature-information {
  position: absolute;
  top: 120px;
  right: 0;
  z-index: 1;
  height: calc(100vh - 110px);
  overflow-y: auto;
}
</style>
