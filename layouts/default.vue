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
          <v-list-item-title class="primary--text">Menu</v-list-item-title>
          <v-btn
            x-small
            icon
            :loading="isFetchingMenu"
            @click="fetchNavigations">
            <v-icon> mdi-refresh </v-icon>
          </v-btn>
        </v-list-item>
        <div v-for="(link, i) in sidebarMenuList" :key="i">
          <v-list-item
            v-if="!link.subLinks"
            :to="link.link"
            class="v-list-item">
            <v-list-item-icon>
              <v-icon>{{ link.icon || 'mdi-circle-medium' }}</v-icon>
            </v-list-item-icon>

            <v-list-item-title v-text="link.title" />
          </v-list-item>

          <v-list-group
            v-else
            :key="link.title"
            no-action
            :prepend-icon="link.icon || 'mdi-circle-medium'"
            :value="false">
            <template #activator>
              <v-list-item-title v-text="link.title" />
            </template>

            <v-list-item
              v-for="sublink in link.subLinks"
              :key="sublink.title"
              :to="sublink.link">
              <v-list-item-title>
                {{ sublink.title }}
              </v-list-item-title>
              <v-list-item-icon>
                <v-icon right>
                  {{ sublink.icon || 'mdi-chevron-right' }}
                </v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      color="primary"
      elevation="4"
      fixed
      app
      dark
      height="80"
      :clipped-left="clipped">
      <v-icon @click="drawer = !drawer">
        mdi-chevron-{{ drawer ? 'left' : 'right' }}-circle
      </v-icon>
      <!-- <v-app-bar-nav-icon i @click.stop="drawer = !drawer" /> -->
      <v-toolbar-title class="ml-2" v-text="$store.state.pageTitle" />
      <v-spacer />
      <v-menu
        v-if="notifications.length"
        offset-y
        left
        :close-on-content-click="false">
        <template #activator="{ on, attrs }">
          <v-btn icon small v-bind="attrs" v-on="on">
            <v-icon color="white">mdi-bell-badge</v-icon>
          </v-btn>
        </template>
        <v-card max-width="420" max-height="800">
          <v-list dense two-line>
            <v-subheader class="subtitle-2 pl-6 teal--text">
              Notifications
            </v-subheader>
            <v-list-item-group color="primary">
              <v-list-item v-for="(item, i) in notifications" :key="i">
                <v-list-item-avatar>
                  <v-icon>mdi-bell</v-icon>
                </v-list-item-avatar>
                <v-list-item-content @click="onNotificationClicked(item)">
                  <div class="text-caption">{{ item.message }}</div>
                  <div class="font-weight-light mt-1 text-caption">
                    {{ timeAgo(item.datetime) }}
                  </div>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon small @click="onRemoveNotification(i)">
                    <v-icon color="red">mdi-close</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <v-divider />
          <v-card-actions class="white">
            <v-btn text small @click="onClearNotificaiton">
              <v-icon>mdi-delete</v-icon> Clear
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
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
      <v-container fluid :style="{ padding: 0 }">
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
import _ from 'lodash';
import { mapGetters, mapState, mapActions } from 'vuex';
// import moment from 'moment'
import globalMixin from '@/mixins/global';
export default {
  name: 'DefaultLayout',
  mixins: [globalMixin],
  middleware({ $auth, redirect, store, route }) {
    if (!store.state.auth.loggedIn) {
      return redirect('/');
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

      const excludePath = ['/profile','/index', '/system/manage', '/access-denied', '/'];

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
      clipped: false,
      drawer: true,
      fixed: false,
      currentDateTime: null,
      searchMenu: '',
    };
  },

  computed: {
    ...mapGetters('user', ['sidebarMenu', 'roleNames']),
    ...mapState('auth', ['user']),
    ...mapState('user', ['isFetchingMenu']),
    ...mapGetters(['notifications']),
    /*  isAdmin() {
      return (
        this.user && !!this.user.roles.find(role => role === 'system_admin')
      )
    }, */

    sidebarMenuList() {
      if (this.searchMenu) {
        return _.filter(this.sidebarMenu, obj =>
          obj.title.toLowerCase().includes(this.searchMenu.toLowerCase()),
        );
      }
      return this.sidebarMenu;
    },

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
    this.fetchNavigations();
    this.fetchAppUser();
  },

  /* mounted() {
    setTimeout(() => {
      this.requestNotificationRefresh();
      this.onNotificationReceived();
    }, 1000);
  }, */

  methods: {
    ...mapActions('user', ['resetUser']),
    fetchNavigations() {
      this.$store.dispatch('user/fetchMenu');
    },

    fetchAppUser() {
      this.$store.dispatch('user/fetchAppUser');
    },

    login() {
      this.$router.push('/login');
    },

    /**
     * Request for new token every reload
     */
    async requestNotificationRefresh() {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          /* if(this.$auth.user.fcmToken) {
            await this.$fire.messaging.deleteToken(this.$auth.user.fcmToken)
          } */
          await this.$fire.messaging.getToken();
          const token = await this.$fire.messaging.getToken();
          this.$axios.patch(`/api/user/set-fcm-token/${token}`);
        } else {
          /* this.systemInfoMessage(
            'Please allow this application to enable a notification.',
          ) */
          console.log('Please anable the notification on this browser.');
        }
      } catch (e) {
        console.error(e);
      }
    },

    onNotificationReceived() {
      if (this.$fire.messaging) {
        this.$fire.messaging.onMessage(payload => {
          this.notificationMessage(payload.data);
          /* const { message } = payload.data
          this.$toast(message, {
            x: !this.isMobile ? 'left' : 'center',
            y: 'bottom',
            multiline: true,
            color: 'blue',
            icon: 'mdi-information',
            timeout: 5000,
            showClose: true,
            closeIcon: 'mdi-close',
            closeColor: 'white',
            queueable: true,
            vertical: false,
            dismissable: true,
          }) */
        });
      }
    },

    onRemoveNotification(index) {
      this.$store.dispatch('removeNotification', index);
    },

    onClearNotificaiton() {
      this.$store.dispatch('clearNotification');
    },

    onNotificationClicked(notification) {
      if (notification.page) {
        this.$router.push(notification.page);
      }
    },

    onLogout() {
      this.$auth.logout();
      this.resetUser();
    },
  },
};
</script>
