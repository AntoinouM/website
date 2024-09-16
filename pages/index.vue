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
                id="section1"
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
                id="section2"
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
                id="section3"
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
                id="section4"
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
                id="section5"
            >
            <FormComp title="Contact Us">
                <ContactForm></ContactForm>
            </FormComp>
            </section>
            <footer>
                <div class="contact">
                    <h3 class="title4">Let's connect</h3>
                    <div class="social">
                        <svg class="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path class="logo-path insta" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                        <p class="social-text">@themindretreats</p>
                    </div>
                    <div class="social">
                        <svg xmlns="http://www.w3.org/2000/svg" class="logo" viewBox="0 0 24 24"><path class="logo-path email" d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/></svg> 
                        <p class="social-text">themindretreats@gmail.com</p>
                    </div>
                </div>
                <div class="brand">
                    <h3 class="title4">The mind retreats</h3>
                    <svg class="mr-logo" viewBox="0 0 435 411" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path class="mr-logo-path" d="M30 180.5V7.41419C30 6.52329 31.0771 6.07713 31.7071 6.70709L229.293 204.293C229.683 204.683 230.317 204.683 230.707 204.293L428.293 6.7071C428.923 6.07713 430 6.52329 430 7.4142V403.086C430 403.977 428.923 404.423 428.293 403.793L229.5 205M30 180.5C16.1929 180.5 5 191.693 5 205.5C5 219.307 16.1929 230.5 30 230.5M30 180.5C43.8071 180.5 55 191.693 55 205.5C55 219.307 43.8071 230.5 30 230.5M30 230.5L30 405M152 404.5V6.49998C152 5.9477 152.467 5.49983 153.02 5.50184C303.221 6.04887 352 127.479 352 206.5C352 303.78 303.221 405.042 153.02 405.498C152.467 405.5 152 405.052 152 404.5Z" stroke="white" stroke-width="10" stroke-linecap="round"/>
                    </svg>
                    <p>Your perfect mental health escape in Bali</p>
                </div>
                <div class="navigation">
                    <h3 class="title4">Navigation</h3>
                    <NuxtLink to="#section1"><p>Welcome section</p></NuxtLink>
                    <NuxtLink to="#section2"><p>Concept</p></NuxtLink>
                    <NuxtLink to="#section3"><p>Retreats</p></NuxtLink>
                    <NuxtLink to="#section4"><p>Resort</p></NuxtLink>
                    <NuxtLink to="#section5"><p>Contact</p></NuxtLink>
                </div>
            </footer>
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
