<script setup>

    import Resource from '~/utils/ResourcesManager/Resource';


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

    onMounted(() => {
        
    })

</script>

<template>
    
    <div class="swiper-item">
        <article class="item" :class="position">
                <div class="main-content"
                    :style="{'background-image': `url(${resource.src})`}"
                >
                    <div class="content">
                        <h2 class="title1">Activity title</h2>
                        <p class="description">Eu consuat eu et quis laboris enim Lorem cupidatat. Enim minim consectetur veniam elit. Laborum aute labore reprehenderit ad non eiusmod ad cupidatat est reprehenderit eiusmod culpa ipsum. Elit eu sunt anim duis cupidatat est consequat et.</p>
                    </div>
                </div>
                <figure class="image-container">
                    <div class="image" :style="{'background-image': `url(${resource.src})`}"></div>
                    <figcaption>Activity description</figcaption>
                </figure>
            </article>
    </div>

</template>

<style lang="scss" scoped>

    $item-width: 500px;
    $calculate: calc(3/2);
    $border-color: $white;
    
    .swiper-item {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    
        & .item {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;

            & .main-content {
                height: 100%;
                display: grid;
                grid-template-columns: calc(100% - calc($item-width * $calculate));

                /* parallax */
                background-attachment: fixed;
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center;
                opacity: 1;
                filter: blur(5px) grayscale(60%);
                -webkit-filter: blur(6px) grayscale(80%);

                & .content {
                    padding: 150px $spacer-4 $spacer-4 80px;

                    & .description {
                        margin-top: $spacer-4;
                    }
                }
            }

            & .image-container {
                position: absolute;
                height: 100%;
                width: $item-width;
                top: 0;
                left: calc(100% - calc($item-width * $calculate));
                padding: $spacer-4;
                display: flex;
                flex-direction: column;
                justify-content: end;
                align-items: center;

                & .image {
                    width: 90%;
                    height: 90%;
                    border-radius: 2%;
                    /* background image */
                    background-position: v-bind(imgStart);
                    background-size: cover;
                }
            }
        }
    }

    // animation purpose
    .item {
        display: none;
    }

    .item.prev_active,
    .item.active,
    .item.next_active {
        display: block;
    }

    .item.active {
        z-index: 2;
    }

    .item.prev_active,
    .item.next_active {
        pointer-events: none;
    }

    .item.active .main-content {
        animation: showContent 1s ease-in-out 1 forwards;
    }

    @keyframes showContent {
        from {
            clip-path: circle(0% at 70% 50%);
        } to {
            clip-path: circle(100% at 70% 50%);
        }
    }

    .item.prev_active {
        z-index: 1;
    }

    .item .image-container .image,
    .item .image-container figcaption {
        animation: effectNext .5s ease-in-out 1 forwards;
    }

    @keyframes effectNext {
        from {
            transform: translateX(calc(var(--transform-from)));
        } to {
            transform: translateX(calc(var(--transform-from) - 500px));
        }
    }

    .item.active .image-container {
        --transform-from: $item-width;
    }

    .item.prev_active .image-container {
        z-index: 3;
        --transform-from: 0px;
        overflow: hidden;
    }

    .item.next_active .image-container {
        z-index: 3;
        --transform-from: calc(500px * 2);
    }

</style>
