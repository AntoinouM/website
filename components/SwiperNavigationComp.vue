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

    <button v-if="direction === 'next'" class="navigation-arrow" @click="$emit('clickEvent', 'next')">&gt;</button>
    <button v-else class="navigation-arrow" @click="$emit('clickEvent', 'prev')">&lt;</button>
    
</template>

<style lang="scss" scoped>
    
    .navigation-arrow {
        color: v-bind(color);
        background-color: transparent;
        border: 1px solid v-bind(color);
        border-radius: 10px;
        font-family: monospace;
        font-size: large;
        font-weight: bold;
        line-height: 0;
        box-shadow: 0 10px 40px #5555;
        cursor: pointer;

        transition: 0.5s;

        &:hover {
            background-color: #eee5;
        }
    }

</style>
