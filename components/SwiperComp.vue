<script setup>

</script>

<template>

    <div class="swiper-container next">
        <div class="swiper-items-container">
            <article class="item">
                <figure class="item-image">
                    <img src="/public/Resort" alt="agung">
                </figure>
            </article>
            <article class="item other_1">
                <figure class="item-image">
                    <img src="/public/Resort/drone-view-close.webp" alt="dronw">
                </figure>
            </article>
            <article class="item active">
                <figure class="item-image">
                    <img src="/public/Resort/pool-back.webp" alt="pool">
                </figure>
            </article>
            <article class="item other_2">
                <figure class="item-image">
                    <img src="/Resort/rooftop.webp" alt="pool">
                </figure>
            </article>
            <article class="item">
                <figure class="item-image">
                    <img src="/Resort/tisna-abi.webp" alt="pool">
                </figure>
            </article>
            <article class="item">
                <figure class="item-image">
                    <img src="/Resort/pool-front.webp" alt="pool">
                </figure>
            </article>
        </div>
        <div class="arrows">
            <SwiperNavigationComp direction="prev"/>
            <SwiperNavigationComp direction="next"/>
        </div>
    </div>
    
</template>

<style lang="scss" scoped>

    $item-width: 350px;
    $calculate: calc(3/2);
    
    .swiper-container {
        width: 100%;
        height: 100%;
        overflow: hidden;
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
            border-left: 1px solid black;
            border-right: 1px solid black;
            z-index: 10;
            pointer-events: none;
        }

        & .item {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;

            &-image {
                position: absolute;
                height: 100%;
                width: auto;
                top: 0;
                left: 0;
            }
        }

    }

    .arrows {
        position: absolute;
        left: 50%;
        transform: translate(-50%);

        width: 50%;
        height: fit-content;
        bottom: 1rem;

        display: flex;
        align-items: center;
        justify-content: space-between;
    }


</style>
