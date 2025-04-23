<template>
  <v-app>
    <v-main>
      <public-app-bar />
      <v-divider />
      <v-container class="pa-0" fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer class="justify-center pt-12" color="blue darken-3">
      <v-card
        v-for="(partner, i) in partners"
        :key="'partner' + i"
        color="transparent"
        width="240"
        height="220"
        flat>
        <v-img
          height="48"
          contain
          :src="require(`~/assets/partners/${partner.img}`)"
          :alt="partner.title" />
        <v-card-text class="text-center">
          <a :href="partner.link" class="text-decoration-none" target="_blank">
            <h4 class="yellow--text font-weight-regular">
              {{ partner.title }}
            </h4>
          </a>
          <div class="white--text" style="font-size: 10px">
            {{ partner.address }}
          </div>
          <div
            v-if="partner.contact"
            class="white--text mt-2"
            style="font-size: 10px">
            {{ partner.contact }}
          </div>
          <div
            v-if="partner.email"
            class="white--text mt-2"
            style="font-size: 10px">
            {{ partner.email }}
          </div>
        </v-card-text>
      </v-card>
    </v-footer>
    <v-sheet
      color="grey darken-4"
      dark
      class="text-center py-3"
      style="font-size: 12px">
      &copy; {{ new Date().getFullYear() }} THE ALERT AND READY COMMUNITIES
      PROJECT, All Rights Reserved.
    </v-sheet>
  </v-app>
</template>

<script>
export default {
  name: 'PublicLayout',
  data: () => ({
    partners: [
      {
        title: 'National Disaster Risk Reduction and Management Council',
        address: 'NDRRMC Building, Camp General Emilio Aguinaldo, Quezon City',
        link: 'http://www.ndrrmc.gov.ph/',
        img: 'ndrrmc.png',
        contact: '',
        email: '',
      },
      {
        title: 'Department of the Interior and Local Government',
        address:
          'DILG-NAPOLCOM Center,  EDSA corner Quezon Avenue, West Triangle, Quezon City, Philippines',
        link: 'http://www.dilg.gov.ph/',
        img: 'dilg.png',
        contact: '',
        email: '',
      },
      {
        title: 'Local Government Academy',
        address: `8F and 9F Agustin I Building, F. Ortigas Jr. Rd., Ortigas Center, Pasig City`,
        link: 'http://lga.gov.ph/',
        img: 'lga.png',
        contact: '634-8430 | 634-6416 | Fax: 634-6567',
        email: 'lgamail@lga.gov.ph',
      },
      {
        title: 'Office of Civil Defense',
        address: 'Camp General Emilio Aguinaldo, Quezon City, Philippines',
        link: 'http://ocd.gov.ph/',
        img: 'ocd.png',
        contact: '(02) 911-5061 to 64 loc 122',
        email: 'ndrrmc.secretariat@yahoo.com',
      },
      {
        title: 'Save the Children Philippines',
        address:
          'Midland Building, 1040 EDSA, Magallanes Village, Makati City, Philippines',
        link: 'http://www.savethechildren.org.ph/',
        img: 'stc.png',
        contact: '(02) 853-2142 loc 315',
        email: '',
      },
    ],
  }),
  computed: {},
};
</script>

<style lang="scss"></style>
