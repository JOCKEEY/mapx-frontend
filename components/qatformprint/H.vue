<template>
  <section>
    <div class="red--text mt-5">
      <p><b>H. POLICY SUPPORT</b></p>
    </div>

    <v-card class="mt-2 pa-6 pa-md-12"> <!-- Adjust padding for responsiveness -->
      <v-row>
        <v-col cols="12">
          <div class="blue lighten-3 pa-2 pa-md-3">
            <div class="text-center black--text text-body-1 text-md-subtitle-2">
              <p class="mt-2 mt-md-4">
                <b>H1. LOCAL POLICIES ARE IN PLACE TO SUPPORT IMPLEMENTATION OF BDRRM PLAN.</b>
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

      <v-row>
        <v-col v-for="(item, key, index) in questions.h1" :key="item+index" cols="12">
          <v-checkbox
            v-model="form.h1_criteria"
            :label="item"
            :value="item"
            readonly
            @change="handleCriteria(item, 'h1_criteria')"
          />
          <v-divider />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <b><p>Local Policies</p></b>
        </v-col>
        <v-col v-for="(item, index) in form.h1_local_policies" :key="item+index" cols="12">
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="form.h1_local_policies[index].title"
                label="Title"
                readonly
                :value="item.title"
                @input="onInput(index)"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="form.h1_local_policies[index].eo_ord_reso"
                label="EO/Ordinance/Resolution No."
                readonly
                :value="item.eo_ord_reso"
                @input="onInput(index)"
              />
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="form.h1_local_policies[index].date"
                label="Date Issued"
                readonly
                :value="item.date"
                @input="onInput(index)"
              />
            </v-col>
            <v-col cols="12" md="1" class="d-flex align-center justify-center">
              <v-btn v-if="index !== 0" fab small @click="removeH1LocalPolicies(index)">
                <v-icon color="red">mdi-trash-can-outline</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="col-12">
          <v-btn fab small color="success" @click="addH1LocalPolicies({ id: Math.random(), title: '', eo_ord_reso: '', date: '' })">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-divider />

      <v-row>
        <v-col cols="12">
          <p><b>REMARKS</b></p>
          <i>REMARKS (Please record your findings and analysis on the identified gaps pertaining to this Quality Benchmark.)</i>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="h1_remarks"
            label="Remarks"
            readonly
            prepend-icon="mdi-comment-outline"
            @change="handleCriteria(h1_remarks, 'h1_remarks')"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" class="yellow darken-2 rounded-lg white--text">
          <v-row justify="end">
            <v-tooltip :top="isTop">
              <template #activator="{ on, attrs }">
                <v-btn class="mx-2" color="blue" fab small dark v-bind="attrs" v-on="on" @mouseenter="checkPosition">?</v-btn>
              </template>
              <span>
                <table>
                  <tbody>
                    <tr><td>3</td><td>If all criteria from A to D are present in the plan</td></tr>
                    <tr><td>2</td><td>If criteria A to C are present in the plan</td></tr>
                    <tr><td>1</td><td>If any of the criteria is present in the plan</td></tr>
                    <tr><td>0</td><td>If none of the criteria are present in the plan</td></tr>
                  </tbody>
                </table>
              </span>
            </v-tooltip>
          </v-row>

          <v-row justify="center">
            <div class="text-h4 mb-2">Rating [H]: {{ form.h1_score }}</div>
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
    name: 'QatformprintH',
    mixins: [globalMixin],
    props: {},
    data() {
      return {
        isTop: false,
        form : { 
          h1_criteria : [],
          h1_remarks : '',
          h1_score : 0,
          h1_local_policies :[
            {
              id: Math.floor(Math.random() * 1000000),
              title: '',
              eo_ord_reso: '',
              date: '',
            },
          ],
        },
        questions: {
          h1: {
            a: 'A. A local policy (ex. EO, ordinance, resolution) creating the BDRRM committee with roles and responsibilities is approved',
            b: 'B. With resolution adopting the BDRRM plan',
            c: 'C. Approved appropriation ordinance of the barangay that includes utilization of the local DRRM fund',
            d: 'D. With other local policies (ex. EO, ordinance, resolution) institutionalizing DRR measures, e.g. conduct of regular community drills, solid waste management, etc.',
          },
        },
      };
    },
    computed: {
      ...mapGetters('qat',[
        'h1_criteria',
        'h1_remarks',
        'h1_score',
        'h1_local_policies',
      ]),
      h1_remarks: {
        set(val){
          this.$store.commit('qat/setH1Remarks', val);
        },
        get(){
          return this.$store.state.qat.h1_remarks;
        },
      },    
      h1_local_policies: {
        set(val){
          this.$store.commit('qat/setH1LocalPolicies', val);
        },
        get(){
          return this.$store.state.qat.h1_local_policies;
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
      h1_criteria: {
        immediate: true,
        handler(data) {
          this.form.h1_criteria = JSON.parse(JSON.stringify(data));
        },
      },
      h1_local_policies: {
        immediate: true,
        handler(data) {
          this.form.h1_local_policies = JSON.parse(JSON.stringify(data));
        },
      },
      h1_remarks: {
        immediate: true,
        handler(data) {
          this.form.h1_remarks = JSON.parse(JSON.stringify(data));
        },
      },
      h1_score: {
        immediate: true,
        handler(data) {
          this.form.h1_score = JSON.parse(JSON.stringify(data));
        },
      },
    },
    created() {
    },
    methods: {
      ...mapActions('qat', [
        'addH1Criteria',
        'removeH1Criteria',
        'addH1LocalPolicies',
        'removeH1LocalPolicies',
        'updateH1LocalPolicies',
      ]),
      onInput(index){
        const updatedLocalPolicies = this.form.h1_local_policies[index];
        this.updateH1LocalPolicies({ index, updatedLocalPolicies });
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
      handleCriteria(item, field) {
        if (typeof this.form[field] === 'object') {
          if (this.form[field]) {
            if (!this[field].includes(item)) {
              this.addH1Criteria(item);
              this.form[field].push(item);
            }else{
              this.removeH1Criteria(this[field].indexOf(item))
              this.form[field].splice( this.form[field].indexOf(item), 1);
            }
          }          
        }else{
          this.form[field] = item;
        }

        const criteria = this.h1_criteria;
        const question = this.questions.h1;

        if (
          criteria.includes(question.a) &&
          criteria.includes(question.b) &&
          criteria.includes(question.c) &&
          criteria.includes(question.d)
        ) {
          this.$store.commit('qat/setH1Score', 3);
        }else if (
          criteria.includes(question.a) &&
          criteria.includes(question.b) &&
          criteria.includes(question.c) 
        ) {
          this.$store.commit('qat/setH1Score', 2);
        }else if (
          criteria.includes(question.a) ||
          criteria.includes(question.b) ||
          criteria.includes(question.c) ||
          criteria.includes(question.d) 
        ) {
          this.$store.commit('qat/setH1Score', 1);
        }else{
          this.$store.commit('qat/setH1Score', 0);
        }
        
      },

    },
  }
  </script>
  