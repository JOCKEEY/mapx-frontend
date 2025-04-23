<template>
  <v-app>
    <!-- <v-main id="login-container"> -->
    <v-main>
      <app-bar-auth background="transparent" hasbg linkcolor="white" />
      <v-container class="mt-16 mx-0 col-12 px-0">
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer app color="yellow darken-3">
      <span> &copy; {{ new Date().getFullYear() }} </span>
      <v-spacer />
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'LoginLayout',
  computed: {
    headerTitle() {
      switch (this.$route.name) {
        case 'login':
          return 'Welcome!';
        case 'register':
          return 'Create an account';
        default:
          return '';
      }
    },
  },
  beforeMount() {
    if (this.$auth.user) {
      this.$router.push('/');
    }
  },
};
</script>

<style lang="scss">
#login-container {
  width: 100vw;
  height: 100vh;
  background: rgb(58, 175, 169);
  background: linear-gradient(
    175deg,
    rgba(58, 175, 169, 1) 50%,
    rgba(43, 122, 120, 1) 50%
  );
  padding: 0 !important;
}
</style>
