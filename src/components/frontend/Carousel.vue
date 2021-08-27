<template>
  <section id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="@/assets/image/banner01.jpeg" class="d-block w-100" alt="banner-pic01">
      </div>
      <div class="carousel-item">
        <img src="@/assets/image/banner02.jpeg" class="d-block w-100" alt="banner-pic02">
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </section>
</template>

<script>
export default {
  name: 'Carousel'
}
</script>
