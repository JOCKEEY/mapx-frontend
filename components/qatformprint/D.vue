<template>
  <section>
    <div class="red--text mt-5">
      <p>
        <b>D. INVOLVEMENT OF RELEVANT STAKEHOLDERS</b>
      </p>
    </div>
    <v-card class="mt-2 pa-4 pa-md-8 pa-lg-12">
      <v-row>
        <v-col cols="12">
          <div class="blue lighten-3 pa-1">
            <div class="text-center black--text text-subtitle-2">
              <p class="mt-4">
                <b> D1. RELEVANT STAKEHOLDERS ARE WITH SPECIFIC ROLES IN THE IMPLEMENTATION OF THE PLAN.</b>
              </p>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <div class="text-h5 orange--text d-flex align-center">
            <v-icon color="orange" medium class="mr-2">mdi-pen</v-icon> Criteria:
          </div>
        </v-col>
      </v-row>

      <div v-for="(value, key, index) in questions.d1" :key="key+index">
        <v-row v-if="typeof value === 'string'">
          <v-col cols="12">
            <v-divider />
            <v-checkbox
              v-model="form.d1_criteria"
              :label="value"
              :value="value"
              readonly
              @change="handleCriteria(value, 'd1_criteria')"
            />
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="12" md="6">
            <v-divider />
            <v-checkbox
              v-model="form.d1_criteria"
              :label="value.text"
              :value="value.text"
              readonly
              @change="handleCriteria(value.text, 'd1_criteria')"
            />
          </v-col>
          <v-divider vertical class="d-none d-md-block" />
          <v-col cols="12" md="6">
            <v-row v-for="(item, i) in questions.d1[key].data" :key="item+i">
              <v-col cols="12">
                <v-divider />
                <v-checkbox
                  v-model="form['d1_' + key]"
                  :label="item"
                  :value="item"
                  :disabled="!form.d1_criteria.includes(value.text)"
                  readonly
                  @change="handleCriteria(item, 'd1_' + key)"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>

      <v-row>
        <v-col cols="12">
          <p><b>REMARKS</b></p>
          <i>
            REMARKS (Please record your findings and analysis on the identified gaps pertaining to this Quality Benchmark. What are the gaps, and why are they not in place?)
          </i>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="d1_remarks"
            label="Remarks"
            prepend-icon="mdi-comment-outline"
            readonly
            @change="handleCriteria(d1_remarks, 'd1_remarks')"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="yellow darken-2 rounded-lg white--text pa-4" cols="12">
          <v-row justify="end">
            <v-tooltip :top="isTop" :bottom="!isTop">
              <template #activator="{ on, attrs }">
                <v-btn
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
                        If all criteria A with all sub-sections and B with its first 5 sub-sections are present in the plan
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>If criteria A with all sub-sections are present in the plan</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>If criteria A or B with its first 4 sub-sections are present in the plan</td>
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
            <div class="text-h4 mb-2">Rating [D]: {{ form.d1_score }}</div>
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
    name: 'QatformprintD',
    mixins: [globalMixin],
    props: {},
    data() {
      return{
        isTop: false,
        form: {
          d1_criteria : [],
          d1_a : [],
          d1_b : [],
          d1_remarks : '',
          d1_score : 0,
        },
        questions: {
          d1: {
            a: {
              text: 'A. Stakeholders are assigned with specific roles in the identified programs, projects and activities in any of the thematic area:',
              data: [
                'Families',
                'Sectoral groups (e.g. school, academe, faith-based, livelihood, private sector)',
                'Barangay officials',
                'Local government units/agencies (at the municipality/city, provincial, regional or national level)',
              ],
            },
            b: {
              text: 'B. Issues concerning the following most vulnerable groups were addressed in the identified programs, projects and activities in any of the thematic area:',
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
        },
      };
    },
    computed: {
      ...mapGetters('qat',[
        'd1_criteria',
        'd1_a',
        'd1_b',
        'd1_remarks',
        'd1_score',
      ]),
      dialog: {
        get() {
          return this.open
        },
        set() {
          this.$emit('toggle')
        },
      },
      d1_remarks: {
        set(val){
          this.$store.commit('qat/setD1Remarks', val);
        },
        get(){
          return this.$store.state.qat.d1_remarks;
        },
      },
    },
    watch: {
      d1_criteria: {
        immediate: true,
        handler(data) {
          this.form.d1_criteria = JSON.parse(JSON.stringify(data));
        },
      },
      d1_a: {
        immediate: true,
        handler(data) {
          this.form.d1_a = JSON.parse(JSON.stringify(data));
        },
      },
      d1_b: {
        immediate: true,
        handler(data) {
          this.form.d1_b = JSON.parse(JSON.stringify(data));
        },
      },
      d1_remarks: {
        immediate: true,
        handler(data) {
          this.form.d1_remarks = JSON.parse(JSON.stringify(data));
        },
      },
      d1_score: {
        immediate: true,
        handler(data) {
          this.form.d1_score = JSON.parse(JSON.stringify(data));
        },
      },
    },
    created() {
    },
    methods: {
      ...mapActions('qat', [
        'addD1Criteria',
        'removeD1Criteria',
        'addD1A',
        'removeD1A',
        'addD1B',
        'removeD1B',
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
      handleCriteria(item, field) {
        if (typeof this.form[field] === 'object') {
          if (this.form[field]) {
            if (!this[field].includes(item)) {
              switch (field) {
                case 'd1_criteria':
                  this.addD1Criteria(item);
                  break;
                case 'd1_a':
                  this.addD1A(item);
                  break;
                case 'd1_b':
                  this.addD1B(item);
                  break;
              } 
              this.form[field].push(item);
            }else{
              switch (field) {
                case 'd1_criteria':
                  this.removeD1Criteria(this[field].indexOf(item));
                  break;
                case 'd1_a':
                  this.removeD1A(this[field].indexOf(item));
                  break;
                case 'd1_b':
                  this.removeD1B(this[field].indexOf(item));
                  break;
              } 
              this.form[field].splice( this.form[field].indexOf(item), 1);
            }
          }          
        }else{
          this.form[field] = item;
        }

        const d1 = this.d1_criteria;
        const d1q = this.questions.d1;

        if (
          d1.includes(d1q.a.text) &&
          d1.includes(d1q.b.text) &&
          this.d1_a.length === 4 &&
          (this.d1_b.length === 5 && !this.d1_b.includes(d1q.b.data[5]) || this.d1_b.length === 6 )
        ) {
          this.$store.commit('qat/setD1Score', 3);
        }else if (          
          d1.includes(d1q.a.text) && this.d1_a.length === 4
        ) {
          this.$store.commit('qat/setD1Score', 2);
        }else if (
          (d1.includes(d1q.a.text) && this.d1_a.length > 0) ||
          (d1.includes(d1q.b.text) && this.d1_b.includes(d1q.b.data[0]) && this.d1_b.includes(d1q.b.data[1]) && this.d1_b.includes(d1q.b.data[2]) && this.d1_b.includes(d1q.b.data[3]))
        ) {
          this.$store.commit('qat/setD1Score', 1);
        }else{
          this.$store.commit('qat/setD1Score', 0);
        }
        
      },
    },
  }
  </script>
  