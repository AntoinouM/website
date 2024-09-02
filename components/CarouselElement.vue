<script setup>

    import carousel from '~/utils/carousel.js'

    const emits = defineEmits(['activeSlideChange']);

    const resortCarousel = ref(null);

    onMounted(() => {
        watch(
            () => resortCarousel.value.data.currentSlide.value, 
            (newValue) => {
                if (newValue >= Object.keys(carousel.slides).length) return;
                emits('activeSlideChange', Object.values(carousel.slides)[newValue].description)
            }
        )
    })

</script>

<template>

    <div>

        <Carousel
            ref="resortCarousel"
            v-bind="carousel.settings"
        >
            <Slide v-for="slide in carousel.slides" :key="slide">
                <div 
                    class="carousel__item"
                >
                    <img :src="slide.path" class="carousel__img" :alt="slide.title">
                </div>
            </Slide>

            <template #addons>
            <Navigation />
            <Pagination />
            </template>
        </Carousel>

    </div>
    
</template>

<style lang="scss" scoped>

    .carousel__viewport {
        width: 100%;
    }

    .carousel__item {
        height: 50%;
        width: auto;
        color: $black;
        font-size: 20px;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .carousel__img {
        border-radius: inherit;
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
    }

    .carousel__slide {
        padding: 5px;
    }

    .carousel__prev {
        left: -3rem !important;
    }

    .carousel__next {
        right: -10px !important;
    }

    .carousel__viewport {
        perspective: 4000px;
    }

    .carousel__track {
        transform-style: preserve-3d;
    }

    .carousel__slide--sliding {
        transition: 0.5s;
    }

    .carousel__slide--active ~ .carousel__slide {
        transform: scale(0.9);
    }

    .carousel__slide--prev {
        opacity: 0.8;
        transform: scale(0.8);
        filter: grayscale(.8);
    }

    .carousel__slide--next {
        opacity: 0.8;
        transform: scale(0.8);
        filter: grayscale(.8);
    }

    .carousel__slide--active {
        opacity: 1;
        transform: scale(1.8);
        z-index: 2;
    }
        
</style>
