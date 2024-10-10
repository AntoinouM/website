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
        text.value.style.animation = 'none';
        text.value.offsetWidth;
        text.value.style.animation = '';
    })

</script>

<template>

    <div class="text-composite" ref="text">
        <h2 class="title2">{{ title }}</h2>
        <p>{{ body }}</p>
        <slot></slot>
    </div>
    
</template>

<style lang="scss" scoped>
    
    .text-composite {
        display: flex;
        flex-direction: column;
        gap: $spacer-5;
        position: relative;
        color: inherit;
        animation: appear .9s ease-in-out 1 forwards;
        color: $night-blue;

        @include breakpoint-max-width(md) {
            color: $white;
        }

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
