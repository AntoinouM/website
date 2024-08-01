<script setup>

    const props = defineProps({
        content:{
            type: String,
            required: true
        },
        btnType: {
            type: String,
            default: 'btn-primary'
        },
        width: {
            type: String,
            default: '260px'
        }
    })


</script>

<template>

    <div>
        <div
            :class="props.btnType"
            class="btn-container"
        >
            {{ props.content }}
            <span class="icon">arrow_forward</span>
        </div>
    </div>
    
</template>

<style lang="scss" scoped>

    .btn-container {
        width: v-bind(width) !important;
    }

</style>
