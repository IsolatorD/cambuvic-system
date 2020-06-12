export const state = () => ({
  users: [],
  user: null,
  roles: []
})

export const getters = {}

export const actions = {
  async getUsers ({ commit }, payload) {
    try {
      const {users, roles} = (await this.$axios.post('/users', payload)).data
      commit('setUsers', users)
      commit('setRoles', roles)
    } catch (error) {
      this.$toast.global.error('Ocurrio un error al obtener los usuarios')
    }
  },
  async getUser ({ commit }, payload) {
    try {
      const response = (await this.$axios.get(`/users/${payload}`)).data
      commit('setUser', response)
    } catch (error) {
      this.$toast.global.error('Ocurrio un error al obtener el usuario')
    }
  },
  async storeUser ({ dispatch }, payload) {
    try {
      const { success } = (await this.$axios.post(`/users/create`, payload)).data
      if (success) {
        this.$toast.global.success('Usuario creado correctamente')
        dispatch('getUsers')
      }
    } catch (error) {
      this.$toast.global.error('Ocurrio un error al crear el usuario')
    }
  },
  async updateUser ({ dispatch }, payload) {
    try {
      const { success } = (await this.$axios.put(`/users/update/${payload.id}`, payload.body)).data
      if (success) {
        this.$toast.global.success('Usuario actualizado correctamente')
        dispatch('getUsers')
      }
    } catch (error) {
      this.$toast.global.error('Ocurrio un error al actualizar el usuario')
    }
  }
}

export const mutations = {
  setUser (vuexState, payload) {
    vuexState.user = payload
  },
  setUsers (vuexState, payload) {
    vuexState.users = payload
  },
  setRoles (vuexState, payload) {
    vuexState.roles = payload
  }
}