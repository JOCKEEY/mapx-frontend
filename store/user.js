export const state = () => ({
  users: [],
  roles: null,
  menus: [],
  notificationGranted: '',
  isFetchingMenu: false,
  appUser: null,
})

export const getters = {
  sidebarMenu(state) {
    return state.menus?.sidebar
  },
  roleNames(state) {
    return state.roles?.roleNames
  },
  roles(state) {
    return state.roles?.roles
  },
  permissions(state) {
    return state?.appUser?.permissions
  },
}

export const mutations = {
  setUsers(state, value) {
    state.users = value
  },
  setRoles(state, value) {
    state.roles = value
  },
  setMenu(state, value) {
    state.menus = value
  },
  resetUser(state) {
    state.users = []
    state.roles = null
    state.menus = []
    state.managed = null
    state.tenements = []
  },

  setNotificationGranted(state, value) {
    state.notificationGranted = value
  },

  setFetchingMenu(state, value) {
    state.isFetchingMenu = value
  },

  setAppUser(state, value) {
    state.appUser = value
  },
}

export const actions = {
  async fetchUsers({ commit }, params = {}) {
    const { data } = await this.$axios.get('/api/user/list', { params })
    commit('setUsers', data || { data: [], total: 0 })
  },

  async fetchUserAdmin({ commit }, params = {}) {
    const { data } = await this.$axios.get('/api/user/userAdminList', { params })
    commit('setUsers', data || { data: [], total: 0 })
  },

  async fetchMenu({ state, commit, dispatch }) {
    try {
      commit('setFetchingMenu', true)
      const { data } = await this.$axios.get('/api/user/menu')
      commit('setMenu', data || null)
    } catch (error) {
      dispatch('setApiError', 'Could not fetch menu')
    } finally {
      commit('setFetchingMenu', false)
    }
  },

  resetUser({ commit }) {
    commit('resetUser')
  },

  setNotificationGranted({ commit }, payload) {
    commit('setNotificationGranted', payload)
  },

  async fetchAppUser({ commit }) {
    try {
      const { data } = await this.$axios.get('/api/user/appuser')
      commit('setAppUser', data)
    } catch (error) {
      commit('setAppUser', null)
    }
  },
}
