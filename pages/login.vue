<template>
  <v-sheet
    max-width="560"
    height="100%"
    class="mx-auto mb-16 mt-sm-4 rounded-lg">
    <v-form ref="form">
      <v-card
        class="mt-sm-16 rounded-xl px-4"
        :loading="isLoggingIn"
        :flat="isMobile">
        <v-card-title>Login</v-card-title>
        <v-card-text class="text-center">
          <v-text-field
            v-model.number="formData.username"
            :rules="[rules.required]"
            append-icon="mdi-account"
            outlined
            placeholder="Username"
            class="mt-6 mb-4" />

          <v-text-field
            v-model="formData.password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="show ? 'text' : 'password'"
            outlined
            placeholder="Password"
            class="mb-6"
            @click:append="show = !show" />

          <v-checkbox
            v-model="formData.rememberMe"
            color="#5e72e4"
            :ripple="false"
            class="ma-0 checkbox-custom checkbox-thinner"
            hide-details
            label="Remember Me" />

          <v-btn
            block
            elevation="0"
            :ripple="false"
            height="43"
            class="py-3 px-6 my-6"
            color="primary"
            type="submit"
            :loading="isLoggingIn"
            @click.prevent="onLogin">
            Sign In
          </v-btn>
          <!-- <div class="d-flex justify-space-between mt-4 mx-4 pb-4">
            <small>Forgot password?</small>
          </div> -->
        </v-card-text>
      </v-card>
    </v-form>
  </v-sheet>
</template>

<script>
import { mapActions } from 'vuex';
import globalMixin from '@/mixins/global';
export default {
  name: 'LoginPage',
  mixins: [globalMixin],
  layout: 'public',
  auth: false,
  middleware({ redirect, store }) {
    if (store.state.auth.loggedIn) {
      return redirect('/profile');
    }
  },
  data() {
    return {
      checkbox: false,
      show: false,
      formData: {
        username: '',
        password: '',
        rememberMe: false,
        fcmToken: null,
      },
      isLoggingIn: false,
      redirectUrl: '',
    };
  },
  computed: {
    rules: () => ({
      required: value => !!value || 'Required.',
      emailMatch: () => "The email and password you entered don't match",
      isEmail: v => /.+@.+/.test(v) || 'Invalid Email address',
    }),
    isLoggedIn() {
      return !!this.$store.state.auth.user;
    },
  },
  watch: {
    isLoggedIn(isTrue) {
      if (isTrue) {
        this.isLoggingIn = true;
        setTimeout(() => {
          this.$router.push(this.redirectUrl);
        }, 1000);
      }
    },
  },
  created() {
    this.redirectUrl = this.$store.state.auth.redirect || '/profile';
  },
  mounted() {
    this.$store.dispatch('setPageTitle', 'Welcome!');
  },
  methods: {
    ...mapActions('user', ['fetchRoles', 'fetchManaged']),

    async onLogin() {
      if (this.isLoggingIn) {
        return;
      }
      const validated = this.$refs.form.validate();
      if (validated) {
        this.isLoggingIn = true;
        try {
          const { data } = await this.$auth.loginWith('local', {
            data: this.formData,
          });
          const { appUser, token } = data.data;
          if (this.formData.rememberMe) {
            this.$auth.options.cookie.options.expires = 365;
            this.$auth.options.cookie.options.maxAge = 31536000000;
            this.$auth.$storage.setCookie('remember_expires', 365, {
              expires: 365,
            });
            this.$auth.$storage.setCookie('remember_maxage', 31536000000, {
              maxAge: 31536000000,
            });
          } else {
            this.$auth.$storage.removeCookie('remember_expires');
            this.$auth.$storage.removeCookie('remember_maxage');
            this.$auth.options.cookie.options.expires = null;
            this.$auth.options.cookie.options.maxAge = null;
          }
          this.$auth.setUser(appUser);
          this.$auth.setUserToken(token, token);
        } catch (error) {
          this.isFormError = true;
          this.apiErrorMessage(error);
        } finally {
          this.isLoggingIn = false;
        }
      }
    },
  },
};
</script>
