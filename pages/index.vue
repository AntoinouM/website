<script setup>

    import getScrollValueOfElement from '~/utils/utilsFunctions';
    import services from '~/utils/services';
    import carousel from '~/utils/carousel.js'

    const section1 = ref(null);
    const section2 = ref(null);
    const section3 = ref(null);
    const section4 = ref(null);

    let section3Observer = undefined;
    let percentageValue = ref(0);

    let section4Description = ref(undefined);

    const negativePercentage = computed(() => {
        return `${100-percentageValue.value.value}%`
    })

    function updateDescriptionSection4(newD) {
        console.log(newD)
        section4Description.value = newD;
    }

    onMounted(() => {

        // define border effect for section3
        section3Observer = getScrollValueOfElement(section3.value, null);
        percentageValue.value = toRaw(section3Observer.scrollVal);

        // define description of image from section4 carousel
        section4Description.value = Object.values(carousel.slides)[0].description;

        // Cleanup observer on unmount
        onBeforeUnmount(() => {
            if (section3.value) {
                section3Observer.observer.unobserve(section3.value);
            }
        });
    });

</script>

<template>
    <div>
        <div>
            <section ref="section1" class="section section1">
                <NavBar textColor="$night-blue" />
                <video autoplay muted loop class="video-banner">
                    <source src="/Cover/video-bali-ricefields.mp4" type="video/mp4">
                </video>
                <div class="content-container">
                    <h3 class="text title">The Mind Retreat</h3>
                    <div class="text quote">Discover transformation and peace at <i class="text-white">The Mind Retreats</i> – your perfect mental health escape in Bali.</div>
                </div>
            </section>
            <section ref="section2" class="section section2">
                <div class="description">
                    <p class="description-title title3">Welcome to Mind Retreats, where you'll discover the limitless power of your mind.</p>
                    <p class="description-content body">Our retreat is more than a getaway; it’s a transformative journey to rejuvenation and empowerment. Nestled in a tranquil oasis, you’ll find the peace to heal and transform your relationship with yourself and your past.<br/><br/>Experience deep
                        self-discovery and healing through hypnotherapy, daily morning movement, and private counseling in English and German. Explore how past experiences shape your beliefs and behaviors. Embrace self-acceptance and self-love over societal
                        self-optimization. <br/><br/>A skilled hypnotherapist will guide you through the retreat, who is dedicated to providing you with the support and guidance you need to embark on your pathway to connecting with yourself.</p>
                </div>
                <div class="banner">
                    <span class="block"></span>
                    <span class="line line-horizontal"></span>
                    <span class="line line-vertical"></span>
                    <ButtonComp class="btn btn-therapist" :content="'Discover the Therapist'" :btnType="'btn-primary'" />
                    <ButtonComp class="btn btn-retreats" :content="'Discover the Retreats'" :btnType="'btn-primary'" />
                </div>
            </section>
            <section ref="section3" class="section section3">
                <div class="section3-wrapper">
                    <div class="section3-content">
                        <h3 class="heading">The Mind Retreats</h3>
                        <h2 class="title2">Our workshops</h2>
                        <p class="body">Embark in a healing journey with us and discover the activities we offer.</p>
                    </div>
                    <div class="cards-wrapper">
                        <Card
                            v-for="service in services"
                                :key="service.name"
                                :imageUrl='service.image'
                                :title='service.name'
                                :description='service.description'
                                class="card-wrapper"
                        />
                    </div>
                </div>
            </section>
            <section ref="section4" class="section section4">
                <div class="section4-content">
                        <h3 class="heading">The Location</h3>
                        <p class="body">{{ section4Description }}</p>
                        <ButtonComp class="btn" :content="'Explore the resort'" :btnType="'btn-primary'" />
                    </div>
                <CarouselElement
                    class="carousel__wrapper"
                    @active-slide-change="updateDescriptionSection4"
                />
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

</style>
