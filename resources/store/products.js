export const state = () => ({
  products: [],
  product: null,
  type_sells: []
})

export const getters = {}

export const actions = {
  async getProducts ({ commit }) {
    try {
      const { products, type_sells } = (await this.$axios.get('/products')).data
      commit('setProducts', products)
      commit('setTypeSells', type_sells)
    } catch (error) {
      console.log('Error refresh user', error)
      this.$toast.global.error('Ocurrio un error al obtener los productos')
    }
  },
  async getProduct ({ commit }, payload) {
    try {
      const product = (await this.$axios.get(`/products/${payload}`)).data
      commit('setProduct', product)
    } catch (error) {
      console.log('Error refresh user', error)
      this.$toast.global.error('Ocurrio un error al obtener los datos del producto')
    }
  },
  async storeProduct ({ dispatch }, payload) {
    try {
      const { success } = (await this.$axios.post('/products/create', payload)).data
      if (success) {
        this.$toast.global.success('Producto registrado exitosamente')
        dispatch('getProducts')
      }
    } catch (error) {
      console.log('Error store product', error)
      this.$toast.global.error('Ocurrio un error al registar el producto')
    }
  },
  async updateProduct ({ dispatch }, payload) {
    try {
      const { success } = (await this.$axios.put(`/products/${payload.id}`, payload.body)).data
      if (success) {
        dispatch('getProducts')
      }
    } catch (error) {
      console.log('Error update product', error)
      this.$toast.global.error('Ocurrio un error al actualizar los datos del producto')
    }
  },
  async storeIncome ({ dispatch }, payload) {
    try {
      const { success } = (await this.$axios.post('/products/income', payload)).data
      if (success) {
        this.$toast.global.success('Ingreso existoso')
        dispatch('getProducts')
      }
    } catch (error) {
      console.log('Error store income', error)
      this.$toast.global.error('Ocurrio un error al agregar el ingreso del producto')
    }
  }
}

export const mutations = {
  setProducts (vuexStore, payload) {
    vuexStore.products = payload
  },
  setProduct (vuexStore, payload) {
    vuexStore.product = payload
  },
  setTypeSells (vuexStore, payload) {
    vuexStore.type_sells = payload
  }
}