<script setup>

</script>

<template>
    <div>
        <div class="container">

        </div>
    </div>
</template>

<style lang="scss" scoped>
    
    .container {
        width: 100%;
        height: 100vh;
        background-color: $primary;

        @include breakpoint-min-width('s') {
            background-color: red;
        }
    }

</style>
