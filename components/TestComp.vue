<script setup>


    const images = [
        '/Resort/agung.webp',
        '/Resort/pool-back.webp',
        '/Resort/rooftop.webp',
        '/Resort/agung.webp',
        '/Resort/pool-back.webp',
        '/Resort/rooftop.webp',
    ]


</script>

<template>
    <div>
        <h1>Swiper</h1>
        <div class="sw">
            <swiper-container  class="mySwiper" pagination="true" pagination-clickable="true" navigation="true" space-between="30"
            loop="true" slides-per-view="3">
                <swiper-slide v-for="img in images" :key="img">
                    <img :alt="img" :src="img" />
                </swiper-slide>

            </swiper-container>
        </div>

    </div>
</template>

<style lang="scss" scoped>

    .mySwiper {
        width: 80%;
        height: 80%;
    }

    swiper-container {
      width: 100%;
      height: 100%;
    }

    swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 300px;
    }

    swiper-slide img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

</style>
