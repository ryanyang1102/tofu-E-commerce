import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import productModules from './product'
import cartModules from './cart'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    messages: [],
    order: {
      user: {},
      products: {}
    },
    steps: 1,
    checkoutCart: true
  },
  actions: {
    updateLoading (context, status) {
      context.commit('LOADING', status)
    },
    updateMessage (context, { message, status }) {
      const timestamp = Math.floor(new Date() / 1000)
      const messages = {
        message,
        status,
        timestamp
      }
      context.commit('UPDATEMESSAGE', messages)
      setTimeout(() => {
        context.commit('MESSAGETIMEING', timestamp)
      }, 5000)
    },
    removeMessage (context, num) {
      context.commit('REMOVEMESSAGE', num)
    },
    addCouponCode (context, code) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      const coupon = {
        code: code
      }
      context.commit('LOADING', true)
      axios.post(url, { data: coupon }).then((response) => {
        // console.log(response.data)
        context.dispatch('getCart')
        context.commit('LOADING', false)
      })
    },
    getOrder (context, orderId) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${orderId}`
      context.commit('LOADING', true)
      axios.get(url).then(response => {
        console.log(response)
        context.commit('ORDER', response.data.order)
        context.commit('LOADING', false)
      })
    },
    payOrder (context, orderId) {
      context.commit('ADDORDER')
      // console.log(context.state.steps)
      if (context.state.steps === 1) {
        context.dispatch('getOrder', orderId)
        console.log(context.state.steps)
      } else if (context.state.steps === 2) {
        const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${orderId}`
        context.commit('LOADING', true)
        axios.post(url).then(response => {
          // console.log(response)
          // console.log(context.state.steps)
          if (response.data.success) {
            context.dispatch('getOrder', orderId)
          }
          context.commit('LOADING', false)
        })
      }
    },
    checkoutCartPage (context, status) {
      context.commit('CHECKOUTCART', status)
    }
    // currencyFilter (num) {
    //   const n = Number(num)
    //   return `$${n.toFixed(0).replace(/./g, (c, i, a) => {
    //     const currency = (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c)
    //     return currency
    //   })}`
    // }
  },
  mutations: {
    LOADING (state, status) {
      state.isLoading = status
    },
    UPDATEMESSAGE (state, payload) {
      state.messages.push(payload)
    },
    MESSAGETIMEING (state, payload) {
      state.messages.forEach((item, i) => {
        if (item.timestamp === payload) {
          state.messages.splice(i, 1)
        }
      })
    },
    REMOVEMESSAGE (state, payload) {
      state.messages.splice(payload, 1)
    },
    ORDER (state, payload) {
      state.order = payload
    },
    ADDORDER (state) {
      state.steps++
    },
    CHECKOUTCART (state, payload) {
      state.checkoutCart = payload
    }
  },
  getters: {
    isLoading: state => state.isLoading,
    order: state => state.order,
    steps: state => state.steps,
    checkoutCart: state => state.checkoutCart,
    messages: state => state.messages
  },
  modules: {
    productModules,
    cartModules
  }
})
