<script setup>
    import ResourceManager from '~/utils/ResourcesManager/ResourceManager';

    const resourceLoader = new ResourceManager();
    const imgArr = ref([])

    onMounted(() => {
        resourceLoader.addEventListener('end', (e) => {
            imgArr.value = resourceLoader.getFilteredArray('Resort');
        })
        resourceLoader.manageResources('Resort');
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
                    :imgArr="imgArr"
                />
            </section>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    
    .section {
        height: 100vh;
        max-width: 100%;
        padding: 1rem 4rem;
        box-sizing: border-box;
        color: $black;

        @include breakpoint-max-width(s) {
            height: fit-content;
        }
    }


</style>
