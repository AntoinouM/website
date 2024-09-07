<script setup>

    

    const prevArrow = ref(null);
    const nextArrow = ref(null);
    const swiper = ref(null);

    const arrTest = ref(['prev_active', 'active', 'next_active', null])
    const arrTestPos = ref(['50%', '65%', '0%', '20%'])

    const props = defineProps({
        resources: {
            type: Array,
            required: true,
        }
    })

    onMounted(() => {

    })

</script>

<template>

    <div ref="swiper" class="swiper-container next">
        <div class="swiper-items-container">
            <SwiperItemComp
                v-for="(resource, index) in resources"
                :key="resource.src"
                ref="swiperItem"
                :position="arrTest[index]"
                :imgStart="arrTestPos[index]"
                :resource="resource"
            />
        </div>
        <div class="arrows">
            <SwiperNavigationComp ref="prevArrow" color="#fff" direction="prev"/>
            <SwiperNavigationComp ref="nextArrow" color="#fff" direction="next"/>
        </div>
    </div>
    
</template>

<style lang="scss" scoped>
    
    $item-width: 500px;
    $calculate: calc(3/2);
    $border-color: rgba(255, 255, 255, 0.2);

    .swiper-container {
        width: 100%;
        height: 100vh;
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
            top: 50px;
            left: 50px;
            content: '';
            background-color: $white;
            width: calc($item-width * 0.8);   
            height: calc($item-width * 0.6);
            border-radius: calc($item-width * 0.04) calc($item-width * 0.1) calc($item-width * 0.22) calc($item-width * 0.46);
            filter: blur(calc($item-width * 0.3));
            opacity: .9;
            z-index: 10;
            pointer-events: none;

        }
    }

    .arrows {
        position: absolute;
        bottom: 1rem;
        width: calc(100% - calc($item-width * $calculate));
        height: fit-content;
        z-index: 10;

        display: grid;
        grid-template-columns: repeat(2, 40px);
        grid-template-rows: 40px;
        justify-content: end;
        gap: 10px;
    }

</style>
