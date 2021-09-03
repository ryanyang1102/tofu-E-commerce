<template>
  <div class="nav_space">
    <!-- <loading :active.sync="isLoading"/>    讀取中的程式碼 -->
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
              <li class="card card_product border-0 mx-2 my-8" v-for="item in filterData" :key="item.id">
                <a href="#" @click="getProduct(item.id)">
                  <div class="card_img" :style="{backgroundImage: `url(${item.imageUrl})`}"></div>
                  <div class="card-body flex-center flex-column p-2">
                    <h3 class="fz-7">{{ item.title }}</h3>
                    <p class="fz-3 text-gray_110">{{ item.description }}</p>
                  </div>
                </a>
                <div class="flex-center">
                  <div class="btn btn-primary rounded-pill w-50">立即購買</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 分頁元件 -->
      <!-- <Pagination
        :pagination='pagination'
        @emitProductPage="getProducts" /> -->
    </div>

    <!-- <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div :style="{backgroundImage: `url(${item.imageUrl})`}"
            style="height: 150px; background-size: cover; background-position: center"
            >
          </div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!item.price">{{ item.origin_price | currency }}</div>
              <del class="h6" v-if="item.price">{{ item.origin_price | currency }}</del>
              <div class="h5" v-if="item.price">{{ item.price | currency }}</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button type="button" class="btn btn-outline-secondary btn-sm"
            @click="getProduct(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto"
              @click="addtoCart(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div> -->

    <!-- Product-modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-primary">
            <h5 class="modal-title text-light" id="exampleModalLabel">
              {{ product.title }}
            </h5>
            <button type="button" class="close btn btn-outline-light" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.imageUrl" class="img-fluid" alt="product_img">
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">
                {{ product.description }}
              </footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
              <div class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</div>
              <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
            </div>
            <select name="" class="form-control mt-3" v-model="product.num">
              <option value="" >-- 請選擇數量 --</option>
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{ num }} {{ product.unit }}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計
              <strong v-if="!product.price">
                {{ product.num * product.origin_price }}
              </strong>
              <strong v-else>
                {{ product.num * product.price }}
              </strong>
              元
            </div>
            <button type="button" class="btn btn-primary"
              @click="addtoCart(product.id, product.num)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === product.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// import $ from 'jquery'
import { Modal } from 'bootstrap'
// import Pagination from '@/components/Pagination'

export default {
  // components: {
  //   Pagination
  // },
  data () {
    return {
      products: [],
      product: {},
      categories: [],
      // cart: {},
      searchText: '全部',
      isLoading: false,
      status: {
        loadingItem: ''
      },
      pagination: {},
      productModal: null
    }
  },
  methods: {
    getProducts () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      vm.isLoading = true
      vm.$http.get(url).then(response => {
        vm.products = response.data.products
        // console.log(response)
        vm.getUnique()
        vm.pagination = response.data.pagination
        vm.isLoading = false
      })
    },
    getUnique () {
      const vm = this
      const categories = new Set()
      vm.products.forEach(item => {
        categories.add(item.category)
      })
      vm.categories = Array.from(categories)
    },
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
    getProduct (id) {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      vm.status.loadingItem = id
      vm.$http.get(url).then(response => {
        vm.product = response.data.product
        this.productModal.show()
        // console.log(response);
        vm.status.loadingItem = ''
      })
    },
    addtoCart (id, qty = 1) {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.status.loadingItem = id
      const cart = {
        product_id: id,
        qty
      }
      vm.$http.post(url, { data: cart }).then(response => {
        // console.log(response);
        vm.status.loadingItem = ''
        this.productModal.hide()
      })
    },
    searchData (event) {
      if (event.isComposing) {
        return
      }
      this.selectCategory = ''
      this.isSearch = true
      // this.currentPage = 0
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
    }
  },
  created () {
    this.getProducts()
  },
  mounted () {
    this.productModal = new Modal(document.getElementById('productModal'))
  }
}
</script>
