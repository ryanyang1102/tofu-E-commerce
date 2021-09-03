<template>
  <div>
    <Navbar />
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

export default {
  name: 'Home',
  components: {
    Navbar,
    // Parallax,
    Footer
  }
}
</script>
