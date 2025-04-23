<template>
  <section>
    <div class="red--text mt-5">
      <p><b>I. EARLY WARNING SYSTEM AND EVACUATION</b></p>
    </div>
    <v-card class="mt-2 pa-4">
      <v-row>
        <v-col cols="12">
          <div class="blue lighten-3 pa-1">
            <div class="text-center black--text text-subtitle-2">
              <p class="mt-4"><b>I1. THE IDENTIFIED EARLY WARNING SYSTEM IS SPECIFIC TO PRIORITY HAZARDS AND IS APPROPRIATE FOR THE MOST VULNERABLE POPULATION/S</b></p>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <div class="text-h5 orange--text">
            <v-icon color="orange" medium>mdi-pen</v-icon> Criteria: 
          </div>
        </v-col>
      </v-row>

      <div v-for="(value,key,index) in questions.i1" :key="value+index">
        <v-row v-if="typeof(value) === 'string'">
          <v-col cols="12">
            <v-divider />
            <v-checkbox
              v-model="form.i1_criteria"
              :label="value"
              readonly
              :value="value"
              :disabled="key === 'a' ? form.i1_criteria.includes(questions.i1.b) : key === 'b' ? form.i1_criteria.includes(questions.i1.a) : false"
              @change="handleCriteria(value, 'i1_criteria')"
            />
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="12" md="6">
            <v-divider />
            <v-checkbox
              v-model="form.i1_criteria"
              :label="value.text"
              readonly
              :value="value.text"
              @change="handleCriteria(value.text,'i1_criteria')"
            />
          </v-col>
          <v-divider inset vertical />
          <v-col cols="12" md="6">
            <v-row v-for="(item, i) in questions.i1[key].data" :key="item+i">
              <v-col cols="12">
                <v-divider />
                <v-checkbox
                  v-model="form.i1_c"
                  :label="item"
                  readonly
                  :value="item"
                  :disabled="!form.i1_criteria.includes(value.text)"
                  @change="handleCriteria(item,'i1_c')"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>

      <v-divider />
      <v-row>
        <v-col cols="12">
          <p>
            <b>REMARKS</b>
            <i>REMARKS (Please record your findings and analysis on the identified gaps pertaining to this Quality Benchmark. What are the gaps, and why are they not in place?)</i>
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="i1_remarks"
            label="Remarks"
            readonly
            prepend-icon="mdi-comment-outline"
            @change="handleCriteria(i1_remarks, 'i1_remarks')"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" class="yellow darken-2 rounded-lg white--text">
          <v-row justify="end">
            <v-tooltip top>
              <template #activator="{ on, attrs }">
                <v-btn
                  class="mx-2"
                  color="blue"
                  fab
                  small
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  ?
                </v-btn>
              </template>
              <span>
                <table>
                  <tbody>
                    <tr><td>3</td><td>If all criteria are present</td></tr>
                    <tr><td>2</td><td>If most criteria are present</td></tr>
                    <tr><td>1</td><td>If some criteria are present</td></tr>
                    <tr><td>0</td><td>If none of the criteria are present</td></tr>
                  </tbody>
                </table>
              </span>
            </v-tooltip>
          </v-row>
          <v-row justify="center">
            <div class="text-h4 mb-2">Rating [I]: {{ i1_score }}</div>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <div class="blue lighten-3 pa-1">
            <div class="text-center black--text text-subtitle-2">
              <p class="mt-4">
                <b>I2. EVACUATION PLAN TAKES INTO CONSIDERATION CAPACITY OF CENTERS, SAFE ROUTES, AND NEEDS OF EVACUEES.</b>
              </p>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <div class="text-h5 orange--text">
            <v-icon color="orange" medium>mdi-pen</v-icon> Criteria: 
          </div>
        </v-col>
      </v-row>

      <div v-for="(value,key,index) in questions.i2" :key="value+index">
        <v-row v-if="typeof(value) === 'string'">
          <v-col cols="12">
            <v-divider />
            <v-checkbox
              v-model="form.i2_criteria"
              :label="value"
              readonly
              :value="value"
              @change="handleCriteria(value, 'i2_criteria')"
            />
          </v-col>
        </v-row>
        <v-row v-else-if="key === 'text1'">
          <v-col class="col-12">
            <v-divider />
            <p v-html="value.text"></p>
          </v-col>
        </v-row>
        <v-row v-else-if="key !== 'text1'">
          <v-col cols="12" md="6">
            <v-divider />
            <v-checkbox
              v-model="form.i2_criteria"
              :label="value.text"
              readonly
              :value="value.text"
              @change="handleCriteria(value.text, 'i2_criteria')"
            />
          </v-col>
          <v-divider inset vertical />
          <v-col cols="12" md="6">
            <v-row v-for="(item, i) in questions.i2[key].data" :key="item+i">
              <v-col cols="12">
                <v-divider />
                <v-checkbox
                  v-model="form['i2_'+key]"
                  :label="item"
                  readonly
                  :value="item"
                  :disabled="!form.i2_criteria.includes(value.text)"
                  @change="handleCriteria(item,'i2_'+key)"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>

      <v-row>
        <v-col cols="12">
          <p><b>REMARKS</b><i>REMARKS on identified gaps and analysis.</i></p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="i2_remarks"
            label="Remarks"
            readonly
            prepend-icon="mdi-comment-outline"
            @change="handleCriteria(i2_remarks, 'i2_remarks')"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" class="yellow darken-2 rounded-lg white--text">
          <v-row justify="end">
            <v-tooltip top>
              <template #activator="{ on, attrs }">
                <v-btn
                  class="mx-2"
                  color="blue"
                  fab
                  small
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  ?
                </v-btn>
              </template>
              <span>
                <table>
                  <tbody>
                    <tr><td>3</td><td>If all criteria are met</td></tr>
                    <tr><td>2</td><td>If most criteria are met</td></tr>
                    <tr><td>1</td><td>If some criteria are met</td></tr>
                    <tr><td>0</td><td>If no criteria are met</td></tr>
                  </tbody>
                </table>
              </span>
            </v-tooltip>
          </v-row>
          <v-row justify="center">
            <div class="text-h4 mb-2">Rating [I2]: {{ i2_score }}</div>
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
    name: 'QatformprintI',
    mixins: [globalMixin],
    props: {},
    data() {
      return {
        isTop: false,
        form: {
          i1_criteria : [],
          i1_c : [],
          i1_remarks : '',
          i1_score : 0,
          i2_criteria : [],
          i2_d : [],
          i2_remarks : '',
          i2_score : 0,
        },
        questions : {
          i1: {
            a: 'A. Early Warning System is identified but not related to specific hazards',
            b: 'B. Early Warning System is specific for priority hazards in the community',
            c: {
              text: 'C. Early warning system is appropriate fo the most vulnerable population/s:',
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
          i2: {
            a: 'A. Has a tabulation of identified and appropriate* evacuation center/facility in the community and the capacity of each evacuation center/facility to accommodate families',
            b: 'B. If the identified evacuation centers are private residences and schools (public or private), a written agreement (ex. MOA, MOU) should be in the place stating evacuation coordination and management',
            c: 'C. A map is available that locates the identified evacuation centers/facilities in the community and the safe routes to access it',
            text1: { type: 'text', text: '<small>* An <u><b>appropriate</b></u> evacuation center/facility should have undergone assessment of municipal engineer and has passed the assessment</small>'},
            d: {
              text: 'D. Plan describe how the following basic provisions will be delivered to evacuees in the identified evacuation center/facility:',
              data: [
                'Food and Non-Food Items (ex. clothing, blanket, mosquito net)',
                'Drinking water',
                'Basic medicines and medical supplies',
                'Hygiene kits',
                'Children, pregnant women, persons with disability and elderly friendly spaces',
                'Breastfeeding spaces/stations',
                'Non-human spaces (ex. spaces for livesctock)',
                'Genderized WASH facilities such as toilets, bathrooms',
                'Family reunification mechanisms/processes',
              ],
            },
            e: 'E. Plan includes a master list of families to be accommodated for each identified evacuation center/facility, or a system of registration for each evacuation center/facility is identified.',
            f: 'F. Plan includes construction of an evacuation center (optional, if applicable)',
          },
        },
      };
    },
    computed: {
      ...mapGetters('qat',[
        'i1_criteria',
        'i1_c',
        'i1_remarks',
        'i1_score',
        'i2_criteria',
        'i2_d',
        'i2_remarks',
        'i2_score',
      ]),
      i1_remarks: {
        set(val){
          this.$store.commit('qat/setI1Remarks', val);
        },
        get(){
          return this.$store.state.qat.i1_remarks;
        },
      },
      i2_remarks: {
        set(val){
          this.$store.commit('qat/setI2Remarks', val);
        },
        get(){
          return this.$store.state.qat.i2_remarks;
        },
      },
      dialog: {
        get() {
          return this.open
        },
        set() {
          this.$emit('toggle')
        },
      },
    },
    watch: {
      i1_criteria: {
        immediate: true,
        handler(data) {
          this.form.i1_criteria = JSON.parse(JSON.stringify(data));
        },
      },
      i1_c: {
        immediate: true,
        handler(data) {
          this.form.i1_c = JSON.parse(JSON.stringify(data));
        },
      },
      i1_remarks: {
        immediate: true,
        handler(data) {
          this.form.i1_remarks = JSON.parse(JSON.stringify(data));
        },
      },
      i1_score: {
        immediate: true,
        handler(data) {
          this.form.i1_score = JSON.parse(JSON.stringify(data));
        },
      },
      i2_criteria: {
        immediate: true,
        handler(data) {
          this.form.i2_criteria = JSON.parse(JSON.stringify(data));
        },
      },
      i2_d: {
        immediate: true,
        handler(data) {
          this.form.i2_d = JSON.parse(JSON.stringify(data));
        },
      },
      i2_remarks: {
        immediate: true,
        handler(data) {
          this.form.i2_remarks = JSON.parse(JSON.stringify(data));
        },
      },
      i2_score: {
        immediate: true,
        handler(data) {
          this.form.i2_score = JSON.parse(JSON.stringify(data));
        },
      },
    },
    created() {
    },
    methods: {
      ...mapActions('qat',[
        'addI1Criteria',
        'removeI1Criteria',
        'addI2Criteria',
        'removeI2Criteria',
        'addI1C',
        'removeI1C',
        'addI2D',
        'removeI2D',
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
                case 'i1_criteria':
                  this.addI1Criteria(item);
                  break;
                case 'i2_criteria':
                  this.addI2Criteria(item);
                  break;
                case 'i1_c':
                  this.addI1C(item);
                  break;
                case 'i2_d':
                  this.addI2D(item);
                  break;
              } 
              this.form[field].push(item);
            }else{
              switch (field) {
                case 'i1_criteria':
                  this.removeI1Criteria(this[field].indexOf(item));
                  break;
                case 'i2_criteria':
                  this.removeI2Criteria(this[field].indexOf(item));
                  break;
                case 'i1_c':
                  this.removeI1C(this[field].indexOf(item));
                  break;
                case 'i2_d':
                  this.removeI2D(this[field].indexOf(item));
                  break;
              } 
              this.form[field].splice( this.form[field].indexOf(item), 1);
            }
          }          
        }else{
          this.form[field] = item;
        }

        try {
          const criteria = this.i1_criteria;
          const question1 = this.questions.i1;
          if (
            criteria.includes(question1.b) &&
            criteria.includes(question1.c.text) &&
            (this.i1_c.length === question1.c.data.length || (this.i1_c.length === 5 && !this.form.i1_c.includes(question1.c.data[5])))
          ) {
            this.$store.commit('qat/setI1Score', 3);
          }else if (criteria.includes(question1.b)) {
            this.$store.commit('qat/setI1Score', 2);
          }else if (
            criteria.includes(question1.a) &&
            !criteria.includes(question1.b)
          ) {
            this.$store.commit('qat/setI1Score', 1);
            this.form.i1_score = 1;
          }else{
            this.$store.commit('qat/setI1Score', 0);
            this.form.i1_score = 0;
          }

          const criteria2 = this.i2_criteria;
          const question2 = this.questions.i2;
          
          if (
            criteria2.includes(question2.a) &&
            criteria2.includes(question2.b) &&
            criteria2.includes(question2.c) &&
            criteria2.includes(question2.d.text) &&
            criteria2.includes(question2.e) &&
            this.i2_d.length === question2.d.data.length
          ) {
            this.$store.commit('qat/setI2Score', 3);
          }else if (
            criteria2.includes(question2.a) &&
            criteria2.includes(question2.b) &&
            criteria2.includes(question2.c)
          ) {
            this.$store.commit('qat/setI2Score', 2);
          }else if (
            criteria2.includes(question2.a) ||
            criteria2.includes(question2.b) ||
            criteria2.includes(question2.c) ||
            (
              criteria2.includes(question2.d.text) && this.i2_d.length === question2.d.data.length
            ) ||
            criteria2.includes(question2.e) ||
            criteria2.includes(question2.f)
          ) {
            this.$store.commit('qat/setI2Score', 1);
          }else{
            this.$store.commit('qat/setI2Score', 0);
          }
        } catch (error) {
          console.log(error);
        }
      },
    },
  }
  </script>
  