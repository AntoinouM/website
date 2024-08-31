<script setup>
    import ResourceManager from '~/utils/ResourcesManager/ResourceManager';

    const resourceLoader = new ResourceManager();
    const imgArr = ref([])
    const resourcesLoaded = ref(false);

    onMounted(() => {
        resourceLoader.addEventListener('end', (e) => {
            imgArr.value = resourceLoader.getFilteredArray('Resort');
            console.log(imgArr.value)
            resourcesLoaded.value = true;
        })
        resourceLoader.manageResources('Resort');
    })

    

</script>

<template>
    <div>
        <div>
            <section 
                ref="section1"
                class="section section1"
            >
                <div class="swiper-container">
                    <Swiper
                        :modules="[SwiperAutoplay, SwiperNavigation, SwiperPagination]"
                        :slides-per-view="2.5"
                        :loop="true"
                        :navigation="true"
                        :centeredSlides="true"
                        :lazy="true"
                    >
                        <SwiperSlide v-for="resource in imgArr" :key="resource.key">
                        <img :src="resource.src" :alt="resource.key">
                        </SwiperSlide>
                    </Swiper>
                </div>
            </section>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    
    .section {
        height: 100vh;
        max-width: 100%;
        padding: 1rem 4rem;
        box-sizing: border-box;
        color: $black;

        @include breakpoint-max-width(s) {
            height: fit-content;
        }
    }

    .section1 {
        background-color: $egg-white;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: bottom -10em center;  

        /* fix background for parallax*/
        background-attachment: fixed;
    }

    .swiper-container {
        width: 100%;
        height: 100%;
        border: 1px dotted red;
    }

    .swiper {
        width: inherit;
        height: inherit;
    }

    .swiper-slide-active {
        display: block;
        width: 50% !important;
        height: auto !important;
    }

</style>
