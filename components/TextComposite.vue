<script setup>

    const props = defineProps({
        title: String,
        body: String,
        color: {
            type: String,
            default: '$night-blue',
        }
    })

    const text = ref(null);

    onUpdated(() => {
        console.log('up')
        text.value.style.animation = 'none';
        text.value.offsetWidth;
        text.value.style.animation = '';
    })

</script>

<template>

    <div class="text-composite" ref="text">
        <h2 class="title2">{{ title }}</h2>
        <p class="body">{{ body }}</p>
        <slot></slot>
    </div>
    
</template>

<style lang="scss" scoped>
    
    .text-composite {
        display: flex;
        flex-direction: column;
        gap: $spacer-3;
        position: relative;
        color: v-bind(color);
        animation: appear .9s ease-in-out 1 forwards;

        &::before {
            content: '';
            width: 40%;
            height: 5px;
            background-color: v-bind(color);
        }

        @keyframes appear {
            from {
                transform: translateX(110%);
            }
            to {
                transform: translateX(0);
            }
        }
    }

</style>
