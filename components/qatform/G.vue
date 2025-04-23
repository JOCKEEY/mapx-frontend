<template>
  <section>
    <div class="red--text mt-5">
      <p>
        <b>G. MONITORING AND EVALUATION</b>
      </p>
    </div>
    <v-card class="mt-2 pa-md-8 pa-4">
      <v-row>
        <v-col cols="12">
          <div class="blue lighten-3 pa-1">
            <div class="text-center black--text text-subtitle-2">
              <p class="mt-4">
                <b>
                G1. PARTICIPATORY MONITORING AND EVALUATION MECHANISM FOR PLAN IMPLEMENTATION IS IDENTIFIED.
                </b>
              </p>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <div class="text-h6 orange--text">
            <v-icon color="orange" medium>mdi-pen</v-icon> Criteria: 
          </div>
        </v-col>
      </v-row>

      <div v-for="(value, key, index) in questions.g1" :key="key + index">
        <v-row v-if="typeof(value) === 'string'">
          <v-col cols="12">
            <v-divider />
            <v-checkbox
              v-model="form.g1_criteria"
              :label="value"
              :value="value"
              @change="handleCriteria(value, 'g1_criteria')"
            />
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="12" sm="6">
            <v-divider />
            <v-checkbox
              v-model="form.g1_criteria"
              :label="value.text"
              :value="value.text"
              @change="handleCriteria(value.text, 'g1_criteria')"
            />
          </v-col>
          <v-divider v-if="$vuetify.breakpoint.mdAndUp" vertical />
          <v-col cols="12" sm="6">
            <v-row v-for="(item, i) in questions.g1[key].data" :key="item + i">
              <v-col cols="12">
                <v-divider />
                <v-checkbox
                  v-model="form['g1_' + key]"
                  :label="item"
                  :value="item"
                  :disabled="!form.g1_criteria.includes(value.text)"
                  @change="handleCriteria(item, 'g1_' + key)"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>

      <v-divider class="my-4" />
      <v-row>
        <v-col cols="12">
          <p>
            <b>REMARKS</b>
            <i>
              (Please record your findings and analysis on the identified gaps pertaining to this Quality Benchmark. What are the gaps, and why are they not in place?)
            </i>
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="g1_remarks"
            label="Remarks"
            prepend-icon="mdi-comment-outline"
            @change="handleCriteria(g1_remarks, 'g1_remarks')"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col
          class="col-12 yellow darken-2 rounded-lg white--text"
          sm="12"
          md="12"
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
                        If all criteria from A with all its sub-sections, B with all its sub-sections, and C are in the plan
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>
                        If criteria A with all its sub-sections and B with all its sub-sections are present in the plan
                      </td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>
                        If criteria A with all its sub-sections are present in the plan
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
            <div class="text-h4 mb-2">Rating [G]: {{ g1_score }}</div>
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
  name: 'QatformG',
  mixins: [globalMixin],
  props: {},
  data() {
    return {
      isTop: false,
      form : {
        g1_criteria : [],
        g1_a : [],
        g1_b : [],
        g1_remarks : '',
        g1_score : 0,
      },
      questions: {
        g1: {
          a: {
            text: 'A. There is an identified mechanism to monitor and evaluate progress of DRRM plan implementation:',
            data: [
              'Regular meeting of the BDRRMC',
              'Conduct of simulations/drills',
              'Community assemblies/drills',
              'Comments/feedback through suggestion box',
            ],
          },
          b: {
            text: 'B. The identified monitoring and evaluation mechanism includes:',
            data: [
              'What to monitor/evaluate',
              'Frequency of monitoring/evaluation',
              'Who will monitor/evaluate',
              'Means of verification',
            ],
          },
          c: 'C. Sectoral and vulnerable groups have roles and responsibilities in monitoring and evaluation of plan implementation',
        },
      },
    };
  },
  computed: {
    ...mapGetters('qat', [
      'g1_criteria',
      'g1_a',
      'g1_b',
      'g1_remarks',
      'g1_score',
    ]),
    g1_remarks: {
      set(val){
        this.$store.commit('qat/setG1Remarks', val);
      },
      get(){
        return this.$store.state.qat.g1_remarks;
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
    g1_criteria: {
      immediate: true,
      handler(data) {
        this.form.g1_criteria = JSON.parse(JSON.stringify(data));
      },
    },
    g1_a: {
      immediate: true,
      handler(data) {
        this.form.g1_a = JSON.parse(JSON.stringify(data));
      },
    }, 
    g1_b: {
      immediate: true,
      handler(data) {
        this.form.g1_b = JSON.parse(JSON.stringify(data));
      },
    },
    g1_remarks: {
      immediate: true,
      handler(data) {
        this.form.g1_remarks = JSON.parse(JSON.stringify(data));
      },
    },
    g1_score: {
      immediate: true,
      handler(data) {
        this.form.g1_score = JSON.parse(JSON.stringify(data));
      },
    },
  },
  created() {

  },
  methods: {
    ...mapActions('qat', [
      'addG1Criteria',
      'removeG1Criteria',
      'addG1A',
      'removeG1A',
      'addG1B',
      'removeG1B',
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
              case 'g1_criteria':
                this.addG1Criteria(item);
                break;
              case 'g1_a':
                this.addG1A(item);
                break;
              case 'g1_b':
                this.addG1B(item);
                break;
            } 
            this.form[field].push(item);
          }else{
            switch (field) {
              case 'g1_criteria':
                this.removeG1Criteria(this[field].indexOf(item));
                break;
              case 'g1_a':
                this.removeG1A(this[field].indexOf(item));
                break;
              case 'g1_b':
                this.removeG1B(this[field].indexOf(item));
                break;
            } 
            this.form[field].splice( this.form[field].indexOf(item), 1);
          }
        }          
      }else{
        this.form[field] = item;
      }
      const criteria = this.g1_criteria;
      const question = this.questions.g1;
      
      if (
        criteria.includes(question.a.text) &&
        criteria.includes(question.b.text) &&
        criteria.includes(question.c) &&
        this.g1_a.length === question.a.data.length &&
        this.g1_b.length === question.b.data.length
      ) {
        this.$store.commit('qat/setG1Score', 3);
      }else if (
        criteria.includes(question.a.text) &&
        criteria.includes(question.b.text) &&
        this.g1_a.length === question.a.data.length &&
        this.g1_b.length === question.b.data.length
      ) {
        this.$store.commit('qat/setG1Score', 2);
      }else if (
        criteria.includes(question.a.text) &&
        this.g1_a.length === 4
      ) {
        this.$store.commit('qat/setG1Score', 1);
      }else{
        this.$store.commit('qat/setG1Score', 0);
      }
    },
  },
}
</script>
