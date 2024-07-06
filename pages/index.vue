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

    .section1 {
        background-color: $egg-white;
        background-image: url('/public/Cover/bali2.png');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: bottom -10em center;  

        /* fix backgrounbd for parallax*/
        background-attachment: fixed;
    }

    .content-container{
        width: 100%;
        margin-top: 40%;
    }

    .text-white{
        color: $egg-white;
    }

    .title{
        text-align: center;
    }

    .quote{
        text-align: center;
        filter: drop-shadow(0 0 0.75rem black);
        padding: 0 $spacer-10;
    }

</style>
