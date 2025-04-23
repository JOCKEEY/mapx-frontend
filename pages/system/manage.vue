<template>
  <v-card color="basil" flat>
    <v-tabs v-model="tab" background-color="grey lighten-3" icons-and-text>
      <v-tab class="text-capitalize" active-class="white">
        Pages & API <v-icon>mdi-link</v-icon>
      </v-tab>
      <v-tab class="text-capitalize" active-class="white">
        Permissions <v-icon>mdi-key</v-icon>
      </v-tab>
      <v-tab class="text-capitalize" active-class="white">
        Users <v-icon>mdi-account-supervisor</v-icon>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <SystemMenu />
      </v-tab-item>
      <v-tab-item>
        <SystemPermission />
      </v-tab-item>
      <v-tab-item>
        <SystemUser />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
export default {
  name: 'SystemPage',
  data: () => ({
    tab: null,
  }),
  head: () => ({
    title: 'System',
  }),
  created() {
    this.$store.dispatch('setPageTitle', 'System');
  },
};
</script>

<style></style>
