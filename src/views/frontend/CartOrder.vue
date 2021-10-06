<template>
  <div class="nav_space">
    <div class="container py-12">
      <div class="row">
        <div class="col-md-6 mb-4">
          <h4 class="fw_bold">
            <i class="fas fa-tag me-2"></i>
            套用折扣券
          </h4>
          <div class="border border-primary radius-2 p-4">
            <button class="btn btn-outline-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCoupon" aria-expanded="false" aria-controls="collapseCoupon">
              查看折扣券
            </button>
            <div class="collapse" id="collapseCoupon">
              <ul class="bg-light rounded py-1 mt-2">
                <li @click="getCoupon_code(item.code)" v-for="item in allCoupons" :key="item.id" class="card couponCard m-2">
                  <div class="card-header bg-white d-flex align-items-lg-baseline border-bottom-0">
                    <span class="badge bg-light text-primary fz-4 me-4">
                      <i class="fas fa-tags"></i>
                      {{ item.percent }}%
                    </span>
                    <h4 class="fz-4">{{ item.title }}</h4>
                  </div>
                  <div class="card-body pt-0">
                    折扣碼： <span class="badge bg-primary fz-1">{{ item.code }}</span>
                  </div>
                </li>
              </ul>
            </div>
            <div class="input-group input-group-sm mt-4">
              <input class="form-control fz-2" v-model="coupon_code" placeholder="請輸入折扣碼" type="text" id="inputCoupon">
              <div class="input-group-append">
                <button class="btn btn-outline-primary fz-2" type="button"
                  @click="addCouponCode(coupon_code)">
                  <i class="fas fa-ticket-alt"></i>
                  套用折扣碼
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <h4 class="fw_bold">
            <i class="fas fa-dollar-sign me-2"></i>
            訂單金額
          </h4>
          <div class="border border-primary p-4 radius-2">
            <h5 class="d-flex justify-content-between fz-5 mb-8">
              <span>總計金額</span>
              <span>NT {{ currencyFilter(total) }} 元</span>
            </h5>
            <div v-if="cart.carts[0].coupon" class="d-flex justify-content-between">
              <p class="d-md-none d-lg-block bg-primary rounded fz-3 text-light mb-2 px-1">
                <i class="fas fa-tag"></i>
                優惠券「{{ cart.carts[0].coupon.title }}」 折扣 {{ cart.carts[0].coupon.percent }}%
              </p>
              <p class="d-none d-md-block d-lg-none bg-primary rounded fz-3 text-light mb-2 px-2">
                <i class="fas fa-tag"></i>
                優惠券 折扣 {{ cart.carts[0].coupon.percent }}%
              </p>
              <span>- NT {{ currencyFilter(total-finalTotal)}} 元</span>
            </div>
            <h5 v-if="finalTotal !== total" class="d-flex justify-content-between fz-5 fw_bold text-primary">
              <span>最終折扣金額</span>
              <span>NT {{ currencyFilter(finalTotal) }} 元</span>
            </h5>
          </div>
        </div>
      </div>
      <div class="row justify-content-center my-5" v-if="cart.carts.length">
        <validation-observer v-slot="{ handleSubmit }" class="col-md-6">
          <h4 class="fw_bold">
            <i class="fas fa-user-edit me-2"></i>
            聯絡人資料
          </h4>
          <form class="border border-primary rounded py-3 px-8" @submit.prevent="handleSubmit(createOrder)">
            <validation-provider rules="required|email" v-slot="{ errors, classes }">
              <div class="form-group mb-2">
                <!-- 輸入框 -->
                <label class="fz-4" for="email">Email <span class="text-danger">*</span></label>
                <input id="email" type="email" name="email" v-model="form.user.email" class="form-control" :class="classes">
                <!-- 錯誤訊息 -->
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </div>
            </validation-provider>
            <validation-provider rules="required" v-slot="{ errors, classes }">
              <div class="form-group mb-2">
                <label class="fz-4" for="username">收件人姓名 <span class="text-danger">*</span></label>
                <input v-model="form.user.name" class="form-control"
                  :class="classes" type="text"  name="name" id="username"
                    placeholder="輸入姓名">
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </div>
            </validation-provider>
            <validation-provider rules="required|numeric|min:8" v-slot="{ errors, classes }">
              <div class="form-group mb-2">
                <label class="fz-4" for="usertel">收件人電話 <span class="text-danger">*</span></label>
                <input v-model.number="form.user.tel" class="form-control"
                :class="classes" type="tel" id="usertel" placeholder="請輸入電話">
                <span class="invalid-feedback">錯誤的輸入格式</span>
              </div>
            </validation-provider>
            <validation-provider rules="required" v-slot="{ errors, classes }">
              <div class="form-group mb-2">
                <label class="fz-4" for="useraddress">收件人地址 <span class="text-danger">*</span></label>
                <input v-model="form.user.address" class="form-control" :class="classes" type="text" name="address" id="useraddress"
                  placeholder="請輸入地址">
                <span class="invalid-feedback">地址欄位不得留空</span>
              </div>
            </validation-provider>
            <div class="form-group mb-2">
              <label class="fz-4" for="comment">留言</label>
              <textarea name="" id="comment" class="form-control" cols="30" rows="3" v-model="form.message"></textarea>
            </div>
            <div class="text-right">
              <button class="btn btn-red" type="submit">送出訂單</button>
            </div>
          </form>
        </validation-observer>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      // isUseCoupon: false,
      coupons: [],
      coupon_code: '',
      allCoupons: [],
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  methods: {
    getAllCoupons () {
      this.allCoupons = [
        { id: '-Mj9ig2v2ri3mS7v3S2w', percent: 88, code: 'vip888', title: '老顧客～自己人！' },
        { id: '-Mj9j0EKadwNrj9EeVG', percent: 66, code: 'whosyourdaddy', title: '週年慶特別折扣' }
      ]
    },
    addCouponCode (code) {
      this.$store.dispatch('addCouponCode', code)
    },
    getCoupon_code (code) {
      this.coupon_code = code
    },
    createOrder () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
      const order = vm.form
      vm.$store.dispatch('updateLoading', true)
      vm.$http.post(url, { data: order }).then((response) => {
        // console.log('訂單已建立',response)
        if (response.data.success) {
          vm.$store.dispatch('getCart')
          vm.$router.push(`/cart_checkout/${response.data.orderId}`)
        }
        vm.$store.dispatch('updateLoading', false)
        // vm.pagination = response.data.pagination
      })
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
          // total += item.qty * item.product.price
          total += item.total
        })
      }
      return total
    },
    finalTotal () {
      const vm = this
      let finalTotal = 0
      if (vm.cart.final_total !== vm.cart.total) {
        finalTotal = vm.cart.final_total

        // vm.cart.carts.forEach(function (item) {
        // finalTotal +=
        // item.qty * item.product.price * (vm.cart.carts[0].coupon.percent / 100)
        //   finalTotal = item.final_total
        // })
      } else {
        finalTotal = vm.cart.total
        // vm.cart.carts.forEach(function (item) {
        // finalTotal += item.qty * item.product.price
        //   finalTotal = item.total
        // })
      }
      return finalTotal
    },
    ...mapGetters(['cart'])
  },
  created () {
    this.getCart()
    this.getAllCoupons()
    this.$store.dispatch('checkoutCartPage', false)
  }
}
</script>
