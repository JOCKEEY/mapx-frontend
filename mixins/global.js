import moment from 'moment'
import { mapState, mapGetters } from 'vuex'
// import utf8 from 'utf8'
export default {
  name: 'GlobalMixin',
  computed: {
    ...mapState('user', ['appUser']),
    ...mapGetters('user', ['permissions']),

    appName() {
      return process.env.APP_NAME || ''
    },

    appSubTitle() {
      return process.env.APP_SUBTITLE || ''
    },

    isMobile() {
      return this.$vuetify.breakpoint.mobile
    },

    authUser() {
      return this.$auth.user
    },

    monthNames() {
      return [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]
    },

    isAdmin() {
      return this.appUser?.isAdmin || false
    },

    assessmentForm: () => ({
      a1_score: {
        section: 'A',
        category: 'A1',
        text: 'Barangay DRRM Committee is Organized',
      },
      a2_score: {
        section: 'A',
        category: 'A2',
        text: 'Membership in the Barangay DRRM Committee includes Representation from Sectoral Groups in the Community',
      },
      b1_score: {
        section: 'B',
        category: 'B1',
        text: 'Vulnerable Groups Participate in Community Risk Assessment',
      },
      b2_score: {
        section: 'B',
        category: 'B2',
        text: 'Risk Assessment is Specific to Identified Hazards and is Linked to the Development of Programs, Projects and Activities',
      },
      c1_score: {
        section: 'C',
        category: 'C1',
        text: 'Programs, Projects and Activities in the Plan are Clustered per Thematic Area with Clear Targets and Timeframes, and are Resourced Properly',
      },
      d1_score: {
        section: 'D',
        category: 'D1',
        text: 'Relevant Stakeholders are with Specific Roles in the Implementation of the Plan',
      },
      e1_score: {
        section: 'E',
        category: 'E1',
        text: 'Minimum Capacity Building Needs and Procurement of Basic Emergency Response Equipment for the BDRRMC are Identified in the Plan',
      },
      f1_score: {
        section: 'F',
        category: 'F1',
        text: 'Regular Community Awareness Activities for Educating High-Risk Households on Family Preparedness are Identified in the Plan',
      },
      g1_score: {
        section: 'G',
        category: 'G1',
        text: 'Participatory Monitoring and Evaluation Mechanism for Plan Implementation is Identified',
      },
      h1_score: {
        section: 'H',
        category: 'H1',
        text: 'Local Policies are in Place to Support Implementation of BDRRM Plan',
      },
      i1_score: {
        section: 'I',
        category: 'I1',
        text: 'The Identified Early Warning System is Specific to Priority Hazards and is Appropriate for the Most Vulnerable Population/s',
      },
      i2_score: {
        section: 'I',
        category: 'I2',
        text: 'Evacuation Plan takes into Consideration the Capacity of Identified Evacuation Centers, Safe Routes, Needs of Evacuees and System for Registration',
      },
    }),

  },
  methods: {

    apiErrorMessage(error) {

      const errorMessage = this.getApiErrorMessage(error)

      this.$toast.open({
        message: errorMessage,
        type: 'error',
        position: this.isMobile ? 'top' : 'bottom-right',
        duration: 4000,
      })
    },

    getApiErrorMessage(error) {
      if (error.response) {
        if (error.response.data && error.response.data.message) {
          // this.$store.dispatch('setApiError', error.response.data.message)
          return error.response.data.message
        }
        if (error?.response.data?.error?.message) {
          // this.$store.dispatch('setApiError', error.response.data.error.message)
          return error.response.data.error.message
        }
      }

      if (error.message) {
        // this.$store.dispatch('setApiError', error.message)
        return error.message
      }

      if (error.statusText) {
        // this.$store.dispatch('setApiError', error.statusText)
        return error.statusText
      }

      // this.$store.dispatch('setApiError', error)
      return error
    },

    systemInfoMessage(message) {
      let _msg = message

      if (Array.isArray(message)) {
        _msg = message.join("\n")
      }

      this.$toast.open({
        message: _msg,
        type: 'info',
        position: this.isMobile ? 'top' : 'bottom-right',
        duration: 3000,
      })

      // this.$store.dispatch('setSystemInfoMessage', { message, icon })
    },

    notificationMessage(data) {
      this.$store.dispatch('setNotificationMessage', data)
    },

    debounce(func, timeout = 100) {
      let timer
      return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
          func.apply(this, args)
        }, timeout)
      }
    },

    formatNumber(number, currency = false, toDecimal = false) {
      if (currency) {
        return new Intl.NumberFormat('en-PH', {
          style: 'currency',
          currency: 'PHP',
        }).format(+number)
      }

      if (toDecimal) {
        return this.formatNumber(+number, true).replace(/₱/g, '')
      }

      return new Intl.NumberFormat('en-PH', {
        maximumFractionDigits: 2,
        // maximumSignificantDigits: ,
      }).format(+number)
    },

    formatDate(dateString, format = 'MMM DD, YYYY') {
      if (!dateString) {
        return null
      }
      return moment(dateString).format(format)
    },

    timeFromNow(dateString) {
      return moment(dateString).fromNow()
    },

    showCommaDecimal(val, precision = 2) {
      return Number(val).toLocaleString(undefined, {
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
      })
    },

    formatCustomDate(dateString, format, msg = '') {
      return dateString ? moment(dateString).format(format) : msg
    },

    dateAndTime(date) {
      const _date = moment(date).format('MMM DD, YYYY h:m a')
      return _date
    },

    userHasPermission(permission = '') {
      const permissions = this.permissions || []
      const roles = permissions.map(record => record.title.toLowerCase())
      return roles.includes(permission.toLowerCase())
    },

    timeAgo(date) {
      return moment(date).fromNow()
    },

    getCurrentDate() {
      // Get the current date
      const currentDate = new Date()

      // Format the date as YYYY-MM-DD using toISOString() and slicing
      const formattedDate = currentDate.toISOString().slice(0, 10)

      return formattedDate
    },
    
  },
}
