import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: process.env.APP_NAME + ' - %s',
    title: process.env.APP_NAME,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/style.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [    
    {
      src: '@/plugins/ol.js',
      ssr: false,
    },
    { src: '@/plugins/vuex-persist', ssr: false },
    { src: '@/plugins/axios', ssr: false },
    { src: '@/plugins/toast', ssr: false },
    { src: '@/plugins/carousel', ssr: false },
    { src: '@/plugins/apex-chart', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/dotenv',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
    // 'vue2-editor/nuxt',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.API_URL,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: process.env.APP_NAME,
      lang: 'en',
      short_name: process.env.APP_NAME,
    },
    icon: {
      source: 'static/icon.png',
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['@/assets/variables.scss'],
    theme: {
      dark: false, // Default to light mode
      themes: {
        light: {
          primary: colors.blue.darken4,        // Navy blue: consistent brand color
          accent: colors.blue.accent1,         // Light blue for interactive accents
          secondary: colors.indigo.darken3,    // Supportive tone (cards, sections)
          info: colors.blue.lighten2,          // Informational banners, tooltips
          warning: colors.amber.darken2,       // More muted yellow for readability
          error: colors.red.darken3,           // Professional red tone
          success: colors.teal.accent3         // Cool green — fits better with blues
        },
        dark: {
          primary: colors.blue.lighten3,       // Softer for dark background contrast
          accent: colors.blue.accent1,         // Keeps pop without clashing
          secondary: colors.indigo.lighten1,   // Warmer than pure indigo.dark in dark UI
          info: colors.blue.lighten3,          // Gentle but still noticeable
          warning: colors.amber.accent2,       // Warmer yellow for dark UI contrast
          error: colors.red.accent2,           // Slightly brighter red for visibility
          success: colors.teal.accent2         // Bright, positive feedback
        }
      }
    }
  },

  // Env Configuration
  publicRuntimeConfig: {
    // apiUrl: 'http://localhost:3001/api',
    GEOSERVER_URL: process.env.GEOSERVER_URL,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    standalone: true,
  },

  // Router Configuration
  router: {},

  // Auth Scheme
  auth: {
    strategies: {
      local: {
        token: {
          property: 'data.token',
          global: true,
          // required: true,
          // type: 'Bearer'
        },
        refreshToken: false,
        user: {
          // property: false,
          autoFetch: false,
          property: 'data.user',
        },
        endpoints: {
          login: { url: '/api/auth/login', method: 'post' },
          // logout: { url: '/api/auth/logout', method: 'post' },
          logout: false,
          // user: { url: '/api/auth/user', method: 'get' },
        },
      },
    },
    redirect: {
      home: '/home',
      login: '/login',
      logout: '/login',
    },
    cookie: {
      prefix: 'auth.',
      options: {
        secure: process.env.NODE_ENV === 'production',
        expires: 365,
        maxAge: 31536000000, // 365 days
      },
    },
  },

  // Middleware
  // middleware: ['auth'],
}
