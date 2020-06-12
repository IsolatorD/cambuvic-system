export const state = () => ({})

export const getters = {}

export const actions = {
  async logOut ({ commit }) {
    await this.$auth.logout()
    localStorage.removeItem('auth.redirect')
    return true
  },
  async refreshUser ({ commit }) {
    try {
      const user = (await this.$axios.get('/profile')).data
      commit('refreshUser', user)
    } catch (error) {
      console.log('Error refresh user', error)
      this.$toast.global.error('Ocurrio un error al obtener la información del usuario')
    }
  }
}

export const mutations = {
  refreshUser (vuexState, user) {
    vuexState.user = user
  }
}