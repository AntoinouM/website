<script setup>

    const swiper = ref(null);
    const swiperContainer = ref(null);
    const swiperItems = ref([])
    const swiperItemsImages = ref([]);
    const swiperItemsCaptions = ref([]);
    const swiperContents = ref([]);

    let countItem;
    let active = 1;
    let prev_active = null;
    let next_active = null;

    const positionArray = ref(['prev_active', 'active', 'next_active', null]);
    const arrTestPos = ref(['50%', '65%', '0%', '20%'])

    const props = defineProps({
        resources: {
            type: Array,
            required: true,
        }
    })

    onMounted(() => {
        swiperItems.value = swiperContainer.value.children;
        Array.from(swiperItems.value).forEach(item => {
            swiperItemsImages.value.push(item.children[0].children[1].children[0])
            swiperItemsCaptions.value.push(item.children[0].children[1].children[1])
            swiperContents.value.push(item.children[0].children[0].children[0])
        })
        countItem = swiperItems.value.length;
    })

    function manageActiveIndex(e) {
        if (e === 'next') {
            swiper.value.classList.remove('prev');
            swiper.value.classList.add('next');

            active =active + 1 >= countItem ? 0 : active + 1;
            prev_active =active - 1 < 0 ? countItem -1 : active - 1;
            next_active =active + 1 >= countItem ? 0 : active + 1;
            changePositionArray()

            swiperItemsImages.value.forEach((div) => {
                resetAnim(div)
            })
            swiperItemsCaptions.value.forEach((fC) => {
                resetAnim(fC)
            })
            swiperContents.value.forEach((content) => {
                resetAnim(content)
            })
        } else {
            swiper.value.classList.remove('next');
            swiper.value.classList.add('prev');
        }
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
    
    $item-width: calc(60vh * calc(2/3));
    $calculate: calc(3/2);
    $border-color: rgba(255, 255, 255, 0.2);

    .swiper-container {
        width: 100%;
        height: 60vh;
        overflow: hidden;
        position: relative;
    }

    .swiper-items-container {
        height: 100%;
        position: relative;
    
        &::before {
            position: absolute;
            width: $item-width;
            height: 100%;
            content: '';
            top: 0;
            left: calc(100% - calc($item-width) * $calculate);
            border-left: 1px solid $border-color;
            border-right: 1px solid $border-color;
            z-index: 10;
            pointer-events: none;
        }

        &::after {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 50px;
            content: '';
            background-color: $white;
            width: calc($item-width * 0.8);   
            height: calc($item-width * 0.6);
            border-radius: calc($item-width * 0.04) calc($item-width * 0.1) calc($item-width * 0.22) calc($item-width * 0.46);
            filter: blur(calc($item-width * 0.3));
            opacity: .9;
            z-index: 2;
            pointer-events: none;

        }
    }

    .arrows {
        position: absolute;
        bottom: 1rem;
        width: calc(100% - calc($item-width * $calculate));
        height: fit-content;
        z-index: 10;
        opacity: .6;

        display: grid;
        grid-template-columns: repeat(2, 40px) $spacer-2;
        grid-template-rows: 40px;
        justify-content: end;
        gap: 10px;
    }

</style>
