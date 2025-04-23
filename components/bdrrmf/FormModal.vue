<template>
    <v-dialog
      v-model="dialog"
      scrollable
      max-width="1000"
      persistent
      :fullscreen="isMobile">
      <v-form ref="form" lazy-validation>
        <v-card :loading="isSaving">
          <v-card-title class="primary white--text">
            <h4>Budget Utilization</h4>
            <v-spacer />
            <v-btn icon @click="close">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider />
          <v-card-text class="py-4 pa-10 mt-4">
            <v-row class="mb-2">
              <v-col cols="6">
                <v-combobox
                  v-model="formData.region"
                  :rules="requiredRule"
                  dense
                  hide-details
                  return-object
                  item-text="region"
                   :disabled="authUser.region ? true : false"
                  :items="regions"
                  label="Region"
                  @change="fetchProvinces" />
              </v-col>
              <v-col cols="6">
                <v-combobox
                  v-model="formData.province"
                  :rules="requiredRule"
                  dense
                  hide-details
                  return-object
                  item-text="province"
                  :disabled="authUser.province ? true : false"
                  :items="province"
                  label="Province"
                  @change="fetchMunicipalities" 
                />
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="formData.municipality"
                  :rules="requiredRule"
                  dense
                  hide-details
                  return-object
                  item-text="municipality"
                  :disabled="authUser.municipality ? true : false"
                  :items="municipality"
                  label="Municipality" 
                  @change="fetchUserBarangay"
                />
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="formData.barangay"
                  :rules="requiredRule"
                  dense
                  hide-details
                  return-object
                  item-text="barangay"
                  :items="barangay"
                  label="Barangay" 
                />
              </v-col>
              <v-col cols="6">
                <v-sheet class="d-flex align-center">
                  <v-text-field
                    v-model="formData.asOf"
                    :rules="requiredRule"
                    dense
                    hide-details
                    deletable-chips 
                    label="As of (e.g December 2021)" 
                />
                </v-sheet>
              </v-col>
            </v-row>
            <v-divider class="mt-1 mb-2"/>
            <v-row>
              <v-col cols="12">
                <div class="text-h5 orange--text">
                  <v-icon color="orange" large>mdi-bookmark-box-multiple</v-icon>
                  Sources Of Fund
                </div>
              </v-col>

              <v-col cols="6">
                <v-row>
                  <v-col cols="12">
                    <div class="orange--text">
                      Current Appropriation
                    </div>
                  </v-col>
                  <v-col cols="12">
                      <label for="" class="grey--text"><small>Quick Response Fund (QRF) 30%</small></label>
                      <v-text-field
                        v-model="formData.currentAppropriation[0].quickResponseFund"
                        dense
                        hide-details
                        deletable-chips
                    />
                  </v-col>
                  <v-col cols="12">
                    <label for="" class="grey--text"><small>Preventon/Mitigation/Preparedness/Rehabilitation and Recovery Fund 70%</small></label>
                      <v-text-field
                          v-model="formData.currentAppropriation[0].preventionMitigationPreparednessFund"
                          dense
                          hide-details
                          deletable-chips 
                      />
                  </v-col>
                  <v-col cols="12">
                    <label for="" class="grey--text"><small>NDRRM Fund</small></label>
                      <v-text-field
                          v-model="formData.currentAppropriation[0].ndrrmFund"
                          dense
                          hide-details
                          deletable-chips 
                      />
                  </v-col>
                  <v-col cols="12">
                    <label for="" class="grey--text"><small>From Other LGU's</small></label>
                      <v-text-field
                          v-model="formData.currentAppropriation[0].fromOtherLgu"
                          dense
                          hide-details
                          deletable-chips 
                      />
                  </v-col>
                  <v-col cols="12">
                    <label for="" class="grey--text"><small>From Other Sources</small></label>
                      <v-text-field
                          v-model="formData.currentAppropriation[0].fromOtherSources"
                          dense
                          hide-details
                          deletable-chips 
                      />
                  </v-col>
                  <v-col cols="12">
                    <label for="" class="grey--text"><small>Total</small></label>
                      <v-text-field
                          v-model="formData.currentAppropriation[0].total"
                          dense
                          hide-details
                          deletable-chips 
                      />
                  </v-col>
                </v-row>
              </v-col>

              <v-col cols="6">
                <v-row>
                  <v-col cols="12">
                    <div class="orange--text">
                      Continuing Appropriation
                    </div>
                  </v-col>
                  <v-col cols="12">
                      <label for="" class="grey--text"><small>Quick Response Fund (QRF) 30%</small></label>
                      <v-text-field
                        v-model="formData.continuingAppropriation[0].quickResponseFund"
                        dense
                        hide-details
                        deletable-chips
                    />
                  </v-col>
                  <v-col cols="12">
                    <label for="" class="grey--text"><small>Preventon/Mitigation/Preparedness/Rehabilitation and Recovery Fund 70%</small></label>
                      <v-text-field
                          v-model="formData.continuingAppropriation[0].preventionMitigationPreparednessFund"
                          dense
                          hide-details
                          deletable-chips 
                      />
                  </v-col>
                  <v-col cols="12">
                    <label for="" class="grey--text"><small>NDRRM Fund</small></label>
                      <v-text-field
                          v-model="formData.continuingAppropriation[0].ndrrmFund"
                          dense
                          hide-details
                          deletable-chips 
                      />
                  </v-col>
                  <v-col cols="12">
                    <label for="" class="grey--text"><small>From Other LGU's</small></label>
                      <v-text-field
                          v-model="formData.continuingAppropriation[0].fromOtherLgu"
                          dense
                          hide-details
                          deletable-chips 
                      />
                  </v-col>
                  <v-col cols="12">
                    <label for="" class="grey--text"><small>From Other Sources</small></label>
                      <v-text-field
                          v-model="formData.continuingAppropriation[0].fromOtherSources"
                          dense
                          hide-details
                          deletable-chips 
                      />
                  </v-col>
                  <v-col cols="12">
                    <label for="" class="grey--text"><small>Total</small></label>
                      <v-text-field
                          v-model="formData.continuingAppropriation[0].total"
                          dense
                          hide-details
                          deletable-chips 
                      />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <div class="text-h5 orange--text">
                  <v-icon color="orange" large>mdi-bookmark-box-multiple</v-icon>
                  Previous Year's Appropriations Transferred to the Special Trust
                </div>
              </v-col>
              <v-expansion-panels class="mb-6">
                <v-expansion-panel
                  v-for="(item,i) in 5"
                  :key="i"
                >
                  <v-expansion-panel-header expand-icon="mdi-menu-down">
                    Year {{ i+1 }}
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row>
                      <v-col cols="12">
                        <v-row>
                          <v-col cols="12">
                              <label for="" class="grey--text"><small>As of (e.g January 2025)</small></label>
                              <v-text-field
                                v-model="formData.previousYearAppropriation[i].asOf"
                                dense
                                hide-details
                                deletable-chips
                            />
                          </v-col>
                          <v-col cols="12">
                              <label for="" class="grey--text"><small>Quick Response Fund (QRF) 30%</small></label>
                              <v-text-field
                                v-model="formData.previousYearAppropriation[i].quickResponseFund"
                                dense
                                hide-details
                                deletable-chips
                            />
                          </v-col>
                          <v-col cols="12">
                            <label for="" class="grey--text"><small>Preventon/Mitigation/Preparedness/Rehabilitation and Recovery Fund 70%</small></label>
                              <v-text-field
                                  v-model="formData.previousYearAppropriation[i].preventionMitigationPreparednessFund"
                                  dense
                                  hide-details
                                  deletable-chips 
                              />
                          </v-col>
                          <v-col cols="12">
                            <label for="" class="grey--text"><small>NDRRM Fund</small></label>
                              <v-text-field
                                  v-model="formData.previousYearAppropriation[i].ndrrmFund"
                                  dense
                                  hide-details
                                  deletable-chips 
                              />
                          </v-col>
                          <v-col cols="12">
                            <label for="" class="grey--text"><small>From Other LGU's</small></label>
                              <v-text-field
                                  v-model="formData.previousYearAppropriation[i].fromOtherLgu"
                                  dense
                                  hide-details
                                  deletable-chips 
                              />
                          </v-col>
                          <v-col cols="12">
                            <label for="" class="grey--text"><small>From Other Sources</small></label>
                              <v-text-field
                                  v-model="formData.previousYearAppropriation[i].fromOtherSources"
                                  dense
                                  hide-details
                                  deletable-chips 
                              />
                          </v-col>
                          <v-col cols="12">
                            <label for="" class="grey--text"><small>Total</small></label>
                              <v-text-field
                                  v-model="formData.previousYearAppropriation[i].total"
                                  dense
                                  hide-details
                                  deletable-chips 
                              />
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-row>
           
            <v-row>
              <v-col cols="12">
                <div class="text-h5 orange--text">
                  <v-icon color="orange" large>mdi-bookmark-box-multiple</v-icon>
                  Total Utilized fund
                </div>
              </v-col>

              <v-col cols="6">
                <v-row>
                  <v-col cols="12">
                      <label for="" class="grey--text"><small>Quick Response Fund (QRF) 30%</small></label>
                      <v-text-field
                        v-model="formData.totalUtilizedFund[0].quickResponseFund"
                        dense
                        hide-details
                        deletable-chips
                    />
                  </v-col>
                  <v-col cols="12">
                    <label for="" class="grey--text"><small>Preventon/Mitigation/Preparedness/Rehabilitation and Recovery Fund 70%</small></label>
                      <v-text-field
                          v-model="formData.totalUtilizedFund[0].preventionMitigationPreparednessFund"
                          dense
                          hide-details
                          deletable-chips 
                      />
                  </v-col>
                  <v-col cols="12">
                    <label for="" class="grey--text"><small>NDRRM Fund</small></label>
                      <v-text-field
                          v-model="formData.totalUtilizedFund[0].ndrrmFund"
                          dense
                          hide-details
                          deletable-chips 
                      />
                  </v-col>
                  <v-col cols="12">
                    <label for="" class="grey--text"><small>From Other LGU's</small></label>
                      <v-text-field
                          v-model="formData.totalUtilizedFund[0].fromOtherLgu"
                          dense
                          hide-details
                          deletable-chips 
                      />
                  </v-col>
                  <v-col cols="12">
                    <label for="" class="grey--text"><small>From Other Sources</small></label>
                      <v-text-field
                          v-model="formData.totalUtilizedFund[0].fromOtherSources"
                          dense
                          hide-details
                          deletable-chips 
                      />
                  </v-col>
                  <v-col cols="12">
                    <label for="" class="grey--text"><small>Total</small></label>
                      <v-text-field
                          v-model="formData.totalUtilizedFund[0].total"
                          dense
                          hide-details
                          deletable-chips 
                      />
                  </v-col>
                </v-row>
              </v-col>

            </v-row>
          </v-card-text>
          <v-divider />
          <v-card-actions class="mx-2">
            <v-spacer />
            <v-btn text large @click="close"> Cancel </v-btn>
            <v-btn color="primary" large :loading="isSaving" @click="onSave">
              <v-icon>mdi-content-save</v-icon>
              {{ isEditMode ? 'Update' : 'Save' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </template>
  
  <script>
  import { mapState } from 'vuex';
  import globalMixin from '@/mixins/global';
  
  export default {
    name: 'BdrrmfFormModal',
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
        formData: {
          id: null,
          region: null,
          province: null,
          municipality: null,
          barangay: null,
          asOf: null,
          currentAppropriation: [
            {
              quickResponseFund: '',
              preventionMitigationPreparednessFund: '',
              ndrrmFund: '',
              fromOtherLgu: '',
              fromOtherSources: '',
              total: '',
            },
          ],
          continuingAppropriation: [
            {
              quickResponseFund: '',
              preventionMitigationPreparednessFund: '',
              ndrrmFund: '',
              fromOtherLgu: '',
              fromOtherSources: '',
              total: '',
            },
          ],
          previousYearAppropriation: [
            {
              asOf: '',
              quickResponseFund: '',
              preventionMitigationPreparednessFund: '',
              ndrrmFund: '',
              fromOtherLgu: '',
              fromOtherSources: '',
              total: '',
            },
            {
              asOf: '',
              quickResponseFund: '',
              preventionMitigationPreparednessFund: '',
              ndrrmFund: '',
              fromOtherLgu: '',
              fromOtherSources: '',
              total: '',
            },
            {
              asOf: '',
              quickResponseFund: '',
              preventionMitigationPreparednessFund: '',
              ndrrmFund: '',
              fromOtherLgu: '',
              fromOtherSources: '',
              total: '',
            },
            {
              asOf: '',
              quickResponseFund: '',
              preventionMitigationPreparednessFund: '',
              ndrrmFund: '',
              fromOtherLgu: '',
              fromOtherSources: '',
              total: '',
            },
            {
              asOf: '',
              quickResponseFund: '',
              preventionMitigationPreparednessFund: '',
              ndrrmFund: '',
              fromOtherLgu: '',
              fromOtherSources: '',
              total: '',
            },
          ],
          totalUtilizedFund: [
            {
              quickResponseFund: '',
              preventionMitigationPreparednessFund: '',
              ndrrmFund: '',
              fromOtherLgu: '',
              fromOtherSources: '',
              total: '',
            },
          ],
        },
        defaultFormData: {},
        isFetchingPermission: false,
        permissionList: [],
        regions: [],
        province: [],
        municipality: [],
        barangay: [],
        isFetchingProvince: false,
        isFetchingMunicipality: false,
        isFetchingBarangay: false,
      };
    },
  
    computed: {
      ...mapState('auth', ['user']),
      dialog: {
        get() {
          return this.open;
        },
        set() {
          this.$emit('toggle');
        },
      },
  
      requiredRule: () => [v => !!v || 'Field is required'],
  
      isEditMode() {
        return !!this.formData.id;
      },
    },
  
    watch: {
      formValue(data) {
        console.log(data, 'data');
        
        if (data && this.open) {
          this.formData = {
            ...data,
            id: data.id,
            region: data.region,
            province: data.province,
            municipality: data.municipality,
            barangay: data.barangay,
          };
        }
      },
      async 'formData.region'() {
        const reg = this.regions.find(
          item => item.region === this.formData.region,
        );
        if (reg) {
          this.formData.region = reg;
          await this.fetchProvinces(reg);
        }
        const prov = this.province?.find(
          item => item.province === this.formData.province,
        );
        if (prov) {
          this.formData.province = prov;
          await this.fetchMunicipalities(prov);
        }
        const mun = this.municipality?.find(
          item => item.municipality === this.formData.municipality,
        );
        if (mun) {
          this.formData.municipality = mun;
          await this.fetchUserBarangay(mun);
        }
        const brgy = this.barangay?.find(
          item => item.barangay === this.formData.barangay,
        );
        if (brgy) {
          this.formData.barangay = brgy;
        }
      },
    },
  
    created() {
      this.defaultFormData = JSON.stringify(this.formData);
    //   this.fetchPermissions();
      this.fetchRegion();
      this.populateAddress();
    },
  
    methods: {
      async fetchRegion() {
        try {
          const { data } = await this.$axios.get('/api/barangay/region/list');
          const sortedRegions = data.data.sort((a, b) => {
            const numA = parseInt(a.regioncode.substring(2), 10);
            const numB = parseInt(b.regioncode.substring(2), 10);
            return numA - numB;
          });
          this.regions = sortedRegions;
        } catch (error) {
          this.apiErrorMessage(error);
        }
      },
  
      async fetchProvinces(selected) {
        if (this.isFetchingProvince) {
          return;
        }
        this.isFetchingProvince = true;
        this.province = null;
        try {
          const { data } = await this.$axios.get(
            `/api/barangay/province/list?regioncode=${selected.regioncode}`,
          );
          this.province = data.data ?? [];
        } catch (error) {
          this.apiErrorMessage(error);
        } finally {
          this.isFetchingProvince = false;
        }
      },
  
      async fetchMunicipalities(selected) {
        if (this.isFetchingMunicipality) {
          return;
        }
        this.isFetchingMunicipality = true;
        this.municipality = null;
        try {
          const { data } = await this.$axios.get(
            `/api/barangay/municipality/list?regioncode=${this.formData.region.regioncode}&provincecode=${selected.provincecode}`,
          );
          this.municipality = data.data ?? [];
        } catch (error) {
          this.apiErrorMessage(error);
        } finally {
          this.isFetchingMunicipality = false;
        }
      },
      async fetchBarangay(selected) {
        if (this.isFetchingBarangay) {
          return;
        }
        this.isFetchingBarangay = true;
        this.barangay = [];
        try {
          const { data } = await this.$axios.get(
            `/api/barangay/barangay/list?regioncode=${this.formData.region.regioncode}&provincecode=${this.formData.province.provincecode}&municipalitycode=${selected.municipalitycode}`,
          );
          this.barangay = data.data;          
        } catch (error) {
          this.apiErrorMessage(error);
        } finally {
          this.isFetchingBarangay = false;
        }
      },

      async fetchUserBarangay(selected) {
        if (this.isFetchingBarangay) {
          return;
        }
        this.isFetchingBarangay = true;
        this.barangay = [];
        try {
          const { data } = await this.$axios.get(
            `/api/bdrrmf/barangay/list?regioncode=${this.formData.region.regioncode}&provincecode=${this.formData.province.provincecode}&municipalitycode=${selected.municipalitycode}&user_id=${this.authUser.id}`,
          );
          this.barangay = data.data;          
        } catch (error) {
          this.apiErrorMessage(error);
        } finally {
          this.isFetchingBarangay = false;
        }
      },
  
      close() {
        this.$emit('toggle');
        this.$refs.form.resetValidation();
        this.formData = JSON.parse(this.defaultFormData);
        this.populateAddress();
      },
  
      async onSave() {
        if (this.isSaving) {
          return;
        }      
        const validated = this.$refs.form.validate();
        
        if (validated) {
          this.isSaving = true;
          try {
            const { psgcCode, id, barangay } = this.formData.barangay;
            // Map nested properties to concise names for clarity
            const {
              municipality: { municipality },
              province: { province },
              region: { region },
            } = this.formData;

            // Update the formData with extracted values
            this.formData = {
              ...this.formData,
              municipality,
              province,
              region,
              location_code: psgcCode,
              barangay_id: id,
              barangay,
            };
            
            // Deep clone formData to avoid mutability issues
            const formDataClone = structuredClone(this.formData); // Modern approach for deep cloning
            const { data } = this.isEditMode
              ? await this.$axios.patch(
                  `/api/bdrrmf/update/${formDataClone.id}`,
                  formDataClone,
                )
              : await this.$axios.post('/api/bdrrmf/create', formDataClone);
            this.$emit('success', data);
            this.close();
            this.systemInfoMessage('User saved.', 'mdi-check');
          } catch (error) {
            console.log(error);
  
            this.apiErrorMessage(error);
          } finally {
            this.isSaving = false;
          }
        }
      },
      async populateAddress(){
        
        await this.fetchRegion();
        
        const reg = this.regions.find(
          item => item.region === this.authUser.region,
        );
        
        if (reg) {
          this.formData.region = reg;
          await this.fetchProvinces(reg);
        }
        
        const prov = this.province?.find(
          item => item.province === this.authUser.province,
        );
        if (prov) {
          this.formData.province = prov;
          await this.fetchMunicipalities(prov);
        }
        const mun = this.municipality?.find(
          item => item.municipality === this.authUser.municipality,
        );
        if (mun) {
          this.formData.municipality = mun;
          await this.fetchUserBarangay(mun);
        }
        
      },
    },
  };
  </script>
  
  <style></style>
  