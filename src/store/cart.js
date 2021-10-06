import axios from 'axios'

export default {
  state: {
    cart: {
      carts: [
        {}
      ]
    },
    tempCart: {
      carts: []
    }
  },
  actions: {
    getCart (context) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      context.commit('LOADING', true)
      axios.get(url).then(response => {
        // console.log(response)
        if (response.data.success) {
          context.commit('CART', response.data.data)
        }
        context.commit('LOADING', false)
        // console.log(context.dispatch('getProducts'))
        // console.log(context.state.products)
      })
    },
    removeCartItem (context, id) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      context.commit('LOADING', true)
      axios.delete(url).then(response => {
        console.log(response)
        context.dispatch('getCart')
        context.commit('LOADING', false)
      })
    },
    addBuyNum (context, id) {
      context.commit('ADDBUYNUM', id)
    },
    minusBuyNum (context, id) {
      context.commit('MINUSBUYNUM', id)
    },
    addToCart (context, { id, buyNum }) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      // vm.status.loadingItem = id
      const cart = {
        product_id: id,
        qty: buyNum
      }
      axios.post(url, { data: cart }).then(response => {
        console.log(response)
        context.dispatch('getCart')
        // vm.status.loadingItem = ''
        context.dispatch('updateMessage', {
          message: `<i class="fas fa-info-circle me-2"></i>${response.data.data.product.title} 已成功加入購物車`,
          status: 'primary'
        })
      })
    },
    addManyToCart (context, { router, path }) {
      function update () {
        return new Promise(resolve => {
          context.commit('TEMPCART')
          context.state.tempCart.carts.forEach(item => {
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${item.id}`
            axios.delete(api).then()
            const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
            const obj = { product_id: item.product_id, qty: item.qty }
            axios.post(url, { data: obj }).then(response => {
              // console.log(response)
              if (response.data.success) {
                context.dispatch('getCart')
                resolve()
              }
            })
          })
        })
      }
      update().then(() => {
        router.push(path)
      })
    }
  },
  mutations: {
    CART (state, payload) {
      state.cart = payload
    },
    TEMPCART (state) {
      state.tempCart = state.cart
    },
    ADDBUYNUM (state, id) {
      state.cart.carts.forEach(item => {
        if (item.id === id) {
          item.qty += 1
        }
      })
    },
    MINUSBUYNUM (state, id) {
      state.cart.carts.forEach(item => {
        if (item.id === id) {
          if (item.qty > 1) {
            item.qty -= 1
          }
        }
      })
    }
  },
  getters: {
    cart: state => state.cart,
    tempCart: state => state.tempCart
  }
}
