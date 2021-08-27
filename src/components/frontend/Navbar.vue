<template>
  <header class="header bg-light py-4">
    <nav class="navbar navbar-expand-md">
      <div class="container">
        <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">
          <img src="@/assets/image/logo.png" width="65" height="75" alt="logo">
        </a>
        <a class="d-md-none nav-cart text-primary" href="#">
          <i class="fas fa-shopping-cart"></i>
        </a>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav fz-4 ms-md-auto letter-spacing-2">
            <li class="nav-item me-2">
              <a class="nav-link px-2" href="#">首頁</a>
            </li>
            <li class="nav-item me-2">
              <a class="nav-link px-2" href="#">日出而作</a>
            </li>
            <li class="nav-item me-2">
              <a class="nav-link px-2" href="#">にがり工法</a>
            </li>
            <li class="nav-item me-2">
              <a class="nav-link px-2" href="#">產品介紹</a>
            </li>
            <li class="nav-item ">
              <a class="nav-link px-2" href="#">店舖情報</a>
            </li>
          </ul>
        </div>
        <a class="d-none d-md-block nav-cart text-primary ms-4" href="#">
          <i class="fas fa-shopping-cart"></i>
        </a>
      </div>
    </nav>
  </header>
</template>
