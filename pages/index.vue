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
                <h1>The Mind Retreat</h1>
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

</style>
