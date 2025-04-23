<template>
  <v-card class="mx-auto">
    <v-sheet class="text-center">
      <v-avatar class="center mt-6" size="120" color="teal">
        <span class="text-h4 white--text">{{ initials }}</span>
      </v-avatar>
    </v-sheet>

    <v-card-text class="pt-0">
      <v-list class="py-2">
        <v-list-item class="px-12 py-4">
          <v-row class="d-flex justify-center">
            <v-col v-for="item in 3" :key="item" class="py-0" cols="12" sm="4">
              <v-list-item-content class="text-center">
                <span
                  v-if="item === 1"
                  class="text-h6 font-weight-bold text-body mb-1"
                  :class="[
                    `${userInfo.isActive ? 'green--text' : 'grey--text'}`,
                  ]">
                  Active
                </span>
                <span class="text-h6 font-weight-bold text-body mb-1">
                  {{ formatDate(userInfo.lastActivity, 'l') }}
                </span>
                <v-list-item-title
                  v-if="item === 1"
                  class="description text-body-2 ls-0 mb-2">
                  Status
                </v-list-item-title>
                <v-list-item-title
                  v-else
                  class="description text-body-2 ls-0 mb-2">
                  Last Activity
                </v-list-item-title>
              </v-list-item-content>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-sheet class="text-center mt-6 mt-0">
        <h1 class="font-weight-regular text-capitalize mb-2">
          {{ formData.name }}
        </h1>
        <h4 class="font-weight-regular">{{ formData.email }}</h4>
      </v-sheet>

      <!-- <v-chip-group column class="mx-10">
        <v-chip
          v-for="(role, i) in roles"
          :key="role + i"
          small
          dark
          color="orange"
          class="text-uppercase">
          {{ role }}
        </v-chip>
      </v-chip-group> -->
    </v-card-text>
  </v-card>
</template>
<script>
import globalMixin from '~/mixins/global.js';

export default {
  name: 'CardProfile',
  mixins: [globalMixin],
  props: {
    formData: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    initials: '',
  }),

  computed: {
    name: {
      get() {
        return this.formData.name;
      },
      set() {},
    },

    /* roles: {
      get() {
        return this.$auth.user.roles.map(v => v.split('_').join(' '))
      },
      set(val) {},
    }, */

    userInfo() {
      return this.$auth.user;
    },
  },

  watch: {
    name(val) {
      this.initials = val
        .split(' ')
        .map(word => word[0].toUpperCase())
        .join('');
    },
  },
};
</script>
