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
    
</style>
