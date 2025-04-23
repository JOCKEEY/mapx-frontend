<template>
  <v-sheet class="grey lighten-3 mb-4">
    <v-img max-height="180" position="center bottom" class="">
      <div class="d-flex align-center">
        <v-container fluid class="z-index-1">
          <v-card flat outlined class="color-gradient pa-4 px-6">
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <h1 class="white--text display-h-2 text-capitalize mb-2">
                  Hello {{ formData.name }}
                </h1>
                <p class="white--text mt-0 mb-12 font-weight-light">
                  This is your profile page.
                </p>
                <!-- <v-btn
                elevation="0"
                :ripple="false"
                height="43"
                rounded
                small
                class="teal--text font-weight-regular py-3 px-6"
                color="white">
                Edit Profile
              </v-btn> -->
              </v-col>
            </v-row>
          </v-card>
        </v-container>
      </div>
    </v-img>
    <v-row class="px-6 mt-n16">
      <v-col cols="12" md="8">
        <v-row>
          <v-col cols="12" md="6">
            <v-card class="mb-6">
              <v-card-text class="teal darken-4">
                <v-row no-gutters>
                  <v-col>
                    <div
                      class="font-weight-regular white--text text-uppercase text-overline">
                      Total Hrs Used
                    </div>
                    <p class="font-weight-regular text-h4 white--text mb-0">
                      {{ startOf }}
                    </p>
                  </v-col>
                  <v-col class="text-right">
                    <v-avatar color="white">
                      <v-icon size="30" color="teal">
                        mdi-clock-time-four
                      </v-icon>
                    </v-avatar>
                  </v-col>
                </v-row>

                <p
                  class="mt-4 mb-0 white--text font-weight-light d-flex align-center">
                  <v-icon color="white" class="me-1">
                    mdi-account-lock-open
                  </v-icon>
                  {{ currentDateTime }}
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-card class="mb-30">
          <v-card-text>
            <v-row>
              <v-col>
                <p class="font-weight-regular text-h6 mb-0">My Profile</p>
              </v-col>
              <v-col class="text-right">
                <v-btn
                  small
                  elevation="0"
                  :ripple="false"
                  height="28"
                  rounded
                  color="secondary"
                  class="font-weight-regular text-capitalize px-2 py-1"
                  @click="onToggleEditUser">
                  Edit
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider class="grey lighten-3" />
          <v-card-text>
            <v-form>
              <h5
                class="text-uppercase font-weight-medium mb-8 grey--text text--lighten-1">
                User information
              </h5>
              <div class="ps-lg-5">
                <v-row>
                  <v-col cols="12" md="6" sm="3">
                    <label class="font-weight-regular mb-2 d-block">
                      Name
                    </label>
                  </v-col>

                  <v-col cols="12" md="6" sm="3">
                    <h4 class="font-weight-medium mb-2">
                      {{ formData.name }}
                    </h4>
                  </v-col>

                  <v-col cols="12" md="6" sm="3">
                    <label class="font-weight-regular mb-2 d-block">
                      Email address
                    </label>
                  </v-col>

                  <v-col cols="12" md="6" sm="3">
                    <h4 class="font-weight-medium mb-2">
                      {{ formData.email }}
                    </h4>
                  </v-col>
                </v-row>
              </div>
            </v-form>

            <!-- <h5
              class="font-weight-medium grey--text text--lighten-1 text-uppercase mb-8 mt-8">
              Contact information
            </h5>

            <div class="ps-lg-5">
              <v-row>
                <v-col>
                  <label class="font-weight-regular mb-2 d-block">
                    Location
                  </label>
                </v-col>
                <v-col cols="12" md="6" sm="3">
                  <h4 class="font-weight-medium mb-2">Butuan City</h4>
                </v-col>
              </v-row>
            </div> -->

            <h5
              class="font-weight-medium grey--text text--lighten-1 text-uppercase mb-8 mt-8">
              Password
            </h5>

            <div class="ps-lg-5">
              <v-row>
                <v-col>
                  <v-btn
                    type="submit"
                    color="primary"
                    :loading="isSaving"
                    @click="onToggleChangePassword">
                    <v-icon left>mdi-key</v-icon> Change Password
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <CardsProfile :form-data="formData" />
        <!-- <progress-track /> -->
      </v-col>
    </v-row>
    <ModalsProfileEditForm
      :open="showEditUserForm"
      @toggle="onToggleEditUser" />
    <ModalsProfileChangePassword
      :open="showChangePasswordForm"
      @toggle="onToggleChangePassword" />
  </v-sheet>
</template>
<script>
import moment from 'moment';
import globalMixin from '~/mixins/global.js';

export default {
  name: 'ProfilePage',
  mixins: [globalMixin],
  data: () => ({
    formData: {},
    showChangePasswordForm: false,
    showEditUserForm: false,
    currentDateTime: null,
    isSaving: false,
    isGettingData: false,
  }),
  computed: {
    startOf() {
      return moment(this.formData.createdAt).startOf('day').fromNow();
    },
  },
  mounted() {
    this.formData = this.$auth.user;
  },
  created() {
    setInterval(() => this.updateDateTime(), 1000);
    this.$store.dispatch('setPageTitle', 'Profile');
  },
  methods: {
    updateDateTime() {
      this.currentDateTime = moment().format('MMMM Do YYYY, h:mm:ss a');
    },
    onToggleEditUser() {
      this.showEditUserForm = !this.showEditUserForm;
    },
    onToggleChangePassword() {
      this.showChangePasswordForm = !this.showChangePasswordForm;
    },
  },
};
</script>

<style lang="scss" scoped>
.color-gradient {
  background-image: linear-gradient(50deg, teal, yellow);
}
</style>
