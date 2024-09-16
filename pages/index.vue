<script setup>

    import ResourceManager from '~/utils/ResourcesManager/ResourceManager';
    import getScrollValueOfElement from '~/utils/utilsFunctions';
    import dataResort from '../public/data/resort.json';

    const resourceLoader = new ResourceManager();

    const section2 = ref(null);
    const section3 = ref(null);
    const svgLine = ref(null);
    const resortSwiper = ref(null);

    // data
    const data = {
        resort: dataResort,
        services: null,
        retreats: null,
    }

    const resourcesActivity = ref(undefined);
    const resourcesResort = ref(undefined);
    let resourcesLoaded = ref(false);

    let section2Observer = undefined;
    let section3Observer = undefined;
    let percentageValue = ref(0);
    let section2Scroll = ref(0);
    let section4ActiveResource = ref(undefined);

    const negativePercentage = computed(() => {
        return `${100-percentageValue.value.value}%`
    })

    // const section2ScrollValue = computed(() => {
    //     return svgLine.value.getTotalLength() - (svgLine.value.getTotalLength() * (section2Scroll.value.value/100));
    // })

    onMounted(() => {

        // manage resources
        resourceLoader.addEventListener('end', (e) => {
            resourcesActivity.value = resourceLoader.getFilteredArray('Services');
            resourcesResort.value = resourceLoader.getFilteredArray('Resort');
            section4ActiveResource.value = resourcesResort.value[0];
            resourcesLoaded.value = true;
            console.log(e.detail.message)

            assignJSONToResources(data.resort, resourcesResort.value)
        })
        resourceLoader.manageResources(['Services', 'Cover', 'Resort'])
        console.log(dataResort)

        // define border effect for section3
        section3Observer = getScrollValueOfElement(section3.value, null);
        percentageValue.value = toRaw(section3Observer.scrollVal);

        // define svg effect for section2
        section2Observer = getScrollValueOfElement(section2.value, null);
        section2Scroll.value = toRaw(section2Observer.scrollVal);

        // add breakpoints to swiper
        Object.assign(resortSwiper.value, {
            breakpoints: {
                100: {
                    slidesPerView: 1,
                },
                1200: {
                    slidesPerView: 1.4,
                }
            },
        })
        resortSwiper.value.initialize()

        resortSwiper.value.addEventListener('swiperslidechange', (event) => {
            section4ActiveResource.value = resourcesResort.value[resortSwiper.value.swiper.realIndex];
        });

        // The start position of the drawing
        // svgLine.value.style.strokeDasharray = svgLine.value.getTotalLength();

        // Hide the triangle by offsetting dash. Remove this line to show the triangle before scroll draw
        //svgLine.value.style.strokeDashoffset = svgLine.value.getTotalLength();

        // Reverse the drawing (when scrolling upwards)
        // svgLine.value.style.strokeDashoffset = svgLine.value.getTotalLength() - (svgLine.value.getTotalLength() * section2ScrollValue);

        // Cleanup observer on unmount
        onBeforeUnmount(() => {
            if (section3.value && section2.value) {
                section2Observer.observer.unobserve(section2.value);
                section3Observer.observer.unobserve(section3.value);
            }
        });
    })

    /**
     * @param {JSON} data
     * @param {Array} array 
     */
    function assignJSONToResources(data, array) {
        const map = new Map(Object.entries(data))

        array.forEach(resource => {
            if (!map.has(resource.src)) return;

            resource.name = map.get(resource.src).name
            resource.description = map.get(resource.src).description
            resource.divers = map.get(resource.src).divers
        })
    }

</script>

<template>
    <div>
        <div>
            <section 
                ref="section1"
                class="section section1"
            >
                <NavBar textColor="$white"/>
                <video autoplay muted loop class="video-banner">
                    <source src="/Cover/video-bali-ricefields.mp4" type="video/mp4">
                </video>
                <div class="content-container">
                    <div class="logo">
                        <img src="/Logo/logo-white.svg" alt="The Mind Retreat Logo">
                        <div class="mind-text">
                            <span>M</span>
                            <span>I</span>
                            <span>N</span>
                            <span>D</span>
                        </div>
                    </div>
                    <div class="text">
                        <div class="text-title">Are you ready to meet yourself?</div>
                        <div class="text-core">Find transformation and peace at The Mind Retreats – your perfect mental health escape <b>in Bali.</b></div>
                    </div>
                </div>
            </section>
            <section 
                ref="section2"
                class="section section2"
            >
                <div class="left-container">
                    <div class="image-container"></div>
                </div>
                <div class="right-container">
                    <!-- <svg ref="svg" class="svgEl">
                        <path class="line" fill="none" ref="svgLine" d="M 0 0 L 0 2000"/>
                    </svg> -->
                    <div class="content-wrapper">
                        <div class="text">
                            <div class="text-title title3">Welcome to Mind Retreats, where you'll discover the limitless power of your mind.</div>
                            <div class="text-content">Are you feeling stuck in your ways or are you in need of change? Take action now and go on a journey of self-discovery and healing at one of our Retreats.</div>
                        </div>
                        <div class="btn-container">
                            <button class="btn-primary">Learn more about the Retreats</button>
                            <button class="btn-secondary">Meet the host</button>
                        </div>
                    </div>
                </div>
            </section>
            <section 
                ref="section3"
                class="section section3"
            >
                <div class="section3-wrapper">
                    <SwiperComp
                    v-if="resourcesLoaded"
                    :resources="resourcesActivity"
                    :autoplay="8000"
                    />
                </div>
            </section>
            <section 
                ref="section4"
                class="section section4"
            >
                <h2 class="title2 section4-title-mobile">Explore our resort</h2>
                <div class="swiper-element-wrapper">
                    <swiper-container class="resortSwiper" ref="resortSwiper"
                        space-between="30" 
                        pagination="true" 
                        pagination-clickable="true"
                        navigation="true"
                        slides-per-view="1.4"
                        centered-slides="true"
                        speed="1000"
                    >
                        <swiper-slide v-for="(resource, index) in resourcesResort" :key="index" class="resortSlide" lazy="true" @active-index-change="() => {console.log(index)}">
                            <img :src="resource.src" :alt="resource.name" loading="lazy">
                        </swiper-slide>
                    </swiper-container>
                </div>
                <div class="section4-text">
                    <h2 class="title2 section4-title">Explore our resort</h2>
                    <TextComposite
                    v-if="resourcesLoaded"
                        :title="section4ActiveResource.name"
                        :body="section4ActiveResource.description"
                    />
                </div>
            </section>
            <section 
                class="section section5"
                ref="section5"
            >
                
            </section>
        </div>
    </div>
</template>

<style lang="scss" scoped>

    .section {
        height: 100vh;
        max-width: 100%;
        box-sizing: border-box;
        color: $black;
        overflow: hidden;

        @include breakpoint-max-width(md) {
            height: fit-content;
        }
    }

    .section3-wrapper,
    .section3 {
        border-top-left-radius: 50% calc(v-bind(negativePercentage) * 0.12);
        border-top-right-radius: 50% calc(v-bind(negativePercentage) * 0.12);
        @include breakpoint-max-width(md) {
            border-radius: 0;
        }
    }

    .section3-wrapper {
        border-bottom-left-radius: 50% calc(v-bind(negativePercentage) * 0.12);
        border-bottom-right-radius: 50% calc(v-bind(negativePercentage) * 0.12);
        @include breakpoint-max-width(md) {
            border-radius: 0;
        }
    }

    // .line {
    //     stroke-dashoffset: v-bind(section2ScrollValue);
    // }

</style>
