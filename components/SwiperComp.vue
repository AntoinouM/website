<script setup>

    import carousel from '~/utils/carousel';


</script>

<template>
    <div class="view">
        <swiper-container
            class="swiper__container"
            :pagination="true" 
            :pagination-clickable="true" 
            :navigation="true"
            :slides-per-view="2"
            :space-between="-30" 
            :centered-slides="true"
            :loop="true"
        >
            <swiper-slide
            class="swiper__slide"
                v-for="slide in carousel.slides"
                :key="slide.id"
            >
                <img :src="slide.path" :alt="slide.title">
            </swiper-slide>
        </swiper-container>
    </div>
</template>

<style lang="scss" scoped>
    
</style>
