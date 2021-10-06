<template>
  <div class="nav_space">
    <div class="container py-12">
      <div class="row">
        <div class="col-md-6 mb-6 mb-md-0">
          <div class="product_img" :style="{backgroundImage: `url(${product.imageUrl})`}"></div>
        </div>
        <div class="col-md-6">
          <div class="d-flex flex-column px-8 px-md-2 px-lg-8">
            <div class="d-flex align-items-baseline mb-2">
              <h2 class="fz-10 fw_bold">{{ product.title }}</h2>
              <span class="badge bg-primary ms-8">{{ product.category }}</span>
            </div>
            <span class="fz-4 text-gray_110"><pre>{{ product.description }}</pre></span>
            <p class="fz-5 letter-spacing-2"><pre class="">{{product.content}}</pre></p>
            <div class="d-flex justify-content-between align-items-baseline mb-4">
              <h4 class="fz-7" v-if="!product.price">特價<span class="fz-2">NT</span> <span class="text-red">{{ currencyFilter(product.origin_price) }}</span> 元</h4>
              <h6 class="fz-2 text-decoration-line-through" v-if="product.price">原價 NT {{ currencyFilter(product.origin_price) }} 元</h6>
              <h4 class="fz-7" v-if="product.price">現在只要 <span class="fz-2">NT</span> <span class="text-red">{{ currencyFilter(product.price) }}</span> 元</h4>
            </div>
            <div class="input-group buy_input mb-4">
              <button class="btn border btn-sm border-2" @click="minusBuyNum()" type="button" id="minus">
                <strong class="fz-7"> − </strong>
              </button>
              <input type="number" class="form-control" v-model.number="buyNum" @change="inputBuyNum()">
              <button class="btn border btn-sm border-2" @click="addBuyNum()" type="button" id="add">
                <strong class="fz-7"> + </strong>
              </button>
            </div>
            <div class="input-group">
              <button @click="addToCart(product.id, buyNum)" class="btn btn-outline-dark w-50" type="button">
                加入購物車<i class="fas fa-cart-plus ms-2"></i>
              </button>
              <button @click="buyNow(product.id, buyNum)" type="button" class="btn btn-outline-primary w-50">
                立即購買
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr class="my-4">

    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      productId: '',
      buyNum: 1,
      buyMin: 1,
      butMax: 99
    }
  },
  methods: {
    getProduct (id) {
      this.$store.dispatch('getProduct', id)
    },
    inputBuyNum () {
      if (this.buyNum > this.buyMax) {
        this.buyNum = this.buyMax
      } else if (this.buyNum < this.buyMin) {
        this.buyNum = this.buyMin
      }
    },
    minusBuyNum () {
      if (this.buyNum > 1) {
        this.buyNum--
      }
    },
    addBuyNum () {
      if (this.buyNum < 99) {
        this.buyNum++
      }
    },
    addToCart (id, buyNum) {
      this.$store.dispatch('addToCart', { id, buyNum })
    },
    buyNow (id, buyNum = 1) {
      this.$store.dispatch('addToCart', { id, buyNum })
      this.$router.push('/cart')
    },
    currencyFilter (num) {
      const n = Number(num)
      return `$${n.toFixed(0).replace(/./g, (c, i, a) => {
        const currency = (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c)
        return currency
      })}`
    }
  },
  computed: {
    ...mapGetters(['product'])
  },
  created () {
    this.productId = this.$route.params.productId
    this.getProduct(this.productId)
    this.$store.dispatch('checkoutCartPage', true)
    // console.log(this.$route.params.productId)
  }
}
</script>
