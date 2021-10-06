<template>
  <div class="nav_space">
    <div class="container py-12">
      <div class="row">
        <div class="col-lg-8 mb-8 mb-lg-0">
          <table class="table mb-8">
            <tbody class="tbody">
              <tr v-for="item in cart.carts" :key="item.id">
                <td class="align-middle">
                  <button @click="removeCartItem(item.id)" class="btn btn-outline-red d-none d-md-block" type="button">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                  <a @click="removeCartItem(item.id)" class="close_icon d-block d-md-none">
                    <i class="fas fa-times"></i>
                  </a>
                </td>
                <td class="d-none d-md-block"><img :src="item.product.imageUrl" width="120" alt=""></td>
                <td class="align-middle fz-6">
                  {{ item.product.title }}
                </td>
                <td class="align-middle">
                  <div class="btn-group" role="group">
                    <button @click="minusBuyNum(item.id)" class="btn btn-outline-lightGray" type="button">-</button>
                    <button class="btn btn-outline-lightGray" disabled>{{ item.qty }}</button>
                    <button @click="addBuyNum(item.id)" class="btn btn-outline-lightGray" type="button">+</button>
                  </div>
                </td>
                <td v-if="!item.product.price" class="align-middle fz-4">
                  NT {{ currencyFilter(item.product.origin_price) }} / {{ item.product.unit }}
                </td>
                <td v-else class="align-middle fz-4">
                  NT {{ currencyFilter(item.product.price) }} / {{ item.product.unit }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-lg-4">
          <div class="border p-4 radius-2">
            <h6 class="d-flex justify-content-between fz-5 fw_bold">
              <span>總計金額</span>
              <span>NT {{ currencyFilter(total) }} 元</span>
            </h6>
            <button @click="addManyToCart($router, '/cart_order')" class="btn btn-outline-red w-100 fw_bold fz-5 mt-4" type="button">確認結帳</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
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
    addManyToCart (router, path) {
      this.$store.dispatch('addManyToCart', { router, path })
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
    ...mapGetters(['cart', 'tempCart'])
  },
  created () {
    this.getCart()
    this.$store.dispatch('checkoutCartPage', false)
  }
}
</script>
