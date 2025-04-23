<template>
  <section>
    <div class="red--text mt-5">
      <p>
        <b>F. COMMUNITY AWARENESS RAISING AND EDUCATION</b>
      </p>
    </div>
    <v-card class="mt-2 pa-5 pa-md-8 pa-lg-12">
      <v-row>
        <v-col cols="12">
          <div class="blue lighten-3 pa-1">
            <div class="text-center black--text text-subtitle-2">
              <p class="mt-4">
                <b>
                  F1. REGULAR COMMUNITY AWARENESS ACTIVITIES FOR EDUCATING HIGH-RISK HOUSEHOLDS ON FAMILY PREPAREDNESS ARE IDENTIFIED IN THE PLAN.
                </b>
              </p>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <div class="text-h6 text-md-h5 orange--text">
            <v-icon color="orange" medium>mdi-pen</v-icon> Criteria:
          </div>
        </v-col>
      </v-row>

      <div v-for="(value,key,index) in questions.f1" :key="key+index">
        <v-row v-if="typeof(value) === 'string'">
          <v-col cols="12">
            <v-divider />
            <v-checkbox
              v-model="form.f1_criteria"
              :label="value"
              :value="value"
              readonly
              :disabled="key === 'a' ? form.f1_criteria.includes(questions.f1.b) : key === 'b' ? form.f1_criteria.includes(questions.f1.a) : false"
              @change="handleCriteria(value,'f1_criteria')"
            />
          </v-col>
        </v-row>

        <v-row v-else>
          <v-col cols="12" md="6">
            <v-divider />
            <v-checkbox
              v-model="form.f1_criteria"
              :label="value.text"
              :value="value.text"
              readonly
              @change="handleCriteria(value.text, 'f1_criteria')"
            />
          </v-col>
          <v-divider vertical />
          <v-col cols="12" md="6">
            <v-row v-for="(item, i) in questions.f1[key].data" :key="item+i">
              <v-col cols="12">
                <v-divider />
                <v-checkbox
                  v-model="form.f1_c"
                  :label="item"
                  :value="item"
                  readonly
                  :disabled="!form.f1_criteria.includes(value.text)"
                  @change="handleCriteria(item, 'f1_c')"
                />
              </v-col>
            </v-row>
          </v-col>
          <v-divider />
        </v-row>
      </div>

      <v-row>
        <v-col cols="12">
          <p class="text-body-1 text-md-body-2">
            <b>REMARKS</b>
            <i>
              REMARKS (Please record your findings and analysis on the identified gaps pertaining to this Quality Benchmark. What are the gaps, and why are they not in place?)
            </i>
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="f1_remarks"
            label="Remarks"
            readonly
            prepend-icon="mdi-comment-outline"
            @change="handleCriteria(f1_remarks, 'f1_remarks')"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="col-12 yellow darken-2 rounded-lg white--text" sm="12" md="12">
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
                <table class="text-body-2">
                  <tbody>
                    <tr>
                      <td>3</td>
                      <td>If criteria B and C with at least one sub-section are present in the plan</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>If any of criteria B and C with its sub-sections are present in the plan</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>If criteria A is present in the plan, but with no specific schedule or regularity</td>
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
            <div class="text-h4 mb-2">Rating [F]: {{ f1_score }}</div>
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
    name: 'QatformprintF',
    mixins: [globalMixin],
    props: {},
    data() {
      return {
        isTop: false,
        form: {
          f1_criteria : [],
          f1_c : [],
          f1_remarks : '',
          f1_score : 0,
        },
        questions : {
          f1: {
            a: 'A. There are activities but with no specific regularity',
            b: 'B. Regular conduct of communtiy drill/simulation exercise for the priority hazards at least twice a year is included in the plan',
            c: {
              text: 'C. Plan includes activities to be conducted at least every quarter where families can be educated on developing preparedness plans:',
              data: [
                'Family development sessions',
                'Community assembly/forum',
                'Distribution of IEC material',
              ],
            },
          },
        },
      };
    },
    computed: {
      ...mapGetters('qat',[
        'f1_criteria',
        'f1_c',
        'f1_remarks',
        'f1_score',
      ]),
      f1_remarks: {
        set(val){
          this.$store.commit('qat/setF1Remarks', val);
        },
        get(){
          return this.$store.state.qat.f1_remarks;
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
      f1_criteria: {
        immediate: true,
        handler(data) {
          this.form.f1_criteria = JSON.parse(JSON.stringify(data));
        },
      },
      f1_c: {
        immediate: true,
        handler(data) {
          this.form.f1_c = JSON.parse(JSON.stringify(data));
        },
      },
      f1_remarks: {
        immediate: true,
        handler(data) {
          this.form.f1_remarks = JSON.parse(JSON.stringify(data));
        },
      },
      f1_score: {
        immediate: true,
        handler(data) {
          this.form.f1_score = JSON.parse(JSON.stringify(data));
        },
      },
    },
    created() {
    },
    methods: {
      ...mapActions('qat', [
        'addf1Criteria',
        'removef1Criteria',
        'addf1C',
        'removef1C',
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
              this.form[field].push(item);
              switch (field) {
                case 'f1_criteria':
                  this.addf1Criteria(item);
                  break;
                case 'f1_c':
                  this.addf1C(item);
                  break;
              } 
            }else{
              this.form[field].splice( this.form[field].indexOf(item), 1);
              switch (field) {
                case 'f1_criteria':
                  this.removef1Criteria(this[field].indexOf(item));
                  break;
                case 'f1_c':
                  this.removef1C(this[field].indexOf(item));
                  break;
              }
            }
          }
        }else{
          this.form[field] = item;
        }

        const criteria = this.f1_criteria;
        const questions = this.questions.f1;
        
        if (
          criteria.includes(questions.b) && 
          criteria.includes(questions.c.text) &&
          this.f1_c.length === questions.c.data.length
        ) {
          this.$store.commit('qat/setF1Score', 3);
        }else if (
          criteria.includes(questions.b) || 
          criteria.includes(questions.c.text) &&
          this.f1_c.length === 3
        ) {
          this.$store.commit('qat/setF1Score', 2);
        }else if (criteria.includes(questions.a)) {
          this.$store.commit('qat/setF1Score', 1);
        }else {
          this.$store.commit('qat/setF1Score', 0);
        }
      
      },
    },
  }
  </script>
  