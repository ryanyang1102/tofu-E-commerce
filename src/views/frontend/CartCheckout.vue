<template>
  <div class="nav_space">
    <div class="container py-12">
      <form class="row flex-column flex-center my-5" @submit.prevent="payOrder(orderId, steps)">
        <div class="col-md-6 my-4">
          <div class="border rounded p-3">
            <h5 class="bg-light rounded text-center fz-5 mb-4">訂單資訊</h5>
            <table class="table">
              <thead>
                <th>品名</th>
                <th>數量</th>
                <th>單價</th>
              </thead>
              <tbody>
                <tr v-for="item in order.products" :key="item.id">
                  <td class="align-middle">{{ item.product.title }}</td>
                  <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                  <td class="align-middle text-right">{{ item.final_total }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2" class="text-right">總計</td>
                  <td class="text-right">{{ order.total }}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div v-if="steps === 1" class="col-md-6 my-4">
          <div class="border rounded p-3">
            <h5 class="bg-light rounded text-center fz-5 mb-4">收件人資料</h5>
            <table class="table">
              <tbody>
                <tr>
                  <th width="100">Email</th>
                  <td>{{ order.user.email }}</td>
                </tr>
                <tr>
                  <th>姓名</th>
                  <td>{{ order.user.name }}</td>
                </tr>
                <tr>
                  <th>收件人電話</th>
                  <td>{{ order.user.tel }}</td>
                </tr>
                <tr>
                  <th>收件人地址</th>
                  <td>{{ order.user.address }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-else-if="steps === 2" class="col-md-6 my-4">
          <div class="border rounded p-3">
            <h5 class="bg-light rounded text-center fz-5 mb-4">付款方式</h5>
            <div class="d-flex justify-content-center mb-2">
              <input id="getPay" name="payMethods" type="radio" class="form-check-input me-2" value="0" v-model="payMethods"/>
              <label for="getPay" class="form-check-label">
                貨到付款
              </label>
            </div>
            <div class="d-flex justify-content-center mb-2">
              <input id="transfer" name="payMethods" type="radio" class="form-check-input me-2" value="1" v-model="payMethods"/>
              <label for="transfer" class="form-check-label">
                銀行轉帳
              </label>
            </div>
            <div class="my-4" :class="{ 'd-none': payMethods === '0' }">
              <h5 class="bg-light rounded text-center fz-5 mb-4">ATM 轉帳付款資訊</h5>
              <table class="table table-sm">
                <tbody>
                  <tr>
                    <th>銀行名稱</th>
                    <td>700 中華郵政</td>
                  </tr>
                  <tr>
                    <th>戶名</th>
                    <td>日作豆腐工房</td>
                  </tr>
                  <tr>
                    <th>帳號</th>
                    <td>1234-567-000000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div v-else-if="steps === 3" class="col-md-6 my-4">
          <div class="border border-2 border-primary rounded p-3">
            <h5 class="bg-light text-primary rounded text-center fw_bold fz-5 mb-4">訂單完成</h5>
            <table class="table">
              <tbody>
                <tr>
                  <th width="100">Email</th>
                  <td>{{ order.user.email }}</td>
                </tr>
                <tr>
                  <th>姓名</th>
                  <td>{{ order.user.name }}</td>
                </tr>
                <tr>
                  <th>收件人電話</th>
                  <td>{{ order.user.tel }}</td>
                </tr>
                <tr>
                  <th>收件人地址</th>
                  <td>{{ order.user.address }}</td>
                </tr>
                <tr>
                  <th>付款方式</th>
                  <td>
                    <span v-if="payMethods === '0'">貨到付款</span>
                    <span v-else-if="payMethods === 1">ATM 匯款</span>
                  </td>
                </tr>
                <tr>
                  <th>付款狀態</th>
                  <td>
                    <span v-if="payMethods === '0'">貨到付款</span>
                    <span v-else-if="payMethods === 1 && !order.is_paid" class="text-danger">
                      尚未匯款
                    </span>
                    <span v-else-if="payMethods === 1 && order.is_paid" class="text-success">
                      匯款完成
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-md-6 d-flex justify-content-center">
          <button v-if="steps !== 3" class="btn btn-primary w-100">
          下一步
          </button>
          <button @click="$router.push('/products')" v-if="steps === 3" class="btn btn-primary w-100">
            再去逛逛
          </button>
        </div>

        <!-- <div class="text-right" v-if="order.is_paid === false">
          <button class="btn btn-danger">確認付款去</button>
        </div> -->
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      orderId: '',
      payMethods: 1
    }
  },
  methods: {
    getOrder (orderId) {
      this.$store.dispatch('getOrder', orderId)
    },
    payOrder (orderId) {
      this.$store.dispatch('payOrder', orderId)
    }
  },
  computed: {
    ...mapGetters(['order', 'steps'])
  },
  created () {
    const vm = this
    vm.orderId = vm.$route.params.orderId
    // console.log(this.$route.params.orderId)
    vm.getOrder(vm.orderId)
    this.$store.dispatch('checkoutCartPage', true)
  }
}
</script>
