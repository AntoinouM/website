<script setup>
    import ResourceManager from '~/utils/ResourcesManager/ResourceManager';

    const resourceLoader = new ResourceManager();
    const imgArr = ref([])

    onMounted(() => {
        resourceLoader.addEventListener('end', (e) => {
            e.detail.images.forEach((value, key) => {
                imgArr.value.push(value.src)
            })
            console.log(imgArr.value)
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
                <TestComp
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

    .section1 {
        background-color: $egg-white;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: bottom -10em center;  

        /* fix background for parallax*/
        background-attachment: fixed;
    }

</style>
