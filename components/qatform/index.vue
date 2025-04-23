<template>
  <v-sheet class="pa-0">
    <div class="fixed-buttons">
      <v-btn
        v-for="(component, index) in components"
        :key="index"
        icon
        outlined
        small
        @click="scrollToComponent(component.name)"
      >
        <v-icon v-if="component.icon">{{ component.icon }}</v-icon>
        {{ component.abbrevation }}
      </v-btn>
    </div>
    
    <!-- <div class="fixed-left">
      <v-tooltip left>
        <template #activator="{ on, attrs }">
          <v-btn
            class="white--text info"
            icon
            outlined
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-file-pdf-box</v-icon>
          </v-btn>
        </template>
        <span>Export pdf</span>
      </v-tooltip>
    </div> -->
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title class="text-h5">Information</v-card-title>
        <v-card-text>
          <v-text-field v-model="draftLocation" label="Name of Draft" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="green darken-1" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="green darken-1" text @click="saveLocalStorage">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    <div ref="QatformPreliminary">
      <QatformPreliminary />
    </div>
    <div ref="QatformA">
      <QatformA />
    </div>
    <div ref="QatformB">
      <QatformB />
    </div>
    <div ref="QatformC">
      <QatformC />
    </div>
    <div ref="QatformD">
      <QatformD />
    </div>
    <div ref="QatformE">
      <QatformE />
    </div>
    <div ref="QatformF">
      <QatformF />
    </div>
    <div ref="QatformG">
      <QatformG />
    </div>
    <div ref="QatformH">
      <QatformH />
    </div>
    <div ref="QatformI">
      <QatformI />
    </div>
    <div ref="QatformSummary">
      <QatformSummary />
    </div>
    
    <v-card class="mt-3 pa-12">
      <v-row>
        <v-col cols="12" md="6">
          <v-btn class="col-12" color="info" @click.stop="saveAsDraft">
            <v-icon>mdi-paperclip</v-icon>
            Save as Draft
          </v-btn>
        </v-col>
        <v-col cols="12" md="6">
          <v-btn class="col-12" color="green white--text" @click="finalizedSubmission">
            Finalize
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-if="!finalized" cols="12">
          Please click the finalize button for the final submission.
        </v-col>
      </v-row>
      <v-row v-if="finalized">
        <v-col cols="12" md="6">
          <v-row>
            <v-col cols="12">
              <v-simple-table ref="scoretable" class="summary-table" dense>
                <p>Ratings:</p>
                <tbody>
                  <tr v-for="(item, index) in major_findings_review" :key="item + index">
                    <td style="width: 40px"><b>{{ item.element }}:</b></td>
                    <td>{{ convertData(item, 'score') }}</td>
                  </tr>
                  <tr :class="scoreInterpretation.color" class="lighten-1 pa-1">
                    <td><b>Total:</b></td>
                    <td>{{ total_score }}</td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6">
          <v-row>
            <v-col cols="12">
              <v-checkbox v-model="confirmed" label="I hereby confirm that the response are valid and correct" />
              <v-btn :disabled="!confirmed" color="green" block dark @click="saveForm">
                <v-icon>mdi-content-save</v-icon>
                Submit
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <p>Interpretation</p>
              <div class="lighten-1 pa-5" :class="scoreInterpretation.color">
                <div class="text-center black--text text-subtitle-2">
                  <p class="text-h5 mt-4">{{ scoreInterpretation.text }}</p>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-sheet>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import globalMixin from '@/mixins/global';
export default {
  name: 'QatForm',
  mixins: [globalMixin],
  data() {
    return {
      localStorageKeys: [],
      draftName: '',
      draftLocation: '',
      dialog: false,
      isSaving: false,
      components: [
        {
          name: 'QatformPreliminary',
          abbrevation: '',
          icon: 'mdi-chevron-up',
        },
        {
          name: 'QatformA',
          abbrevation: 'A',
          icon: '',
        },
        {
          name: 'QatformB',
          abbrevation: 'B',
          icon: '',
        },
        {
          name: 'QatformC',
          abbrevation: 'C',
          icon: '',
        },
        {
          name: 'QatformD',
          abbrevation: 'D',
          icon: '',
        },
        {
          name: 'QatformE',
          abbrevation: 'E',
          icon: '',
        },
        {
          name: 'QatformF',
          abbrevation: 'F',
          icon: '',
        },
        {
          name: 'QatformG',
          abbrevation: 'G',
          icon: '',
        },
        {
          name: 'QatformH',
          abbrevation: 'H',
          icon: '',
        },
        {
          name: 'QatformI',
          abbrevation: 'I',
          icon: '',
        },
        {
          name: 'QatformSummary',
          abbrevation: '',
          icon: 'mdi-chevron-down',
        },
      ],
      ratingItems: [],
      finalized: false,
      confirmed: false,
      scoreInterpretation: { text: '', color: '' },
      scoreItems: [],
      form: {},
      preliminaryData: {},
      defaultForm: null,
      drawer: null,
    };
  },
  
  computed: {
    ...mapGetters('qat',[
        'years_covered',
        'date_assessed',
        'reviewers',
        'respondents',
        'bdrrm_plans',
        'ref_documents',
        'a1_criteria',
        'a1_e',
        'a1_remarks',
        'a1_score',
        'a2_criteria',
        'a2_remarks',
        'a2_score',
        'b1_criteria',
        'b1_a',
        'b1_b',
        'b1_remarks',
        'b1_score',
        'b2_criteria',
        'b2_c',
        'b2_d',
        'b2_remarks',
        'b2_score',
        'c1_criteria',
        'c1_a',
        'c1_b',
        'c1_c',
        'c1_remarks',
        'c1_score',
        'd1_criteria',
        'd1_a',
        'd1_b',
        'd1_remarks',
        'd1_score',
        'e1_criteria',
        'e1_a',
        'e1_a_others',
        'e1_a_has_addtional_cap_building',
        'e1_a_capacity_building',
        'e1_b',
        'e1_b_other_procurement',
        'e1_remarks',
        'e1_score',
        'f1_criteria',
        'f1_c',
        'f1_remarks',
        'f1_score',
        'g1_criteria',
        'g1_a',
        'g1_b',
        'g1_remarks',
        'g1_score',
        'h1_criteria',
        'h1_remarks',
        'h1_score',
        'h1_local_policies',
        'i1_criteria',
        'i1_c',
        'i1_remarks',
        'i1_score',
        'i2_criteria',
        'i2_d',
        'i2_remarks',
        'i2_score',
        'drrm_innovations',
        'bdrrm_budgeting',
        'major_findings_review',
        'total_score',
        'location_code',
        'barangay_id',
        'reg',
        'prov',
        'mun',
        'brgy',
      ]),
  },
  watch: {
    // regions(value) {
    //   this.regions = value;
    // },
    // provinces(value) {
    //   this.provinces = value;
    // },
    // municipalities(value) {
    //   this.municipalities = value;
    // },
    // barangays(value) {
    //   this.barangays = value;
    // },
    localStorageKeys(value){
      this.localStorageKeys = value;
    },
    years_covered(value) {
      this.form.years_covered = value;
    },
    date_assessed(value) {
      this.form.date_assessed = value;
    },
    reviewers(value) {
      this.form.reviewers = value;
    },
    respondents(value) {
      this.form.respondents = value;
    },
    bdrrm_plans(value) {
      this.form.bdrrm_plans = value;
    },
    ref_documents(value) {
      this.form.ref_documents = value;
    },
    a1_criteria(value) {
      this.form.a1_criteria = value;
    },
    a1_e(value) {
      this.form.a1_e = value;
    },
    a1_remarks(value) {
      this.form.a1_remarks = value;
    },
    a1_score(value) {
      this.form.a1_score = value;
    },
    a2_criteria(value) {
      this.form.a2_criteria = value;
    },
    a2_remarks(value) {
      this.form.a2_remarks = value;
    },
    a2_score(value) {
      this.form.a2_score = value;
    },
    b1_criteria(value) {
      this.form.b1_criteria = value;
    },
    b1_a(value) {
      this.form.b1_a = value;
    },
    b1_b(value) {
      this.form.b1_b = value;
    },
    b1_remarks(value) {
      this.form.b1_remarks = value;
    },
    b1_score(value) {
      this.form.b1_score = value;
    },
    b2_criteria(value) {
      this.form.b2_criteria = value;
    },
    b2_c(value) {
      this.form.b2_c = value;
    },
    b2_d(value) {
      this.form.b2_d = value;
    },
    b2_remarks(value) {
      this.form.b2_remarks = value;
    },
    b2_score(value) {
      this.form.b2_score = value;
    },
    c1_criteria(value) {
      this.form.c1_criteria = value;
    },
    c1_a(value) {
      this.form.c1_a = value;
    },
    c1_b(value) {
      this.form.c1_b = value;
    },
    c1_c(value) {
      this.form.c1_c = value;
    },
    c1_remarks(value) {
      this.form.c1_remarks = value;
    },
    c1_score(value) {
      this.form.c1_score = value;
    },
    d1_criteria(value) {
      this.form.d1_criteria = value;
    },
    d1_a(value) {
      this.form.d1_a = value;
    },
    d1_b(value) {
      this.form.d1_b = value;
    },
    d1_remarks(value) {
      this.form.d1_remarks = value;
    },
    d1_score(value) {
      this.form.d1_score = value;
    },
    e1_criteria(value) {
      this.form.e1_criteria = value;
    },
    e1_a(value) {
      this.form.e1_a = value;
    },
    e1_a_others(value) {
      this.form.e1_a_others = value;
    },
    e1_a_has_addtional_cap_building(value) {
      this.form.e1_a_has_addtional_cap_building = value;
    },
    e1_a_capacity_building(value) {
      this.form.e1_a_capacity_building = value;
    },
    e1_b(value) {
      this.form.e1_b = value;
    },
    e1_b_other_procurement(value) {
      this.form.e1_b_other_procurement = value;
    },
    e1_remarks(value) {
      this.form.e1_remarks = value;
    },
    e1_score(value) {
      this.form.e1_score = value;
    },
    f1_criteria(value) {
      this.form.f1_criteria = value;
    },
    f1_c(value) {
      this.form.f1_c = value;
    },
    f1_remarks(value) {
      this.form.f1_remarks = value;
    },
    f1_score(value) {
      this.form.f1_score = value;
    },
    g1_criteria(value) {
      this.form.g1_criteria = value;
    },
    g1_a(value) {
      this.form.g1_a = value;
    },
    g1_b(value) {
      this.form.g1_b = value;
    },
    g1_remarks(value) {
      this.form.g1_remarks = value;
    },
    g1_score(value) {
      this.form.g1_score = value;
    },
    h1_criteria(value) {
      this.form.h1_criteria = value;
    },
    h1_remarks(value) {
      this.form.h1_remarks = value;
    },
    h1_score(value) {
      this.form.h1_score = value;
    },
    h1_local_policies(value) {
      this.form.h1_local_policies = value;
    },
    i1_criteria(value) {
      this.form.i1_criteria = value;
    },
    i1_c(value) {
      this.form.i1_c = value;
    },
    i1_remarks(value) {
      this.form.i1_remarks = value;
    },
    i1_score(value) {
      this.form.i1_score = value;
    },
    i2_criteria(value) {
      this.form.i2_criteria = value;
    },
    i2_d(value) {
      this.form.i2_d = value;
    },
    i2_remarks(value) {
      this.form.i2_remarks = value;
    },
    i2_score(value) {
      this.form.i2_score = value;
    },
    drrm_innovations(value) {
      this.form.drrm_innovations = value;
    },
    bdrrm_budgeting(value) {
      this.form.bdrrm_budgeting = value;
    },
    major_findings_review(value) {
      this.form.major_findings_review = value;
    },
    total_score(value) {
      this.form.total_score = value;
    },
    location_code(value) {
      this.form.location_code = value;
    },
    barangay_id(value) {
      this.form.barangay_id = value;
    },
    reg(value) {
      this.form.reg = value;
    },
    prov(value) {
      this.form.prov = value;
    },
    mun(value) {
      this.form.mun = value;
    },
    brgy(value) {
      this.form.brgy = value;
    },
  },

  created() {
    this.fetchRegion();
    this.defaultForm = JSON.stringify(this.form);
  },

  mounted() {
    this.$store.dispatch('setPageTitle', 'Quality Assessment Tool');
  },

  methods: {
    ...mapActions('qat',[
      'resetStore',
      'initializeFromLocalStorage',
    ]),
    async fetchRegion() {
      try {
        const { data } = await this.$axios.get('/api/barangay/region/list');
        const sortedRegions = data.data.sort((a, b) => {
          const numA = parseInt(a.regioncode.substring(2), 10);
          const numB = parseInt(b.regioncode.substring(2), 10);
          return numA - numB;
        });
        this.$store.commit('qat/setRegion', sortedRegions);
      } catch (error) {
        this.apiErrorMessage(error);
      }
    },
    scrollToComponent(refName) {
      const element = this.$refs[refName];
      if (element && element.scrollIntoView) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },
    validate() {
      if (
        this.reg === '' ||
        this.mun === '' ||
        this.prov === '' ||
        this.brgy === ''
      ) {
        const requiredLocation = {
        reg: 'Region',mun: 'Municipality',prov: 'Province',brgy: 'Barangay',
      }
        for (const [key, value] of Object.entries(requiredLocation)) {
          if (!this[key]) {
            this.apiErrorMessage(`Please Fill-out ${value}`);
            return false;
          }
        }
      }
      const requiredRemarks = [
        'a1_remarks', 'a2_remarks', 'b1_remarks', 'b2_remarks',
        'c1_remarks', 'd1_remarks', 'e1_remarks', 'f1_remarks',
        'g1_remarks', 'h1_remarks', 'i1_remarks', 'i2_remarks',
      ];

      for (const field of requiredRemarks) {
        if (!this[field]) {
          const title = field.split('_');
          const finalTitle =  title[0].toLocaleUpperCase() +' '+ title[1].toLocaleUpperCase();
          this.apiErrorMessage(`Please Fill-out ${finalTitle}`);
          return false;
        }
      }

      for (const item of this.major_findings_review) {        
        const { 
          element, 
          timeframe, 
          recommendation_actions:recommendationActions,
          technical_assistance_need:technicalAssistanceNeed,
          technical_assistance_provider:technicalAssistanceProvider,
        } = item;
        if (
          !timeframe ||
          !recommendationActions ||
          !technicalAssistanceNeed ||
          !technicalAssistanceProvider
        ) {          
          this.apiErrorMessage(`Fields are empty for Summary Gaps for ${element}`);
          return false;
        }
      }
      return true;
    },
    async saveForm() {
      const validate = this.validate();
      if (!validate) {
        return;
      }

      if (this.isSaving) {
        return;
      }
      this.isSaving = true;
      try {
        this.form = {
          ...JSON.parse(JSON.stringify(this.form)),
         years_covered: this.years_covered,
         date_assessed: this.date_assessed,
         reviewers: this.reviewers,
         respondents: this.respondents,
         bdrrm_plans: this.bdrrm_plans,
         ref_documents: this.ref_documents,
         a1_criteria: this.a1_criteria,
         a1_e: this.a1_e,
         a1_remarks: this.a1_remarks,
         a1_score: this.a1_score,
         a2_criteria: this.a2_criteria,
         a2_remarks: this.a2_remarks,
         a2_score: this.a2_score,
         b1_criteria: this.b1_criteria,
         b1_a: this.b1_a,
         b1_b: this.b1_b,
         b1_remarks: this.b1_remarks,
         b1_score: this.b1_score,
         b2_criteria: this.b2_criteria,
         b2_c: this.b2_c,
         b2_d: this.b2_d,
         b2_remarks: this.b2_remarks,
         b2_score: this.b2_score,
         c1_criteria: this.c1_criteria,
         c1_a: this.c1_a,
         c1_b: this.c1_b,
         c1_c: this.c1_c,
         c1_remarks: this.c1_remarks,
         c1_score: this.c1_score,
         d1_criteria: this.d1_criteria,
         d1_a: this.d1_a,
         d1_b: this.d1_b,
         d1_remarks: this.d1_remarks,
         d1_score: this.d1_score,
         e1_criteria: this.e1_criteria,
         e1_a: this.e1_a,
         e1_a_others: this.e1_a_others,
         e1_a_has_addtional_cap_building: this.e1_a_has_addtional_cap_building,
         e1_a_capacity_building: this.e1_a_capacity_building,
         e1_b: this.e1_b,
         e1_b_other_procurement: this.e1_b_other_procurement,
         e1_remarks: this.e1_remarks,
         e1_score: this.e1_score,
         f1_criteria: this.f1_criteria,
         f1_c: this.f1_c,
         f1_remarks: this.f1_remarks,
         f1_score: this.f1_score,
         g1_criteria: this.g1_criteria,
         g1_a: this.g1_a,
         g1_b: this.g1_b,
         g1_remarks: this.g1_remarks,
         g1_score: this.g1_score,
         h1_criteria: this.h1_criteria,
         h1_remarks: this.h1_remarks,
         h1_score: this.h1_score,
         h1_local_policies: this.h1_local_policies,
         i1_criteria: this.i1_criteria,
         i1_c: this.i1_c,
         i1_remarks: this.i1_remarks,
         i1_score: this.i1_score,
         i2_criteria: this.i2_criteria,
         i2_d: this.i2_d,
         i2_remarks: this.i2_remarks,
         i2_score: this.i2_score,
         drrm_innovations: this.drrm_innovations,
         bdrrm_budgeting: this.bdrrm_budgeting,
         major_findings_review: this.major_findings_review,
         total_score: this.total_score,
         location_code: this.location_code,
         barangay_id: this.barangay_id,
         reg: this.reg.region ?? this.reg,
         prov: this.prov.province ?? this.prov,
         mun: this.mun.municipality ?? this.mun,
         brgy: this.brgy.barangay ?? this.brgy,
        }
        await this.$axios.post('/api/qas-form/create', {
          ...this.form,
          createdBy: this.authUser.name,
        });
        this.form = JSON.parse(this.defaultForm);
        this.ratingItems = [];
        this.finalized = false;
        this.confirmed = false;
        this.scoreInterpretation = { text: '', color: '' };
        this.scoreItems = [];
        this.systemInfoMessage('The form was successfully submitted');
      } catch (error) {
        this.apiErrorMessage(error.message);
      } finally {
        this.isSaving = false;
        this.resetStore();
      }
    },

    finalizedSubmission() {
      this.ratingItems = this.major_findings_review;
      
      if (this.total_score <= 20) {
        this.scoreInterpretation = { text: 'Low Quality', color: 'red' };
      }
      if (this.total_score > 20 && this.total_score <= 30) {
        this.scoreInterpretation = { text: 'Medium Quality', color: 'yellow' };
      }
      if (this.total_score > 30 && this.total_score <= 36) {
        this.scoreInterpretation = { text: 'High Quality', color: 'green' };
      }
      this.finalized = !this.finalized;
    },
    convertData({ element }, type) {
      if (typeof element !== 'string') {
        console.warn('Invalid element value:', element);
        return;
      }

      const keySuffixMap = {
        score: '_score',
        remarks: '_remarks',
      };

      const suffix = keySuffixMap[type];
      if (!suffix) {
        console.warn('Unsupported type:', type);
        return;
      }

      const key = `${element.toLowerCase()}${suffix}`;
      const value = this.$store.state.qat[key];

      if (value !== undefined) {
        return value;
      } else {
        console.warn(`Key "${key}" does not exist in state.`);
      }
    },
    saveLocalStorage(){
      this.form = {
          ...JSON.parse(JSON.stringify(this.form)),
         years_covered: this.years_covered,
         date_assessed: this.date_assessed,
         reviewers: this.reviewers,
         respondents: this.respondents,
         bdrrm_plans: this.bdrrm_plans,
         ref_documents: this.ref_documents,
         a1_criteria: this.a1_criteria,
         a1_e: this.a1_e,
         a1_remarks: this.a1_remarks,
         a1_score: this.a1_score,
         a2_criteria: this.a2_criteria,
         a2_remarks: this.a2_remarks,
         a2_score: this.a2_score,
         b1_criteria: this.b1_criteria,
         b1_a: this.b1_a,
         b1_b: this.b1_b,
         b1_remarks: this.b1_remarks,
         b1_score: this.b1_score,
         b2_criteria: this.b2_criteria,
         b2_c: this.b2_c,
         b2_d: this.b2_d,
         b2_remarks: this.b2_remarks,
         b2_score: this.b2_score,
         c1_criteria: this.c1_criteria,
         c1_a: this.c1_a,
         c1_b: this.c1_b,
         c1_c: this.c1_c,
         c1_remarks: this.c1_remarks,
         c1_score: this.c1_score,
         d1_criteria: this.d1_criteria,
         d1_a: this.d1_a,
         d1_b: this.d1_b,
         d1_remarks: this.d1_remarks,
         d1_score: this.d1_score,
         e1_criteria: this.e1_criteria,
         e1_a: this.e1_a,
         e1_a_others: this.e1_a_others,
         e1_a_has_addtional_cap_building: this.e1_a_has_addtional_cap_building,
         e1_a_capacity_building: this.e1_a_capacity_building,
         e1_b: this.e1_b,
         e1_b_other_procurement: this.e1_b_other_procurement,
         e1_remarks: this.e1_remarks,
         e1_score: this.e1_score,
         f1_criteria: this.f1_criteria,
         f1_c: this.f1_c,
         f1_remarks: this.f1_remarks,
         f1_score: this.f1_score,
         g1_criteria: this.g1_criteria,
         g1_a: this.g1_a,
         g1_b: this.g1_b,
         g1_remarks: this.g1_remarks,
         g1_score: this.g1_score,
         h1_criteria: this.h1_criteria,
         h1_remarks: this.h1_remarks,
         h1_score: this.h1_score,
         h1_local_policies: this.h1_local_policies,
         i1_criteria: this.i1_criteria,
         i1_c: this.i1_c,
         i1_remarks: this.i1_remarks,
         i1_score: this.i1_score,
         i2_criteria: this.i2_criteria,
         i2_d: this.i2_d,
         i2_remarks: this.i2_remarks,
         i2_score: this.i2_score,
         drrm_innovations: this.drrm_innovations,
         bdrrm_budgeting: this.bdrrm_budgeting,
         major_findings_review: this.major_findings_review,
         total_score: this.total_score,
         location_code: this.location_code,
         barangay_id: this.barangay_id,
         reg: this.reg.region ?? this.reg,
         prov: this.prov.province ?? this.prov,
         mun: this.mun.municipality ?? this.mun,
         brgy: this.brgy.barangay ?? this.brgy,
        };
      try {
        localStorage.setItem(this.draftName, JSON.stringify(this.form));
        this.resetStore()
        console.log('Data saved to localStorage');
        this.ratingItems = [];
        this.finalized = false;
        this.confirmed = false;
        this.scoreInterpretation = { text: '', color: '' };
        this.scoreItems = [];
        this.dialog = false;
      } catch (error) {
        console.log('Failed to save data', error);
      }
    },
    saveAsDraft(){
      const prefix = 'Digital Quality Assessment Tool - ';
      this.draftLocation = (this.brgy.barangay ?? this.brgy);
      this.draftName = prefix+this.draftLocation;
      this.dialog = true;
    },
  },
};
</script>
<style scoped>
.fixed-buttons {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 5px;
  z-index: 1000;
}
.fixed-left {
  position: fixed;
  right: 15px;
  top: 80%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 5px;
  z-index: 999;
}
</style>
