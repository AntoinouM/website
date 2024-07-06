<script setup>

    const props = defineProps({
        nbRow: {
            type: Number,
            required: true
        },
        nbCol: {
            type: Number,
            required: true
        },
        gapRow: {
            type: Number,
            default: 0,
        },
        gapCol: {
            type: Number,
            default: 0,
        }
    })


</script>

<template>

    <div class="grid">
        <slot></slot>
    </div>

</template>

<style lang="scss" scoped>

    .grid{
        display: grid;
        width: 100%;
        height: 100%;
        grid-template-columns: $spacer-8 repeat(v-bind(nbCol), 1fr) $spacer-8;
        grid-template-rows: repeat(v-bind(nbRow), 1fr);
        grid-column-gap: v-bind(gapCol);
        grid-row-gap: v-bind(gapRow);
    }
    
</style>
