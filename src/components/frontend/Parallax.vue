<template>
  <div>
    <div class="activeBg parallax_bg01-1"></div>
  </div>
</template>

<script>
export default {
  name: 'Parallax'
  // data () {
  //   return {
  //     ratio: 0.05,
  //     positionX: '50%',
  //     positionY1: 30,
  //     positionY2: 100,
  //     positionY3: 150,
  //     Y1: 0,
  //     Y2: 0,
  //     Y3: 0,
  //     titlePositon: 'static',
  //     titleColor: 'transparent',
  //     titleBorder: '0'
  //   }
  // },
  // mounted () {
  //   window.addEventListener('scroll', this.handleScroll)
  //   window.onload = () => {
  //     const pic1 = document.getElementById('pic1')
  //     const pic2 = document.getElementById('pic2')
  //     const pic3 = document.getElementById('pic3')
  //     this.positionY1 = this.Y1 = pic1.offsetTop * this.ratio
  //     this.positionY2 = this.Y2 = pic2.offsetTop * this.ratio
  //     this.positionY3 = this.Y3 = pic3.offsetTop * this.ratio
  //   }
  // },
  // methods: {
  //   handleScroll () {
  //     const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  //     console.log(scrollTop)
  //     this.positionY1 = this.Y1 - scrollTop * this.ratio
  //     this.positionY2 = this.Y2 - scrollTop * this.ratio
  //     this.positionY3 = this.Y3 - scrollTop * this.ratio
  //     if (scrollTop > 900) {
  //       this.titlePositon = 'fixed'
  //       this.titleColor = '#fff'
  //       this.titleBorder = '1px solid #e5e5e5'
  //     } else {
  //       this.titlePositon = 'static'
  //       this.titleColor = 'transparent'
  //       this.titleBorder = '0'
  //     }
  //   }
  // }
}
</script>
