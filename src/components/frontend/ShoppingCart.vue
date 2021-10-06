<template>
  <div class="d-flex align-items-center">
    <a class="cart nav-link" @click.prevent="cartVisible=!cartVisible">
      <i class="fas fa-shopping-cart"></i>
      <span v-if="cart.carts.length" class="cart_num badge rounded-circle bg-danger text-white">
        <small>{{ cart.carts.length }}</small>
      </span>
    </a>
    <transition name="slide">
      <div class="cart_content bg-light rounded p-4" v-if="cartVisible">
        <form v-if="cart.carts.length && checkoutCart" class="fz-2">
          <div class="table_scroll">
            <table class="table">
              <thead>
                <tr>
                  <th width="10"></th>
                  <th width="110">品名</th>
                  <th width="40" class="text-end">數量</th>
                  <th width="40" class="text-end">單價</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cart.carts" :key="item.id">
                  <td>
                    <button @click.stop="removeCartItem(item.id)" class="btn p-0" type="button">
                      <i class="fas fa-trash-alt fa-xs"></i>
                    </button>
                  </td>
                  <td class="align-middle fz-1">
                    {{ item.product.title }}
                  </td>
                  <td class="text-end">
                    <div class="btn-group" role="group">
                      <button @click="minusBuyNum(item.id)" class="btn btn-outline-lightGray btn-sm" type="button">-</button>
                      <button class="btn btn-outline-lightGray btn-sm" disabled>{{ item.qty }}</button>
                      <button @click="addBuyNum(item.id)" class="btn btn-outline-lightGray btn-sm" type="button">+</button>
                    </div>
                  </td>
                  <td v-if="!item.product.price" class="align-middle">
                    {{ currencyFilter(item.product.origin_price) }}
                  </td>
                  <td v-else class="align-middle">
                    {{ currencyFilter(item.product.price) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="d-flex justify-content-end align-items-lg-baseline py-4">
            總計金額<span class="fz-4 ms-4 me-1">{{ currencyFilter(total) }}</span>元
          </div>
          <button @click="addManyToCart($router, '/cart')" type="button" class="btn btn-primary w-100">
            結帳去<i class="fas fa-shopping-bag ms-2"></i>
          </button>
        </form>
        <div v-if="!checkoutCart" class="flex-center flex-column">
          <i class="fas fa-cart-arrow-down fz-11 mb-4"></i>
          <p class="fz-4 fw_bold mb-4">訂單處理中</p>
        </div>
        <div v-if="!cart.carts.length && checkoutCart" class="flex-center flex-column">
          <i class="fas fa-cart-arrow-down fz-11 mb-4"></i>
          <p class="fz-4 fw_bold mb-4">您的購物車是空的</p>
          <button @click="goShopping" type="button" class="btn btn-primary">
            去逛逛<i class="far fa-caret-square-right ms-2"></i>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ShoppingCart',
  data () {
    return {
      cartVisible: false
    }
  },
  methods: {
    removeCartItem (id) {
      this.$store.dispatch('removeCartItem', id)
    },
    minusBuyNum (id) {
      this.$store.dispatch('minusBuyNum', id)
    },
    addBuyNum (id) {
      this.$store.dispatch('addBuyNum', id)
    },
    createOrder (router) {
      this.$store.dispatch('createOrder', router)
    },
    addManyToCart (router, path) {
      this.$store.dispatch('addManyToCart', { router, path })
      this.cartVisible = false
    },
    goShopping () {
      this.$router.push('/products')
      this.cartVisible = false
    },
    currencyFilter (num) {
      const n = Number(num)
      return `$${n.toFixed(0).replace(/./g, (c, i, a) => {
        const currency = (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c)
        return currency
      })}`
    },
    ...mapActions(['getCart'])
  },
  computed: {
    total () {
      const vm = this
      let total = 0
      if (vm.cart.carts) {
        vm.cart.carts.forEach(item => {
          total += item.qty * item.product.price
        })
      }
      return total
    },
    ...mapGetters(['cart', 'tempCart', 'checkoutCart'])
  },
  created () {
    this.getCart()
  }
}
</script>
