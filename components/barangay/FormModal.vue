<template>
  <v-dialog
    v-model="dialog"
    scrollable
    max-width="600"
    persistent
    :fullscreen="isMobile">
    <v-form ref="form" lazy-validation>
      <v-card :loading="isSaving">
        <v-card-title class="primary white--text">
          <h4>User</h4>
          <v-spacer />
          <v-btn icon @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider />
        <v-card-text class="py-4">
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="formData.region"
                :rules="requiredRule"
                label="Username"
                required
                dense
                outlined
                hide-details />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="formData.province"
                label="Password"
                required
                outlined
                dense
                hide-details />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="formData.name"
                :rules="requiredRule"
                label="Name"
                required
                dense
                outlined
                hide-details />
            </v-col>
            <v-col cols="12">
              <v-combobox
                v-model="formData.region"
                dense
                outlined
                hide-details
                return-object
                item-text="region"
                :items="regions"
                label="Region"
                @change="fetchProvinces" />
            </v-col>
            <v-col cols="6">
              <v-combobox
                v-model="formData.province"
                dense
                outlined
                hide-details
                return-object
                item-text="province"
                :items="province"
                label="Province"
                @change="fetchMunicipalities" />
            </v-col>
            <v-col cols="6">
              <v-select
                v-model="formData.municipality"
                dense
                outlined
                hide-details
                return-object
                item-text="municipality"
                :items="municipality"
                label="Municipality" />
            </v-col>
            <v-col cols="12">
              <span class="subtitle-1">Barangay:</span>
              <v-sheet class="d-flex align-center">
                <v-text-field
                  v-model="formData.barangay"
                  outlined
                  dense
                  hide-details
                  deletable-chips />
              </v-sheet>
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
  name: 'BarangayFormModal',
  mixins: [globalMixin],
  props: {
    open: {
      type: Boolean,
    },
    formValue: {
      type: Object,
      default: null,
    },
    userAdmin: {
      type: Boolean,
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
      if (data && this.open) {
        this.formData = {
          id: data.id,
          username: data.username,
          name: data.name,
          email: data.email,
          password: '',
          isActive: data.isActive,
          isOversight: data.isOversight,
          farmId: data.farmId,
          ldapUid: data.ldapUid,
          isAdmin: data.isAdmin,
          permissions: data.permissions
            ? data.permissions.map(record => record.id)
            : [],
          region: data.region,
          province: data.province,
          municipality: data.municipality,
          barangay: data.barangay ? data.barangay.map(record => record.id) : [],
        };
      }
    },
    async 'formData.region'() {
      const reg = this.regions.find(
        item => item.region === this.formData.region,
      );
      if (reg) {
        await this.fetchProvinces(reg);
      }
      const prov = this.province?.find(
        item => item.province === this.formData.province,
      );
      if (prov) {
        await this.fetchMunicipalities(prov);
      }
    },
  },

  created() {
    this.defaultFormData = JSON.stringify(this.formData);
    this.fetchPermissions();
    this.fetchRegion();
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

    close() {
      this.$emit('toggle');
      this.$refs.form.resetValidation();
      this.formData = JSON.parse(this.defaultFormData);
    },

    async onSave() {
      if (this.isSaving) {
        return;
      }
      const validated = this.$refs.form.validate();

      if (validated) {
        this.isSaving = true;
        try {
          const formData = JSON.parse(JSON.stringify(this.formData));

          if (this.isEditMode && !formData.password) {
            delete formData.password;
          }
          const { data } = this.isEditMode
            ? await this.$axios.patch(
                `/api/user/update/${formData.id}`,
                formData,
              )
            : await this.$axios.post('/api/user/create', formData);
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
  },
};
</script>

<style></style>
