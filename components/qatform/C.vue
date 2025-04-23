<template>
  <section>
    <div class="red--text mt-5">
      <p><b>C. RESOURCE ALLOCATION</b></p>
    </div>
    <v-card class="mt-2 pa-4 pa-md-8 pa-lg-12">
      <v-row>
        <v-col cols="12">
          <div class="blue lighten-3 pa-2">
            <div class="text-center black--text text-subtitle-2">
              <p class="mt-4">
                <b> C1. PROGRAMS, PROJECTS AND ACTIVITIES IN THE PLAN ARE CLUSTERED PER THEMATIC AREA WITH CLEAR TARGETS AND TIMEFRAMES, AND ARE RESOURCED PROPERLY. </b>
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
      <div v-for="(value, key, index) in questions.c1" :key="key + index">
        <v-row v-if="typeof(value) === 'string'">
          <v-col cols="12">
            <v-divider />
            <v-checkbox
              v-model="form.c1_criteria"
              :label="value"
              :value="value"
              @change="handleCriteria(value, 'c1_criteria')"
            />
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="12" sm="6">
            <v-divider />
            <v-checkbox
              v-model="form.c1_criteria"
              :label="value.text"
              :value="value.text"
              @change="handleCriteria(value.text, 'c1_criteria')"
            />
          </v-col>
          <v-divider vertical />
          <v-col cols="12" sm="6">
            <v-row v-for="(item, i) in questions.c1[key].data" :key="item + i">
              <v-col cols="12">
                <v-divider />
                <v-checkbox
                  v-model="form['c1_' + key]"
                  :label="item"
                  :value="item"
                  :disabled="!form.c1_criteria.includes(value.text)"
                  @change="handleCriteria(item, 'c1_' + key)"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
      <v-row>
        <v-col cols="12">
          <p><b>REMARKS</b></p>
          <i>REMARKS (Please record your findings and analysis on the identified gaps pertaining to this Quality Benchmark. What are the gaps, and why are they not in place?)</i>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="c1_remarks"
            label="Remarks"
            prepend-icon="mdi-comment-outline"
            @change="handleCriteria(c1_remarks, 'c1_remarks')"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="12" class="yellow darken-2 rounded-lg white--text">
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
                    <tr><td>3</td><td>If all the criteria from A with all its sub-sections, B with its first sub-section, C with at least 3 of its sub-sections and D are present in the plan</td></tr>
                    <tr><td>2</td><td>If criteria A with all its sub-sections and B with its first sub-section are present in the plan</td></tr>
                    <tr><td>1</td><td>If any of the criteria from A to D are present in the plan</td></tr>
                    <tr><td>0</td><td>If none of the criteria are present in the plan</td></tr>
                  </tbody>
                </table>
              </span>
            </v-tooltip>
          </v-row>
          <v-row justify="center">
            <div class="text-h4 mb-2">Rating [C]: {{ c1_score }}</div>
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
   name: 'QatformC',
   mixins: [globalMixin],
   data() {
     return {
       isTop: false,
       form: {
         c1_criteria: [],
         c1_a : [],
         c1_b : [],
         c1_c : [],
         c1_remarks : '',
         c1_score : 0,
       },
       questions : {
         c1: {
           a: {
             text: 'A. Programs, projects and activities in the BDRRM plan are:',
             data: [
               'Organized per thematic area',
               'With expected output',
               'With timeframe',
               'With budget',
             ],
           },
           b: {
             text: 'B. Budget estimates and other possible sources of funds are determined in the thematic plan:',
             data: [
               '5% DRRM fund',
               '1% BCPC fund',
               '5% GAD fund',
               '10% SK fund',
               '20% development fund',
               '20% Other sources such as municipal/city or provincial DRRM fund, I/NGOs',
             ],
           },
           c: {
             text: 'C. Programs, projects and activities addressing the major issues/concerns for children and persons with disability are identified in the plan:',
             data: [
               'Issues on protection of children and persons with disability protection such as neglect, abuse, exploitation, child labor, trafficking and recriutment into armed groups',
               'Disruption of classes',
               'Being prone to diseases and illnesses',
               'Loss of important documents such as birth certificates and school records',
               'Loss of shelters',
               'Injury, psychosocial distress and separation from family members during disasters or emergencies',
             ],
           },
           d: 'D. BDRRM plan is integrated in the approved barangay development plan and annual investment plan',
         },
       },
     };
   },
   computed: {
    ...mapGetters('qat',[
        'c1_criteria',
        'c1_a',
        'c1_b',
        'c1_c',
        'c1_remarks',
        'c1_score',
      ]),
      c1_remarks: {
        set(val){
          this.$store.commit('qat/setC1Remarks', val);
        },
        get(){
          return this.$store.state.qat.c1_remarks;
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
      c1_criteria: {
        immediate: true,
        handler(data) {
          this.form.c1_criteria = JSON.parse(JSON.stringify(data));
        },
      },
      c1_a: {
        immediate: true,
        handler(data) {
          this.form.c1_a = JSON.parse(JSON.stringify(data));
        },
      },
      c1_b: {
        immediate: true,
        handler(data) {
          this.form.c1_b = JSON.parse(JSON.stringify(data));
        },
      },
      c1_c: {
        immediate: true,
        handler(data) {
          this.form.c1_c = JSON.parse(JSON.stringify(data));
        },
      },
      c1_remarks: {
        immediate: true,
        handler(data) {
          this.form.c1_remarks = JSON.parse(JSON.stringify(data));
        },
      },
      c1_score: {
        immediate: true,
        handler(data) {
          this.form.c1_score = JSON.parse(JSON.stringify(data));
        },
      },
  },
   created() {
   },
   methods: {
    ...mapActions('qat', [
        'addC1Criteria',
        'removeC1Criteria',
        'addC1A',
        'removeC1A',
        'addC1B',
        'removeC1B',
        'addC1C',
        'removeC1C',
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
              case 'c1_criteria':
                this.addC1Criteria(item);
                break;
              case 'c1_a':
                this.addC1A(item);
                break;
              case 'c1_b':
                this.addC1B(item);
                break;
              case 'c1_c':
                this.addC1C(item);
                break;
            } 
            this.form[field].push(item);
           }else{
            switch (field) {
              case 'c1_criteria':
                this.removeC1Criteria(this[field].indexOf(item));
                break;
              case 'c1_a':
                this.removeC1A(this[field].indexOf(item));
                break;
              case 'c1_b':
                this.removeC1B(this[field].indexOf(item));
                break;
              case 'c1_c':
                this.removeC1C(this[field].indexOf(item));
                break;
            } 
             this.form[field].splice( this.form[field].indexOf(item), 1);
           }
         }          
       }else{
         this.form[field] = item;
       }

       const c1 = this.c1_criteria;
       const c1q = this.questions.c1;
       if (
         c1.includes(c1q.a.text) &&
         c1.includes(c1q.b.text) && 
         c1.includes(c1q.c.text) &&
         c1.includes(c1q.d) && 
         this.c1_a.length === 4 &&
         this.c1_b.length === 1 &&
         this.c1_c.length >= 3
       ) {
        this.$store.commit('qat/setC1Score', 3);
       }else if (          
         c1.includes(c1q.a.text) &&
         c1.includes(c1q.b.text) && 
         this.c1_a.length === 4 &&
         this.c1_b.length === 1 &&
         this.c1_b.includes(c1q.b.data[0])
       ) {
        this.$store.commit('qat/setC1Score', 2);
       }else if (
         (c1.includes(c1q.a.text) && this.c1_a.length === 4) ||
         (c1.includes(c1q.b.text) && this.c1_b.length === 1) ||
         (c1.includes(c1q.c.text) && this.c1_c.length >= 3) ||
         c1.includes(c1q.d) 
       ) {
        this.$store.commit('qat/setC1Score', 1);
       }else{ 
        this.$store.commit('qat/setC1Score', 0);
       }
       
     },
   },
 }
 </script>