import axios from 'axios'

export default {
  state: {
    products: [],
    product: {},
    categories: []
  },
  actions: {
    getProducts (context) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      context.commit('LOADING', true)
      axios.get(url).then(response => {
        if (response.data.success) {
          context.commit('PRODUCTS', response.data.products)
          // pagination = response.data.pagination
        } else {
          context.dispatch('updateMessage', {
            message: response.data.message,
            status: 'danger'
          })
        }
        context.commit('CATEGORIES', response.data.products)
        context.commit('LOADING', false)
        // vm.pagination = response.data.pagination
      }).catch((error) => {
        context.dispatch('updateMessage', {
          message: error,
          status: 'danger'
        })
      })
    },
    getProduct (context, id) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      context.commit('LOADING', true)
      axios.get(url).then(response => {
        context.commit('PRODUCT', response.data.product)
        // console.log(response.data.product)
        context.commit('LOADING', false)
      })
    }
  },
  mutations: {
    PRODUCTS (state, payload) {
      state.products = payload
    },
    PRODUCT (state, payload) {
      state.product = payload
    },
    CATEGORIES (state, payload) {
      const categories = new Set()
      payload.forEach(item => {
        categories.add(item.category)
      })
      state.categories = Array.from(categories)
    }
  },
  getters: {
    products: state => state.products,
    product: state => state.product,
    categories: state => state.categories
  }
}
