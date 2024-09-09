<script setup>

    const swiper = ref(null);
    const swiperContainer = ref(null);
    const swiperItems = ref([])
    const swiperItemsImages = ref([]);
    const swiperFigCaptions = ref([]);

    let countItem;
    let active = 1;
    let prev_active = null;
    let next_active = null;
    let autoplay = ref(null);

    let animationIsPlaying = ref(false);

    const positionArray = ref(['prev_active', 'active', 'next_active', null]);
    const arrTestPos = ref(['50%', '65%', '0%', '20%'])

    const props = defineProps({
        resources: {
            type: Array,
            required: true,
        },
        autoplay: Number,
    })

    onMounted(() => {
        swiperItems.value = swiperContainer.value.children;
        Array.from(swiperItems.value).forEach(item => {
            swiperItemsImages.value.push(item.children[0].children[1].children[0])
            swiperFigCaptions.value.push(item.children[0].children[1].children[1])
        })
        countItem = swiperItems.value.length;
        if (props.autoplay) autoplay.value = props.autoplay

        swiperItemsImages.value.forEach((div) => {
            addListener(div, 'animationstart', () => {animationIsPlaying.value = true})
            addListener(div, 'animationend', () => {animationIsPlaying.value = false})
        })
    })

    function addListener(el, name, callback) {
        el.addEventListener(name, callback)
    }

    function manageActiveIndex(e) {
        if (animationIsPlaying.value) return;

        if (e === 'next') {
            swiper.value.classList.remove('prev');
            swiper.value.classList.add('next');

            active = active + 1 >= countItem ? 0 : active + 1;
            prev_active = active - 1 < 0 ? countItem -1 : active - 1;
            next_active = active + 1 >= countItem ? 0 : active + 1;
            changePositionArray()
        } else {
            swiper.value.classList.remove('next');
            swiper.value.classList.add('prev');

            active = active - 1 < 0 ? countItem - 1 : active - 1;
            prev_active = active + 1 >= countItem ? 0 : active + 1;
            next_active = prev_active + 1 >= countItem ? 0 : prev_active + 1;
            changePositionArray()
        }

        swiperItemsImages.value.forEach((div) => {
            resetAnim(div)
        })
        swiperFigCaptions.value.forEach((fc) => {
            resetAnim(fc)
        })

        if (!autoplay.value) return;
        clearInterval(autoPlayInterval)
        autoPlayInterval = setInterval(() => {
            manageActiveIndex('next')
        }, autoplay.value)
    }

    function changePositionArray() {
        let remainingIndexes = new Set([...Array(countItem).keys()]);
        positionArray.value[active] = 'active';
        remainingIndexes.delete(active);
        positionArray.value[prev_active] = 'prev_active';
        remainingIndexes.delete(prev_active);
        positionArray.value[next_active] = 'next_active';
        remainingIndexes.delete(next_active);

        remainingIndexes.forEach((index) => {
            positionArray.value[index] = null;
        })
    }

    function resetAnim(el) {
        el.style.animation = 'none';
        el.offsetWidth;
        el.style.animation = ''
    }

    let autoPlayInterval = setInterval(() => {
        manageActiveIndex('next')
    }, autoplay.value)

</script>

<template>

    <div ref="swiper" class="swiper-container next">
        <div ref="swiperContainer" class="swiper-items-container">
            <SwiperItemComp
                v-for="(resource, index) in resources"
                :key="resource.src"
                :ref="`item${index}`"
                :position="positionArray[index]"
                :imgStart="arrTestPos[index]"
                :resource="resource"
            />
        </div>
        <div class="arrows">
            <SwiperNavigationComp color="#fff" direction="prev" @click-event="manageActiveIndex"/>
            <SwiperNavigationComp color="#fff" direction="next" @click-event="manageActiveIndex"/>
        </div>
    </div>
    
</template>

<style lang="scss" scoped>

    $border-color: rgba(255, 255, 255, 0.2);

    .swiper-container {
        width: 100%;
        height: 60vh;
        overflow: hidden;
        position: relative;
        
        @include breakpoint-max-width(md) {
            height: 100vh;
        }
    }

    .swiper-items-container {
        height: 100%;
        position: relative;

        @include breakpoint-max-width(md) {
            display: flex;
            flex-direction: column;
            height: 90%;
        }
    
        &::before {
            position: absolute;
            width: $swiper-item-width;
            height: 100%;
            content: '';
            top: 0;
            left: calc(100% - calc($swiper-item-width) * $swiper-calculate);
            border-left: 1px solid $border-color;
            border-right: 1px solid $border-color;
            z-index: 10;
            pointer-events: none;

            @include breakpoint-max-width(lg) {
                width: calc(#{$swiper-item-width} * 0.8);
                left: calc(100% - #{$swiper-item-width} *0.8);
            }
            @include breakpoint-max-width(md) {
                width: 100%;
                left: 0;
            }
        }

        &::after {
            position: absolute;
            top: 50px;
            left: 50px;
            content: '';
            background-color: $white;
            width: calc($swiper-item-width * 0.8);   
            height: calc($swiper-item-width * 0.6);
            border-radius: calc($swiper-item-width * 0.04) calc($swiper-item-width * 0.1) calc($swiper-item-width * 0.22) calc($swiper-item-width * 0.46);
            filter: blur(calc($swiper-item-width * 0.3));
            opacity: .9;
            z-index: 10;
            pointer-events: none;
        }
    }

    .arrows {
        position: absolute;
        bottom: 1rem;
        width: calc(100% - calc($swiper-item-width * $swiper-calculate));
        height: fit-content;
        z-index: 10;
        opacity: .6;

        display: grid;
        grid-template-columns: repeat(2, 40px) $spacer-1;
        grid-template-rows: 40px;
        justify-content: end;
        gap: 10px;

        @include breakpoint-max-width(lg) {
            width: calc(#{$swiper-item-width} * 0.8);
        }
        @include breakpoint-max-width(md) {
            width: 100%;
            position: relative;
            grid-template-columns: repeat(2, 40px);
            justify-content: center;
            margin-top: $spacer-4;
        }
    }

</style>
