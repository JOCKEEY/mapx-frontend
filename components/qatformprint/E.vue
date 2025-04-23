<template>
  <section>
    <div class="red--text mt-5">
      <p>
        <b>E. CAPACITY BUILDING</b>
      </p>
    </div>
    <v-card class="mt-2 pa-4 pa-md-8 pa-lg-12">
      <v-row>
        <v-col cols="12">
          <div class="blue lighten-3 pa-1">
            <div class="text-center black--text text-subtitle-2">
              <p class="mt-4">
                <b>
                  E1. MINIMUM CAPACITY BUILDING NEEDS AND PROCUREMENT OF BASIC EMERGENCY RESPONSE EQUIPMENT FOR THE BDRRMC ARE IDENTIFIED IN THE PLAN.
                </b>
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

      <v-row>
        <v-col cols="12" md="6">
          <v-row>
            <v-col cols="12">
              <v-checkbox
                v-model="form.e1_criteria"
                :label="questions.e1.a.text"
                :value="questions.e1.a.text"
                readonly
                @change="handleCriteria(questions.e1.a.text, 'e1_criteria','checkbox')"
              />
              <v-divider />
            </v-col>
          </v-row>
        </v-col>

        <v-divider vertical class="d-none d-md-block" />

        <v-col cols="12" md="6">
          <v-row v-for="(value, index) in questions.e1.a.data" :key="value+index">
            <v-col cols="12">
              <v-divider />
              <v-checkbox
                v-model="form.e1_a"
                :label="value"
                :value="value"
                readonly
                :disabled="!form.e1_criteria.includes(questions.e1.a.text)"
                @change="handleCriteria(value, 'e1_a')"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-divider />
          <v-checkbox
            v-model="e1_a_has_addtional_cap_building"
            :label="questions.e1.a_has_other"
            value="1"
            readonly
            @change="handleCriteria(1, 'e1_a_has_addtional_cap_building', 'checkbox')"
          />
        </v-col>

        <v-col v-if="e1_a_has_addtional_cap_building" cols="12">
          <v-row v-for="(item, index) in form.e1_a_capacity_building" :key="item + index">
            <v-col cols="12" md="4">
              <v-text-field
                v-model="form.e1_a_capacity_building[index].title"
                label="Title"
                readonly
                @input="onInput(index)"
              />
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="form.e1_a_capacity_building[index].duration"
                label="Duration"
                readonly
                @input="onInput(index)"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="form.e1_a_capacity_building[index].provider"
                label="Provider"
                readonly
                @input="onInput(index)"
              />
            </v-col>
            <v-col cols="12" md="1">
              <v-btn
                v-if="index !== 0"
                fab
                small
                @click="removeE1ACapacityBuilding(index)"
              >
                <v-icon color="red">mdi-trash-can-outline</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn
                small
                fab
                color="success"
                @click="addE1ACapacityBuilding({
                  id: Math.floor(Math.random() * 1000000).toString(),
                  title: '',
                  duration: '',
                  provider: '',
                })"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-divider />

      <v-row>
        <v-col cols="12" md="6">
          <v-row>
            <v-col cols="12">
              <v-checkbox
                v-model="form.e1_criteria"
                :label="questions.e1.b.text"
                :value="questions.e1.b.text"
                readonly
                @change="handleCriteria(questions.e1.b.text, 'e1_criteria','checkbox')"
              />
              <v-divider />
            </v-col>
          </v-row>
        </v-col>

        <v-divider vertical class="d-none d-md-block" />

        <v-col cols="12" md="3">
          <v-row>
            <v-col
              v-for="(data, index) in questions.e1.b.data.slice(0,8)"
              :key="data+index"
              cols="12"
            >
              <v-checkbox
                v-model="form.e1_b"
                :label="data"
                :value="data"
                readonly
                :disabled="!form.e1_criteria.includes(questions.e1.b.text)"
                @change="handleCriteria(data,'e1_b')"
              />
              <v-divider />
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="3">
          <v-row>
            <v-col
              v-for="(data, index) in questions.e1.b.data.slice(8,15)"
              :key="data+index"
              cols="12"
            >
              <v-checkbox
                v-model="form.e1_b"
                :label="data"
                readonly
                :value="data"
                :disabled="!form.e1_criteria.includes(questions.e1.b.text)"
                @change="handleCriteria(data,'e1_b')"
              />
              <v-divider />
            </v-col>
            <v-col v-if="form.e1_b.includes(questions.e1.b.data[14])" cols="12">
              <v-text-field
                v-model="e1_b_other_procurement"
                label="Specify..."
                readonly
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-divider />

      <v-row>
        <v-col cols="12">
          <p>
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
            v-model="e1_remarks"
            label="Remarks"
            prepend-icon="mdi-comment-outline"
            readonly
            @change="handleCriteria(e1_remarks,'e1_remarks')"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col
          class="yellow darken-2 rounded-lg white--text pa-4"
          cols="12"
        >
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
                        If all the criteria A with all its sub-sections and B with all its sub-sections plus additional capacity building acquired are present in the plan
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>
                        If all the criteria A with all its sub-sections and B with all its sub-sections are present in the plan
                      </td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>
                        If any of the criteria A with all its sub-sections and B with all its sub-sections are present in the plan
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
            <div class="text-h4 mb-2">
              Rating [E]: {{ e1_score }}
            </div>
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
    name: 'QatformprintE',
    mixins: [globalMixin],
    props: {
    },
    data() {
      return {
        isTop: false,
        a_has_other: false,
        form: {
          e1_criteria : [],
          e1_a : [],
          e1_a_others : '',
          e1_a_has_addtional_cap_building : '',
          e1_b : [],
          e1_b_other_procurement : '',
          e1_remarks : '',
          e1_score : 0,
          e1_a_capacity_building: [],
        },
        questions: {
          e1: {
            a: {
              text:
                'A. The identification of the following capacity building needs, if not yet identified as current capacities of the BDRRMC and relevant stakeholders, should be included in the Plan: (Also check the box if the capacity building activity is already acquired.)',
              data: [
                "Orientation on RA 10821 (Children's Emergency Relief and Protection Act)",
                'Orientation on RA 10121 (Philippine Disaster Risk Reduction and Management Act)',
                'Orientation on Pre-Disaster Risk Assesment',
                'Orientation on Protocol for Management of the Dead & Missing',
                'Orientation on Camp Management',
                'Orientation on Incident Command System',
                'Training on First Aid and Basic Life Support',
                'Training on Search and Rescue (Basic)',
                'Training on Community-Based Disaster Risk Reduction and Management (CBDRRM)',
                'Training on Pyschosocial Support',
                'Training on how to Conduct Simulation/Drills for Priority Hazards',
                'Training on Rapid Damage Assessment and Needs Analysis (RDANA)',
              ],
            },
            a_has_other:
              'Check if there are additional capacity building activities acquired that are not in the list above',
            a_others:
              'List down the title of the training/s (e.g. child-responsive training program for all emergency responders such as community and barangay leaders, community members, school personnel and other rescuers.):',
            b: {
              text:
                'B. The procurement of the following basic emergency response equipment, if not yet included in the current capacity of the barangay, should be included in the plan: (Also check the box if item is already acquired)',
              data: [
                'spine board',
                'axe',
                'fuel',
                'emergency kit',
                'hand-held radio',
                'batteries',
                'helmet/hard hat',
                'portable generator or equivalent (e.g. solar panel)',
                'boots',
                'ropes',
                'search light',
                'flash light',
                'megaphone',
                'chain saw (optional)',
                'Others (please specify)',
              ],
            },
          },
        },
      };
    },
    computed: {
      ...mapGetters('qat', [
        'e1_criteria',
        'e1_a',
        'e1_a_others',
        'e1_a_has_addtional_cap_building',
        'e1_a_capacity_building',
        'e1_b',
        'e1_b_other_procurement',
        'e1_remarks',
        'e1_score',
      ]),
      e1_remarks: {
        set(val){
          this.$store.commit('qat/setE1Remarks', val);
        },
        get(){
          return this.$store.state.qat.e1_remarks;
        },
      },
      e1_b_other_procurement: {
        set(val){
          this.$store.commit('qat/setE1BOtherProcurement', val);
        },
        get(){
          return this.$store.state.qat.e1_b_other_procurement;
        },
      },
      e1_a_has_addtional_cap_building: {
        set(val){
          this.$store.commit('qat/setE1AHasAdditionalCapBuilding', val);
        },
        get(){
          return this.$store.state.qat.e1_a_has_addtional_cap_building;
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
      e1_criteria: {
        immediate: true,
        handler(data) {
          this.form.e1_criteria = JSON.parse(JSON.stringify(data));
        },
      },
      e1_a: {
        immediate: true,
        handler(data) {
          this.form.e1_a = JSON.parse(JSON.stringify(data));
        },
      },
      e1_a_others: {
        immediate: true,
        handler(data) {
          this.form.e1_a_others = JSON.parse(JSON.stringify(data));
        },
      },
      e1_a_has_addtional_cap_building: {
        immediate: true,
        handler(data) {
          this.form.e1_a_has_addtional_cap_building = JSON.parse(JSON.stringify(data));
        },
      },
      e1_a_capacity_building: {
        immediate: true,
        handler(data) {
          this.form.e1_a_capacity_building = JSON.parse(JSON.stringify(data));
        },
      },
      e1_b: {
        immediate: true,
        handler(data) {
          this.form.e1_b = JSON.parse(JSON.stringify(data));
        },
      },
      e1_b_other_procurement: {
        immediate: true,
        handler(data) {
          this.form.e1_b_other_procurement = JSON.parse(JSON.stringify(data));
        },
      },
      e1_remarks: {
        immediate: true,
        handler(data) {
          this.form.e1_remarks = JSON.parse(JSON.stringify(data));
        },
      },
      e1_score: {
        immediate: true,
        handler(data) {
          this.form.e1_score = JSON.parse(JSON.stringify(data));
        },
      },
    },
    created() {
    },
    methods: {
      ...mapActions('qat',[
        'addE1Criteria',
        'removeE1Criteria',
        'addE1A',
        'removeE1A',
        'addE1B',
        'removeE1B',
        'addE1ACapacityBuilding',
        'removeE1ACapacityBuilding',
        'updateE1ACapacityBuilding',
      ]),
      onInput(index) {
        const updatedE1ACapacityBuilding = this.form.e1_a_capacity_building[index];
        this.updateE1ACapacityBuilding({ index, updatedE1ACapacityBuilding });
      },
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
      handleCriteria(item,field,type_){
        if (typeof this.form[field] === 'object') {
          if (this.form[field]) {
            if (!this[field].includes(item)) {
              switch (field) {
                case 'e1_criteria':
                  this.addE1Criteria(item);
                  break;
                case 'e1_a':
                  this.addE1A(item);
                  break;
                case 'e1_b':
                  this.addE1B(item);
                  break;
              } 
              this.form[field].push(item);
            }else{
              switch (field) {
                case 'e1_criteria':
                  this.removeE1Criteria(this[field].indexOf(item));
                  break;
                case 'e1_a':
                  this.removeE1A(this[field].indexOf(item));
                  break;
                case 'e1_b':
                  this.removeE1B(this[field].indexOf(item));
                  break;
              } 
              this.form[field].splice( this.form[field].indexOf(item), 1);
            }
          }          
        }else{
          this.form[field] = item;
          if (type_ === 'checkbox' && !this.e1_criteria.includes(item)) {
            this.form[field] = '';
          }
        }

        const criteria = this.e1_criteria;
        const question = this.questions.e1;

        if (
            criteria.includes(question.a.text) &&
            criteria.includes(question.b.text) &&
            this.e1_a.length === question.a.data.length &&
            ( this.e1_b.length === question.b.data.length ||
              (this.e1_b.length === 13 &&
                (!this.e1_b.includes(question.b.data[13]) && !this.e1_b.includes(question.b.data[14]))
              ) ||
              (
                this.e1_b.length === 14 &&
                (!this.e1_b.includes(question.b.data[13]) || !this.e1_b.includes(question.b.data[14]))
              )
            ) &&
            this.e1_a_has_addtional_cap_building
          ) {
          this.$store.commit('qat/setE1Score', 3);
        }else if (
          criteria.includes(question.a.text) &&
          criteria.includes(question.b.text) &&
          this.e1_a.length === question.a.data.length &&
            ( this.e1_b.length === question.b.data.length ||
              (this.e1_b.length === 13 &&
                (!this.e1_b.includes(question.b.data[13]) && !this.e1_b.includes(question.b.data[14]))
              ) ||
              (
                this.e1_b.length === 14 &&
                (!this.e1_b.includes(question.b.data[13]) || !this.e1_b.includes(question.b.data[14]))
              )
            )
        ) {
          this.$store.commit('qat/setE1Score', 2);
        }else if (
          (criteria.includes(question.a.text) && this.e1_a.length === question.a.data.length) ||
          (
            (criteria.includes(question.b.text) && this.e1_b.length === question.b.data.length) ||
            (this.e1_b.length === 13 && !this.e1_b.includes(question.b.data[13]) && !this.e1_b.includes(question.b.data[14]) ) ||
            (this.e1_b.length === 14 && (!this.e1_b.includes(question.b.data[13]) || !this.e1_b.includes(question.b.data[14]) ))
          )
        ) {
          this.$store.commit('qat/setE1Score', 1);
        }else{
          this.$store.commit('qat/setE1Score', 0);
        }
        
      },
    },
  }
  </script>
  