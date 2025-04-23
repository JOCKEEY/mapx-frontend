<template>
    <v-dialog
      v-model="dialog"
      max-width="900"
      scrollable
      :fullscreen="$vuetify.breakpoint.mobile">
      <v-card>
        <v-card-title class="primary--text">
          <h4>Major Finding</h4>
          <v-spacer />
          <v-btn icon @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider />
        <v-card-text class="py-4">

          <v-list-item  v-for="item in majorFinding" :key="item.element" three-line>
            <v-list-item-content>
              <v-list-item-title>
                <v-row>
                  <v-col cols="4">
                    Indicator Code:
                  </v-col>
                  <v-col cols="8">
                    {{ item.element }}
                  </v-col>
                </v-row>
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-row>
                  <v-col cols="4">
                    Remarks:
                  </v-col>
                  <v-col cols="8">
                    {{ item.remarks }}
                  </v-col>
                </v-row>
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                <v-row>
                  <v-col cols="4">
                    Timeframe: 
                  </v-col>
                  <v-col cols="8">
                    {{ item.timeframe }}
                  </v-col>
                </v-row>
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                <v-row>
                  <v-col cols="4">
                    Recommended action: 
                  </v-col>
                  <v-col cols="8">
                    {{ item.recommendation_actions }}
                  </v-col>
                </v-row>
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                <v-row>
                  <v-col cols="4">
                    Technical Assistance Need: 
                  </v-col>
                  <v-col cols="8">
                    {{ item.technical_assistance_need }}
                  </v-col>
                </v-row>
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                <v-row>
                  <v-col cols="4">
                    Technical Assistance Provider: 
                  </v-col>
                  <v-col cols="8">
                    {{ item.technical_assistance_provider }}
                  </v-col>
                </v-row>
              </v-list-item-subtitle>
              <v-divider :key="item" />
            </v-list-item-content>
          </v-list-item>
          <!-- <v-simple-table class="table-stripe">
            <thead>
              <tr>
                <th style="width: 120px">Indicator Code</th>
                <th>Remarks</th>
                <th>Timeframe</th>
                <th>Recommended action</th>
                <th>Technical Assistance Need</th>
                <th>Technical Assistance Provider</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in majorFinding" :key="item.element">
                <td class="text-center">{{ item.element }}</td>
                <td>{{ item.remarks }}</td>
                <td>{{ item.timeframe }}</td>
                <td>{{ item.recommendation_actions }}</td>
                <td>{{ item.technical_assistance_need }}</td>
                <td>{{ item.technical_assistance_provider }}</td>
            </tr>
            </tbody>
          </v-simple-table> -->
        </v-card-text>
        <v-divider />
        <v-card-actions class="mx-2">
          <v-spacer />
          <v-btn text @click="close"> OK </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  import globalMixin from '~/mixins/global.js';
  
  export default {
    name: 'ReportScoreCardMajorfinding',
    mixins: [globalMixin],
    props: {
      open: {
        type: Boolean,
      },
      majorfinding: {
        type: Object,
        default: () => ({
            major_findings_review: null,
        }),
      },
    },
  
    computed: {
      dialog: {
        get() {
          return this.open;
        },
        set() {
          this.$emit('toggle');
        },
      },
      majorFinding: {
        get() {
            return this.majorfinding.major_findings_review;
        },
        set() {},
      },
    },

    methods: {
      close() {
        this.$emit('toggle');
      },
    },
  };
  </script>
  
  <style></style>
  