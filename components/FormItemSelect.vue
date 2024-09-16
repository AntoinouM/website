<script setup>

    const selectField = ref(null);
    const select = ref(null);
    const listOptions = ref(null);

    const props = defineProps({
        placeholder: {
            type: String,
            default: 'Select an option'
        },
        options: {
            type: Array,
            required: true
        }
    })

    onMounted(() => {
        select.value.onclick = (e) => {
            listOptions.value.classList.toggle('active')
        }
        document.onclick = (e) => {
            if (e.target !== selectField.value && listOptions.value.classList.contains('active')) {
                listOptions.value.classList.remove('active');
            }
        }
    })

    function updateSelectField(i) {
        selectField.value.options[i+1].selected = true;
        listOptions.value.classList.remove('active');
    }

</script>

<template>
  <div class="select-container">
    <div class="select-wrapper" ref="select">
        <select ref="selectField" :name="placeholder" class="select-field">
            <option hidden value="hide">{{ placeholder }}</option>
            <option hidden v-for="(option, index) in options" :key="index" :value="option">{{ option }}</option>
        </select>
    </div>
    <ul ref="listOptions" class="list-options">
        <li class="list-item" v-for="(option, index) in options" :key="index" @click="updateSelectField(index)">{{ option }}</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>

    $options-background-color: $white;
    $options-border-color: $grey-60;
    $arrow-color: $olive-green;

    select {
        // A reset of styles, including removing the default dropdown arrow
        appearance: none;
        // Additional resets for further consistency
        background-color: transparent;
        border: none;
        padding: 0 1em 0 0;
        margin: 0;
        width: 100%;
        font-family: inherit;
        font-size: inherit;
        cursor: inherit;
        line-height: inherit;
        outline: none;
        grid-area: select;
    }

    .select-wrapper:focus-within {
        border: 2px solid $olive-green;

        &::after {
            transform: rotate(180deg);
        }
    }

    .select-container {
        position: relative;
    }

    .select-wrapper {
        display: grid;
        grid-template-areas: "select";
        align-items: center;
        flex-grow: 1;
        width: 100%;
        border: 1px solid $options-border-color;
        border-radius: 0.25em;
        padding: 0.25em 0.5em;
        font-size: 1rem;
        cursor: pointer;
        line-height: 1.1;
        background-color: $options-background-color;
        background-image: linear-gradient(to top, #f9f9f9, #fff 33%);

        &::after {
            grid-area: select;
            justify-self: end;
            content: "";
            width: 0.8em;
            height: 0.5em;
            background-color: $arrow-color;
            clip-path: polygon(100% 0%, 0 0%, 50% 100%);
            pointer-events: none;
            transform: rotate(0deg);
            transition: transform .3s ease-in;
        }

        @include breakpoint-max-width(md) {
            padding: .75em 1em;
        }
    }

    .list-options {
        display: none;
        user-select: none;
        position: absolute;
        width: 100%;
        border-radius: 0.25em;
    }

    .list-options.active {
        display: flex;
        flex-direction: column;
        background-color: $options-background-color;
        border: 1px solid $options-border-color;
        margin-top: $spacer-1;
        z-index: 20;
        animation: appear .15s ease-in forwards;
        height: 0;
        overflow: hidden;

        & .list-item {
            border-bottom: 1px solid $options-border-color;
            padding: $spacer-1;

            &:last-child {
                border: none;
            }

            &:hover {
                background-color: $grey-30;
            }
        }
    }

    @keyframes appear {
        from {
            display: none;
            height: 0;
        } to {
            display: block;
            height: 94px;
        }
    }

</style>
