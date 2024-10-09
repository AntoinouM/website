<script setup>

    const form = ref(null);

    const props = defineProps({
        title: {
            type: String,
            default: 'Contact us'
        }
    })

    const titleWords = ref(undefined);

    onMounted(() => {
        titleWords.value = props.title.split(' ');
    })

</script>

<template>

    <div class="form-container">
        <div class="title-block">
            <h2 class="title2" v-for="(word, index) in titleWords" :key="index">{{ word }}</h2>
        </div>
        <p class="body-text">If you want to participate or get information about our retreats, please send us a message and we will be pleased to answer you as quick as possible.</p>
        <img src="/Logo/logo-black.svg" alt="The Mind Retreat Logo">
        <form ref="form" action="#" class="form-block">
            <slot></slot>
            <div class="terms">
                <input id="confirm" type="checkbox" />
                <label for="confirm">I have read and agreed to the </label>
                <a href="" class="terms-link">Terms and conditions</a>
            </div>
            <button type="submit" class="btn-primary btn-submit">Send Message</button>
        </form>
    </div>
    
</template>

<style lang="scss" scoped>

    .form-container {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: $spacer-6;

        & img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 30%;
            height: auto;
            opacity: 0.1;
            z-index: 0;

            @include breakpoint-max-width(md) {
                width: 80%;
            }
        }

        @include breakpoint-max-width(md) {
            gap: $spacer-3;
        }
    }
    
    .title-block {
        display: flex;
        gap: 1em;
        width: fit-content;
        color: $night-blue;
        margin-bottom: $spacer-2;
        z-index: 2;

        position: relative;

        & h2:last-child {
            color: $olive-green;
            font-weight: 600;
        }

        &::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 5px;
            background-color: $olive-green;
            top: 120%;
            left: 0;
        }

        @include breakpoint-max-width(md) {
            gap: $spacer-3;
            margin-top: $spacer-4;
        }
    }

    .body-text {
        width: 60%;
        text-align: center;

        @include breakpoint-max-width(md) {
            width: 80%;
            margin-bottom: $spacer-3;
        }
    }

    .form-block {
        width: 70%;
        display: flex;
        flex-direction: column;
        gap: $spacer-9;
        z-index: 2;

        @include breakpoint-max-width(md) {
            width: 80%;
            gap: $spacer-5;
        }
    }

    .terms {
        align-self: center;
    }

    .btn-submit {
        align-self: center;
        width: 200px;

        @include breakpoint-max-width(md) {
            width: 100%;
            margin-bottom: $spacer-4;
        }
    }

</style>
