<template>
  <v-dialog
    v-model="dialog"
    scrollable
    max-width="600"
    persistent
    :fullscreen="$vuetify.breakpoint.mobile">
    <v-card :loading="isFetchingRegion">
      <v-card-title class="primary--text">
        <h4>Select Province</h4>
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
          :items="regions"
          @change="fetchProvinces" />
        <v-select
          v-model="province"
          label="Province"
          return-object
          item-text="province"
          :items="provinces" />
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
  name: 'ReportPickerProvince',
  mixins: [globalMixin],
  props: {
    open: {
      type: Boolean,
    },
  },

  data: () => ({
    isFetchingRegion: false,
    isFetchingProvince: false,
    regions: [],
    provinces: [],
    region: null,
    province: null,
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
      if (this.isFetchingProvince) {
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

    onClickOK() {
      if (this.region && this.province) {
        this.$emit('selected', {
          region: this.region,
          province: this.province,
        });
      }
    },
  },
};
</script>

<style></style>
