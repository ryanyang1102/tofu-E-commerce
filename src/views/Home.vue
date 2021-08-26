<template>
  <div>
    <header class="bg-light py-4">
      <nav class="navbar navbar-expand-lg">
        <div class="container">
          <a class="navbar-brand" href="#"><img src="../assets/image/logo.png" width="65" height="75" alt="logo"></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fas fa-bars fz-9 text-lightGray"></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav fz-4 letter-spacing-2">
              <li class="nav-item me-2"><a class=" px-2" href="#">首頁</a></li>
              <li class="me-2"><a class="px-2" href="#">日出而作</a></li>
              <li class="me-2"><a class="px-2" href="#">にがり工法</a></li>
              <li class="me-2"><a class="px-2" href="#">產品介紹</a></li>
              <li class=""><a class="px-2" href="#">店舖情報</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home'
}
</script>
