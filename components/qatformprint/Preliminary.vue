<template>
  <section>
    <v-card class="pa-3">
      <v-card-title class="d-flex justify-center align-center">
        <div class="text-h6 text-md-h5 text-lg-h4 blue--text text-center">
          <v-icon color="blue" large class="mr-2">mdi-braille</v-icon>
          QAT for Barangay DRRM Plan
        </div>
      </v-card-title>
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="reg"
                label="Region"
                class="pa-0"
                readonly
                />    
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="prov"
                label="Province"
                class="pa-0"
                readonly
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="mun"
                label="Municipality"
                class="pa-0"
                readonly
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="brgy"
                label="Barangay"
                class="pa-0"
                readonly
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="years_covered"
                label="Years Covered: From - To (e.g 2017-2019)"
                required
                class="pa-0"
                />
            </v-col>

            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="date_assessed"
                label="Date assessment"
                prepend-icon="mdi-calendar"
                readonly
                class="pa-0"
              />
            </v-col>
          </v-row>
          <v-row>
            <div class="text-h5 blue--text mb-2">
              <v-icon color="blue" medium>mdi-chart-bar</v-icon> Reviewers
            </div>
          </v-row>
          <v-form v-if="localReviewers.length != 0">
            <v-row
              v-for="(row, index) in localReviewers"
              :key="row + index"
              class="mb-5">
              <v-col cols="12" sm="3">
                <v-text-field
                  v-model="localReviewers[index].name"
                  label="name"
                  prepend-icon="mdi-account"
                  class="pa-0" 
                  readonly
                  @input="onInput(index)"
                  />
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="localReviewers[index].designation"
                  label="designation"
                  prepend-icon="mdi-tooltip-account "
                  class="pa-0"
                  readonly
                  @input="onInput(index)"
                  />
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="localReviewers[index].contact"
                  label="contact"
                  prepend-icon="mdi-phone "
                  class="pa-0"
                  readonly
                  @input="onInput(index)"
                  />
              </v-col>
            </v-row>
          </v-form>
          <v-row>
            <div class="text-h5 blue--text mb-2">
              <v-icon color="blue" medium>mdi-account-group </v-icon>
              Respondents
            </div>
          </v-row>
          <v-form v-if="localRespondents.length != 0">
            <v-row
              v-for="(row, index) in localRespondents"
              :key="row + index"
              class="mb-5">
              <v-col cols="12" sm="3">
                <v-text-field
                  v-model="localRespondents[index].name"
                  label="name"
                  prepend-icon="mdi-account"
                  class="pa-0" 
                  readonly
                  @input="onInputRespondent(index)"
                />
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="localRespondents[index].designation"
                  label="designation"
                  prepend-icon="mdi-tooltip-account "
                  class="pa-0" 
                  readonly
                  @input="onInputRespondent(index)"
                />
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="localRespondents[index].contact"
                  label="contact"
                  prepend-icon="mdi-phone "
                  class="pa-0" 
                  readonly
                  @input="onInputRespondent(index)"
                />
              </v-col>
            </v-row>
          </v-form>
          <v-row>
            <v-col cols="12 pa-0">
              <div class="text-h5 orange--text">
                <v-icon color="orange" large>mdi-file-document</v-icon>
                Reference documents:
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12 pa-0">
              <p class="blue--text mt-2 ml-2">
                Please check ( <v-icon color="blue">mdi-check</v-icon> ) the box
                if material is available during assessment.
              </p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12 pa-0">
              <v-checkbox
                v-model="form.bdrrm_plan"
                :label="`${question.bdrrm_plan}`"
                class="pa-0"
                readonly
                @change="updateParent" 
              />
                <!-- :checked="isChecked(bdrrm_plan)" -->
                <!-- @change="onCheckboxChange($event, bdrrm_plan)"  -->
              <v-divider />
            </v-col>
            <v-col
              v-for="(plans, index) in question.bdrrm_plans"
              :key="plans + index"
              cols="12 pa-0">
              <v-checkbox
                v-model="form.bdrrm_plans"
                :label="plans"
                :value="plans"
                :disabled="!form.bdrrm_plan"
                class="ml-5 pa-0"
                readonly
                @change="changeBdrrmPlans" 
                />
              <v-divider />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              v-for="(docs, index) in question.ref_docs"
              :key="docs + index"
              class="pa-0 col-12">
              <v-checkbox
                v-model="form.ref_documents"
                :label="docs"
                :value="docs"
                class="pa-0"
                readonly
                @change="updateParent"
                />
              <v-divider />
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
    <v-card class="pa-10 mt-5">
      <v-row>
        <div class="text-h5 orange--text">
          <v-icon color="orange" large>mdi-file-document</v-icon> Instructions
        </div>
      </v-row>
      <v-row>
        <v-list class="blue--text mt-2 ml-2">
          Please check ( <v-icon color="blue">mdi-check</v-icon> ) the box if
          the criterion/criteria and its sub-section/s are present in the BDRRM
          Plan.
        </v-list>
      </v-row>
    </v-card>
  </section>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';
import globalMixin from '~/mixins/global';
export default {
  name: 'QatformprintPreliminary',
  mixins: [globalMixin],
  props: {},
  data() {
    return {
      localReviewers: [],
      localRespondents: [],
      isFetchingAllBarangay: false,
      isFetchingRegion: false,
      isFetchingProvince: false,
      isFetchingMunicipality: false,
      isFetchingBarangay: false,
      region: null,
      regioncode: null,
      province: null,
      provincecode: null,
      municipality: null,
      municipalitycode: null,
      barangay: null,
      form: {
        date: '',
        bdrrm_plans: [],
        ref_documents: [],
        barangay_id: 0,
      },
      question: {
        bdrrm_plan: 'BDRRM plan with the following related documents',
        bdrrm_plans: [
          'Contingency plan',
          'Evaculation plan(if separated) and map',
          'Multi-hazard vulnerability/risk maps',
          'Documentation or minutes of BDRRMC meeting',
          'Safety Certification of identified evacuation centers',
          'Local policies on the Creation of the BDRRMC, Appropriation of the BDRMM Fund and Adoption of BDRMM Plan, and other policies related to DRRM and CCA',
          'Capacity building certificates of BDRRMC members',
          'MOA/MOU with private or business sector organizations on preposition of goods',
        ],
        ref_docs: [
          'Barangay Development Plans',
          'Annual Investment Plans',
          'Local Disaster Risk Reduction and Management Fund Investment Plans',
          'Report on Utilization of Disaster Risk Reduction and Management Funds',
        ],
      },
      rules: {
        // animal: [val => (val || '').length > 0 || 'This field is required'],
      },
      modal: '',
    };
  },
  computed: {
    // regions() {
    //   return this.$store.state.qat.regions;
    // },
    // provinces() {
    //   return this.$store.state.qat.provinces;
    // },
    // municipalities() {
    //   return this.$store.state.qat.municipalities;
    // },
    // barangays() {
    //   return this.$store.state.qat.barangays;
    // },
    reg: {
      set(val){
        this.$store.commit('qat/setReg', val);
      },
      get(){
        return this.$store.state.qat.reg;
      },
    },
    prov: {
      set(val){
        this.$store.commit('qat/setProv', val);
      },
      get(){
        return this.$store.state.qat.prov;
      },
    },
    mun: {
      set(val){
        this.$store.commit('qat/setMun', val);
      },
      get(){
        return this.$store.state.qat.mun;
      },
    },
    brgy: {
      set(val){
        this.$store.commit('qat/setBrgy', val);
      },
      get(){
        return this.$store.state.qat.brgy;
      },
    },
    years_covered: {
      set(val){
        this.$store.commit('qat/setYearsCovered', val);
      },
      get(){
        return this.$store.state.qat.years_covered;
      },
    },
    reviewers: {
      set(val){
        this.$store.commit('qat/setReviewers', val);
      },
      get(){
        return this.$store.state.qat.reviewers;
      },
    },
    respondents: {
      set(val){
        this.$store.commit('qat/setRespondents', val);
      },
      get(){
        return this.$store.state.qat.respondents;
      },
    },
    ref_documents: {
      set(val){
        this.$store.commit('qat/setRefDocuments', val);
      },
      get(){
        return this.$store.state.qat.ref_documents;
      },
    },
    bdrrm_plans: {
      set(val){
        this.$store.commit('qat/setBdrrmPlans', val);
      },
      get(){
        return this.$store.state.qat.bdrrm_plans;
      },
    },
    date_assessed: {
      set(val){
        this.$store.commit('qat/setDateAssessed', val);
      },
      get(){
        const date = this.$store.state.qat.date_assessed.split("T")[0];
        return date;
      },
    },
    dialog: {
      get() {
        return this.open;
      },
      set() {
        this.$emit('toggle');
      },
    },
    ...mapGetters('qat',[
        'getLocationCode',
        'getBrgy',
        'getMun',
        'getprov',
        'getReg',
      ]),
  },
  watch: {
    reviewers: {
      immediate: true,
      handler(newReviewers) {
        // Create a local copy of the reviewers to avoid direct mutations
        this.localReviewers = JSON.parse(JSON.stringify(newReviewers));
      },
    },
    respondents: {
      immediate: true,
      handler(newRespondents) {
        this.localRespondents = JSON.parse(JSON.stringify(newRespondents));
      },
    },
    ref_documents: {
      immediate: true,
      handler(newRef){
        this.form.bdrrm_plan = JSON.parse(JSON.stringify(newRef)).includes(this.question.bdrrm_plan)
        this.form.ref_documents = JSON.parse(JSON.stringify(newRef));
      },
    },
    bdrrm_plans: {
      immediate: true,
      handler(newBdrrmPlans){
        this.form.bdrrm_plans = JSON.parse(JSON.stringify(newBdrrmPlans));
      },
    },
  },
  created() {
  },
  
  mounted() {
  },

  methods: {
    ...mapActions('qat', [
        'addReviewer', 
        'updateReviewer', 
        'removeReviewer',
        'addRespondent',
        'updateRespondent',
        'removeRespondent',
        'addRefDoc',
        'removeRefDoc',
        'addBdrrmPlans',
        'removeBdrrmPlans',
      ]),
    close() {
      this.$emit('toggle');
    },
    onDelete() {
      this.$emit('delete');
    },
    onInput(index) {
      // When input changes, dispatch the updateReviewer action
      const updatedReviewer = this.localReviewers[index];
      this.updateReviewer({ index, updatedReviewer });
    },
    onInputRespondent(index) {
      // When input changes, dispatch the updateReviewer action
      const updatedRespondent = this.localRespondents[index];
      this.updateRespondent({ index, updatedRespondent });
    },
    dateTimeFormat(date) {
      return moment(date).format('MMM DD, YYYY h:ma');
    },
    dateFormat(date) {
      return moment(date).format('MMM DD, YYYY');
    },
    // async fetchProvinces(selected) {
    //   if (this.isFetchingProvince) {
    //     return;
    //   }
    //   this.isFetchingProvince = true;
    //   this.province = null;
    //   try {
    //     const { data } = await this.$axios.get(
    //       `/api/barangay/province/list?regioncode=${selected.regioncode}`,
    //     );
    //     this.$store.commit('qat/setProvince', data.data || []);
    //   } catch (error) {
    //     this.apiErrorMessage(error);
    //   } finally {
    //     this.isFetchingProvince = false;
    //   }
    // },
    // async fetchMunicipalities(selected) {
    //   if (this.isFetchingMunicipality) {
    //     return;
    //   }
    //   this.isFetchingMunicipality = true;
    //   this.municipality = null;
    //   try {
    //     const { data } = await this.$axios.get(
    //       `/api/barangay/municipality/list?regioncode=${this.reg.regioncode}&provincecode=${selected.provincecode}`,
    //     );
    //     this.$store.commit('qat/setMunicipality', data.data || []);

    //   } catch (error) {
    //     this.apiErrorMessage(error);
    //   } finally {
    //     this.isFetchingMunicipality = false;
    //   }
    // },
    // async fetchBarangay(selected) {
    //   if (this.isFetchingBarangay) {
    //     return;
    //   }
    //   this.isFetchingBarangay = true;
    //   this.barangay = null;
    //   try {
    //     const { data } = await this.$axios.get(
    //       `/api/barangay/barangay/list?regioncode=${this.reg.regioncode}&provincecode=${this.prov.provincecode}&municipalitycode=${selected.municipalitycode}`,
    //     );
    //     this.$store.commit('qat/setBarangay', data.data || []);
    //   } catch (error) {
    //     this.apiErrorMessage(error);
    //   } finally {
    //     this.isFetchingBarangay = false;
    //   }
    // },
    // getLocation(selected) {
    //   this.$store.commit('qat/setBarangayId', selected.id);
    //   this.$store.commit('qat/setLocationCode', selected.psgcCode);
    // },
    updateParent() {
      if (this.form.bdrrm_plan) {
        if (!this.form.ref_documents.includes(this.question.bdrrm_plan)) {
          this.form.ref_documents.push(this.question.bdrrm_plan);
          this.addRefDoc(this.question.bdrrm_plan);
        }
      } else {
        const index = this.form.ref_documents.indexOf(this.question.bdrrm_plan);
        if (index > -1) {
          this.form.ref_documents.splice(index, 1);
          this.removeRefDoc(index);
        }
      }

      const ref = this.form.ref_documents;
      const parent = this.ref_documents;

      // Find differences between the two arrays and update accordingly
      ref.forEach(item => {
        if (!parent.includes(item)) {
          this.addRefDoc(item);
        }
      });

      parent.forEach(item => {
        if (!ref.includes(item)) {
          this.removeRefDoc(parent.indexOf(item));
        }
      });
    },
    changeBdrrmPlans(){
      const ref = this.form.bdrrm_plans;
      const parent = this.bdrrm_plans;
      ref.forEach(item => {
        if (!parent.includes(item)) {
          this.addBdrrmPlans(item);
        }
      });

      parent.forEach(item => {
        if (!ref.includes(item)) {
          this.removeBdrrmPlans(parent.indexOf(item));
        }
      });
    },
  },
};
</script>
