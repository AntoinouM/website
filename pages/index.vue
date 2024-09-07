<script setup>

    import ResourceManager from '~/utils/ResourcesManager/ResourceManager';

    const resourceLoader = new ResourceManager();

    const resources = ref([]);
    let servicesLoaded = ref(false);


    onMounted(() => {
        resourceLoader.addEventListener('end', (e) => {
            resources.value = resourceLoader.getFilteredArray('Services');
            servicesLoaded.value = true;
        })
        resourceLoader.manageResources('Services')
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
                <SwiperComp
                    v-if="servicesLoaded"
                    :resources="resources"
                />
            </section>
            <section 
                ref="section3"
                class="section section3"
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

        @include breakpoint-max-width(s) {
            height: fit-content;
        }
    }


</style>
