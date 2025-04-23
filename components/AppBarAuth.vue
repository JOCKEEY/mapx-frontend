<template>
  <v-app-bar
    fixed
    hide-on-scroll
    color="primary darken-1"
    elevation="10"
    height="80%"
    flat>
    <v-container>
      <v-sheet v-if="!isMobile" class="d-flex transparent align-center">
        <nuxt-link class="text-decoration-none" to="/">
          <h3 class="text-h4 white--text">{{ appName }}</h3>
        </nuxt-link>
        <v-spacer />

        <v-btn
          v-for="item in links"
          :key="item.name"
          :ripple="false"
          color="transparent"
          :class="{
            'white--text': hasbg,
          }"
          class="ls-0"
          depressed
          link
          :to="item.link">
          {{ item.name }}
        </v-btn>
      </v-sheet>
      <v-sheet v-else class="transparent white--text d-flex align-center">
        <h3 class="ml-3 text-center">{{ appSubTitle }}</h3>
      </v-sheet>
    </v-container>
  </v-app-bar>
</template>

<script>
import globalMixin from '@/mixins/global';
export default {
  name: 'AppBar',
  mixins: [globalMixin],
  props: {
    background: {
      type: String,
      default: '',
    },
    hasbg: Boolean,
    linkcolor: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      dialog: false,
      social: [
        {
          icon: 'mdi-facebook',
          tooltip: 'Like us on Facebook',
          link: 'https://www.facebook.com/people/Ict4rm-20/100087678650818/',
        },
        {
          icon: 'mdi-youtube-subscription',
          tooltip: 'Subscribe us on Youbute',
          link: 'https://www.youtube.com/@ict4rm2.0',
        },
      ],
      links: [
        {
          name: 'About',
          link: '/about',
        },
      ],
    };
  },
};
</script>

<style></style>
