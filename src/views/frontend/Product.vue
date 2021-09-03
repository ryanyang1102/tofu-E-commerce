<template>
  <div>
    123
  </div>
</template>

<script>
export default {
  data () {
    return {
      productId: '',
      product: []
    }
  },
  created () {
    this.productId = this.$route.params.productId
    // console.log(this.$route.params.productId)
  }
}
</script>
