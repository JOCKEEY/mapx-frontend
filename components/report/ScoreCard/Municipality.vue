<template>
  <v-card flat :loading="isFetching">
    <v-sheet class="d-block d-sm-flex justify-space-between">
      <v-sheet class="" max-width="600">
        <v-row no-gutters>
          <v-col cols="4" class="font-weight-bold">
            <h6 class="text-h6">Municipality:</h6>
          </v-col>
          <v-col cols="8">
            <h6 class="text-h6">
              {{ municipalityName }}
            </h6>
          </v-col>
          <v-col cols="4" class="font-weight-bold">
            <h6 class="subtitle-2">Province:</h6>
          </v-col>
          <v-col cols="8">
            <h6 class="subtitle-2">
              <a href="#" @click.prevent="onProvinceClick">
                {{ provinceName }}
              </a>
            </h6>
          </v-col>
          <v-col cols="4" class="font-weight-bold">
            <h6 class="subtitle-2">Region:</h6>
          </v-col>
          <v-col cols="8">
            <h6 class="subtitle-2">
              <a href="#" @click.prevent="onRegionClick">
                {{ regionName }}
              </a>
            </h6>
          </v-col>
          <v-col cols="4" class="font-weight-bold">
            Total No. of Barangays:
          </v-col>
          <v-col cols="8">
            {{ formatNumber(totalBrgy) }}
          </v-col>
          <v-col cols="4" class="font-weight-bold">
            No. of Barangays Assessed:
          </v-col>
          <v-col cols="8">
            {{ formatNumber(totalAssessed) }}
          </v-col>
          <v-col cols="4" class="font-weight-bold">
            % of Barangays Assessed:
          </v-col>
          <v-col cols="8">
            <v-progress-linear
              height="18"
              :value="(totalAssessed / totalBrgy) * 100">
              <template #default="{ value }">
                <strong>{{ value.toFixed(2) }}%</strong>
              </template>
            </v-progress-linear>
          </v-col>
        </v-row>
      </v-sheet>
      <v-spacer />
      <v-sheet>
        <v-sheet class="px-4">
          <v-btn
            small
            color="blue darken-2"
            dark
            height="36"
            title="Information"
            @click="onToggleQualityIndicatorModal">
            <v-icon>mdi-information</v-icon>
          </v-btn>
          <v-btn
            small
            color="yellow darken-3"
            dark
            height="36"
            title="Export CSV"
            @click="onExportCSV">
            <v-icon>mdi-file-export-outline</v-icon>
          </v-btn>
          <v-btn
            small
            color="red darken-2"
            dark
            height="36"
            title="Print PDF"
            @click="onExportPDF">
            <v-icon>mdi-file-pdf-box</v-icon>
          </v-btn>
        </v-sheet>
        <v-card flat min-width="400">
          <v-card-title>
            <v-icon left>mdi-list-box</v-icon>
            Summary
          </v-card-title>
          <v-card-text>
            <v-sheet outlined>
              <v-simple-table class="summary-table" dense>
                <thead>
                  <tr>
                    <th>Quality Levels</th>
                    <th>Barangays</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="green">High</td>
                    <td class="green">
                      {{ totalHigh }}
                    </td>
                  </tr>
                  <tr>
                    <td class="yellow">Medium</td>
                    <td class="yellow">{{ totalMedium }}</td>
                  </tr>
                  <tr>
                    <td class="red lighten-2">Low</td>
                    <td class="red lighten-2">{{ totalLow }}</td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td class="font-weight-bold">
                      {{ totalHigh + totalMedium + totalLow }}
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-sheet>
          </v-card-text>
        </v-card>
      </v-sheet>
    </v-sheet>
    <v-card outlined>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          placeholder="Search province..."
          single-line
          hide-details />
        <v-sheet class="ml-0 ml-sm-2" width="140">
          <v-select
            v-model="qualityLevel"
            label="Quality Level"
            hide-details
            clearable
            :items="['High', 'Medium', 'Low']" />
        </v-sheet>
      </v-card-title>
      <v-simple-table ref="scoretable">
        <thead>
          <tr>
            <th rowspan="2">Barangay</th>
            <th rowspan="2">Years Covered</th>
            <th rowspan="2">Assessment Date</th>
            <th colspan="12" class="text-center">
              Count of Barangays by Quality Indicator
            </th>
            <th colspan="2">Quality</th>
          </tr>
          <tr>
            <th>A1</th>
            <th>A2</th>
            <th>B1</th>
            <th>B2</th>
            <th>C1</th>
            <th>D1</th>
            <th>E1</th>
            <th>F1</th>
            <th>G1</th>
            <th>H1</th>
            <th>I1</th>
            <th>I2</th>
            <th>Total Score</th>
            <th>Quality Level</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(form, i) in filteredForms">
            <tr :key="'location-' + i">
              <td>
                <a
                  class="text-decoration-none"
                  href="#"
                  @click.prevent="onBarangayClick(form)">
                  {{ form.barangay }}
                </a>
              </td>
              <td>{{ form.years_covered }}</td>
              <td>{{ formatDate(form.date_assessed) }}</td>
              <td v-for="field in scoreGroup" :key="field + i">
                {{ formatNumber(form[field]) }}
              </td>
              <td class="text-center">
                <v-sheet
                  :class="{
                    green: form.qualityLevel === 'high',
                    yellow: form.qualityLevel === 'medium',
                    'red lighten-2': form.qualityLevel === 'low',
                  }">
                  {{ form.total_score }}
                </v-sheet>
              </td>
              <td class="text-center">
                <v-chip v-if="+form.total_score > 30" color="green">
                  HIGH
                </v-chip>
                <v-chip v-else-if="+form.total_score > 20" color="yellow">
                  MEDIUM
                </v-chip>
                <v-chip v-else color="red lighten-2"> LOW </v-chip>
              </td>
            </tr>
          </template>
        </tbody>
      </v-simple-table>
    </v-card>
    <ReportScoreCardQualityIndicator
      :open="showQltyIndicatorModal"
      @toggle="onToggleQualityIndicatorModal" />
  </v-card>
</template>

<script>
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import qs from 'qs';
import globalMixin from '~/mixins/global.js';
export default {
  name: 'ReportScoreCardMunicipality',
  mixins: [globalMixin],
  props: {
    region: {
      type: Object,
      default: () => ({
        region: null,
        regioncode: null,
      }),
    },
    province: {
      type: Object,
      default: () => ({
        province: null,
        provincecode: null,
      }),
    },
    municipality: {
      type: Object,
      default: () => ({
        municipality: null,
        municipalitycode: null,
      }),
    },
  },
  data: () => ({
    forms: [],
    tab: null,
    isFetching: false,
    search: null,
    scoreGroup: [
      'a1_score',
      'a2_score',
      'b1_score',
      'b2_score',
      'c1_score',
      'd1_score',
      'e1_score',
      'f1_score',
      'g1_score',
      'h1_score',
      'i1_score',
      'i2_score',
    ],
    totalBrgy: 0,
    qualityLevel: '',
    showQltyIndicatorModal: false,
  }),

  computed: {
    filteredForms() {
      if (this.search) {
        return this.forms.filter(
          record => record.barangay.search(new RegExp(this.search, 'i')) !== -1,
        );
      }

      if (this.qualityLevel) {
        return this.forms.filter(
          record => record.qualityLevel === this.qualityLevel.toLowerCase(),
        );
      }
      return this.forms;
    },

    qualityLevelHeader() {
      return [
        {
          text: 'Barangay',
          value: 'barangay',
        },
        {
          text: 'HIGH',
          value: 'high',
        },
        {
          text: 'MEDIUM',
          value: 'medium',
        },
        {
          text: 'LOW',
          value: 'low',
        },
        {
          text: 'Total',
          value: 'total_brgy',
        },
      ];
    },

    totalAssessed() {
      return this.forms.reduce((c, n) => c + +n.high + +n.medium + +n.low, 0);
    },

    totalHigh() {
      return this.forms.reduce((c, n) => c + +n.high, 0);
    },

    totalMedium() {
      return this.forms.reduce((c, n) => c + +n.medium, 0);
    },

    totalLow() {
      return this.forms.reduce((c, n) => c + +n.low, 0);
    },

    regionCode() {
      return this.region?.regioncode || null;
    },

    regionName() {
      return this.region?.region || null;
    },

    provinceName() {
      return this.province?.province || null;
    },

    provinceCode() {
      return this.province?.provincecode || null;
    },

    municipalityName() {
      return this.municipality?.municipality || null;
    },

    municipalityCode() {
      return this.municipality?.municipalitycode || null;
    },
  },

  watch: {
    municipality: {
      deep: true,
      handler() {
        this.fetchData();
      },
    },
  },

  created() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      if (this.isFetching) {
        return;
      }
      this.isFetching = true;
      try {
        const params = qs.stringify({
          regioncode: this.regionCode,
          provincecode: this.provinceCode,
          municipalitycode: this.municipalityCode,
        });
        const { data } = await this.$axios.get(
          `/api/qas-form/report/scorecard/municipality?${params}`,
        );
        const _forms = data?.data || [];
        this.totalBrgy = +data?.total?.barangay || 0;
        this.forms = _forms.map(record => ({
          ...record,
          total_brgy:
            +record.high + +record.medium + +record.low + +record.nodata,
          qualityLevel:
            +record.total_score > 30
              ? 'high'
              : +record.total_score > 20
              ? 'medium'
              : 'low',
        }));
      } catch (error) {
        this.apiErrorMessage(error);
      } finally {
        this.isFetching = false;
      }
    },

    onRegionClick() {
      this.$store.commit('scorecard/setSelectedRegion', this.region);
      this.$store.commit('scorecard/setReportCategory', 'Region');
      this.$store.commit('scorecard/setScorecardIndex', 1);
    },

    onProvinceClick() {
      this.$store.commit('scorecard/setSelectedProvince', this.province);
      this.$store.commit('scorecard/setReportCategory', 'Province');
      this.$store.commit('scorecard/setScorecardIndex', 2);
    },

    // eslint-disable-next-line camelcase
    onBarangayClick({ barangay, psgc_code }) {
      this.$store.commit('scorecard/setSelectedBarangay', {
        barangay,
        // eslint-disable-next-line camelcase
        psgc_code,
      });
      this.$store.commit('scorecard/setReportCategory', 'Barangay');
      this.$store.commit('scorecard/setScorecardIndex', 4);
    },

    onToggleQualityIndicatorModal() {
      this.showQltyIndicatorModal = !this.showQltyIndicatorModal;
    },

    onExportCSV() {
      const data = [];
      data.push([
        'Barangay',
        'Years Covered',
        'Assessment Date',
        ...this.scoreGroup.map(
          section => this.assessmentForm[section].category,
        ),
        'Total Score',
        'Quality Level',
      ]);
      this.forms.forEach(form => {
        data.push([
          `"${form.barangay}"`,
          `"${form.years_covered}"`,
          `"${form.date_assessed ? this.formatDate(form.date_assessed) : ''}"`,
          ...this.scoreGroup.map(key => form[key]),
          form.total_score,
          form?.qualityLevel.toUpperCase() || '',
        ]);
      });
      const csv = 'data:text/csv;charset=utf-8,' + data.join('\n');
      const encodedUri = encodeURI(csv);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'city-municipality-scorecard.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    onExportPDF() {
      // eslint-disable-next-line new-cap
      const doc = new jsPDF({
        orientation: 'landscape',
      });
      // const table = this.$refs.scoretable.$el.getElementsByTagName('table')[0];

      const leftMargin = 14;

      doc.setFontSize(14);
      doc.text('CITY/MUNICIPALITY SCORECARD (BETA)', leftMargin, 16);
      doc.text('BDRRMP QUALITY ASSESSMENT SCORECARD', leftMargin, 23);
      doc.text(`City/Municipality: ${this.municipalityName}`, leftMargin, 30);
      doc.setFontSize(10);
      doc.text(`Province: ${this.provinceName}`, leftMargin, 36);
      doc.text(`Region: ${this.regionName}`, leftMargin, 40);
      doc.text(
        `Total No. of Barangays: ${this.formatNumber(this.totalBrgy)}`,
        leftMargin,
        46,
      );
      doc.text(
        `No. of Barangays Assessed: ${this.formatNumber(this.totalAssessed)}`,
        leftMargin,
        50,
      );
      doc.text(
        `% of Barangays Assessed: ${(
          (this.totalAssessed / this.totalBrgy) *
          100
        ).toFixed(2)}%`,
        leftMargin,
        54,
      );

      doc.setFontSize(14);

      doc.autoTable({
        columns: [
          {
            header: 'Quality Level',
            dataKey: 'qualityLevel',
          },
          {
            header: 'Barangays',
            dataKey: 'total',
          },
        ],
        headStyles: {
          fillColor: [46, 128, 182],
        },
        startY: 14,
        margin: { left: 182 },
        tableWidth: 100,
        tableLineWidth: 1,
        body: [
          {
            qualityLevel: 'High',
            total: this.totalHigh,
          },
          {
            qualityLevel: 'Medium',
            total: this.totalMedium,
          },
          {
            qualityLevel: 'Low',
            total: this.totalLow,
          },
          {
            qualityLevel: 'Total',
            total: this.totalAssessed,
          },
        ],
        didParseCell: data => {
          if (
            data.row.section === 'body' &&
            data.column.dataKey === 'qualityLevel'
          ) {
            if (data.cell.raw === 'High') {
              data.cell.styles.fillColor = [202, 247, 173];
            } else if (data.cell.raw === 'Medium') {
              data.cell.styles.fillColor = [255, 255, 195];
            } else if (data.cell.raw === 'Total') {
              data.cell.styles.fillColor = [244, 244, 244];
            } else {
              data.cell.styles.fillColor = [244, 173, 156];
            }
          }
        },
      });

      doc.autoTable({
        theme: 'grid',
        columns: [
          { header: 'Barangay', dataKey: 'barangay' },
          { header: 'Years Covered', dataKey: 'years_covered' },
          { header: 'Assessment Date', dataKey: 'date_assessed' },
          ...this.scoreGroup.map(section => ({
            header: this.assessmentForm[section].category,
            dataKey: section,
          })),
          { header: 'Total Score', dataKey: 'total_score' },
          { header: 'Quality Level', dataKey: 'qualityLevel' },
        ],
        body: this.forms.map(record => ({
          ...record,
          qualityLevel: record.qualityLevel.toUpperCase(),
        })),
        startY: 58,
        styles: { halign: 'center' },
        columnStyles: {
          barangay: { halign: 'left' },
        },
        headStyles: {
          fillColor: [46, 128, 186],
        },
        didParseCell: data => {
          if (
            data.row.section === 'body' &&
            data.column.dataKey === 'total_score'
          ) {
            if (+data.cell.raw > 30) {
              data.cell.styles.fillColor = [202, 247, 173];
            } else if (+data.cell.raw > 20) {
              data.cell.styles.fillColor = [255, 255, 195];
            } else {
              data.cell.styles.fillColor = [244, 173, 156];
            }
          }
          if (
            data.row.section === 'body' &&
            data.column.dataKey === 'qualityLevel'
          ) {
            if (data.cell.raw === 'HIGH') {
              data.cell.styles.fillColor = [202, 247, 173];
            } else if (data.cell.raw === 'MEDIUM') {
              data.cell.styles.fillColor = [255, 255, 195];
            } else {
              data.cell.styles.fillColor = [244, 173, 156];
            }
          }
        },
        willDrawCell: data => {
          if (
            data.row.section === 'body' &&
            data.column.dataKey === 'total_score'
          ) {
            if (+data.cell.raw > 30) {
              doc.setTextColor('#155724'); // Green
            } else if (+data.cell.raw > 20) {
              doc.setTextColor('#956404'); // Yellow
            } else {
              doc.setTextColor('#961300'); // Red
            }
          }
          if (
            data.row.section === 'body' &&
            data.column.dataKey === 'qualityLevel'
          ) {
            if (data.cell.raw === 'HIGH') {
              doc.setTextColor('#155724'); // Green
            } else if (data.cell.raw === 'MEDIUM') {
              doc.setTextColor('#956404'); // Yellow
            } else {
              doc.setTextColor('#961300'); // Red
            }
          }
          if (
            data.row.section === 'body' &&
            data.column.dataKey === 'date_assessed'
          ) {
            data.cell.text[0] = this.formatDate(data.cell.raw || '');
          }
        },
      });
      doc.save('city-municipality-scorecard.pdf');
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep {
  table.summary-table {
    border-collapse: collapse;
    border: 1px solid black;
    width: 400px;

    td:nth-child(1) {
      width: 50%;
    }

    td {
      border: 1px solid #000 !important;
      text-align: center;
    }
    th,
    td {
      padding: 4px;
    }
  }
}
</style>
