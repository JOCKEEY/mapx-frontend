<template>
  <v-dialog
    v-model="dialog"
    scrollable
    max-width="600"
    persistent
    :fullscreen="$vuetify.breakpoint.mobile">
    <v-card :loading="isFetchingRegion">
      <v-card-title class="primary--text">
        <h4>Select Municipality</h4>
        <v-spacer />
        <v-btn icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text class="py-4">
        <v-select
          v-model="region"
          label="Region"
          return-object
          item-text="region"
          clearable
          :items="regions"
          @change="fetchProvinces" />
        <v-select
          v-model="province"
          label="Province"
          return-object
          item-text="province"
          clearable
          :items="provinces"
          @change="fetchMunicipalities" />
        <v-select
          v-model="municipality"
          label="Municipality"
          return-object
          item-text="municipality"
          clearable
          :items="municipalities" />
      </v-card-text>
      <v-divider />
      <v-card-actions class="mx-2">
        <v-btn
          color="primary"
          icon
          :loading="isFetchingRegion"
          @click="fetchRegion">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
        <v-spacer />
        <v-btn color="primary" @click="onClickOK"> OK </v-btn>
        <v-btn text @click="close"> Cancel </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import globalMixin from '~/mixins/global.js';

export default {
  name: 'ReportPickerMunicipality',
  mixins: [globalMixin],
  props: {
    open: {
      type: Boolean,
    },
    optional: {
      type: Boolean,
    },
  },

  data: () => ({
    isFetchingRegion: false,
    isFetchingProvince: false,
    isFetchingMunicipality: false,
    regions: [],
    provinces: [],
    municipalities: [],
    region: null,
    province: null,
    municipality: null,
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
  },

  created() {
    this.fetchRegion();
  },

  methods: {
    close() {
      this.$emit('toggle');
    },

    async fetchRegion() {
      if (this.isFetchingRegion) {
        return;
      }
      this.isFetchingRegion = true;
      try {
        const { data } = await this.$axios.get('/api/barangay/region/list');
        this.regions = data?.data || [];
      } catch (error) {
        this.apiErrorMessage(error);
      } finally {
        this.isFetchingRegion = false;
      }
    },

    async fetchProvinces() {
      if (this.isFetchingProvince || !this.region) {
        return;
      }
      this.isFetchingProvince = true;
      this.provinces = [];
      this.province = null;
      try {
        const { data } = await this.$axios.get(
          `/api/barangay/province/list?regioncode=${this.region.regioncode}`,
        );
        this.provinces = data?.data || [];
      } catch (error) {
        this.apiErrorMessage(error);
      } finally {
        this.isFetchingProvince = false;
      }
    },

    async fetchMunicipalities() {
      if (this.isFetchingMunicipality || !this.province) {
        return;
      }
      this.isFetchingMunicipality = true;
      this.municipalities = [];
      this.municipality = null;
      try {
        const { data } = await this.$axios.get(
          `/api/barangay/municipality/list?regioncode=${this.region.regioncode}&provincecode=${this.province.provincecode}`,
        );
        this.municipalities = data?.data || [];
      } catch (error) {
        this.apiErrorMessage(error);
      } finally {
        this.isFetchingMunicipality = false;
      }
    },

    onClickOK() {
      if (
        this.optional ||
        (this.region && this.province && this.municipality)
      ) {
        this.$emit('selected', {
          region: this.region,
          province: this.province,
          municipality: this.municipality,
        });
      }
    },
  },
};
</script>

<style></style>
