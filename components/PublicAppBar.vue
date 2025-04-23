<template>
  <v-sheet class="elevation-1 pa-5 primary">
    <v-sheet
      v-if="!isMobile"
      width="80%"
      class="mx-auto d-flex transparent align-center"
      height="80">
      <img class="mt-2" height="72" src="~/assets/mapx_logo.png" />
      <div class="ml-2">
        <nuxt-link class="text-decoration-none" to="/">
          <h3 class="text-h4 white--text">{{ appName }}</h3>
        </nuxt-link>
        <span class="pl-1">{{ appSubTitle }}</span>
      </div>
      <v-spacer />
      <v-btn
        v-if="!isLoggedIn"
        color="white"
        :ripple="false"
        depressed
        link
        to="/login">
        Login
      </v-btn>
      <v-btn
        v-if="isLoggedIn"
        color="transparent"
        :ripple="false"
        depressed
        link
        to="/profile">
        <v-icon left>mdi-account-circle</v-icon>
        Profile
      </v-btn>
    </v-sheet>
    <v-sheet v-else class="transparent primary--text d-flex align-center">
      <img class="mt-2" height="48" src="~/assets/mapx_logo.png" />
      <nuxt-link class="text-decoration-none" to="/">
        <h3 class="ml-2 text-h6 white--text">{{ appName }}</h3>
      </nuxt-link>
      <v-spacer />
      <v-btn
        v-if="!isLoggedIn"
        color="white"
        :ripple="false"
        depressed
        link
        to="/login">
        Login
      </v-btn>
      <v-btn
        v-if="isLoggedIn"
        color="transparent"
        :ripple="false"
        depressed
        link
        to="/profile">
        <v-icon left>mdi-account-circle</v-icon>
        Profile
      </v-btn>
    </v-sheet>
  </v-sheet>
</template>

<script>
import globalMixin from '@/mixins/global';
export default {
  name: 'PublicAppBar',
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
          name: 'Login',
          link: '/login',
        },
        {
          name: 'About',
          link: '/about',
        },
      ],
    };
  },

  computed: {
    isLoggedIn() {
      return this.$store.state.auth.loggedIn;
    },
  },
};
</script>

<style></style>
