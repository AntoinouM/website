<script setup>


    const props = defineProps({
        imgArr: {
            type: Array,
            required: true,
        }
    })

</script>

<template>

    <div class="swiper-container next">
        <div class="swiper-items-container">
            <article class="item">
                <div class="main-content">
                    <div class="content">
                        <h2>Activity title</h2>
                        <p class="description">Eu consequat eu et quis laboris enim Lorem cupidatat. Enim minim consectetur veniam elit. Laborum aute labore reprehenderit ad non eiusmod ad cupidatat est reprehenderit eiusmod culpa ipsum. Elit eu sunt anim duis cupidatat est consequat et.</p>
                    </div>
                </div>
                <figure class="image">
                    <img src="/public/Services/DSC08675.jpeg" alt="">
                    <figcaption>Activity description</figcaption>
                </figure>
            </article>

        </div>
        <div class="arrows">
            <SwiperNavigationComp ref="prevArrow" direction="prev"/>
            <SwiperNavigationComp ref="nextArrow" direction="next"/>
        </div>
    </div>
    
</template>

<style lang="scss" scoped>

    $item-width: 350px;
    $calculate: calc(3/2);
    $border-color: $white;
    
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
            height: 300px;

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
