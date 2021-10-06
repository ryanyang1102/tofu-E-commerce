<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th width="100">訂購時間</th>
          <th>訂單 Email</th>
          <th>訂購商品 / 數量</th>
          <th width="150">應付金額</th>
          <th width="100">是否付款</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in sortOrder" :key="key">
          <td>{{ dateFilter(item.create_at) }}</td>
          <td><span v-text="item.user.email" v-if="item.user" class="" /></td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, key) in item.products" :key="key">
                <span class="px-2">{{ product.product.title }}</span>/
                <span class="px-2">{{ product.qty }} {{ product.product.unit }}</span>
              </li>
            </ul>
          </td>
          <td class="text-right">{{ currencyFilter(item.total) }}</td>
          <td v-if="item.is_paid" class="text-success">已付款</td>
          <td v-else class="text-muted">未付款</td>
        </tr>
      </tbody>
    </table>
    <!-- pagination -->
    <Pagination :pagination='pagination' @emitProductPage="getOrder" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'

export default {
  components: {
    Pagination
  },
  data () {
    return {
      order: {},
      pagination: {}
    }
  },
  methods: {
    getOrder (page = 1) {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`
      this.$store.dispatch('updateLoading', true)
      vm.$http.get(url).then(response => {
        console.log(response)
        vm.order = response.data.orders
        vm.pagination = response.data.pagination
        this.$store.dispatch('updateLoading', false)
      })
    },
    currencyFilter (num) {
      const n = Number(num)
      return `$${n.toFixed(0).replace(/./g, (c, i, a) => {
        const currency = (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c)
        return currency
      })}`
    },
    dateFilter (time) {
      const date = new Date(time * 1000)
      return date.toLocaleDateString()
    }
  },
  computed: {
    sortOrder () {
      const vm = this
      let newOrder = []
      if (vm.order.length) {
        newOrder = vm.order.sort((a, b) => {
          const aIsPaid = a.is_paid ? 1 : 0
          const bIsPaid = b.is_paid ? 1 : 0
          return bIsPaid - aIsPaid
        })
      }
      return newOrder
    }
  },
  created () {
    this.getOrder()
  }
}
</script>
