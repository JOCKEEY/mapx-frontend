<template>
  <section>
    <!-- Innovative Approach Section -->
    <div class="red--text mt-5">
      <p class="font-weight-bold">INNOVATIVE APPROACH TO DRRM</p>
    </div>
    <v-card class="mt-2 pa-4 pa-md-6 pa-lg-12">
      <v-row>
        <v-col cols="12">
          <div class="blue lighten-3 pa-2">
            <div class="text-center black--text text-subtitle-2">
              <p class="mt-4">
                <b>NOTE</b> (Please record any Disaster Risk Reduction and Management innovations by the barangay as reflected in the plan i.e. initiatives that your barangay is doing differently through which you are demonstrating results.)
              </p>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="drrm_innovations"
            placeholder="Type your innovative approach here..."
            prepend-icon="mdi-comment-outline"
          />
        </v-col>
      </v-row>
    </v-card>

    <!-- DRRM Budgeting Section -->
    <div class="red--text mt-5 d-none">
      <p class="font-weight-bold">BARANGAY DISASTER RISK REDUCTION AND MANAGEMENT BUDGETING</p>
    </div>
    <v-card class="mt-2 pa-4 pa-md-6 pa-lg-12 d-none">
      <v-row>
        <v-col cols="12">
          <div class="blue lighten-3 pa-2">
            <div class="text-center black--text text-subtitle-2">
              <p class="mt-4">
                <i>(How much DRRM budget was allocated in the previous planning cycle/year as indicated in the BDRRM plan? What percentage was utilized? How much is the allocated amount after updating the BDRRM plan?)</i>
              </p>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-simple-table>
            <thead>
              <tr>
                <th><b>TOTAL DRRM BUDGET FROM PREVIOUS PLANNING CYCLE/YEAR (PHP)</b></th>
                <th><b>DRRM BUDGET UTILIZATION FROM PREVIOUS PLANNING CYCLE/YEAR (%)</b></th>
                <th><b>TOTAL DRRM BUDGET AFTER UPDATING OF PLAN (PHP)</b></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in form.bdrrm_budgeting" :key="index">
                <td>
                  <v-text-field 
                    v-model="form.bdrrm_budgeting[index].budget_before"
                    @input="onInputBudget(index)"
                  />
                </td>
                <td>
                  <v-text-field
                    v-model="form.bdrrm_budgeting[index].budget_after_bdrrmp"
                    @input="onInputBudget(index)"
                  />
                </td>
                <td>
                  <v-text-field
                    v-model="form.bdrrm_budgeting[index].budget_utilization_before"
                    @input="onInputBudget(index)"
                  />
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-card>

    <!-- Recommendations Section -->
    <div class="red--text mt-5">
      <p class="font-weight-bold">PART II. RECOMMENDATIONS FOR IMPROVEMENT OF THE PLAN</p>
    </div>
    <v-card class="mt-2 pa-4 pa-md-6 pa-lg-12">
      <v-row>
        <v-col cols="12">
          <div class="blue lighten-3 pa-2">
            <div class="text-center black--text text-subtitle-2">
              <p class="mt-4">
                Identify major findings (per element) based on the review of the plan and recommend action steps for improvement. Discuss this with the local DRRM Committee/focal person/community members and ask them about the assistance and timeframe needed to perform the recommended actions and address the gaps.
              </p>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-for="(item, index) in form.major_findings_review"
          :key="index"
          cols="12"
          md="6"
          lg="4"
        >
          <div class="mb-4">
            <p class="red--text font-weight-bold">Summary of Gaps for {{ item.element }}</p>
            <p>SCORE IN QB {{ item.element }} is {{ convertData(item,'score') }}</p>
            <p>REMARKS: {{ convertData(item,'remarks') }}</p>
          </div>
          <v-row>
            <v-col cols="12">
              <label for="" class="grey--text"><small>Recommendation and Actions</small></label>
              <v-text-field
                v-model="form.major_findings_review[index].recommendation_actions"
                @input="onInputSummary(index)"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <label for="" class="grey--text"><small>Technical Assistance Needs</small></label>
              <v-text-field
                v-model="form.major_findings_review[index].technical_assistance_need"
                @input="onInputSummary(index)"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <label for="" class="grey--text"><small>Technical Assistance Provider</small></label>
              <v-text-field
                v-model="form.major_findings_review[index].technical_assistance_provider"
                @input="onInputSummary(index)"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <label for="" class="grey--text"><small>Timeframe</small></label>
              <v-text-field
                v-model="form.major_findings_review[index].timeframe"
                @input="onInputSummary(index)"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import globalMixin from '~/mixins/global';
export default {
    name: 'QatformSummary',
    mixins: [globalMixin],
    props: {},
    data() {
      return{
        form : {
          drrm_innovations: '',
          bdrrm_budgeting: [],
          major_findings_review: [],
        },
      };
    },
    computed: {
      ...mapGetters('qat',[
        'drrm_innovations',
        'bdrrm_budgeting',
        'major_findings_review',
      ]),
      drrm_innovations: {
        set(val){
          this.$store.commit('qat/setDrrmInnovations', val);
        },
        get(){
          return this.$store.state.qat.drrm_innovations;
        },
      },
      bdrrm_budgeting: {
        set(val){
          this.$store.commit('qat/setBdrrmBudgeting', val);
        },
        get(){
          return this.$store.state.qat.bdrrm_budgeting;
        },
      },
      major_findings_review: {
        set(val){
          this.$store.commit('qat/setMajorFindingsReview', val);
        },
        get(){
          return this.$store.state.qat.major_findings_review;
        },
      },
    },
    watch: {
      drrm_innovations: {
        immediate: true,
        handler(data) {
          this.form.drrm_innovations = JSON.parse(JSON.stringify(data));
        },
      },
      major_findings_review: {
        immediate: true, 
        deep: true,
        handler(data) {
          this.form.major_findings_review = JSON.parse(JSON.stringify(data));
        },
      },
      bdrrm_budgeting: {
        immediate: true,
        handler(data) {
          this.form.bdrrm_budgeting = JSON.parse(JSON.stringify(data));
        },
      },
    },
    methods: {
      ...mapActions('qat', [
      'updateBudget',
      'updateMajorFindings',
      ]),
      onInputBudget(index){
        const updatedBdrrmBudgeting = this.form.bdrrm_budgeting[index];
        this.updateBudget({ index, updatedBdrrmBudgeting });
      },
      onInputSummary(index){
        const updatedMajorFindingsReview = this.form.major_findings_review[index];
        this.updateMajorFindings({ index, updatedMajorFindingsReview });
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
    },
  }
  </script>
  