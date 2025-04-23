<template>
  <v-dialog
    v-model="dialog"
    scrollable
    max-width="800"
    :fullscreen="$vuetify.breakpoint.mobile">
    <v-card>
      <v-card-title class="primary--text">
        <h4>Quality Indicators</h4>
        <v-spacer />
        <v-btn icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text class="py-4">
        <v-simple-table class="table-stripe">
          <thead>
            <tr>
              <th style="width: 120px">Indicator Code</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="section in Object.keys(assessmentForm)" :key="section">
              <td class="text-center">
                {{ assessmentForm[section].category }}
              </td>
              <td>{{ assessmentForm[section].text }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card-text>
      <v-divider />
      <v-card-actions class="mx-2">
        <v-spacer />
        <v-btn text @click="close"> OK </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import globalMixin from '~/mixins/global.js';

export default {
  name: 'ReportScoreCardQualityIndicator',
  mixins: [globalMixin],
  props: {
    open: {
      type: Boolean,
    },
  },

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

  methods: {
    close() {
      this.$emit('toggle');
    },
  },
};
</script>

<style></style>
