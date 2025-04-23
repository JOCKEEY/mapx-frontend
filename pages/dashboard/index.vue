<template>
  <v-sheet class="pa-5">
    <v-sheet class="d-flex align-center mb-5">
      <v-sheet :width="isMobile ? '100%' : 200" class="mr-0 mr-2">
        <v-select
          v-model="year"
          label="Year"
          hide-details
          dense
          outlined
          :loading="isFetchingYearList"
          :items="yearList" />
      </v-sheet>
      <v-btn color="primary" @click="onToggleScorecardModal">
        <v-icon left>mdi-file-chart</v-icon>
        View Scorecard
      </v-btn>
    </v-sheet>
    <v-row>
      <v-col cols="6" sm="3">
        <v-card :loading="isFetchingCountryData">
          <v-card-title class="justify-center">Total Assessed</v-card-title>
          <v-divider />
          <v-card-text class="text-center">
            <v-progress-circular
              color="blue"
              :rotate="360"
              :size="120"
              :width="20"
              :value="(totalAssessed / totalBrgy) * 100">
              <span class="blue--text text-h6">
                {{ ((totalAssessed / totalBrgy) * 100).toFixed(2) }}%
              </span>
            </v-progress-circular>
          </v-card-text>
          <v-divider />
          <v-card-text>
            <span>
              {{ formatNumber(totalAssessed) }} out of
              {{ formatNumber(totalBrgy) }}
            </span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6" sm="3">
        <v-card :loading="isFetchingCountryData">
          <v-card-title class="justify-center green white--text">
            High
          </v-card-title>
          <v-divider />
          <v-card-text class="text-center">
            <v-progress-circular
              color="green"
              :rotate="360"
              :size="120"
              :width="20"
              :value="(totalHigh / totalAssessed) * 100">
              <span class="text-h6">
                {{ ((totalHigh / totalAssessed) * 100).toFixed(2) }}%
              </span>
            </v-progress-circular>
          </v-card-text>
          <v-divider />
          <v-card-text>
            <span> No. of Baragay: {{ formatNumber(totalHigh) }} </span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6" sm="3">
        <v-card :loading="isFetchingCountryData">
          <v-card-title class="justify-center yellow">Medium</v-card-title>
          <v-divider />
          <v-card-text class="text-center">
            <v-progress-circular
              color="yellow"
              :rotate="360"
              :size="120"
              :width="20"
              :value="(totalMedium / totalAssessed) * 100">
              <span class="black--text text-h6">
                {{ ((totalMedium / totalAssessed) * 100).toFixed(2) }}%
              </span>
            </v-progress-circular>
          </v-card-text>
          <v-divider />
          <v-card-text>
            <span> No. of Baragay: {{ formatNumber(totalMedium) }} </span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6" sm="3">
        <v-card :loading="isFetchingCountryData">
          <v-card-title class="justify-center red white--text">
            Low
          </v-card-title>
          <v-divider />
          <v-card-text class="text-center">
            <v-progress-circular
              color="red"
              :rotate="360"
              :size="120"
              :width="20"
              :value="(totalLow / totalAssessed) * 100">
              <span class="text-h6">
                {{ ((totalLow / totalAssessed) * 100).toFixed(2) }}%
              </span>
            </v-progress-circular>
          </v-card-text>
          <v-divider />
          <v-card-text>
            <span> No. of Baragay: {{ formatNumber(totalLow) }} </span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title>Regions</v-card-title>
          <apex-chart
            type="bar"
            :height="440"
            :options="regionChartOptions"
            :series="regionChartSeries" />
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card :loading="isFetchingSubmissionData">
          <!-- <v-card-title>
            <v-sheet :width="isMobile ? '100%' : 200">
              <v-select
                v-model="year"
                label="Year"
                item-text="year"
                item-value="year"
                hide-details
                dense
                outlined
                :loading="isFetchingYearList"
                :items="yearList"
                @change="fetchSubmissionData" />
            </v-sheet>
          </v-card-title> -->
          <div class="pt-3">
            <apex-chart
              type="line"
              :height="440"
              :options="submissionChartOptions"
              :series="submissionChartSeries" />
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="showScoreCardModal" fullscreen scrollable>
      <v-card>
        <v-card-title>
          <span>Scorecard</span>
          <v-spacer />
          <v-icon @click="onToggleScorecardModal">mdi-close</v-icon>
        </v-card-title>
        <v-divider />
        <v-card-text>
          <ReportScoreCard />
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="onToggleScorecardModal">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-sheet>
</template>

<script>
import globalMixin from '~/mixins/global.js';
const DEFAULT_CHART_OPTIONS = {
  theme: {
    mode: 'light',
    palette: 'palette1',
    monochrome: {
      enabled: false,
      color: '#255aee',
      shadeTo: 'light',
      shadeIntensity: 0.65,
    },
  },
};

export default {
  name: 'DashboardPage',
  mixins: [globalMixin],
  data: () => ({
    countryData: [],
    isFetchingCountryData: false,
    totalBrgy: 0,
    showScoreCardModal: false,
    isFetchingSubmissionData: false,
    submissions: [],
    yearList: [],
    year: new Date().getFullYear(),
    isFetchingYearList: false,
  }),

  computed: {
    totalAssessed() {
      return this.countryData.reduce((c, n) => c + n.totalAssessed, 0) || 0;
    },

    totalHigh() {
      return this.countryData.reduce((c, n) => c + n.high, 0) || 0;
    },

    totalMedium() {
      return this.countryData.reduce((c, n) => c + n.medium, 0) || 0;
    },

    totalLow() {
      return this.countryData.reduce((c, n) => c + n.low, 0) || 0;
    },

    regionTableHeader() {
      return [
        {
          text: 'Region',
          value: 'region',
        },
        {
          text: 'High',
          value: 'high',
        },
        {
          text: 'Medium',
          value: 'medium',
        },
        {
          text: 'Low',
          value: 'low',
        },
        {
          text: 'No Assessment',
          value: 'nodata',
        },
      ];
    },

    regionChartOptions() {
      return {
        ...DEFAULT_CHART_OPTIONS,
        title: {
          text: 'No. of Barangay',
          align: 'center',
          floating: true,
        },
        chart: {
          id: 'country-summary',
          toolbar: {
            show: false,
          },
          stacked: true,
        },
        xaxis: {
          categories: this.countryData.map(record => record.region),
        },
        colors: ['#388E3C', '#FFEA00', '#D32F2F'],
        dataLabels: {
          style: {
            colors: ['#ffffff', '#000000', '#ffffff'],
          },
        },
      };
    },

    regionChartSeries() {
      const high = [];
      const medium = [];
      const low = [];
      this.countryData.forEach(record => {
        high.push(record.high);
        medium.push(record.medium);
        low.push(record.low);
      });

      return [
        {
          name: 'High',
          data: high,
        },
        {
          name: 'Medium',
          data: medium,
        },
        {
          name: 'Low',
          data: low,
        },
      ];
    },

    submissionChartOptions() {
      const totalSubmission = this.submissions.reduce(
        (c, n) => c + +n.total_submission,
        0,
      );
      return {
        ...DEFAULT_CHART_OPTIONS,
        title: {
          text: 'No. of Submissions per Month - ' + (this.year || 'Latest'),
          align: 'center',
          floating: true,
        },
        subtitle: {
          text: 'Total Submission: ' + this.formatNumber(totalSubmission),
          align: 'center',
        },
        chart: {
          id: 'submission-summary',
          toolbar: {
            show: false,
          },
          stacked: true,
        },
        xaxis: {
          categories: this.monthNames,
        },
        colors: ['#388E3C', '#FFEA00', '#D32F2F'],
      };
    },

    submissionChartSeries() {
      const data = [];

      this.monthNames.forEach((month, i) => {
        const submission = this.submissions.find(
          record => record.month - 1 === i,
        );
        if (submission) {
          data.push(+submission.total_submission);
        } else {
          data.push(0);
        }
      });

      return [
        {
          name: 'Submissions',
          data,
        },
      ];
    },
  },

  watch: {
    year() {
      this.fetchCountryData();
      this.fetchSubmissionData();
    },
  },

  beforeMount() {
    this.$store.dispatch('setPageTitle', 'Dashboard');
    this.fetchAssessedYearsData();
    this.fetchCountryData();
    this.fetchSubmissionData();
  },

  methods: {
    async fetchCountryData() {
      if (this.isFetchingCountryData) {
        return;
      }
      this.isFetchingCountryData = true;
      try {
        const { data } = await this.$axios.get(
          `/api/qas-form/report/scorecard/country?year=${this.year}`,
        );
        const _forms = data?.data || [];
        this.totalBrgy = +data?.total?.barangay || 0;
        this.countryData = _forms.map(record => ({
          ...record,
          totalAssessed: +record.high + +record.medium + +record.low,
          total_brgy:
            +record.high + +record.medium + +record.low + +record.nodata,
          high: +record.high,
          medium: +record.medium,
          low: +record.low,
          nodata: +record.nodata,
        }));
      } catch (error) {
        this.apiErrorMessage(error);
      } finally {
        this.isFetchingCountryData = false;
      }
    },

    async fetchSubmissionData() {
      if (this.isFetchingSubmissionData) {
        return;
      }
      this.isFetchingSubmissionData = true;
      try {
        const { data } = await this.$axios.get(
          `/api/qas-form/submissions/count/${
            this.year || this.yearList[1].value
          }`,
        );
        this.submissions = data?.data || [];
      } catch (error) {
        this.apiErrorMessage(error);
      } finally {
        this.isFetchingSubmissionData = false;
      }
    },

    async fetchAssessedYearsData() {
      if (this.isFetchingYearList) {
        return;
      }
      this.isFetchingYearList = true;
      try {
        const { data } = await this.$axios.get(`/api/qas-form/year/list`);
        const _yearList = (data?.data || []).map(record => ({
          text: record.year,
          value: record.year,
        }));
        this.yearList = [{ text: 'Latest', value: null }, ..._yearList];
      } catch (error) {
        this.apiErrorMessage(error);
      } finally {
        this.isFetchingYearList = false;
      }
    },

    onToggleScorecardModal() {
      this.showScoreCardModal = !this.showScoreCardModal;
    },
  },
};
</script>
<style lang="scss" scoped></style>
