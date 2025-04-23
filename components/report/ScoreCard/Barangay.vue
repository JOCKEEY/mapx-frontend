<template>
  <v-card flat :loading="isFetching">
    <v-sheet class="my-5">
      <v-sheet class="d-block d-sm-flex justify-space-between">
        <v-sheet max-width="600">
          <v-row class="mb-3" no-gutters>
            <v-col cols="4" class="font-weight-bold">
              <h6 class="subtitle-2">Years Covered:</h6>
            </v-col>
            <v-col cols="8">
              <h6 class="subtitle-2">
                {{ form.years_covered }}
              </h6>
            </v-col>
            <v-col cols="4" class="font-weight-bold">
              <h6 class="subtitle-2">Assessment Date:</h6>
            </v-col>
            <v-col cols="8">
              <h6 class="subtitle-2">
                {{ form.date_assessed ? formatDate(form.date_assessed) : '' }}
              </h6>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="4" class="font-weight-bold">
              <h6 class="text-h6">Barangay:</h6>
            </v-col>
            <v-col cols="8">
              <h6 class="text-h6">
                {{ barangayName }}
              </h6>
            </v-col>
            <v-col cols="4" class="font-weight-bold">
              <h6 class="subtitle-2">Municipality:</h6>
            </v-col>
            <v-col cols="8">
              <h6 class="subtitle-2">
                <a href="#" @click.prevent="onMunicipalityClick">
                  {{ municipalityName }}
                </a>
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
          </v-row>
        </v-sheet>
        <v-spacer />
        <v-sheet>
          <v-sheet
            class="rounded-pill"
            outlined
            elevation="4"
            height="148"
            width="148"
            :class="{
              'green white--text': form.qualityLevel === 'high',
              yellow: form.qualityLevel === 'medium',
              'red lighten-2 white--text': form.qualityLevel === 'low',
            }">
            <div class="mt-8 text-center">
              <span>Quality Rating</span>
              <h6 class="text-h3">{{ form.total_score }}</h6>
              <span class="text-uppercase subtitle-1">
                {{ form.qualityLevel }}
              </span>
            </div>
          </v-sheet>
          <v-sheet class="mt-3 text-center">
            <v-btn
              small
              color="yellow darken-3"
              dark
              height="36"
              title="Major Findings"
              @click="onToggleMajorfindingModal">
              <v-icon>mdi-file-document</v-icon>
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
        </v-sheet>
      </v-sheet>
    </v-sheet>
    <v-sheet outlined>
      <v-simple-table ref="scoretable" class="summary-table" dense>
        <thead>
          <tr>
            <th>Category</th>
            <th>Quality Assessment</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="section in Object.keys(assessmentForm)" :key="section">
            <td>
              {{ assessmentForm[section].section }}
            </td>
            <td>
              {{
                assessmentForm[section].category +
                '. ' +
                assessmentForm[section].text
              }}
            </td>
            <td>
              {{ form[section] }}
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-sheet>
    <v-sheet class="mt-5" width="400">
      <span class="font-weight-bold">Legend:</span>
      <table style="border-collapse: collapse">
        <tbody>
          <tr>
            <td class="green pa-2" style="width: 50%">31-36</td>
            <td class="green pa-2">High</td>
          </tr>
          <tr>
            <td class="yellow pa-2">21-30</td>
            <td class="yellow pa-2">Medium</td>
          </tr>
          <tr>
            <td class="red lighten-2 pa-2">0-20</td>
            <td class="red lighten-2 pa-2">Low</td>
          </tr>
        </tbody>
      </table>
    </v-sheet>
    <ReportScoreCardMajorfinding
      :open="showMajorfinding"
      :majorfinding="majorFinding"
      @toggle="onToggleMajorfindingModal" />
  </v-card>
</template>

<script>
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import qs from 'qs';
import globalMixin from '~/mixins/global.js';
export default {
  name: 'ReportScoreCardBarangay',
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
    barangay: {
      type: Object,
      default: () => ({
        barangay: null,
        psgc_code: null,
      }),
    },
  },
  data: () => ({
    form: [],
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
    showMajorfinding: false,
    majorFinding: {
      major_findings_review: null,
    },
  }),

  computed: {
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

    barangayName() {
      return this.barangay?.barangay || null;
    },

    barangayCode() {
      return this.barangay?.psgc_code || null;
    },
  },

  watch: {
    barangay: {
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
          psgc_code: this.barangayCode,
        });
        const { data } = await this.$axios.get(
          `/api/qas-form/report/scorecard/barangay?${params}`,
        );
        const record = data?.data || [];
        this.form = {
          ...record,
          total_brgy:
            +record.high + +record.medium + +record.low + +record.nodata,
          qualityLevel:
            +record.total_score > 30
              ? 'high'
              : +record.total_score > 20
              ? 'medium'
              : 'low',
        };
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

    onMunicipalityClick() {
      this.$store.commit(
        'scorecard/setSelectedMunicipality',
        this.municipality,
      );
      this.$store.commit('scorecard/setReportCategory', 'City/Municipality');
      this.$store.commit('scorecard/setScorecardIndex', 3);
    },

    onExportCSV() {
      const data = [];
      data.push(['Category', 'Quality Assessment', 'Rating']);
      Object.keys(this.assessmentForm).forEach(section => {
        data.push([
          this.assessmentForm[section].section,
          `"${this.assessmentForm[section].category}. ${this.assessmentForm[section].text}"`,
          this.form[section],
        ]);
      });
      const csv = 'data:text/csv;charset=utf-8,' + data.join('\n');
      const encodedUri = encodeURI(csv);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'barangay-scorecard.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    onExportPDF() {
      // eslint-disable-next-line new-cap
      const doc = new jsPDF({
        orientation: 'portrait',
      });
      const table = this.$refs.scoretable.$el.getElementsByTagName('table')[0];

      const leftMargin = 14;

      doc.setFontSize(14);
      doc.text('BDRRMP QUALITY ASSESSMENT SCORECARD', leftMargin, 12);
      doc.setFontSize(10);
      doc.text(`Years Covered: ${this.form.years_covered}`, leftMargin, 16);
      doc.text(
        `Assessment Date: ${this.formatDate(this.form.date_assessed)}`,
        leftMargin,
        20,
      );
      doc.setFontSize(14);
      doc.setTextColor(
        +this.form.total_score > 30
          ? '#155724'
          : +this.form.total_score > 20
          ? '#956404'
          : '#961300',
      );
      doc.text(`Barangay: ${this.barangayName}`, leftMargin, 28);
      doc.setTextColor('#000000');
      doc.setFontSize(10);
      doc.text(`City/Municipality: ${this.municipalityName}`, leftMargin, 36);
      doc.text(`Province: ${this.provinceName}`, leftMargin, 40);
      doc.text(`Region: ${this.regionName}`, leftMargin, 44);

      doc.setTextColor(
        +this.form.total_score > 30
          ? '#155724'
          : +this.form.total_score > 20
          ? '#956404'
          : '#961300',
      );
      doc.circle(180, 28, 16);
      doc.text('Quality Rating', 168, 22);
      doc.setFontSize(30);
      doc.text(
        this.form.total_score,
        177 - this.form.total_score.toString().length,
        32,
      );
      doc.setFontSize(10);

      doc.text(
        this.form.qualityLevel.toUpperCase(),
        180 - this.form.qualityLevel.length - 1,
        38,
      );

      doc.setFontSize(14);
      doc.autoTable({
        html: table,
        startY: 50,
      });
      doc.save('barangay-scorecard.pdf');
    },
    async onToggleMajorfindingModal(){
      try {
        const parameter = qs.stringify({
          reg: this.regionName.toUpperCase(),
          prov: this.provinceName.toUpperCase(),
          mun: this.municipalityName.toUpperCase(),
          brgy: this.barangayName,
          years_covered: this.form.years_covered,
          date_assessed: this.form.date_assessed,
        });
        const { data } = await this.$axios.get(
          `/api/qas-form/report/scorecard/majorfindings?${parameter}`,
        );
        if (!data?.data) {
          this.systemInfoMessage("No data");
          return;
        }
        
        const record = data?.data || {};
        
        record.major_findings_review = record.major_findings_review.map(item => {
          const remarkKey = `${item.element.toLowerCase()}_remarks`;
          return {
            ...item,
            remarks: record[remarkKey] || "",
          };
        });
        this.majorFinding = record;
        this.showMajorfinding = !this.showMajorfinding;
        
      } catch (error) {
        console.error('Error: ',error);
      }
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
