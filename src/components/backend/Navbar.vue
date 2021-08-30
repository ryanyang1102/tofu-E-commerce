<template>
  <div class="bg-light sticky-top py-2 px-8 shadow">
    <nav class="navbar navbar-expand-md">
      <router-link to="/" class="navbar-brand mx-3">
        <img src="@/assets/image/logo.png" width="65" height="75" alt="logo">
      </router-link>
      <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#backendNavbar" aria-controls="backendNavbarContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <div class="collapse navbar-collapse" id="backendNavbar">
        <ul class="navbar-nav fz-4 letter-spacing-2 ms-auto">
          <li class="nav-item mx-md-2 mx-auto">
            <router-link class="nav-link p-2" aria-hidden="true" to="/admin/products">
              <i class="fas fa-box-open"></i>
              產品列表
            </router-link>
          </li>
          <li class="nav-item mx-md-2 mx-auto">
            <router-link class="nav-link p-2" aria-hidden="true" to="/admin/products">
              <i class="far fa-list-alt"></i>
              訂單列表
            </router-link>
          </li>
          <li class="nav-item mx-md-2 mx-auto">
            <router-link class="nav-link p-2" aria-hidden="true" to="/admin/products">
              <i class="fas fa-ticket-alt"></i>
              優惠券
            </router-link>
          </li>
          <li class="nav-item mx-md-2 mx-auto">
            <a class="nav-link p-2" @click="signout" href="#">
              <i class="fas fa-sign-out-alt"></i>
              登出後台
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    signout () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/logout`
      vm.$http.post(url).then((response) => {
        // console.log(response.data)
        if (response.data.success) {
          vm.$router.push('/login')
        }
      })
    }
  }
}
</script>
