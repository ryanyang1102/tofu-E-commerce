<template>
  <div>
    <loading :active.sync="isLoading"/>
    <Navbar />
    <Alert />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
// import Parallax from 'vue-parallaxy'
// @ is an alias to /src
import Navbar from '@/components/frontend/Navbar.vue'
// import Parallax from '@/components/frontend/Parallax.vue'
import Footer from '@/components/frontend/Footer.vue'
import Alert from '@/components/AlertMessage.vue'

export default {
  name: 'Home',
  components: {
    Navbar,
    // Parallax,
    Footer,
    Alert
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  }
}
</script>
