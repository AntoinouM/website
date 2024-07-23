<script setup>
    
    import getScrollValueOfElement from '~/utils/utilsFunctions';

    const section1 = ref(null);
    const section2 = ref(null);
    const section3 = ref(null);
    const section4 = ref(null);

    let section3Observer = undefined;
    let percentageValue = ref(0);

    onMounted(() => {

        section3Observer = getScrollValueOfElement(section3.value, percentageValue.value, null);
        percentageValue.value = toRaw(section3Observer.scrollVal);
        window.onscroll = (e) => {
            console.log(percentageValue.value)
        }

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
                <div class="content-container">
                    <h3 class="text title text-white">The Mind Retreat</h3>
                    <div class="text quote text-white">Discover transformation and peace at <i class="text-white">The Mind Retreats</i> – your perfect mental health escape in Bali.</div>
                </div>
            </section>
            <section ref="section2" class="section section2">
                <div class="description">
                    <p class="description-title title3">Welcome to Mind Retreats, where you'll discover the limitless power of your mind.</p>
                    <p class="description-content body">Our retreat is more than just a getaway; it is a transformative experience that will leave you feeling rejuvenated and empowered. <br/><br/>Surrounded by nature in a tranquil oasis, you'll find the peace needed to heal and actively transform
                        your relationship with yourself, your thoughts, and your past experiences. A deep journey of self-discovery and healing. <br/><br/>Through hypnotherapy, daily morning movement, and private counselling in English and German, we explore
                        the workings of the conscious and subconscious mind and how our past has shaped, beliefs, thought and behaviour patterns that persist today. We celebrate self-acceptance and self-love over the societal drive for self-optimization.
                        <br/><br/>A skilled hypnotherapist will guide you through the retreat, creating a safe space where you can find peace, calmness, and transformation and who provides you with the support and guidance you need to embark on your pathway
                        to connecting with yourself.</p>
                </div>
                <div class="banner">
                    <span class="block"></span>
                    <ButtonComp class="btn btn-therapist" :content="'Discover the Therapist'" :btnType="'btn-primary'" />
                    <ButtonComp class="btn btn-retreats" :content="'Discover the Retreats'" :btnType="'btn-primary'" />
                </div>
            </section>
            <section ref="section3" class="section section3">
                <div class="label topLeft"> {{ percentageValue }} % </div>
                <div class="label topRight"> {{ percentageValue }} % </div>
                <div class="label bottomLeft"> {{ percentageValue }} % </div>
                <div class="label bottomRight"> {{ percentageValue }} % </div>
            </section>
            <section ref="section4" class="section section4">
    
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
</style>
