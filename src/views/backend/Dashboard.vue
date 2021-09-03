<template>
  <div>
    <Navbar></Navbar>
    <!-- <Alert/> -->
    <div class="container-fluid">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/backend/Navbar.vue'
// import Alert from './AlertMessage';

export default {
  components: {
    Navbar
    // Alert
  },
  created () {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    if (token !== '') {
      this.axios.defaults.headers.common.Authorization = token
    } else {
      this.$router.push('/login')
    }
  }
}
</script>
