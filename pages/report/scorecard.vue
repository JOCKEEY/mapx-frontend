<template>
  <v-sheet>
    <v-sheet>
      <v-sheet
        class="mx-auto pt-3"
        color="transparent"
        :width="isMobile ? '100%' : '80%'">
        <v-row class="mx-0" justify="center" align="center">
          <v-col cols="12">
            <ReportScoreCard />
          </v-col>
        </v-row>
      </v-sheet>
    </v-sheet>
  </v-sheet>
</template>

<script>
import globalMixin from '~/mixins/global.js';
export default {
  name: 'ScoreCardPage',
  mixins: [globalMixin],
  layout: 'public',
  data: () => ({}),
};
</script>
