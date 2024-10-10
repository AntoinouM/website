<script setup>

    import Resource from '~/utils/ResourcesManager/Resource';

    const imageEl = ref(null);
    const mainContent = ref(null);

    const props = defineProps({
        resource: {
            type: Resource,
            required: true,
        },
        title: String,
        position: {
            type: String,
            default: null,
        },
        imgStart: String,
    })

    const imgURL = computed(() => {
        return `url(${props.resource.src})`;
    })

    onMounted(() => {
        let isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
               navigator.userAgent &&
               navigator.userAgent.indexOf('CriOS') == -1 &&
               navigator.userAgent.indexOf('FxiOS') == -1;
        if (isSafari) {
            mainContent.value.classList.add('ios');
        }
    })

</script>

<template>
    
    <div class="swiper-item" draggable="false">
        <article class="item" :class="position">
                <div class="main-content" ref="mainContent">
                    <h2 class="title2 section-title">What makes us special</h2>
                    <div class="content">
                        <h2 class="title1">{{  resource.name  }}</h2>
                        <p class="description">{{ resource.description }}</p>
                        <button class="btn-primary btn">Explore</button>
                    </div>
                </div>
                <figure class="image-container"
                >
                    <div ref="imageEl" class="image" :style="{'background-image': `url(${resource.src})`}"></div>
                    <figcaption>{{ resource.name }}</figcaption>
                </figure>
            </article>
    </div>

</template>

<style lang="scss" scoped>
    
    .swiper-item {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        @include breakpoint-max-width(md) {
            height: fit-content;
        }
    
        & .item {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;

            @include breakpoint-max-width(md) {
                display: flex;
                flex-direction: column;
                gap: $spacer-3;
                justify-content: center;
            }


            & .main-content {
                height: 100%;
                display: grid;
                grid-template-columns: calc(100% - calc(#{$swiper-item-width} * #{$swiper-calculate}));
                overflow: hidden;
                position: relative;

                @include breakpoint-max-width(lg) {
                    grid-template-columns: calc(100% - calc(#{$swiper-item-width} * 0.8));
                }
                @include breakpoint-max-width(md) {
                    display: flex;
                    background-color: $salmon-red;
                    height: fit-content;
                    flex-direction: column;
                    justify-self: center;
                    align-items: center;
                }

                & .section-title {
                    display: block;
                    z-index: 10;
                    position: absolute;
                    padding: $spacer-3 calc(#{$spacer-6} + #{$spacer-6});
                    top: $spacer-5;
                    font-weight: bold;

                    @include breakpoint-max-width(md) {
                        padding: $spacer-3;
                        font-size: 1.2rem;
                        top: $spacer-2;
                    }
                }

                &::before {
                    content: '';
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background-color: $salmon-red;
                    background-image: v-bind(imgURL);
                    background-attachment: fixed;
                    background-repeat: no-repeat;
                    background-size: cover;
                    background-position: center;
                    transform: translateX(-1);
                    filter: blur(10px) grayscale(70%);
                    -webkit-filter: blur(10px) grayscale(70%);

                    @include breakpoint-max-width(md) {
                        display: none;
                    }
                }

                & .content {
                    margin-top: $spacer-6;
                    padding: 150px $spacer-4 $spacer-4 80px;
                    z-index: 20;
                    position: relative;

                    @include breakpoint-max-width(md) {
                        padding: $spacer-6 $spacer-7;
                        display: flex;
                        flex-direction: column;
                        gap: $spacer-2;
                    }

                    &::after {
                        position: absolute;
                        content: '';
                        height: .4rem;
                        width: 40%;
                        background-color: black;
                        left: 80px;
                        top: calc(150px / 2);
                        width: 25%;

                        @include breakpoint-max-width(md) {
                            top: calc(64px / 2);
                            left: $spacer-7;
                        }
                    }


                & .btn {
                    z-index: 20;
                    position: absolute;
                    bottom: $spacer-9;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 50%;

                    @include breakpoint-max-width(md) {
                        position: relative !important;
                        width: 90%;
                        bottom: auto;
                        margin-top: $spacer-2;
                    }
                }

                    & .title1 {
                        display: flex;
                        justify-content: start;
                        z-index: 20;

                        @include breakpoint-max-width(lg) {
                            font-size: 1.618em;
                        }
                    }

                    & .description {
                        margin-top: $spacer-4;
                        position: relative;

                        &::before {
                            content: '';
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -70%);
                            width: 120%;
                            height: 180%;
                            background-color: antiquewhite;
                            border-radius: 60px 60% 27% 50px;
                            opacity: .8;
                            filter: blur(60px);
                            z-index: -1;
                        }
                    }
                }
            }

            & .image-container {

                position: absolute;
                height: 90%;
                width: $swiper-item-width;
                top: 50%;
                transform: translateY(-50%);
                left: calc(100% - calc(#{$swiper-item-width} * #{$swiper-calculate}));
                display: flex;
                flex-direction: column;
                gap: $spacer-3;
                justify-content: end;
                align-items: center;
                pointer-events: all;

                @include breakpoint-max-width(lg) {
                    width: calc(#{$swiper-item-width} * 0.8);
                    position: relative;
                }

                @include breakpoint-max-width(md) {
                    width: 100%;
                    height: 40vh;
                    left: 0;
                    top: auto;
                    transform: translateY(0);
                }

                & .image {
                    width: 90%;
                    height: 90%;
                    border-radius: 2%;
                    /* background image */
                    background-position: v-bind(imgStart);
                    background-size: cover;

                    -webkit-box-shadow: -2px 5px 10px 0px rgba(0,0,0,0.6);
                    -moz-box-shadow: -2px 5px 10px 0px rgba(0,0,0,0.6);
                    box-shadow: -2px 5px 10px 0px rgba(0,0,0,0.6);

                }

                & figcaption {
                    width: 70%;
                    text-align: right;
                    text-transform: uppercase;
                    letter-spacing: .2em;
                    margin-bottom: calc(#{$spacer-2});

                    @include breakpoint-max-width(md) {
                        text-align: center;
                        width: 100%;
                    }
                }
            }
        }
    }

    .ios {
        &::before {
            background-attachment: local !important;
            background-image: none !important;
            background-color: $olive-green !important;
        } 
    }

    // animation purpose
    .item {
        display: none;
    }

    .item .main-content .content {
        opacity: 0;
        transition: opacity .8s ease-out;
    }

    .item.active .main-content .content {
        opacity: 1;
        z-index: 30;
    }

    .item.prev_active,
    .item.active,
    .item.next_active {
        display: block;
    }

    .item.active {
        z-index: 2;

        & >  .btn {
            display: block;
        }
    }


    .item.prev_active,
    .item.next_active {
        pointer-events: none;
    }

    .item.active .main-content {
        animation: showContent 1.2s ease-in-out 1 forwards;
    }

    @keyframes showContent {
        from {
            clip-path: circle(0% at 70% 50%);
        } to {
            clip-path: circle(100% at 70% 50%);
        }
    }

    .next .item.prev_active {
        z-index: 1;
    }

    .next .item .image-container figcaption,
    .next .item .image-container .image {
        animation: effectNext .8s ease-in-out 1 forwards;

        @include breakpoint-max-width(lg) {
            animation: effectNextS .8s ease-in-out 1 forwards;
        }
        @include breakpoint-max-width(md) {
            animation: effectNextMobile .8s ease-in-out 1 forwards;
        }
    }

    .next .item {
        @include breakpoint-max-width(md) {
            display: none;
        }
    }

    .next .item.active,
    .next .item.prev_active {
        @include breakpoint-max-width(md) {
            display: block;
        }
    }

    @keyframes effectNext {
        from {
            transform: translateX(calc(var(--transform-from)));
        } to {
            transform: translateX(calc(var(--transform-from) - $swiper-item-width));
        }
    }
    @keyframes effectNextS {
        from {
            transform: translateX(calc(var(--transform-from)));
        } to {
            transform: translateX(calc(var(--transform-from) - calc(#{$swiper-item-width} * 0.8)));
        }
    }
    @keyframes effectNextMobile {
        from {
            transform: translateX(calc(var(--transform-from)));
        } to {
            transform: translateX(calc(var(--transform-from) - calc(100%)));
        }
    }

    .next .item.active .image-container {
        --transform-from: #{$swiper-item-width};

        @include breakpoint-max-width(lg) {
            --transform-from: calc(#{$swiper-item-width} * 0.8);
        }

        @include breakpoint-max-width(md) {
            --transform-from: 100%;
            z-index: 3;
        }
    }

    .next .item.prev_active .image-container {
        z-index: 3;
        --transform-from: 0px;
        overflow: hidden;

        @include breakpoint-max-width(md) {
            --transform-from: -10%;
            z-index: 2;
        }
    }

    .next .item.next_active .image-container {
        z-index: 3;
        --transform-from: calc(#{$swiper-item-width} * 2);

        @include breakpoint-max-width(lg) {
            --transform-from: calc(#{$swiper-item-width} * 0.8 * 2);
        }
        @include breakpoint-max-width(md) {
           display: none;
        }
    }

    /* prev animation */
    .prev .item .image-container figcaption,
    .prev .item .image-container .image {
        animation: effectPrev .8s ease-in-out 1 forwards;

        @include breakpoint-max-width(lg) {
            animation: effectPrevS .8s ease-in-out 1 forwards;
        }
        @include breakpoint-max-width(md) {
            animation: effectPrevMobile .8s ease-in-out 1 forwards;
        }
    }
    .prev .item.active .image-container {
        --transform-from: calc(#{$swiper-item-width} * -1);
        overflow: hidden;

        @include breakpoint-max-width(lg) {
            --transform-from: calc(#{$swiper-item-width} * -0.8);
        }
        @include breakpoint-max-width(md) {
            --transform-from: calc(100% * -1);
        }
    }

    .prev .item {
        @include breakpoint-max-width(md) {
            display: none;
        }
    }

    .prev .item.active,
    .prev .item.prev_active {
        @include breakpoint-max-width(md) {
            display: block;
        }
    }

    .prev .item.prev_active .image-container {
        z-index: 3;
        --transform-from: 0px;

        @include breakpoint-max-width(md) {
            --transform-from: 10%;
        }
    }

    .prev .item.next_active .image-container {
        z-index: 3;
        --transform-from: #{$swiper-item-width};

        @include breakpoint-max-width(lg) {
            --transform-from: calc(#{$swiper-item-width} * 0.8);
        }
        @include breakpoint-max-width(md) {
            display: none;
        }
    }

    .prev .item.next_active .main-content {
        opacity: 0;
    }

    @keyframes effectPrev {
        from {
            transform: translateX(calc(var(--transform-from)));
        } to {
            transform: translateX(calc(var(--transform-from) + #{$swiper-item-width}));
        }
    }

    @keyframes effectPrevS {
        from {
            transform: translateX(calc(var(--transform-from)));
        } to {
            transform: translateX(calc(var(--transform-from) + calc(#{$swiper-item-width} * 0.8)));
        }
    }
    @keyframes effectPrevMobile {
        from {
            transform: translateX(calc(var(--transform-from)));
        } to {
            transform: translateX(calc(var(--transform-from) + calc(100%)));
        }
    }

</style>
