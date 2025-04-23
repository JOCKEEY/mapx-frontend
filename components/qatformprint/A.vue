<template>
  <section>
    <div class="red--text mt-5 text-center text-md-left">
      <b>
        A. ORGANIZATION OF BARANGAY DISASTER RISK REDUCTION AND MANAGEMENT
        STRUCTURE
      </b>
    </div>
    <v-card class="mt-2 pa-md-12 pa-4">
      <v-row>
        <v-col cols="12">
          <div class="blue lighten-3 pa-1">
            <div class="text-center black--text text-subtitle-2">
              <p class="mt-4">
                <b>
                  A1. BARANGAY DRRM COMMITTEE IS ORGANIZED AND SATISFIES THE FOLLOWING CRITERIA
                </b>
              </p>
            </div>
          </div>
        </v-col>
      </v-row>

      <!-- Criteria Section -->
      <v-row>
        <v-col cols="12">
          <div class="text-h5 orange--text text-center text-md-left">
            <v-icon color="orange" medium>mdi-pen</v-icon> Criteria:
          </div>
        </v-col>
      </v-row>  

      <v-row>
        <v-col v-for="(value,index) in questions.a1" :key="value + index" class="pa-0" cols="12">
          <v-row v-if="typeof(value) === 'string'">
            <v-col cols="12">
              <v-checkbox
                v-model="form.a1_criteria"
                :label="value"
                :value="value"
                readonly
                @change="handleCriteria(value,'a1_criteria')"
              />
              <v-divider />
            </v-col>
          </v-row>

          <v-row v-else>
            <v-col cols="12">
              <v-row>
                <v-col cols="12" sm="6">
                  <v-checkbox
                    v-model="form.a1_criteria"
                    :label="value.text"
                    :value="value.text"
                    readonly
                    @change="handleCriteria(value.text,'a1_criteria')"
                  />
                </v-col>
                <v-divider inset vertical />
                <v-col cols="12" sm="6">
                  <v-simple-table class="summary-table">
                    <tbody>
                      <tr v-for="data, i in value.data" :key="data+i">
                        <td>
                          <v-checkbox
                            v-model="form.a1_e"
                            :label="data"
                            :value="data"
                            :disabled="!form.a1_criteria.includes(questions.a1.e.text)"
                            class="pa-0"
                            readonly
                            @change="handleCriteria(data,'a1_e')"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </v-simple-table>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <!-- Remarks Section -->
      <v-row>
        <v-col cols="12">
          <p class="text-body-1 text-md-left text-center">
            <b>REMARKS</b>
            <i>(Please record your findings and analysis on the identified gaps pertaining to this Quality Benchmark.)</i>
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="a1_remarks"
            label="Remarks"
            prepend-icon="mdi-comment-outline"
            readonly
            @change="handleCriteria(a1_remarks,'a1_remarks')"
          />
        </v-col>
      </v-row>

      <!-- Rating Section -->
      <v-row>
        <v-col
          class="yellow darken-2 rounded-lg white--text"
          cols="12"
        >
          <v-row justify="end">
            <v-tooltip :top="isTop" :bottom="!isTop">
              <template #activator="{ on, attrs }">
                <v-btn
                  class="mx-2"
                  color="blue"
                  fab
                  small
                  dark
                  v-bind="attrs"
                  v-on="on"
                  @mouseenter="checkPosition"
                >
                  ?
                </v-btn>
              </template>
              <span>
                <table>
                  <tbody>
                    <tr>
                      <td>3</td>
                      <td>
                        If criteria A to E with at least 5 sub-sections under E are present in the BDRRM Plan
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>If criteria A to C are present in the plan</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>
                        If any of the criteria from A to E with at least 5 sub-sections under E are present
                      </td>
                    </tr>
                    <tr>
                      <td>0</td>
                      <td>If none of the criteria are present in the plan</td>
                    </tr>
                  </tbody>
                </table>
              </span>
            </v-tooltip>
          </v-row>
          <v-row justify="center">
            <div class="text-h4 mb-2">Rating [A1]: {{ a1_score }}</div>
          </v-row>
        </v-col>
      </v-row>


      <v-row>
        <v-col cols="12">
          <div class="blue lighten-3 pa-1">
            <div class="text-center black--text text-subtitle-2">
              <p class="mt-4">
                <b>
                  A2. BARANGAY DRRM COMMITTEE IS FUNCTIONAL AND SATISFIES THE FOLLOWING CRITERIA
                </b>
              </p>
            </div>
          </div>
        </v-col>
      </v-row>

      <!-- Criteria Section -->
      <v-row>
        <v-col cols="12">
          <div class="text-h6 text-md-h5 orange--text">
            <v-icon color="orange" medium>mdi-pen</v-icon> Criteria:
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="(value, index) in questions.a2" :key="value + index" class="pa-0 col-12">
          <v-row v-if="typeof(value) === 'string'">
            <v-col cols="12">
              <v-checkbox
                v-model="form.a2_criteria"
                :label="value"
                :value="value"
                readonly
                @change="handleCriteria(value, 'a2_criteria')"
              />
              <v-divider />
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col cols="12">
              <v-row>
                <v-col cols="12" md="6">
                  <v-checkbox
                    v-model="form.a2_criteria"
                    :label="value.text"
                    :value="value.text"
                    readonly
                    @change="handleCriteria(value.text, 'a2_criteria')"
                  />
                </v-col>
                <v-divider inset vertical />
                <v-col cols="12" md="6">
                  <v-simple-table class="summary-table">
                    <tbody>
                      <tr v-for="data, i in value.data" :key="data+i">
                        <td>
                          <v-checkbox
                            v-model="form.a2_e"
                            :label="data"
                            :value="data"
                            readonly
                            :disabled="!form.a2_criteria.includes(questions.a2.e.text)"
                            class="pa-0"
                            @change="handleCriteria(data, 'a2_e')"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </v-simple-table>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <!-- Remarks Section -->
      <v-row>
        <v-col cols="12">
          <p>
            <b>REMARKS</b>
            <i>
              (Please record your findings and analysis on the identified
              gaps pertaining to this Quality Benchmark. What are the gaps, and why are they not in place?)
            </i>
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="a2_remarks"
            label="Remarks"
            prepend-icon="mdi-comment-outline"
            readonly
            @change="handleCriteria(a2_remarks, 'a2_remarks')"
          />
        </v-col>
      </v-row>

      <!-- Rating Section -->
      <v-row>
        <v-col cols="12" sm="12" md="12" class="yellow darken-2 rounded-lg white--text pa-3">
          <v-row justify="end">
            <v-tooltip :top="isTop" :bottom="!isTop">
              <template #activator="{ on, attrs }">
                <v-btn
                  class="mx-2"
                  color="blue"
                  fab
                  small
                  dark
                  v-bind="attrs"
                  v-on="on"
                  @mouseenter="checkPosition"
                >
                  ?
                </v-btn>
              </template>
              <span>
                <table>
                  <tbody>
                    <tr>
                      <td>3</td>
                      <td>If criteria A to E with at least 5 sub-sections under E are present in the BDRRM Plan</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>If criteria A to C are present in the plan</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>If any of the criteria from A to E are present</td>
                    </tr>
                    <tr>
                      <td>0</td>
                      <td>If none of the criteria are present in the plan</td>
                    </tr>
                  </tbody>
                </table>
              </span>
            </v-tooltip>
          </v-row>
          <v-row justify="center">
            <div class="text-h4 mb-2">
              Rating [A2]: {{ a2_score }}
            </div>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </section>
</template>
<script>
import { mapGetters,mapActions} from 'vuex';
import globalMixin from '@/mixins/global';
export default {
    name: 'QatformprintA',
    mixins: [globalMixin],
    props: {},
    data() {
      return {
        form: {
          a1_criteria: [],
          a1_e: [],
          a1_remarks: '',
          a1_score: 0,
          a2_criteria: [],
          a2_remarks: '',
          a2_score: 0,
        },
        questions: {
          a1: {
            a: 'A. With illustrative organizational structure of the BDRRM Committee (i.e organogram) reflecting the four thematic areas i.e. Preparedness, Prevention and Mitigation Response, Recovery and Rehabilitation - as mandated by RA 10121',
            b: 'B. Members of the BDRRM Committee are identified with representing organizations',
            c: 'C. Has specified roles and responsibilities of the BDRRMC',
            d: 'D. With regular quarterly meetings of the BDRRMC',
            e: {
              text: 'E. With task identified for each of the BDRRMC members/sub-committees that are specific to at least five (5) of the following functions:',
              data: [
                'Operations/Admin',
                'Research and Planning',
                'Transportation',
                'Communication and Warning',
                'Security and Safety',
                'Education',
                'Protection',
                'Damage Control',
                'Rapid Damage Assessment and Needs Analysis',
                'Search, Rescue and Retrieval',
                'Evacuation and Camp Management',
                'Relief Distribution',
                'Health/First Aid and Psychosocial Support',
                'Fire Management',
                'Post Damage Assessment and Needs Analysis',
                'Livelihood',
                'Infrastructure/Shelter',
              ],
            },
          },
          a2: {
            a2: 'A. At least 2 civil society organizations representing most vulnerable and marginalized sectors such as children, women, pregnant and lactating mothers, persons with disability, elderly and indigenous people',
            b2: 'B. Schools are represented by the appointed DRRM Coordinator, School Principal or person in authority',
            c2: 'C. Faith-based organizations',
            d2: 'D. Livelihood sectors (ex. fisher folks, farmers, business, cooperatives, informal workers)',
            e2: 'E. Environmental sector (if there is any)',
          },
        },
        isTop: true, 
      };
    },
    computed: {
      ...mapGetters('qat',[
        'a1_criteria',
        'a1_e',
        'a1_remarks',
        'a1_score',
        'a2_criteria',
        'a2_remarks',
        'a2_score',
      ]),
      a1_remarks: {
        set(val){
          this.$store.commit('qat/setA1Remarks', val);
        },
        get(){
          return this.$store.state.qat.a1_remarks;
        },
      },
      a2_remarks: {
        set(val){
          this.$store.commit('qat/setA2Remarks', val);
        },
        get(){
          return this.$store.state.qat.a2_remarks;
        },
      },
    },
    watch: {
      a1_criteria: {
        immediate: true,
        handler(data) {
          this.form.a1_criteria = JSON.parse(JSON.stringify(data));
        },
      },
      a1_e: {
        immediate: true,
        handler(data) {
          this.form.a1_e = JSON.parse(JSON.stringify(data));
        },
      },
      a1_remarks: {
        immediate: true,
        handler(data) {
          this.form.a1_remarks = JSON.parse(JSON.stringify(data));
        },
      },
      a1_score: {
        immediate: true,
        handler(data) {
          this.form.a1_score = JSON.parse(JSON.stringify(data));
        },
      },
      a2_criteria: {
        immediate: true,
        handler(data) {
          this.form.a2_criteria = JSON.parse(JSON.stringify(data));
        },
      },
      a2_remarks: {
        immediate: true,
        handler(data) {
          this.form.a2_remarks = JSON.parse(JSON.stringify(data));
        },
      },
      a2_score: {
        immediate: true,
        handler(data) {
          this.form.a2_score = JSON.parse(JSON.stringify(data));
        },
      },
    },
    created() {
    },
    methods: {
      ...mapActions('qat', [
        'addA1Criteria',
        'removeA1Criteria',
        'addA1E',
        'removeA1E',
        'addA2Criteria',
        'removeA2Criteria',
      ]),
      close() {
        this.$emit('toggle')
      },
      onDelete() {
        this.$emit('delete')
      },
      checkPosition(event) {
          const buttonPosition = event.target.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          this.isTop = buttonPosition > windowHeight / 2;
      },
      handleCriteria(item,field) {
        if (typeof this.form[field] === 'object') {          
          if (this.form[field]) {
            if (!this[field].includes(item)) {
              switch (field) {
                case 'a1_criteria':
                  this.addA1Criteria(item);
                  break;
                case 'a1_e':
                  this.addA1E(item);
                  break;
                case 'a2_criteria':
                  this.addA2Criteria(item);
                  break;
              }
                this.form[field].push(item);
            }else{
              this.form[field].splice( this.form[field].indexOf(item), 1);
              switch (field) {
                case 'a1_criteria':
                  this.removeA1Criteria(this[field].indexOf(item));
                  break;
                case 'a1_e':
                  this.removeA1E(this[field].indexOf(item));
                  break;
                case 'a2_criteria':
                  this.removeA2Criteria(this[field].indexOf(item));
                  break;
              }
            }
          }          
        }else{
          this.form[field] = item;
        }

        const a1 = this.a1_criteria;
        const a1q = this.questions.a1;
        if (a1.includes(a1q.a) && a1.includes(a1q.b) && a1.includes(a1q.c) && a1.includes(a1q.d) && a1.includes(a1q.e.text) && this.a1_e.length >= 5) {
          this.$store.commit('qat/setA1Score', 3);
        }else if (a1.includes(a1q.a) && a1.includes(a1q.b) && a1.includes(a1q.c)) {
          this.$store.commit('qat/setA1Score', 2);
        }else if (a1.includes(a1q.a) || a1.includes(a1q.b) || a1.includes(a1q.c) || a1.includes(a1q.d) || a1.includes(a1q.e.text) && this.a1_e.length >= 5){
          this.$store.commit('qat/setA1Score', 1);
        }else{
          this.$store.commit('qat/setA1Score', 0);
        }

        const a2 = this.a2_criteria;
        const a2q = this.questions.a2;
        if (a2.includes(a2q.a2) && a2.includes(a2q.b2) && a2.includes(a2q.c2) && a2.includes(a2q.d2) && a2.includes(a2q.e2)) {
          this.$store.commit('qat/setA2Score', 3);

        }else if (
            a2.includes(a2q.a2) && 
            (
              a2.includes(a2q.b2) || 
              a2.includes(a2q.c2) || 
              a2.includes(a2q.d2) || 
              a2.includes(a2q.e2) 
            ) || 
              a2.includes(a2q.b2) && 
              (
                a2.includes(a2q.a2) || 
                a2.includes(a2q.c2) || 
                a2.includes(a2q.d2) || 
                a2.includes(a2q.e2)
              )
        ) {
          this.$store.commit('qat/setA2Score', 2);
        }else if (
                a2.includes(a2q.a2) || 
                a2.includes(a2q.b2) || 
                a2.includes(a2q.c2) || 
                a2.includes(a2q.d2) || 
                a2.includes(a2q.e2)
          ) {
          this.$store.commit('qat/setA2Score',1);
        }else{
          this.$store.commit('qat/setA2Score', 0);
        }
      },
    },
  }
  </script>
  