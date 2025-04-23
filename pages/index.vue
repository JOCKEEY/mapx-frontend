<!-- eslint-disable vue/no-v-html -->
<template>
  <v-sheet>
    <v-parallax
      height="800"
      :src="require('~/assets/images/pexels-ajaybhargavguduru-939700.jpg')">
      <v-row class="hero" align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1
            class="font-weight-thin mb-4"
            :class="{ 'text-h1': !isMobile, 'text-h2': isMobile }">
            Quality Assessment Tool
          </h1>
          <h4 class="subtitle-1">
            Assess your BDRRM Plan using quality benchmark
          </h4>
        </v-col>
      </v-row>
    </v-parallax>
    <v-sheet class="pa-5">
      <div class="text-h5 text-center">
        How prepared is your barangay for an impending disaster?
      </div>
      <v-sheet class="mx-auto" width="80%" min-height="400">
        <v-carousel
          cycle
          class="fill-height"
          hide-delimiter-background
          show-arrows-on-hover>
          <v-carousel-item v-for="(slide, i) in features" :key="i">
            <v-sheet height="100%">
              <v-row
                class="fill-height"
                align="center"
                justify="center"
                no-gutters>
                <v-col class="text-right" cols="12" sm="6">
                  <v-img
                    max-height="380"
                    width="100%"
                    contain
                    :alt="slide.img"
                    :src="require(`~/assets/images/${slide.img}`)" />
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="text-h5">{{ slide.title }}</div>
                  <div class="my-3" v-html="slide.body"></div>
                  <v-btn text color="primary" outlined nuxt :to="slide.link">
                    {{ slide.buttonText }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-sheet>
    </v-sheet>
    <!-- <v-sheet class="py-10 portal-features">
      <v-card
        class="mx-auto"
        color="transparent"
        flat
        :width="isMobile ? '100%' : '80%'">
        <v-card-title>
          How prepared is your barangay for an impending disaster?
        </v-card-title>
        <v-row class="mx-0" justify="center" align="center">
          <v-col v-for="(card, i) in cards" :key="'card-' + i" cols="12" sm="4">
            <v-card>
              <v-img
                height="280"
                :alt="card.img"
                :src="require(`~/assets/images/${card.img}`)" />
              <v-divider />
              <v-card-text>
                <h2 class="text-h6 primary--text">
                  {{ card.title }}
                </h2>
                <v-sheet height="60px">
                  {{ card.body }}
                </v-sheet>
              </v-card-text>
              <v-card-actions>
                <v-btn text nuxt :to="card.link">
                  {{ card.buttonText }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-sheet> -->
    <v-parallax
      height="800"
      :src="require('~/assets/images/pexels-margaret-weir-142887-620530.jpg')">
      <v-sheet color="transparent" class="py-5">
        <v-sheet
          class="mx-auto px-4"
          color="transparent"
          :width="isMobile ? '100%' : '80%'">
          <v-carousel height="714" :show-arrows="false">
            <v-carousel-item v-for="(video, i) in videos" :key="'video' + i">
              <v-card class="mx-auto" flat color="transparent">
                <v-card-title>{{ video.title }}</v-card-title>
                <v-card-text class="px-0">
                  <iframe
                    :src="video.link"
                    height="600"
                    width="100%"
                    frameborder="0"></iframe>
                </v-card-text>
              </v-card>
            </v-carousel-item>
          </v-carousel>
        </v-sheet>
      </v-sheet>
    </v-parallax>
    <v-sheet class="grey darken-2">
      <v-sheet
        class="py-10 mx-auto"
        color="transparent"
        :width="isMobile ? '100%' : '80%'">
        <h3 class="mb-3 text-h5 white--text">Downloadable Templates</h3>
        <v-menu>
          <template #activator="{ attrs, on }">
            <v-btn v-bind="attrs" v-on="on">
              Language: {{ templateLang === 'fil' ? 'Filipino' : 'English' }}
              <v-icon right>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="templateLang = 'fil'"> Filipino </v-list-item>
            <v-list-item @click="templateLang = 'en'"> English </v-list-item>
          </v-list>
        </v-menu>
        <v-sheet class="mx-auto mt-3" min-height="400" color="transparent">
          <v-row>
            <v-col
              v-for="(template, i) in bdrrmTemplates"
              :key="'downloadable-template' + i"
              cols="12"
              sm="3">
              <v-card color="orange lighten-1" height="360">
                <v-card-text>
                  <v-sheet class="text-center transparent">
                    <v-sheet
                      class="mx-auto"
                      outlined
                      elevation="1"
                      :width="isMobile ? 160 : 200">
                      <a download :href="template.download">
                        <v-img
                          height="280"
                          contain
                          :alt="template.title"
                          :src="require(`~/assets/images/${template.img}`)" />
                      </a>
                    </v-sheet>
                    <div class="mt-2 text-center">
                      <a
                        class="text-decoration-none black--text"
                        download
                        target="_blank"
                        :href="template.download">
                        {{ template.title }}
                      </a>
                    </div>
                  </v-sheet>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-sheet>
      </v-sheet>
    </v-sheet>
  </v-sheet>
</template>

<script>
import globalMixin from '~/mixins/global.js';
export default {
  name: 'IndexPage',
  mixins: [globalMixin],
  layout: 'public',
  data: () => ({
    features: [
      {
        title: 'Quality Assurance Map',
        body: 'Look at the snapshot of your barangay’s disaster risk reduction and management plan quality rating through a user-friendly Geographic Information System.',
        img: 'ph_map.png',
        link: '/map/interactive',
        buttonText: 'See Details',
      },
      {
        title: 'Quality Assessment Scorecard',
        body: `<div>View the overall quality of your barangay’s disaster risk reduction and management plan across the prescribed quality benchmarks.</div>
          <div class="mt-3">Key Components of a Quality Assessment Scorecard:</div>
          <ul>
            <li>Criteria/Indicators</li>
            <li>Scoring System</li>
            <li>Overall Score and Summary</li>
          </ul>
        `,
        img: 'assessment.png',
        link: '/report/scorecard',
        buttonText: 'See Details',
      },
      {
        title: 'Quality Assessment Tool',
        body: `<div class="text-justify">
          Use the quality assessment tool to help you in benchmarking and assessing your barangay's preparedness.
          It is a structured tool used to evaluate, measure and identify the areas of improvement and ensuring the consistency in quality reviews.
          </div>`,
        img: 'qas-tool.png',
        link: '/qat/quality-assessment-tool',
        buttonText: 'Open Tool',
      },
      /* {
        title: 'Quality Assessment Result',
        body: 'See a summary of disaster risk reduction and management plan quality ratings of barangays in your city or municipality over time.',
        img: 'qa-result.jpg',
        link: '',
      }, */
    ],
    videos: [
      {
        title: 'What is Operation Listo?',
        link: 'https://www.youtube.com/embed/W_k3oBLF2kM',
      },
      {
        title: 'What is Quality Assurance System?',
        link: 'https://www.youtube.com/embed/D2jEBC384p0?si=yc08i0pJzJa02w-1',
      },
    ],
    templateLang: 'en',
  }),

  computed: {
    bdrrmTemplates() {
      const data = [
        {
          title: 'BDRRM PLAN TEMPLATE (ENGLISH)',
          img: 'bdrrmp_eng.png',
          download: '/downloadables/A. BDRRM Plan Template_English.pdf',
          lang: 'en',
        },
        {
          title: 'BDRRM PLAN TEMPLATE (FILIPINO)',
          img: 'bdrrmp_fil.png',
          download: '/downloadables/A. BDRRM Plan Template_Filipino.pdf',
          lang: 'fil',
        },
        {
          title: 'MANUAL FOR QAS (ENGLISH)',
          img: 'qas_eng.png',
          download: '/downloadables/D. Manual for QAS_English.pdf',
          lang: 'en',
        },
        {
          title: 'MANUAL FOR QAS (FILIPINO)',
          img: 'qas_fil.png',
          download: '/downloadables/D. Manual for QAS_Filipino.pdf',
          lang: 'fil',
        },
        {
          title: 'TECHNICAL GUIDE NOTES (ENGLISH)',
          img: 'techguide_eng.png',
          download: '/downloadables/B. Technical Guide Notes_English.pdf',
          lang: 'en',
        },
        {
          title: 'TECHNICAL GUIDE NOTES (FILIPINO)',
          img: 'techguide_fil.png',
          download: '/downloadables/B. Technical Guide Notes_Filipino.pdf',
          lang: 'fil',
        },
        {
          title: 'QAT FOR BDRRM PLAN AND COMMITTEE (ENGLISH)',
          img: 'qat_bdrrmp_eng.png',
          download:
            '/downloadables/QAT for BDRRM Plan and Committee_English.pdf',
          lang: 'en',
        },
        {
          title: 'QAT FOR BDRRM PLAN AND COMMITTEE (FILIPINO)',
          img: 'qat_bdrrmp_fil.png',
          download:
            '/downloadables/QAT for BDRRM Plan and Committee_Filipino.pdf',
          lang: 'fil',
        },
      ];
      return data.filter(record => record.lang === this.templateLang);
    },
  },
};
</script>
<style lang="scss" scoped>
.hero {
  background: rgba(0, 0, 0, 0.4);
}
.portal-features {
  background: rgb(255, 255, 255);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(250, 250, 250, 1) 40%,
    rgba(232, 231, 230, 1) 100%
  );
}

@keyframes pulse {
  0% {
    background: rgb(231, 231, 231) !important;
  }
  100% {
    background: linear-gradient(
      90deg,
      rgb(216, 125, 6),
      rgb(255, 164, 28)
    ) !important;
  }
}
</style>
