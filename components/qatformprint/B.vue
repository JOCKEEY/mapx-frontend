<template>
  <section>
    <!-- Section Title -->
    <div class="red--text mt-5 text-center text-md-left">
      <p><b>B. RISK ASSESSMENT</b></p>
    </div>
    
    <v-card class="mt-2 pa-4 pa-sm-6 pa-md-8">
      <!-- Title Block -->
      <v-row>
        <v-col cols="12">
          <div class="blue lighten-3 pa-1">
            <div class="text-center text-subtitle-2 black--text">
              <p class="mt-4">
                <b>B1. VULNERABLE GROUPS PARTICIPATE IN COMMUNITY RISK ASSESSMENT</b>
              </p>
            </div>
          </div>
        </v-col>
      </v-row>

      <!-- Criteria Section -->
      <v-row>
        <v-col cols="12">
          <div class="text-h5 orange--text text-center text-md-left">
            <v-icon color="orange" medium class="mr-2">mdi-pen</v-icon>Criteria:
          </div>
        </v-col>
      </v-row>

      <!-- Form Input Section -->
      <v-row>
        <v-col cols="12">
          <div v-for="(value, key, index) in questions.b1" :key="value + index">
            <v-row>
              <v-col cols="12">
                <v-checkbox
                  v-model="form.b1_criteria"
                  :label="value.text"
                  :value="value.text"
                  readonly
                  @change="handleCriteria(value.text,'b1_criteria')"
                />
                <v-divider />
              </v-col>
            </v-row>
            <!-- Sub-section -->
            <div v-for="(item, i) in value.data" :key="item + i">
              <v-col cols="12">
                <v-checkbox
                  v-model="form['b1_' + key]"
                  :label="item"
                  :value="item"
                  :disabled="!form.b1_criteria.includes(value.text)"
                  readonly
                  @change="handleCriteria(item,'b1_' + key)"
                />
                <v-divider />
              </v-col>
            </div>
          </div>
        </v-col>
      </v-row>

      <!-- Remarks Section -->
      <v-row>
        <v-col cols="12">
          <p class="text-body-1 text-center text-md-left">
            <b>REMARKS</b>
            <i>(Please record your findings and analysis on the identified gaps pertaining to this Quality Benchmark. What are the gaps, and why are they not in place?)</i>
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="b1_remarks"
            label="Remarks"
            prepend-icon="mdi-comment-outline"
            readonly
            @change="handleCriteria(b1_remarks,'b1_remarks')"
          />
        </v-col>
      </v-row>

      <!-- Rating Section -->
      <v-row>
        <v-col cols="12" class="yellow darken-2 rounded-lg white--text">
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
                    <tr><td>3</td><td>If criteria A to B are present...</td></tr>
                    <tr><td>2</td><td>If criteria A is present...</td></tr>
                    <tr><td>1</td><td>If some criteria are present...</td></tr>
                    <tr><td>0</td><td>If no criteria are present...</td></tr>
                  </tbody>
                </table>
              </span>
            </v-tooltip>
          </v-row>
          <v-row justify="center">
            <div class="text-h4 mb-2">Rating [B1]: {{ b1_score }}</div>
          </v-row>
        </v-col>
      </v-row>

      <!-- B2 Section -->
      <v-row>
        <v-col cols="12">
          <div class="blue lighten-3 pa-1">
            <div class="text-center text-subtitle-2 black--text">
              <p class="mt-4">
                <b>B2. RISK ASSESSMENT IS SPECIFIC TO IDENTIFIED HAZARDS...</b>
              </p>
            </div>
          </div>
        </v-col>
      </v-row>

      <!-- B2 Criteria Section -->
      <v-row>
        <v-col cols="12">
          <div class="text-h5 orange--text text-center text-md-left">
            <v-icon color="orange" medium class="mr-2">mdi-pen</v-icon>Criteria:
          </div>
        </v-col>
      </v-row>

      <div v-for="(value, key, index) in questions.b2" :key="key + index">
        <v-row v-if="typeof(value) === 'string'">
          <v-col cols="12">
            <v-divider />
            <v-checkbox
              v-model="form.b2_criteria"
              :label="value"
              :value="value"
              readonly
              @change="handleCriteria(value, 'b2_criteria')"
            />
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="12" sm="6">
            <v-divider />
            <v-checkbox
              v-model="form.b2_criteria"
              :label="value.text"
              :value="value.text"
              readonly
              @change="handleCriteria(value.text, 'b2_criteria')"
            />
          </v-col>
          <v-divider inset vertical />
          <v-col cols="12" sm="6">
            <div v-for="(item, i) in questions.b2[key].data" :key="item + i">
              <v-divider />
              <v-checkbox
                v-model="form['b2_' + key]"
                :label="item"
                :value="item"
                readonly
                :disabled="!form.b2_criteria.includes(value.text)"
                @change="handleCriteria(item, 'b2_' + key)"
              />
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- Remarks Section for B2 -->
      <v-divider />
      <v-row>
        <v-col cols="12">
          <p class="text-body-1 text-center text-md-left">
            <b>REMARKS</b>
            <i>(Please record your findings and analysis on the identified gaps...)</i>
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="b2_remarks"
            label="Remarks"
            prepend-icon="mdi-comment-outline"
            readonly
            @change="handleCriteria(b2_remarks, 'b2_remarks')"
          />
        </v-col>
      </v-row>

      <!-- Rating Section for B2 -->
      <v-row>
        <v-col cols="12" class="yellow darken-2 rounded-lg white--text">
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
                    <tr><td>3</td><td>If criteria A to F are present...</td></tr>
                    <tr><td>2</td><td>If criteria A to D are present...</td></tr>
                    <tr><td>1</td><td>If some criteria are present...</td></tr>
                    <tr><td>0</td><td>If no criteria are present...</td></tr>
                  </tbody>
                </table>
              </span>
            </v-tooltip>
          </v-row>
          <v-row justify="center">
            <div class="text-h4 mb-2">Rating [B2]: {{ b2_score }}</div>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </section>
</template>
<script>
import { mapGetters,mapActions} from 'vuex';
import globalMixin from '~/mixins/global';
export default {
    name: 'QatformprintB',
    mixins: [globalMixin],
    props: {
    
    },
    data() {
      return {
        form : {
          b1_criteria: [],
          b1_a: [],
          b1_b: [],
          b1_remarks: '',
          b1_score: 0,
          b2_criteria: [],
          b2_c: [],
          b2_d: [],
          b2_remarks: '',
          b2_score: 0,
        },
        questions : {
          b1: {
            a: {
              text: 'A. Community risk assessment is participated by:',
              data: [
                'Children and youth',
                'Women',
                'Pregnant and lactating mothers',
                'Persons with disability',
                'Elderly',
                'Indigenous people (if applicable)',
              ],
            },
            b: {
              text: 'B. The following vulnerable groups identified the risk themeselves during the assessment.',
              data: [
                'Children and youth',
                'Women',
                'Pregnant and lactating mothers',
                'Persons with disability',
                'Elderly',
                'Indigenous people (if applicable)',
              ],
            },
          },
          b2: {
            a: 'A. Priority hazards in the community are identified',
            b: 'B. Hazard, vulnerability and capacity maps are included in the plan',
            c: {
              text: 'C. Database of elements at risk per priority hazard with the following information is organized into high, medium and low risk:',
              data: [
                'Number of affected famillies',
                'Number of affected individuals disaggregated by age, sex and abilities',
                'Number affected community structues and business establishments',
                'Affected livelihoods',
                'Affected ecosystems e.g. terrestrial, aquatic. etc.',
              ],
            },
            d: {
              text: 'D. Major issues concerning children and persons with disability are identified:',
              data: [
                'Issues on protection of children and persons with disability protection such as neglect, abuse, exploitation, child labor, trafficking and recruitment into armed groups',
                'Disruption of classes',
                'Proneness to diseases and illnesses',
                'Loss of important documents such as birth certificates and school records',
                'Loss of shelters',
                'Injury, psychosocial distress and separation from family members during disasters or emergencies',
              ],
            },
            e: 'E. Analysis of vulnerabilities and capacities is specific to the identified hazard(in narrative or tabular format)',
            f: 'F. Identified vulnerabilities are linked to the development of programs, projects and activities per thematic area i.e. preparedness, prevention and mitigation, response, recovery and rehabilatation.',
          },
        },
        isTop: true, 
      };
    },
    computed: {
      ...mapGetters('qat',[
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
      ]),
      b1_remarks: {
        set(val){
          this.$store.commit('qat/setB1Remarks', val);
        },
        get(){
          return this.$store.state.qat.b1_remarks;
        },
      },
      b2_remarks: {
        set(val){
          this.$store.commit('qat/setB2Remarks', val);
        },
        get(){
          return this.$store.state.qat.b2_remarks;
        },
      },
    },
    watch: {
      b1_criteria: {
        immediate: true,
        handler(data) {
          this.form.b1_criteria = JSON.parse(JSON.stringify(data));
        },
      },
      b1_a: {
        immediate: true,
        handler(data) {
          this.form.b1_a = JSON.parse(JSON.stringify(data));
        },
      },
      b1_b: {
        immediate: true,
        handler(data) {
          this.form.b1_b = JSON.parse(JSON.stringify(data));
        },
      },
      b1_remarks: {
        immediate: true,
        handler(data) {
          this.form.b1_remarks = JSON.parse(JSON.stringify(data));
        },
      },
      b1_score: {
        immediate: true,
        handler(data) {
          this.form.b1_score = JSON.parse(JSON.stringify(data));
        },
      },
      b2_criteria: {
        immediate: true,
        handler(data) {
          this.form.b2_criteria = JSON.parse(JSON.stringify(data));
        },
      },
      b2_c: {
        immediate: true,
        handler(data) {
          this.form.b2_c = JSON.parse(JSON.stringify(data));
        },
      },
      b2_d: {
        immediate: true,
        handler(data) {
          this.form.b2_d = JSON.parse(JSON.stringify(data));
        },
      },
      b2_remarks: {
        immediate: true,
        handler(data) {
          this.form.b2_remarks = JSON.parse(JSON.stringify(data));
        },
      },
      b2_score: {
        immediate: true,
        handler(data) {
          this.form.b2_score = JSON.parse(JSON.stringify(data));
        },
      },
    },
    created() {
    },
    methods: {
      ...mapActions('qat', [
        'addB1Criteria',
        'removeB1Criteria',
        'addB1A',
        'removeB1A',
        'addB1B',
        'removeB1B',
        'addB2Criteria',
        'removeB2Criteria',
        'addB2C',
        'removeB2C',
        'addB2D',
        'removeB2D',
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
                case 'b1_criteria':
                  this.addB1Criteria(item);
                  break;
                case 'b1_a':
                  this.addB1A(item);
                  break;
                case 'b1_b':
                  this.addB1B(item);
                  break;
                case 'b2_criteria':
                  this.addB2Criteria(item);
                  break;
                case 'b2_c':
                  this.addB2C(item);
                  break;
                case 'b2_d':
                  this.addB2D(item);
                  break;
              }
              this.form[field].push(item);
            }else{
              this.form[field].splice( this.form[field].indexOf(item), 1);
              switch (field) {
                case 'b1_criteria':
                  this.removeB1Criteria(this[field].indexOf(item));
                  break;
                case 'b1_a':
                  this.removeB1A(this[field].indexOf(item));
                  break;
                case 'b1_b':
                  this.removeB1B(this[field].indexOf(item));
                  break;
                case 'b2_criteria':
                  this.removeB2Criteria(this[field].indexOf(item));
                  break;
                case 'b2_c':
                  this.removeB2C(this[field].indexOf(item));
                  break;
                case 'b2_d':
                  this.removeB2D(this[field].indexOf(item));
                  break;
              }
            }
          }          
        }else{
          this.form[field] = item;
        }
        
        const b1 = this.b1_criteria;
        const b1q = this.questions.b1;
        if (
          b1.includes(b1q.a.text) &&
          b1.includes(b1q.b.text) &&
          ( this.b1_a.length === 5 && !this.b1_a.includes('Indigenous people (if applicable)') || this.b1_a.length === 6 ) &&
          ( this.b1_b.length === 5 && !this.b1_b.includes('Indigenous people (if applicable)') || this.b1_b.length === 6 )
        ) {
          this.$store.commit('qat/setB1Score', 3);
        }else if (
          b1.includes(b1q.a.text) &&
          ( this.b1_a.length === 5 && !this.b1_a.includes('Indigenous people (if applicable)') || this.b1_a.length === 6 )
        ) {
          this.$store.commit('qat/setB1Score', 2);
        }else if (
          b1.includes(b1q.a.text) && this.b1_a.length > 0
        ) {
          this.$store.commit('qat/setB1Score', 1);
        }else{
          this.$store.commit('qat/setB1Score', 0);
        }
        
        const b2 = this.b2_criteria;
        const b2q = this.questions.b2;
        if (
            b2.includes(b2q.a) &&
            b2.includes(b2q.b) &&
            b2.includes(b2q.c.text) &&
            b2.includes(b2q.d.text) &&
            b2.includes(b2q.e) &&
            b2.includes(b2q.f) &&
            this.b2_c.length === 5 &&
            this.b2_d.length >= 3
          ) {
          this.$store.commit('qat/setB2Score', 3);
        }else if (
          b2.includes(b2q.a) &&
          b2.includes(b2q.b) &&
          b2.includes(b2q.c.text) &&
          b2.includes(b2q.d.text) &&
          this.b2_c.length === 5 &&
          this.b2_d.length >= 3
        ) {
          this.$store.commit('qat/setB2Score', 2);
        }else if (
          b2.includes(b2q.a) ||
          b2.includes(b2q.b) ||
          ( b2.includes(b2q.c.text) && this.b2_c.length === 5) ||
          ( b2.includes(b2q.d.text) && this.b2_d.length >= 3 ) ||
          b2.includes(b2q.e) ||
          b2.includes(b2q.f)
        ) {
          this.$store.commit('qat/setB2Score', 1);
        }else{
          this.$store.commit('qat/setB2Score', 0);
        }
        
      },
    },
  }
  </script>