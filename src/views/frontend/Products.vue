<template>
  <div class="nav_space">
    <div class="container py-12">
      <div class="row">
        <div class="col-lg-2">
          <ul class="product_menu list-group list-group-horizontal list-group-vertical-lg">
            <li class="list-group-item d-flex justify-content-between align-items-center" @click.prevent="searchText = '全部'" :class="{ 'active': searchText === '全部'}">
              全部
              <span class="badge bg-light text-primary rounded-pill ms-2">{{ categoryNum() }}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center" v-for="item in categories" :key="item" @click.prevent="searchText = item" :class="{ 'active': searchText === item}">
              {{ item }}
              <span class="badge bg-light text-primary rounded-pill ms-2">{{ categoryNum(item) }}</span>
            </li>
          </ul>
        </div>
        <div class="col-lg-10">
          <div class="d-flex justify-content-center mb-4">
            <form class="form-inline my-3 my-lg-0">
              <div class="input-group">
                <input class="form-control" type="text" v-model="searchText"
                  placeholder="尋找您要的商品" aria-label="Search">
                <div class="input-group-append">
                  <button class="btn btn-outline-primary" type="button"
                    @click="searchText = '';searchText = ''">
                    <i class="fa fa-times"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div class="">
            <ul class="d-flex flex-wrap justify-content-center">
              <li class="card card_product border-0 mx-6 my-8" v-for="item in filterData" :key="item.id">
                <router-link :to="`/product/${item.id}`" >
                  <div class="card_img" :style="{backgroundImage: `url(${item.imageUrl})`}"></div>
                  <div class="card-body flex-center flex-column p-2">
                    <h3 class="fz-7">{{ item.title }}</h3>
                    <div class="d-flex w-100 justify-content-between align-items-baseline px-4">
                      <div class="fz-2" v-if="!item.price">特價 NT <span class="text-red fz-6">${{ item.origin_price }}</span></div>
                      <del class="fz-2 text-decoration-line-through" v-if="item.price">${{ item.origin_price }}</del>
                      <div class="fz-2" v-if="item.price">現在只要 NT <span class="text-red fz-6">${{ item.price }}</span></div>
                    </div>
                  </div>
                </router-link>
                <div class="flex-center">
                  <button @click="addToCart(item.id, buyNum)"  class="btn btn-light rounded-pill w-50 text-primary me-2" type="button">加入購物車</button>
                  <button @click="buyNow(item.id, buyNum)"  class="btn btn-primary rounded-pill w-50" type="button">立即購買</button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 分頁元件
      <Pagination
        :pagination='pagination'
        @emitProductPage="getProducts" /> -->
    </div>
  </div>
</template>

<script>
// import Pagination from '@/components/Pagination'
import { mapGetters, mapActions } from 'vuex'

export default {
  // components: {
  //   Pagination
  // },
  data () {
    return {
      product: {},
      searchText: '全部',
      buyNum: 1,
      status: {
        loadingItem: ''
      },
      // pagination: {},
      productModal: null
    }
  },
  methods: {
    categoryNum (ele) {
      const vm = this
      let obj = []
      const productsCategory = vm.products.map(item => {
        return item.category
      })
      if (ele === undefined) {
        obj = [...productsCategory]
      }
      productsCategory.forEach(item => {
        if (ele === item) {
          obj.push(item)
        }
      })
      return obj.length
    },
    addToCart (id, buyNum = 1) {
      this.$store.dispatch('addToCart', { id, buyNum })
    },
    buyNow (id, buyNum = 1) {
      this.$store.dispatch('addToCart', { id, buyNum })
      this.$router.push('/cart')
    },
    searchData (event) {
      if (event.isComposing) {
        return
      }
      this.selectCategory = ''
      this.isSearch = true
      // this.currentPage = 0
    },
    ...mapActions(['getProducts'])
  },
  computed: {
    filterData () {
      const vm = this
      if (vm.searchText === '全部' || vm.searchText === '') {
        return vm.products
      } else if (vm.searchText) {
        return vm.products.filter((item) => {
          if (item.category === vm.searchText) {
            return item.category === vm.searchText
          } else {
            const data = item.title.toLowerCase().includes(vm.searchText.toLowerCase())
            return data
          }
        })
      }
      return this.products
    },
    ...mapGetters(['products', 'categories', 'messages'])
  },
  created () {
    this.getProducts()
    this.$store.dispatch('checkoutCartPage', true)
  }
}
</script>
