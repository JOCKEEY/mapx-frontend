<template>
  <v-dialog
    v-model="dialog"
    scrollable
    max-width="600"
    persistent
    :fullscreen="$vuetify.breakpoint.mobile">
    <v-card :loading="isFetching">
      <v-card-title class="primary--text">
        <h4>Select Region</h4>
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
          :items="regions" />
      </v-card-text>
      <v-divider />
      <v-card-actions class="mx-2">
        <v-btn color="primary" icon :loading="isFetching" @click="fetchData">
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
  name: 'ReportPickerRegion',
  mixins: [globalMixin],
  props: {
    open: {
      type: Boolean,
    },
  },

  data: () => ({
    isFetching: false,
    regions: [],
    region: null,
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
    this.fetchData();
  },

  methods: {
    close() {
      this.$emit('toggle');
    },

    async fetchData() {
      if (this.isFetching) {
        return;
      }
      this.isFetching = true;
      try {
        const { data } = await this.$axios.get('/api/barangay/region/list');
        this.regions = data?.data || [];
      } catch (error) {
        this.apiErrorMessage(error);
      } finally {
        this.isFetching = false;
      }
    },

    onClickOK() {
      if (this.region) {
        this.$emit('selected', this.region);
      }
    },
  },
};
</script>

<style></style>
