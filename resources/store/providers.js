export const state = () => ({
  providers: [],
  provider: null
})

export const getters = {}

export const actions = {
  async getProviders ({ commit }, payload) {
    try {
      const response = (await this.$axios.get('/providers')).data
      commit('setProviders', response)
    } catch (error) {
      this.$toast.global.error('Ocurrio un error al obtener los proveedores')
    }
  },
  async getProvider ({ commit }, payload) {
    try {
      const response = (await this.$axios.get(`/providers/${payload}`)).data
      commit('setProvider', response)
    } catch (error) {
      this.$toast.global.error('Ocurrio un error al obtener el proveedor')
    }
  },
  async storeProvider ({ dispatch }, payload) {
    try {
      const { success } = (await this.$axios.post(`/providers`, payload)).data
      if (success) {
        this.$toast.global.success('Proveedor creado correctamente')
        dispatch('getProviders')
      }
    } catch (error) {
      this.$toast.global.error('Ocurrio un error al crear el proveedor')
    }
  },
  async updateProvider ({ dispatch }, payload) {
    try {
      const { success } = (await this.$axios.put(`/providers/${payload.id}`, payload.body)).data
      if (success) {
        this.$toast.global.success('Proveedor actualizado correctamente')
        dispatch('getProviders')
      }
    } catch (error) {
      this.$toast.global.error('Ocurrio un error al actualizar el proveedor')
    }
  }
}

export const mutations = {
  setProvider (vuexState, payload) {
    vuexState.provider = payload
  },
  setProviders (vuexState, payload) {
    vuexState.providers = payload
  }
}