export const state = () => ({
  pageTitle: '',
  containerPadding: null,
  apiErrorMessage: null,
  systemInfoMessage: null,
  systemInfoIcon: 'mdi-information',
  notificationMessage: null,
  notificationIcon: 'mdi-information',
  notifications: [],
  mapLayerTypes: [],
})

export const getters = {
  notifications(state) {
    return state.notifications
  },
}

export const mutations = {
  pageTitle(state, value) {
    state.pageTitle = value
  },

  apiErrorMessage(state, value) {
    state.apiErrorMessage = value
  },

  systemInfoMessage(state, value) {
    state.systemInfoMessage = value.message
    state.systemInfoIcon = value.icon
  },

  notificationMessage(state, value) {
    state.notificationMessage = value?.message || null
    state.notificationIcon = value?.icon || 'mdi-information'
    if (value) {
      state.notifications.unshift(value)
      if (state.notifications.length > 100) {
        state.notifications = state.notifications.slice(0, 100)
      }
    }    
  },

  clearNotification(state) {
    state.notifications = []
  },

  removeNotification(state, index) {
    state.notifications.splice(index, 1)
  },

  setMapLayerTypes(state, value) {
    state.mapLayerTypes = value
  },

}

export const actions = {
  setPageTitle(context, value) {
    context.commit('pageTitle', value)
  },

  setApiError(context, value) {
    context.commit('apiErrorMessage', value)
  },

  setSystemInfoMessage(context, value) {
    context.commit('systemInfoMessage', value || { message: null, icon: null })
  },

  setNotificationMessage(context, value) {
    context.commit('notificationMessage', value)
  },

  removeNotification(context, index) {
    context.commit('removeNotification', index)
  },

  clearNotification(context) {
    context.commit('clearNotification')
  },

  async fetchLayerTypes(context) {
    const { data } = await this.$axios.get('/api/maplayer/type/list')
    context.commit('setMapLayerTypes', data?.data || [])
  },
}
