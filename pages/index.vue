<script setup>
    import ResourceManager from '~/utils/ResourcesManager/ResourceManager';

    const listOfResources = [
        'agung.webp',
        'drone-view-close.webp',
        'rooftop.webp',
    ]

    const duplicate = [
        'agung.webp',
        'pool-front.webp'
    ]


    const resourceLoader = new ResourceManager();

    resourceLoader.addEventListener("start", () => {
        console.log("Resource loading starts")
    })
    resourceLoader.addEventListener("progress", (e) => {
        // e.detail.totalResources display total resources to load
        // e.detail.loadedResources display loaded resources
        // e.detail.percentage display percentage
        console.log("Progress", e.detail)
    })
    resourceLoader.addEventListener("end", (e) => {
        console.log("End", e.detail)
    })
    resourceLoader.manageResources('Resort').then((value) => {
        console.log(value);
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
