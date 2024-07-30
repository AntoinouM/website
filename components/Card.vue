<script setup>

    const props = defineProps({
        imageUrl: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: String,
        button: {
            type: String,
            default: 'Discover'
        }
    })

</script>

<template>

    <div>
        <div class="card">
            <div class="content">
                <h2 class="title"></h2>
                <p class="description body"></p>
                <ButtonComp
                    class="btn"
                    :content="button"
                    width="90%"
                />
            </div>
        </div>
    </div>
  
</template>

<style lang="scss" scoped>

    .card {
        width: 350px;
        height: auto;
        aspect-ratio: 0.65;
        background-position: center;
        background-size: auto 100%;

        @include breakpoint-max-width(md) {
            width: 38vw;
        }
        @include breakpoint-max-width(s) {
            width: 80vw;
        }
    }

</style>
