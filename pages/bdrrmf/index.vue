<template>
    <div class="ma-5">
      <v-card>
        <v-card-title>Barangay Disaster Risk Reduction and Management Fund Utilization</v-card-title>
        <v-card-text>
          <v-sheet class="d-sm-flex justify-space-between d-block">
            <v-sheet class="d-sm-flex">
              <v-sheet max-width="400" min-width="300">
                <v-text-field
                  v-model="searchText"
                  prepend-inner-icon="mdi-magnify"
                  outlined
                  hide-details
                  label="Search..."
                  dense
                  @keydown.enter="onSearch" />
              </v-sheet>
              <div class="d-sm-flex mt-2 mt-sm-0">
                <v-btn
                  color="primary"
                  class="ml-0 ml-sm-2"
                  height="40"
                  outlined
                  @click="getData">
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
  
                <v-btn
                  color="primary"
                  height="40"
                  class="mx-2"
                  @click="onToggleFormModal">
                  <v-icon>mdi-plus</v-icon>
                  Add Fund
                </v-btn>
              </div>
            </v-sheet>
          </v-sheet>
        </v-card-text>
        <v-divider />
        <v-card-text>
          <v-data-table
            hide-default-footer
            :headers="tableHeaders"
            :items="bdrrmfList"
            :loading="isDataLoading"
            :items-per-page="pagination.limit"
            :options.sync="tableOption">
            <template #item.isActive="{ item }">
              <span :class="{ 'red--text': !item.isActive }">{{
                item.isActive ? 'Yes' : 'No'
              }}</span>
            </template>
            <template #item.createdAt="{ item }">
              {{ dateFormat(item.createdAt) }}
            </template>
            <template #item.actions="{ item }">
              <v-sheet color="transparent">
                <v-icon
                  title="Export pdf"
                  color="blue"
                  @click="onSelectDataToPrint(item)">
                  mdi-printer
                </v-icon>
                <v-icon
                  title="Edit"
                  color="blue"
                  @click="onSelectDataToEdit(item)">
                  mdi-pencil
                </v-icon>
                <v-icon
                  title="Delete"
                  color="red"
                  @click="onSelectDataToDelete(item)">
                  mdi-delete
                </v-icon>
              </v-sheet>
            </template>
          </v-data-table>
          <v-divider />
          <v-sheet class="float-sm-left d-block pt-3 pl-sm-4 grey--text">
            Total: {{ totalRecords.toLocaleString() }}
          </v-sheet>
          <v-sheet
            class="d-flex justify-sm-end justify-space-between align-center py-2">
            <v-sheet width="80">
              <v-select
                v-model="pagination.limit"
                color="primary"
                outlined
                dense
                hide-details
                :items="[10, 15, 20]"
                :disabled="isDataLoading" />
            </v-sheet>
            <v-pagination
              v-model="pagination.page"
              :total-visible="$vuetify.breakpoint.mobile ? 4 : 6"
              :disabled="isDataLoading"
              :length="pageTotal" />
          </v-sheet>
        </v-card-text>
  
        <BdrrmfFormModal
          :open="showFormModal"
          :form-value="selectedDataToEdit"
          @toggle="onToggleFormModal"
          @success="onUserSaved" />
  
      </v-card>
    </div>
  </template>
  
  <script>
  import { jsPDF } from 'jspdf';
  import 'jspdf-autotable';
  import qs from 'qs';
  import { mapState, mapActions } from 'vuex';
  import moment from 'moment';
  import globalMixin from '@/mixins/global';
  export default {
    name: 'BdrrmfPage',
    mixins: [globalMixin],
    data() {
      return {
        showFormModal: false,
        isDataLoading: false,
        showDeleteModal: false,
        selectedDataToEdit: null,
        selectedDataToDelete: null,
        isDeleting: false,
        pagination: {
          limit: 10,
          page: 1,
        },
        searchText: '',
        showSignatoryModal: false,
        bdrrmfList: [],
        totalRecords: 0,
        tableOption: {},
      };
    },
    computed: {
      ...mapState('user', ['users']),
      tableHeaders: () => [
        {
          text: 'Region',
          value: 'region',
        },
        {
          text: 'Province',
          value: 'province',
        },
        {
          text: 'Municipality/City',
          value: 'municipality',
        },
        {
          text: 'Barangay',
          value: 'barangay',
        },
        {
          text: 'AsOf',
          value: 'asOf',
        },
        {
          value: 'actions',
          sortable: false,
        },
      ],
      pageTotal() {
      return Math.ceil((this.totalRecords || 0) / this.pagination.limit);
    },
    },
  
    watch: {
      pagination: {
        handler() {
          this.getData();
        },
        deep: true,
      },
      tableOption: {
        deep: true,
        handler() {
          this.getData();
        },
      },
    },
  
    mounted() {
      this.getData();
      this.$store.dispatch('setPageTitle', 'Fund Utilization');
    },
  
    methods: {
      ...mapActions('user', ['fetchUsers', 'fetchUserAdmin']),
      onToggleFormModal() {
        this.showFormModal = !this.showFormModal;
        this.selectedDataToEdit = null;
      },
  
      onSearch() {
        this.$set(this.pagination, 'page', 1);
        this.getData();
      },
  
      async getData() {
        if (this.isDataLoading) {
          return;
        }
        this.isDataLoading = true;
        try {
          const params = qs.stringify({
            page: this.pagination.page,
            limit: this.pagination.limit,
            search: this.searchText,
            sortBy: this.tableOption.sortBy,
            sortOrder: this.tableOption.sortDesc,
            user_id: +this.authUser.id,
          });
          
          const { data } = await this.$axios(`/api/bdrrmf/list?${params}`);
          this.bdrrmfList = data?.data || [];
          this.totalRecords = data?.count;
        } catch (error) {
          this.apiErrorMessage(error);
        } finally {
          this.isDataLoading = false;
        }
      },
  
      onUserSaved() {
        this.getData();
      },
  
      onSelectDataToEdit(data) {
        this.showFormModal = true;
        this.selectedDataToEdit = data;
      },
      onSelectDataToPrint(data) {
        // eslint-disable-next-line new-cap
        const doc = new jsPDF({
          orientation: 'portrait',
        });

        const leftMargin = 14;

        // Add the document title
        doc.setFontSize(10);
        doc.text('Fund source and allocation based on the Local Disaster Risk Reduction and Management Fund', leftMargin, 12);
        doc.text('BARANGAY DISASTER RISK REDUCTION AND MANAGEMENT FUND UTILIZATION', 40, 20);
        doc.text(`As of: ${data.asOf}`, 80, 26);

        // Barangay details
        doc.setFontSize(10);
        doc.text(`Barangay: ${data.barangay}`, leftMargin, 35);
        doc.text(`City/Municipality: ${data.municipality}`, 75, 35);
        doc.text(`Province: ${data.province}`, 150, 35);

        // Add the table header
        const startY = 42;
        const tableHeaders = [
          [
            { content: 'Particulars', rowSpan: 2 },
            { content: 'BDRRM Fund', colSpan: 2},
            { content: 'NDRRM Fund', rowSpan: 2},
            { content: 'From Other LGUs', rowSpan: 2},
            { content: 'From Other Sources', rowSpan: 2},
            { content: 'Total', rowSpan: 2},
          ],
          [
            { content: 'Quick Response Fund (QRF) 30%'},
            { content: `Prevention/\nMitigation/\nPrepared-\nness/Reha-\nbilitation and Recov-\nery Fund 70%`},
          ],
        ];
        const tableData = [
          ['Sources of Funds', '', '', '', '', '', '', ''],
          [{content:'Current Appropriation', styles: {cellPadding: { top: 2,left: 5}}},
            data.currentAppropriation[0].quickResponseFund,
            data.currentAppropriation[0].preventionMitigationPreparednessFund,
            data.currentAppropriation[0].ndrrmFund,
            data.currentAppropriation[0].fromOtherLgu,
            data.currentAppropriation[0].fromOtherSources,
            data.currentAppropriation[0].total,
          ],
          [{content:'Continuing Appropriation', styles: {cellPadding: { top: 2,left: 5}}},
            data.continuingAppropriation[0].quickResponseFund,
            data.continuingAppropriation[0].preventionMitigationPreparednessFund,
            data.continuingAppropriation[0].ndrrmFund,
            data.continuingAppropriation[0].fromOtherLgu,
            data.continuingAppropriation[0].fromOtherSources,
            data.continuingAppropriation[0].total,
          ],
          [{content:'Previous Year\'s Appropriations Transferred to the Special Trust', styles: {cellPadding: { top: 2, left: 5 }}}, '', '', '', '', '', ''],
          ...data.previousYearAppropriation.map((yearData, index) => [
            {content: `Year ${index + 1} ${yearData.asOf || ''}`, styles: { cellPadding: { top: 2, left: 5 }}} ,
            yearData.quickResponseFund || '',
            yearData.preventionMitigationPreparednessFund || '',
            yearData.ndrrmFund || '',
            yearData.fromOtherLgu || '',
            yearData.fromOtherSources || '',
            yearData.total || '',
          ]),
          ['Transfer/Grants', '', '', '', '', '', ''],
          [{content:'Total Funds Available', styles: { cellPadding: { top: 2, left: 5 }}}, '', '', '', '', '', ''],
          ['Total Utilized Fund', 
            data.totalUtilizedFund[0].quickResponseFund,
            data.totalUtilizedFund[0].preventionMitigationPreparednessFund,
            data.totalUtilizedFund[0].ndrrmFund,
            data.totalUtilizedFund[0].fromOtherLgu,
            data.totalUtilizedFund[0].fromOtherSources,
            data.totalUtilizedFund[0].total,
          ],
          ['Unutilized Balance', '', '', '', '', '', ''],
          ['Utilization Rate', '', '', '', '', '', ''],
        ];

        doc.autoTable({
          head: tableHeaders,
          body: tableData,
          startY,
          theme: 'grid',
          headStyles: {
            halign: 'center', 
            valign: 'middle',
            fillColor: [255, 255, 255], // White background
            textColor: [0, 0, 0], // Black text
            lineWidth: 0.2, // Thinner grid lines
            lineColor: [0, 0, 0], // Black border for grid
          },
          bodyStyles: {
            fillColor: [255, 255, 255], // White background
            textColor: [0, 0, 0], // Black text
          },
          styles: {
            lineWidth: 0.2,
            lineColor: [0, 0, 0], // Ensure all cells have borders
          },
        });

        // Add footer information
        const footerY = doc.previousAutoTable.finalY + 10;
        doc.setFontSize(10);
        doc.text('BDRRMF Appropriation Rate: Estimated ____________', leftMargin+5, footerY);
        doc.text('Amount of Regular Sources: ____________', leftMargin+5, footerY + 6);
        doc.text(
          'We hereby certify that we have reviewed the contents and hereby attest to the veracity and correctness of the data\n or information contained in this document.',
          leftMargin+5,
          footerY + 12,
        );

        // Add the signature section
        doc.text('________________________', leftMargin+5, footerY + 24);
        doc.text('Barangay Treasurer', leftMargin+12, footerY + 30);

        doc.text('________________________', 125, footerY + 24);
        doc.text('Barangay Captain', 135, footerY + 30);

        // Add the note at the bottom
        doc.setFontSize(8);
        doc.text(
          'Note: The group must submit a report (narrative and financial) of analysis and monitoring every time the BDRRMC conducts a meeting. \n"Per Section 4 of NDRRMC, DBM & DILG JMC No. 2013-1, 70% of the LDRRMF shall be allocated for disaster prevention and mitigation, preparedness, response, rehabilitation and recovery."',
          leftMargin+5,
          footerY + 42,
          { maxWidth: 180 },
        );

        // Save the PDF
        doc.save('barangay-bdrrmf-utilization.pdf');
      },
      onSelectDataToDelete(data) {
        this.selectedDataToDelete = data;
        this.showDeleteModal = true;
      },
  
      onToggleDeleteModal() {
        this.showDeleteModal = !this.showDeleteModal;
        if (!this.showDeleteModal) {
          this.selectedDataToDelete = null;
        }
      },
  
      async onDelete() {
        if (this.isDeleting) {
          return;
        }
        this.isDeleting = true;
        try {
          await this.$axios.delete(
            `/api/user/delete/${this.selectedDataToDelete.id}`,
          );
          this.systemInfoMessage('User was deleted.', 'mdi-delete');
          this.onToggleDeleteModal();
          this.fetchUserAdmin();
        } catch (error) {
          this.apiErrorMessage(error);
        } finally {
          this.isDeleting = false;
        }
      },
  
      onToggleSignatories() {
        this.showSignatoryModal = !this.showSignatoryModal;
      },
  
      dateTimeFormat(date) {
        return moment(date).format('MMM DD, YYYY h:ma');
      },
  
      dateFormat(date) {
        return moment(date).format('MMM DD, YYYY');
      },
    },
  };
  </script>
  
  <style></style>
  