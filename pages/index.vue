<script setup>

</script>

<template>
    <div>
        <div>
            <section 
                ref="section1"
                class="section section1"
            >
                <NavBar textColor="$night-blue" />
                <div class="content-container">
                    <h3 class="text title text-white">The Mind Retreat</h3>
                    <div class="text quote text-white">Discover transformation and peace at <i class="text-white">The Mind Retreats</i> – your perfect mental health escape in Bali.</div>
                </div>
            </section>
            <section
                ref="section2"
                class="section section2"
            >
                <GridContainer
                    :nbCol="12"
                    :nbRow="6"
                >

                </GridContainer>
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
