<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed app width="360">
      <v-sheet class="d-flex align-center px-2" height="84">
        <img class="mt-4" height="64" src="~/assets/mapx_logo.png" />
        <div class="ml-2">
          <nuxt-link class="text-decoration-none" to="/">
            <h4 class="title">{{ appName }}</h4>
          </nuxt-link>
          <div class="text-center" style="font-size: 12px">
            {{ appSubTitle }}
          </div>
        </div>
      </v-sheet>

      <v-divider />

      <v-list nav dense>
        <v-list-item>
          <v-list-item-title class="primary--text h3">Drafts</v-list-item-title>
          <v-btn
            x-small
            icon
            @click="getAllLocalStorageKeys">
            <v-icon> mdi-refresh </v-icon>
          </v-btn>
        </v-list-item>
      </v-list>
      <v-list dense>
        <v-simple-table>
          <template #default>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in localStorageKeys" :key="item">
                <td @click="retrieveData(item)">
                  <a href="#">{{ item }}</a>
                </td>
                <td>
                  <v-btn
                    class="mx-2"
                    fab
                    dark
                    small
                    color="pink"
                    @click="removeItem(item)"
                  >
                    <v-icon dark>mdi-trash-can</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>
                  <v-btn
                    v-if="localStorageKeys.length!=0"
                    class="mx-2"
                    dark
                    small
                    color="primary"
                    @click="onUploadDraft"
                  >
                    <v-icon dark>mdi-cloud-upload</v-icon>
                    Send Drafts
                  </v-btn>
                </td>
              </tr>
            </tfoot>
          </template>
        </v-simple-table>
        <v-divider />
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="primary" elevation="4" fixed app dark height="80">
      <v-icon @click="drawer = !drawer">
        mdi-chevron-{{ drawer ? 'left' : 'right' }}-circle
      </v-icon>
      <!-- <v-app-bar-nav-icon i @click.stop="drawer = !drawer" /> -->
      <v-toolbar-title class="ml-2" v-text="$store.state.pageTitle" />
      <v-spacer />
      &nbsp;
      <v-menu offset-y left :close-on-content-click="false">
        <template #activator="{ on, attrs }">
          <v-btn
            icon
            outlined
            color="white"
            small
            class="mr-1"
            v-bind="attrs"
            v-on="on">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-card width="300">
          <v-card-text>
            <v-card class="d-flex pa-2" flat @click="$router.push('/profile')">
              <img style="height: 48px" :src="`/api/user/avatar/${userId}`" />
              <v-sheet class="ml-2">
                <div>{{ name }}</div>
                <div class="grey--text">{{ email }}</div>
              </v-sheet>
            </v-card>
          </v-card-text>
          <v-divider />
          <v-card-actions class="justify-space-between">
            <v-btn text @click="onLogout">
              <v-icon>mdi-logout</v-icon> Sign-out
            </v-btn>
            <nuxt-link
              v-if="isAdmin"
              to="/system/manage"
              class="text-decoration-none mr-2">
              System Settings
            </nuxt-link>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-divider />

    <v-main>
      <v-container :style="{ padding: 0 }">
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer app color="yellow darken-3">
      <span> &copy; {{ new Date().getFullYear() }} - Operation Listo </span>
      <v-spacer />
      <span> AlertAndReady! </span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
// import moment from 'moment'
import globalMixin from '@/mixins/global';
export default {
  name: 'DefaultLayout',
  mixins: [globalMixin],
  middleware({ $auth, redirect, store, route }) {
    if (!store.state.auth.loggedIn) {
      return redirect('/login');
    }

    const rememberExpires = $auth.$storage.getCookie('remember_expires');
    const rememberMaxage = $auth.$storage.getCookie('remember_maxage');
    if (rememberExpires) {
      $auth.options.cookie.options.expires = rememberExpires;
      $auth.options.cookie.options.maxAge = rememberMaxage;
    } else {
      $auth.options.cookie.options.expires = null; // reset to "session"
      $auth.options.cookie.options.maxAge = null; // reset to "session"
    }

    if (store.state.user.menus.sidebar) {
      const menus = store.state.user.menus.sidebar.map(menu => {
        if (
          typeof menu.subLinks === 'object' &&
          menu.subLinks &&
          menu.subLinks.length
        ) {
          return menu.subLinks.map(subMenu => subMenu.link);
        }
        return menu.link;
      });

      const currentPath =
        route.path.substr(route.path.length - 1) === '/'
          ? route.path.substr(0, route.path.length - 1)
          : route.path;

      const excludePath = [
        '/profile',
        '/index',
        '/system/manage',
        '/access-denied',
        '/',
      ];

      if (
        !store.state?.user?.appUser?.isAdmin &&
        !excludePath.includes(currentPath) &&
        !menus.flat().includes(currentPath)
      ) {
        return redirect('/access-denied');
        // console.log('access denied')
      }
    }
  },
  data() {
    return {
      localStorageKeys: [],
      drawer: false,
      clipped: false,
      isSaving: false,
    };
  },

  computed: {
    ...mapGetters('user', ['sidebarMenu', 'roleNames']),
    ...mapState('auth', ['user']),

    name() {
      return this.user?.name || '';
    },

    email() {
      return this.user?.email || '';
    },

    userId() {
      return this.$auth.user?.id || 0;
    },
  },

  watch: {},

  beforeMount() {
    this.fetchAppUser();
    this.getAllLocalStorageKeys();
  },

  methods: {
    ...mapActions('qat',[
      'initializeFromLocalStorage',
      'resetStore',
    ]),
    fetchAppUser() {
      this.$store.dispatch('user/fetchAppUser');
    },
    onLogout() {
      this.$auth.logout();
      this.resetUser();
    },  
    getAllLocalStorageKeys() {
      const prefix = "Digital Quality Assessment Tool -";
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
    
        if (key.startsWith(prefix)) {
          const strippedKey = key.replace(prefix, "");
          keys.push(strippedKey);
        }
      }
      this.localStorageKeys = keys;
      // this.drawer = true;
    },
    onUploadDraft(){
      if (this.isSaving) {
        return;
      }
      this.isSaving = true;
      try {
        if (this.localStorageKeys.length===0) {
          return;
        }
        this.localStorageKeys.forEach((async items => {
          const item = localStorage.getItem(items);
          
          await this.$axios.post('/api/qas-form/create', {
            ...JSON.parse(item),
            createdBy: this.authUser.name,
          });
        }));
        
        this.systemInfoMessage('The form was successfully submitted');
      } catch (error) {
        this.apiErrorMessage(error.message);
      } finally {
        this.isSaving = false;
      }
    },
    removeItem(key) {
      const finalKey = 'Digital Quality Assessment Tool -'+key;
      localStorage.removeItem(finalKey);
      this.getAllLocalStorageKeys(); // Refresh the list after deletion
    },
    retrieveData(key){
      const finalKey = 'Digital Quality Assessment Tool -'+key;
      this.resetStore();
      setTimeout(() => {
        this.initializeFromLocalStorage(finalKey);
      }, 500);
    },
  },
};
</script>
