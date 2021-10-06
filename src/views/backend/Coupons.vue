<template>
  <div>
    <div class="text-right mt-4">
      <button class="btn btn-primary"
        @click="openModal(true)">
        建立優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>優惠券名稱</th>
          <th>優惠碼</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th width="120">是否啟用</th>
          <th width="150">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td>{{ item.title }}</td>
          <td class="text-center">
            {{ item.code }}
          </td>
          <td class="text-center">
            {{ item.percent }}%
          </td>
          <td class="text-center">
            {{ dateFilter(item.due_date) }}
          </td>
          <td>
            <span v-if="item.is_enabled" class="text-success">
              啟用
            </span>
            <span v-else>
              未啟用
            </span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm"
              @click="openModal(false, item)"
              >
              編輯
            </button>
            <button class="btn btn-outline-danger btn-sm"
              @click="deleteModal(item)">
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- pagination -->
    <Pagination :pagination='pagination' @emitProductPage="getCoupons" />

    <!-- couponModal -->
    <div class="modal fade" id="couponModal" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span v-if="isNew">新增優惠券</span>
              <span v-else>編輯優惠券</span>
            </h5>
            <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">優惠券名稱</label>
              <input type="text" class="form-control" id="title"
                v-model="tempCoupon.title"
                placeholder="請輸入優惠券名稱">
            </div>
            <div class="form-group">
              <label for="coupon_code">優惠碼</label>
              <input type="text" class="form-control" id="coupon_code"
                v-model="tempCoupon.code"
                placeholder="請輸入優惠碼">
            </div>
            <div class="form-group">
              <label for="coupon_percent">折扣百分比</label>
              <input type="number" class="form-control" id="coupon_percent"
                v-model="tempCoupon.percent"
                placeholder="請輸入折扣百分比">
            </div>
            <div class="form-group">
              <label for="due_date">到期日</label>
              <input type="date" class="form-control" id="due_date"
                v-model="due_date"
                placeholder="請輸入到期日">
            </div>
            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox"
                  v-model="tempCoupon.is_enabled"
                  :true-value="1"
                  :false-value="0"
                  id="is_enabled">
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateCoupon">確定</button>
          </div>
        </div>
      </div>
    </div>
    <!-- deleteModal -->
    <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除優惠券</span>
            </h5>
            <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempCoupon.title }}</strong>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger"
              @click="deleteCoupon"
              >確認刪除</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { Modal } from 'bootstrap'
import Pagination from '@/components/Pagination'

export default {
  components: {
    Pagination
  },
  data () {
    return {
      coupons: [],
      tempCoupon: {},
      isNew: false,
      due_date: new Date(),
      pagination: {},
      // isLoading: false
      couponModal: null,
      delCouponModal: null
    }
  },
  watch: {
    due_date () {
      const vm = this
      const timestamp = Math.floor(new Date(vm.due_date) / 1000)
      vm.tempCoupon.due_date = timestamp
    }
  },
  methods: {
    getCoupons (page = 1) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`
      const vm = this
      this.$store.dispatch('updateLoading', true)
      vm.$http.get(url).then((response) => {
        // console.log(response.data)
        this.$store.dispatch('updateLoading', false)
        vm.coupons = response.data.coupons
        vm.pagination = response.data.pagination
      })
    },
    openModal (isNew, item) {
      const vm = this
      vm.isNew = isNew
      if (vm.isNew) {
        // console.log(vm.tempCoupon.due_date)
        vm.tempCoupon = {}
      } else {
        vm.tempCoupon = Object.assign({}, item)
        const dateAndTime = new Date(vm.tempCoupon.due_date * 1000).toISOString().split('T')[0]
        vm.due_date = dateAndTime
      }
      vm.couponModal.show()
    },
    deleteModal (item) {
      this.tempCoupon = item
      this.delCouponModal.show()
    },
    deleteCoupon () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
      // vm.isLoading = true
      vm.$http.delete(url).then((response) => {
        // console.log(response.data)
        if (!response.data.success) {
          vm.getCoupons()
          console.log('刪除失敗！')
        } else {
          vm.getCoupons()
        }
        vm.delCouponModal.hide()
        vm.isLoading = false
      })
    },
    updateCoupon () {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`
      let httpMethod = 'post'
      const vm = this
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
        httpMethod = 'put'
        vm.due_date = new Date(vm.tempCoupon.due_date * 1000)
      }
      vm.$http[httpMethod](api, { data: vm.tempCoupon }).then((response) => {
        // console.log(response.data)
        if (response.data.success) {
          vm.getCoupons()
        } else {
          vm.getCoupons()
          console.log('新增失敗！')
        }
        vm.couponModal.hide()
        // vm.isLoading = false;
      })
    },
    dateFilter (time) {
      const date = new Date(time * 1000)
      return date.toLocaleDateString()
    }
  },
  created () {
    this.getCoupons()
  },
  mounted () {
    this.couponModal = new Modal(document.getElementById('couponModal'))
    this.delCouponModal = new Modal(document.getElementById('delCouponModal'))
  }
}
</script>
