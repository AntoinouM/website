<script setup>

</script>

<template>
    <div class="contact-form">
        <div class="form-big-container left">
            <div class="nameInputs">
                <input type="text" class="item" placeholder="First Name" ref="fName" autocomplete="false">
                <input type="text" class="item" placeholder="Last Name" ref="lName" autocomplete="false">
            </div>
            <input type="text" class="item" placeholder="Email Address" ref="email" autocomplete="false">
            <input type="text" class="item" placeholder="Subject" ref="subject" autocomplete="false">
            <FormItemSelect
                placeholder="Choose your retreat"
                accesskey="retreat"
                :options="['retreat 1', 'retreat 2', 'retreat 3']"
            />
            <FormItemSelect
                accesskey="accommodation"
                placeholder="Choose your accommodation"
                :options="['accommodation 1', 'accommodation 2', 'accommodation 3']"
            />
        </div>
        <div class="form-big-container right">
            <textarea name="#" class="textarea-item item" placeholder="Type your message"></textarea>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    
    .contact-form {
        display: flex;
        gap: $spacer-4;

        @include breakpoint-max-width(md) {
            flex-direction: column;
            gap: $spacer-4;
        }
    }

    .form-big-container {
        display: flex;
        flex-direction: column;
        gap: $spacer-4;
        width: 50%;

        @include breakpoint-max-width(md) {
            flex-grow: 1;
            width: 100%;
            gap: $spacer-4;
        }
    }

    .nameInputs {
        display: flex;
        gap: $spacer-4;
        resize: none;
        box-sizing: border-box;

        & .item {
            flex-shrink: 1 !important;
            min-width: 0px;
        }

        @include breakpoint-max-width(xl) {
            flex-direction: column;
        }
    }

    .item {
        flex-grow: 1;
        border: 1px solid $grey-60;
        border-radius: 0.25em;
        padding: 0.25em 0.5em;
        font-size: 1rem;
        resize: none;

        &:focus {
            outline: 2px solid $olive-green;
        }

        @include breakpoint-max-width(md) {
            padding: .75em 1em;
        }
    }

    .textarea-item {
        @include breakpoint-max-width(md) {
            height: 15vh;
        }
    }

</style>
