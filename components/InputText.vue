<script setup>

    const props = defineProps({
        label: String,
        type: String,
    })

</script>

<template>

    <div class="group">
        <input required type="{{ type }}" />
        <label>{{ label }}</label>
    </div>
    
</template>

<style lang="scss" scoped>

    .group {
        position: relative;
        box-sizing: border-box;
        flex-grow: 1;
    }

    input {
        width: 100%;
        position: relative;
        background: none;
        border: none;
        border-bottom: 1px solid $salmon-red;

        padding: $spacer-2 $spacer-1;

        &:focus {
            outline:none; 
            border-bottom: 0;

            + label {
                top:-20px;
                font-size:16px;
                color: $sunset-red;
            }
        }

        &:valid {

            + label {
                top:-20px;
                font-size:16px;
                opacity: 1;
            }
        }
    }

    label {
        opacity: .7;
        position: absolute;
        pointer-events:none;
        left:5px;
        top:10px;
        transition:0.2s ease-in all; 
        -moz-transition:0.2s ease-in all; 
        -webkit-transition:0.2s ease-in all;
    }

</style>
