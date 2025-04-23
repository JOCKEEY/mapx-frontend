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
                v-model="formData.username"
                :rules="requiredRule"
                label="Username"
                required
                dense
                outlined
                hide-details />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="formData.password"
                :rules="passwordRules"
                label="Password"
                required
                outlined
                dense
                hide-details
                type="password" />
              <v-progress-linear
                :value="passwordProgress"
                :color="passwordProgressColor"
                dense
                height="4"
                class="mt-1" />
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
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="formData.email"
                :rules="emailRules"
                label="E-mail"
                required
                dense
                outlined
                hide-details />
            </v-col>
            <v-col v-if="!userAdmin" cols="12">
              <span class="subtitle-1">Permissions:</span>
              <v-sheet class="d-flex align-center">
                <v-autocomplete
                  v-model="formData.permissions"
                  outlined
                  dense
                  chips
                  small-chips
                  multiple
                  hide-details
                  item-text="title"
                  item-value="id"
                  deletable-chips
                  :loading="isFetchingPermission"
                  :items="permissionList">
                  <template #item="{ item }">
                    <v-list-item-content>
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                      <v-list-item-subtitle>{{
                        item.description
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </v-autocomplete>
                <v-btn
                  icon
                  :loading="isFetchingPermission"
                  @click="fetchPermissions">
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </v-sheet>
            </v-col>
          </v-row>
          <v-row v-if="userAdmin">
            <v-col cols="12">
              <v-select
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
              <v-select
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
                label="Municipality"
                @change="fetchBarangay" />
            </v-col>
            <v-col cols="12">
              <span class="subtitle-1">Barangay:</span>
              <v-sheet class="d-flex align-center">
                <v-autocomplete
                  v-model="formData.barangay"
                  outlined
                  dense
                  chips
                  small-chips
                  multiple
                  hide-details
                  item-text="barangay"
                  item-value="id"
                  deletable-chips
                  :loading="isFetchingBarangay"
                  :items="barangay">
                  <template #item="{ item }">
                    <v-list-item-content>
                      <v-list-item-title>{{ item.barangay }}</v-list-item-title>
                    </v-list-item-content>
                  </template>
                </v-autocomplete>
                <v-btn
                  icon
                  :loading="isFetchingBarangay"
                  @click="fetchBarangay">
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
                <v-btn
                  icon
                  :disabled="!barangay.length"
                  @click="toggleSelectAll">
                  <v-icon>{{
                    isAllSelected
                      ? 'mdi-checkbox-multiple-marked'
                      : 'mdi-checkbox-blank-outline'
                  }}</v-icon>
                </v-btn>
              </v-sheet>
            </v-col>
          </v-row>

          <v-checkbox
            v-model="formData.isOversight"
            label="Is Oversight User"
            messages="Check if this user is from an oversight agency" />

          <v-checkbox
            v-model="formData.isActive"
            label="Is Active User"
            messages="Uncheck to disable this user account." />

          <v-checkbox
            v-if="!userAdmin"
            v-model="formData.isAdmin"
            label="Is Admin"
            messages="Administrator account" />
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
  name: 'UserFormModal',
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
      passwordLength: 6,
      formData: {
        id: null,
        username: '',
        name: '',
        email: '',
        password: '',
        isActive: true,
        permissions: [],
        isAdmin: false,
        region: null,
        province: null,
        municipality: null,
        barangay: null,
        isOversight: true,
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
    isAllSelected() {
      return (
        Array.isArray(this.formData.barangay) &&
        this.formData.barangay.length === this.barangay.length
      );
    },
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

    passwordRules() {
      return [
        v => this.isEditMode || !!v || 'Password is required',
        v =>
          this.isEditMode ||
          (v && v.length >= 6) ||
          'Password must be greater than 5 characters',
      ];
    },

    emailRules: () => [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],

    passwordProgress() {
      return Math.min(
        100,
        Math.ceil((this.formData.password.length / this.passwordLength) * 100),
      );
    },

    passwordProgressColor() {
      return ['error', 'warning', 'success'][
        Math.floor(this.passwordProgress / 40)
      ];
    },

    isEditMode() {
      return !!this.formData.id;
    },
  },

  watch: {
    async 'formData.region'() {
      const reg = this.regions.find(
        item => item.region === this.formData.region,
      );
      if (reg) {
        await this.fetchProvinces(reg,'watch');
      }

      const prov = this.province?.find(
        item => item.province === this.formData.province,
      );
      if (prov) {
        await this.fetchMunicipalities(prov,'watch');
      }
      const mun = this.municipality?.find(
        item => item.municipality === this.formData.municipality,
      );
      if (mun) {
        await this.fetchBarangay(mun,'watch');
      }
    },
    formValue(data) {
      if (data && this.open) {
        this.formData.region = null;
        this.formData.province = null;
        this.formData.municipality = null;
        this.formData.barangay = [];
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
  },

  created() {
    this.defaultFormData = JSON.stringify(this.formData);
    this.fetchPermissions();
    this.fetchRegion();
  },

  methods: {
    async fetchRegion() {
      try {
        this.formData.barangay = [];
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
    async fetchProvinces(selected,type) {
      if (type !== 'watch') {
        this.formData.province = null;
        this.formData.municipality = null;
        this.formData.province = null;
        this.formData.barangay = [];
      }

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
    async fetchMunicipalities(selected, type) {
      // this.formData.barangay = [];
      if (type !== 'watch') {
        this.formData.municipality = null;
        this.formData.barangay = [];
      }
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
    async fetchBarangay(selected, type) {
      if (type !== 'watch') {
        this.formData.barangay = [];
      }
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
    close() {
      this.$emit('toggle');
      this.$refs.form.resetValidation();
      this.formData = JSON.parse(this.defaultFormData);
    },

    async fetchPermissions() {
      if (this.isFetchingPermission) {
        return;
      }
      this.isFetchingPermission = true;
      try {
        const { data } = await this.$axios.get('/api/system/permission/list');
        this.permissionList = data.data;
      } catch (error) {
        this.apiErrorMessage(error);
      } finally {
        this.isFetchingPermission = false;
      }
    },

    async onSave() {
      if (this.isSaving) {
        return;
      }
      const validated = this.$refs.form.validate();

      if (validated) {
        this.isSaving = true;
        try {
          ['region', 'province', 'municipality'].forEach(field => {
            if (typeof this.formData[field] === 'string') {
              console.log(
                `Processing string for ${field}:`,
                this.formData[field],
              );
            } else if (
              typeof this.formData[field] === 'object' &&
              this.formData[field] !== null
            ) {
              this.formData[field] = this.formData[field][field];
            }
          });
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
    toggleSelectAll() {
      // Initialize `formData.barangay` to an empty array if it’s null
      if (!Array.isArray(this.formData.barangay)) {
        this.formData.barangay = [];
      }

      // Check if all items are selected, and toggle accordingly
      if (this.isAllSelected) {
        this.formData.barangay = [];
      } else {
        this.formData.barangay = this.barangay.map(item => item.id);
      }
    },
  },
};
</script>

<style></style>
