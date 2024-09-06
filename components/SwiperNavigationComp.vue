<script setup>

    const props = defineProps({
        direction: {
            type: String,
            required: true,
            default: 'next'
        },
        color: {
            type: String,
            default: '#000'
        }
    })

</script>

<template>

    <div v-if="direction === 'next'" class="navigation-arrow">&#9002;</div>
    <div v-else class="navigation-arrow">&#9001;</div>
    
</template>

<style lang="scss" scoped>
    
    .navigation-arrow {
        color: v-bind(color);
        width: fit-content;
        font-size: 50px;
        font-weight: 500;
        cursor: pointer;

        transition: .15s;

        &:hover {
            color: cyan;
        }
    }

</style>
