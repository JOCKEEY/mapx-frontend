<template>
  <v-card flat :loading="isFetching">
    <h6 class="text-h6">National Consolidation</h6>
    <v-sheet class="d-block d-sm-flex justify-space-between mb-3 mb-sm-0">
      <v-sheet class="my-5" max-width="600">
        <v-row no-gutters>
          <v-col cols="4" class="font-weight-bold"
            >Total No. of Barangays:</v-col
          >
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
                <strong>{{ Math.ceil(value) }}%</strong>
              </template>
            </v-progress-linear>
          </v-col>
        </v-row>
      </v-sheet>
      <v-sheet>
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
    </v-sheet>
    <v-tabs v-model="tab">
      <v-tab active-class="orange white--text">Quality Indicators</v-tab>
      <v-tab active-class="orange white--text">Quality Levels</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card outlined>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              placeholder="Search region..."
              single-line
              hide-details />
          </v-card-title>
          <v-simple-table ref="scoretable">
            <thead>
              <tr>
                <th rowspan="2">Region</th>
                <th rowspan="2">Score</th>
                <th colspan="12" style="text-align: center">
                  Count of Barangays by Quality Indicator
                </th>
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
              </tr>
            </thead>
            <tbody>
              <template v-for="(form, i) in filteredForms">
                <tr :key="'location-' + i">
                  <td>
                    <a
                      class="text-decoration-none"
                      href="#"
                      @click.prevent="$emit('region:click', form)">
                      {{ form.region }}
                    </a>
                  </td>
                  <td>
                    <v-chip>3</v-chip>
                  </td>
                  <td v-for="field in scoreGroup" :key="field + '3_' + i">
                    {{ formatNumber(form[field + '_3']) }}
                  </td>
                </tr>
                <tr :key="'location-score-2' + i">
                  <td></td>
                  <td>
                    <v-chip>2</v-chip>
                  </td>
                  <td v-for="field in scoreGroup" :key="field + '2_' + i">
                    {{ form[field + '_2'] }}
                  </td>
                </tr>
                <tr :key="'location-score-1' + i">
                  <td></td>
                  <td>
                    <v-chip>1</v-chip>
                  </td>
                  <td v-for="field in scoreGroup" :key="field + '1_' + i">
                    {{ formatNumber(form[field + '_1']) }}
                  </td>
                </tr>
                <tr :key="'location-score-0' + i">
                  <td></td>
                  <td>
                    <v-chip>0</v-chip>
                  </td>
                  <td v-for="field in scoreGroup" :key="field + '0_' + i">
                    {{ formatNumber(form[field + '_0']) }}
                  </td>
                </tr>
              </template>
            </tbody>
          </v-simple-table>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-sheet outlined>
          <div class="pa-4 subtitle-2">Count of Barangays</div>
          <v-divider />
          <v-data-table
            hide-default-footer
            disable-pagination
            :headers="qualityLevelHeader"
            :items="forms">
            <template #item.region="{ item }">
              <a
                class="text-decoration-none"
                href="#"
                @click.prevent="$emit('region:click', item)">
                {{ item.region }}
              </a>
            </template>
            <template #item.high="{ item }">
              <v-sheet class="text-center pa-1" width="100" color="green">
                {{ formatNumber(item.high) }}
              </v-sheet>
            </template>
            <template #item.medium="{ item }">
              <v-sheet class="text-center pa-1" width="100" color="yellow">
                {{ formatNumber(item.medium) }}
              </v-sheet>
            </template>
            <template #item.low="{ item }">
              <v-sheet
                class="text-center pa-1"
                width="100"
                color="red lighten-2">
                {{ formatNumber(+item.low + +item.nodata) }}
              </v-sheet>
            </template>
            <template #item.total_brgy="{ item }">
              {{ formatNumber(+item.total_brgy) }}
            </template>
          </v-data-table>
        </v-sheet>
      </v-tab-item>
    </v-tabs-items>
    <ReportScoreCardQualityIndicator
      :open="showQltyIndicatorModal"
      @toggle="onToggleQualityIndicatorModal" />
  </v-card>
</template>

<script>
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import globalMixin from '~/mixins/global.js';
export default {
  name: 'ReportScoreCardCountry',
  mixins: [globalMixin],
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
    showQltyIndicatorModal: false,
  }),

  computed: {
    filteredForms() {
      if (this.search) {
        return this.forms.filter(
          record => record.region.search(new RegExp(this.search, 'i')) !== -1,
        );
      }
      return this.forms;
    },

    qualityLevelHeader() {
      return [
        {
          text: 'Region',
          value: 'region',
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
  },

  watch: {
    year() {
      this.fetchData();
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
        const { data } = await this.$axios.get(
          `/api/qas-form/report/scorecard/country`,
        );
        const _forms = data?.data || [];
        this.totalBrgy = +data?.total?.barangay || 0;
        this.forms = _forms.map(record => ({
          ...record,
          total_brgy:
            +record.high + +record.medium + +record.low + +record.nodata,
        }));
      } catch (error) {
        this.apiErrorMessage(error);
      } finally {
        this.isFetching = false;
      }
    },

    onToggleQualityIndicatorModal() {
      this.showQltyIndicatorModal = !this.showQltyIndicatorModal;
    },

    onExportCSV() {
      const data = [];
      data.push([
        'Region',
        'Score',
        ...this.scoreGroup.map(
          section => this.assessmentForm[section].category,
        ),
      ]);
      this.forms.forEach(form => {
        data.push([
          `"${form.region}"`,
          3,
          ...this.scoreGroup.map(key => form[key + '_3']),
        ]);
        data.push([
          `"${form.region}"`,
          2,
          ...this.scoreGroup.map(key => form[key + '_2']),
        ]);
        data.push([
          `"${form.region}"`,
          1,
          ...this.scoreGroup.map(key => form[key + '_1']),
        ]);
        data.push([
          `"${form.region}"`,
          0,
          ...this.scoreGroup.map(key => form[key + '_0']),
        ]);
      });
      const csv = 'data:text/csv;charset=utf-8,' + data.join('\n');
      const encodedUri = encodeURI(csv);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'national-scorecard.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    onExportPDF() {
      // eslint-disable-next-line new-cap
      const doc = new jsPDF({
        orientation: 'landscape',
      });
      const table = this.$refs.scoretable.$el.getElementsByTagName('table')[0];

      const leftMargin = 14;

      doc.setFontSize(14);
      doc.text('NATIONAL SCORECARD (BETA)', leftMargin, 16);
      doc.text('BDRRMP QUALITY ASSESSMENT SCORECARD', leftMargin, 26);
      doc.text('National Consolidation', leftMargin, 34);

      doc.setFontSize(10);
      doc.text(
        `Total No. of Barangays: ${this.formatNumber(this.totalBrgy)}`,
        leftMargin,
        40,
      );
      doc.text(
        `No. of Barangays Assessed: ${this.formatNumber(this.totalAssessed)}`,
        leftMargin,
        44,
      );
      doc.text(
        `% of Barangays Assessed: ${(
          (this.totalAssessed / this.totalBrgy) *
          100
        ).toFixed(2)}%`,
        leftMargin,
        48,
      );

      doc.setFontSize(14);
      doc.text('Summary', leftMargin, 56);

      doc.autoTable({
        theme: 'grid',
        columns: [
          { header: 'Region', dataKey: 'region' },
          { header: 'High', dataKey: 'hi' },
          { header: 'Medium', dataKey: 'md' },
          { header: 'Low', dataKey: 'lo' },
          { header: 'Total', dataKey: 'total' },
        ],
        body: this.forms.map(form => ({
          region: form.region,
          hi: form.high,
          md: form.medium,
          lo: form.low,
          total: form.total_brgy,
        })),
        startY: 58,
        styles: { halign: 'center' },
        columnStyles: {
          region: { halign: 'left' },
        },
        tableWidth: 'wrap',
        headStyles: {
          fillColor: [46, 128, 186],
        },
        didParseCell: data => {
          if (data.row.section === 'body' && data.column.dataKey === 'hi') {
            data.cell.styles.fillColor = [202, 247, 173];
          }
          if (data.row.section === 'body' && data.column.dataKey === 'md') {
            data.cell.styles.fillColor = [255, 255, 195];
          }
          if (data.row.section === 'body' && data.column.dataKey === 'lo') {
            data.cell.styles.fillColor = [244, 173, 156];
          }
        },
        willDrawCell: data => {
          if (data.row.section === 'body' && data.column.dataKey === 'hi') {
            doc.setTextColor('#155724'); // Green
          }
          if (data.row.section === 'body' && data.column.dataKey === 'md') {
            doc.setTextColor('#956404'); // Yellow
          }
          if (data.row.section === 'body' && data.column.dataKey === 'lo') {
            doc.setTextColor('#961300'); // Red
          }
        },
      });

      doc.addPage();

      doc.autoTable({
        html: table,
      });

      doc.save('national.pdf');
    },
  },
};
</script>
