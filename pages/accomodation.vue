<script setup>
    import {getScrollValueOfElement, assignJSONToResources} from '~/utils/utilsFunctions';
    import dataActivities from '~/public/data/activities.json';
    import ResourceManager from '~/utils/ResourcesManager/ResourceManager';

    const resourceLoader = new ResourceManager();
    const resourcesActivity = ref(undefined);
    let resourcesLoaded = ref(false);

    onMounted(() => {
        // manage resources
        resourceLoader.addEventListener('end', (e) => {
            resourcesActivity.value = resourceLoader.getFilteredArray('Activities');
            resourcesLoaded.value = true;
            console.log(e.detail.message)
            assignJSONToResources(dataActivities, resourcesActivity.value)
            console.log(resourcesActivity.value)
        })
        resourceLoader.manageResources(['Activities'])
    })

</script>

<template>

    <div class="accommodation-container">

        <NavBar textColor="$white"/>
        <div class="accommodation--content-container">
            <p class="text-intro">
                Welcome to <b>Dana Bali Ricefield Villas</b>, a serene haven located in the countryside of Bali, hidden away from the bustling tourist spots. Here, comfort meets authentic Balinese culture, creating an idyllic setting for your retreat. During your stay, the whole Venue is exclusively reserved for guests of the Retreat, ensuring a safe and private space for your transformation journey. <br/><br/>Surrounded by nature, this hidden gem offers the perfect spot to heal and escape. Despite its remote charm in the lush Balinese landscape, Dana Bali Ricefield Villas is conveniently close to renowned attractions like Tirta Gangga and Virgin Beach. Relax by the cozy saltwater pool, take in breathtaking views from the rooftop, explore the traditional countryside, or indulge in a rejuvenating spa visit. Your stay promises tranquillity, discovery, and rejuvenation.  <br/><br/>Dana Bali Ricefield Villa, proudly Balinese-owned, offers fresh, lavish breakfasts and homecooked locally sourced Balinese and fusion dinners.
            </p>
            <h2 class="title2 text-title">Services</h2>
            <p class="text-service--intro">
                With additional costs Dana Bali offers laundry service, Motorbike rental, private drivers, Massages, small choice of meals and drinks as well as taxi service.<br/><br/>Towels will be refreshed as needed, and bedsheets will be changed every five nights to support our environmental efforts. Throughout the day, enjoy complimentary water, Balinese coffee, tea, and fresh fruits.<br/><br/><b>Activities and Sightseeing Spots around Dana Bali Ricefield Villa</b><br/><br/>Despite being a serene oasis, Dana Bali Ricefield Villas lays close to beautiful sightseeing spots. We will organize exclusive tours for our retreat guests to enjoy during their stay. These tours are not included in the package price; you will need to cover entrance fees and taxi costs...
            </p>
        </div>
        <div class="acc-swiper--container">
            <swiper-container class="acc-swiper" ref="swiper"
                space-between="30" 
                pagination="true" 
                navigation="true"
                slides-per-view="1"
                centered-slides="true"
                speed="1000"
            >
                <swiper-slide v-for="(resource, index) in resourcesActivity" :key="index" class="acc-swiper--slide" lazy="true">
                    <img :src="resource.src" :alt="resource.name" loading="lazy">
                    <div class="acc-swiper--slide--text">
                        <h2 class="title3">{{ resource.name }}</h2>
                        <p class="acc-swiper--slide--description">{{ resource.description }}</p>
                    </div>
                </swiper-slide>
            </swiper-container>
        </div>
    </div>
    
</template>

<style lang="scss" scoped>
    
    .accommodation-container {
        width: 100%;
        height: fit-content;
        overflow-y: scroll;

        background-color: $salmon-red;
    }

</style>
