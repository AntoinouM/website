<script setup>

    import ResourceManager from '~/utils/ResourcesManager/ResourceManager';
    import getScrollValueOfElement from '~/utils/utilsFunctions';

    const resourceLoader = new ResourceManager();

    const section3 = ref(null);

    const resources = ref([]);
    let servicesLoaded = ref(false);

    let section3Observer = undefined;
    let percentageValue = ref(0);

    const negativePercentage = computed(() => {
        return `${100-percentageValue.value.value}%`
    })


    onMounted(() => {

        // manage resources
        resourceLoader.addEventListener('end', (e) => {
            resources.value = resourceLoader.getFilteredArray('Services');
            servicesLoaded.value = true;
        })
        resourceLoader.manageResources('Services')

        // define border effect for section3
        section3Observer = getScrollValueOfElement(section3.value, null);
        percentageValue.value = toRaw(section3Observer.scrollVal);

        // Cleanup observer on unmount
        onBeforeUnmount(() => {
            if (section3.value) {
                section3Observer.observer.unobserve(section3.value);
            }
        });
    })
    

</script>

<template>
    <div>
        <div>
            <section 
                ref="section1"
                class="section section1"
            >
            </section>
            <section 
                ref="section2"
                class="section section2"
            >
            </section>
            <section 
                ref="section3"
                class="section section3"
            >
                <div class="section3-wrapper">
                    <SwiperComp
                    v-if="servicesLoaded"
                    :resources="resources"
                    :autoplay="8000"
                    />
                </div>
            </section>
            <section 
                ref="section4"
                class="section section4"
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


</style>
