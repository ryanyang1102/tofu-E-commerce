<template>
  <header class="header bg-light py-4">
    <nav class="navbar navbar-expand-md">
      <div class="container">
        <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <router-link to="/" class="navbar-brand">
          <img src="@/assets/image/logo.png" width="65" height="75" alt="logo">
        </router-link>
        <ShoppingCart class="d-md-none nav-cart text-primary"/>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav fz-4 ms-md-auto letter-spacing-2">
            <li class="nav-item me-2">
              <router-link to="/" class="nav-link px-2">
                首頁
              </router-link>
            </li>
            <!-- <li class="nav-item me-2">
              <a class="nav-link px-2" href="#">日出而作</a>
            </li>
            <li class="nav-item me-2">
              <a class="nav-link px-2" href="#">にがり工法</a>
            </li> -->
            <li class="nav-item me-2">
              <router-link to="/products" class="nav-link px-2">
                產品介紹
              </router-link>
            </li>
            <!-- <li class="nav-item ">
              <a class="nav-link px-2" href="#">店舖情報</a>
            </li> -->
            <li class="nav-item ">
              <router-link to="/login" class="nav-link px-2">
                管理員登入
              </router-link>
            </li>
          </ul>
        </div>
        <ShoppingCart class="d-none d-md-block nav-cart text-primary ms-4"/>
      </div>
    </nav>
  </header>
</template>

<script>
import ShoppingCart from './ShoppingCart.vue'

export default {
  name: 'Navbar',
  components: {
    ShoppingCart
  }
}
</script>
