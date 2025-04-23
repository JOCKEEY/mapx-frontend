<template>
  <v-sheet>
    <v-card flat>
      <v-card-title>BDRRMP QUALITY ASSESSMENT SCORECARD </v-card-title>
      <v-card-text>
        <v-sheet class="d-flex align-center mb-5">
          <v-sheet class="mr-2" width="200">
            <v-select
              v-model="category"
              label="Choose category"
              outlined
              dense
              hide-details
              :items="reportCategoryList" />
          </v-sheet>
          <v-btn color="primary" height="42" @click="onClickGetScoreCard">
            Get Scorecard
            <v-icon right>mdi-chevron-right</v-icon>
          </v-btn>
        </v-sheet>
        <v-alert
          v-if="scoreCardIndex === null"
          class="pa-5"
          border="top"
          colored-border
          type="info"
          elevation="2">
          <h5 class="text-h5">
            Please choose a category to view the scorecard.
          </h5>
        </v-alert>
        <v-sheet v-if="scoreCardIndex === 0">
          <ReportScoreCardCountry @region:click="onRegionClick" />
        </v-sheet>
        <v-sheet v-if="scoreCardIndex === 1">
          <ReportScoreCardRegion
            :region="selectedRegion"
            @province:click="onProvinceClick" />
        </v-sheet>
        <v-sheet v-if="scoreCardIndex === 2">
          <ReportScoreCardProvince
            :region="selectedRegion"
            :province="selectedProvince"
            @municipality:click="onMunicipalityClick" />
        </v-sheet>
        <v-sheet v-if="scoreCardIndex === 3">
          <ReportScoreCardMunicipality
            :region="selectedRegion"
            :province="selectedProvince"
            :municipality="selectedMunicipality" />
        </v-sheet>
        <v-sheet v-if="scoreCardIndex === 4">
          <ReportScoreCardBarangay
            :region="selectedRegion"
            :province="selectedProvince"
            :municipality="selectedMunicipality"
            :barangay="selectedBarangay" />
        </v-sheet>
      </v-card-text>
    </v-card>
    <ReportPickerRegion
      :open="showRegionPicker"
      @toggle="$store.commit('scorecard/setShowRegionPicker', false)"
      @selected="onSelectRegion" />
    <ReportPickerProvince
      :open="showProvincePicker"
      @toggle="$store.commit('scorecard/setShowProvincePicker', false)"
      @selected="onSelectProvince" />
    <ReportPickerMunicipality
      :open="showMunicipalityPicker"
      @toggle="$store.commit('scorecard/setShowMunicipalityPicker', false)"
      @selected="onSelectMunicipality" />
  </v-sheet>
</template>

<script>
import { mapState } from 'vuex';
import globalMixin from '~/mixins/global.js';
export default {
  name: 'ReportScoreCard',
  mixins: [globalMixin],
  layout: 'public',
  data: () => ({
    reportCategoryList: [
      'County',
      'Region',
      'Province',
      'City/Municipality',
      // 'Barangay',
    ],
  }),

  computed: {
    ...mapState('scorecard', [
      'reportCategory',
      'scoreCardIndex',
      'showRegionPicker',
      'showProvincePicker',
      'showMunicipalityPicker',
      'showBarangayPicker',
      'selectedRegion',
      'selectedProvince',
      'selectedMunicipality',
      'selectedBarangay',
    ]),

    category: {
      get() {
        return this.reportCategory;
      },
      set(value) {
        this.$store.commit('scorecard/setReportCategory', value);
      },
    },
  },

  methods: {
    onClickGetScoreCard() {
      if (this.reportCategory !== null) {
        const scoreIndex = this.reportCategoryList.indexOf(this.reportCategory);
        switch (scoreIndex) {
          case 1:
            this.$store.commit('scorecard/setShowRegionPicker', true);
            break;
          case 2:
            this.$store.commit('scorecard/setShowProvincePicker', true);
            break;
          case 3:
            this.$store.commit('scorecard/setShowMunicipalityPicker', true);
            break;
          default:
            this.showScoreCard();
        }
      } else {
        this.apiErrorMessage(
          'Please select a category and year to display the scorecard',
        );
      }
    },

    showScoreCard() {
      const index = this.reportCategoryList.indexOf(this.reportCategory);
      this.$store.commit('scorecard/setScorecardIndex', index);
    },

    onSelectRegion(region) {
      this.$store.commit('scorecard/setSelectedRegion', region);
      this.$store.commit('scorecard/setShowRegionPicker', false);
      this.showScoreCard();
    },

    onSelectProvince({ region, province }) {
      this.$store.commit('scorecard/setSelectedRegion', region);
      this.$store.commit('scorecard/setSelectedProvince', province);
      this.$store.commit('scorecard/setShowProvincePicker', false);
      this.showScoreCard();
    },

    onSelectMunicipality({ region, province, municipality }) {
      this.$store.commit('scorecard/setSelectedRegion', region);
      this.$store.commit('scorecard/setSelectedProvince', province);
      this.$store.commit('scorecard/setSelectedMunicipality', municipality);
      this.$store.commit('scorecard/setShowMunicipalityPicker', false);
      this.showScoreCard();
    },

    onRegionClick({ region, regioncode }) {
      this.$store.commit('scorecard/setSelectedRegion', { region, regioncode });
      this.category = this.reportCategoryList[1];
      this.$store.commit('scorecard/setScorecardIndex', 1);
    },

    onProvinceClick({ province, provincecode }) {
      this.$store.commit('scorecard/setSelectedProvince', {
        province,
        provincecode,
      });
      this.category = this.reportCategoryList[2];
      this.$store.commit('scorecard/setScorecardIndex', 2);
    },

    onMunicipalityClick({ municipality, municipalitycode }) {
      this.$store.commit('scorecard/setSelectedMunicipality', {
        municipality,
        municipalitycode,
      });
      this.category = this.reportCategoryList[3];
      this.$store.commit('scorecard/setScorecardIndex', 3);
    },
  },
};
</script>
