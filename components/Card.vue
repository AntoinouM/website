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

    const card = ref(undefined);
    const btnWidth = ref(undefined);

    onMounted(() => {
        btnWidth.value = card.value.getBoundingClientRect().width * 0.7 + 'px';
    })

</script>

<template>

    <div>
        <div ref="card" class="card">
            <div class="content">
                <h4 class="title4"> {{ title }} </h4>
                <p class="description body"> {{ description }} </p>
                <ButtonComp
                    class="btn-secondary"
                    :content="button"
                    :width="btnWidth"
                />
            </div>
        </div>
    </div>
  
</template>

<style lang="scss" scoped>

    $transition-delay: 700ms;
    $transition-timing: cubic-bezier(0.19, 1, 0.22, 1);

    * {
        box-sizing: border-box;
    }

    .card {
        position: relative;
        width: 250px;
        height: auto;
        aspect-ratio: 0.65;
        padding: $spacer-3 $spacer-1;
        border: 3px solid $egg-white;
        border-radius: 20px;
        z-index: 2;
        text-align: center;
        color: $egg-white !important;
        box-shadow: 0 1px 1px rgba(0,0,0,0.1), 
            0 2px 2px rgba(0,0,0,0.1), 
            0 4px 4px rgba(0,0,0,0.1), 
            0 8px 8px rgba(0,0,0,0.1),
            0 16px 16px rgba(0,0,0,0.1);

        /* display */
        display: flex;
        justify-content: center;
        align-items: flex-end;
        overflow: hidden;


        /* background image */
        background-image: url('/public/Services/Yoga.webp');
        background-position: center;
        background-size: auto 100%;

        @include breakpoint-max-width(md) {
            width: clamp(32vw, 11rem, 250px);
        }
        @include breakpoint-max-width(s) {
            width: 250px;
        }

        &:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 110%;
            background-size: cover;
            background-position: 0 0;
            transition: transform calc(var($transition-delay) * 1.5) var($transition-timing);
            pointer-events: none;
        }
        
        &:after {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 200%;
            pointer-events: none;
            background-image: linear-gradient(
            to bottom,
            hsla(0, 0%, 0%, 0) 0%,
            hsla(0, 0%, 0%, 0.009) 11.7%,
            hsla(0, 0%, 0%, 0.034) 22.1%,
            hsla(0, 0%, 0%, 0.072) 31.2%,
            hsla(0, 0%, 0%, 0.123) 39.4%,
            hsla(0, 0%, 0%, 0.182) 46.6%,
            hsla(0, 0%, 0%, 0.249) 53.1%,
            hsla(0, 0%, 0%, 0.320) 58.9%,
            hsla(0, 0%, 0%, 0.394) 64.3%,
            hsla(0, 0%, 0%, 0.468) 69.3%,
            hsla(0, 0%, 0%, 0.540) 74.1%,
            hsla(0, 0%, 0%, 0.607) 78.8%,
            hsla(0, 0%, 0%, 0.668) 83.6%,
            hsla(0, 0%, 0%, 0.721) 88.7%,
            hsla(0, 0%, 0%, 0.762) 94.1%,
            hsla(0, 0%, 0%, 0.790) 100%
            );
            transform: translateY(-50%);
            transition: transform calc(var($transition-delay) * 2) var($transition-timing);
        }
    }

    .content {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        color: $egg-white;
        padding: $spacer-1;
        transition: transform $transition-delay $transition-timing;
        z-index: 1;
        
        > * + * {
            margin-top: 1rem;
        }
    }

    .description {
        color: inherit;
    }

    @media (hover: hover) {
        .card:after {
            transform: translateY(0);
        }
        
        .content {
            transform: translateY(calc(100% - 4.5rem));
            
            > *:not(.title4) {
            opacity: 0;
            transform: translateY(1rem);
            transition:
                transform $transition-delay $transition-timing,
                opacity $transition-delay $transition-timing;
            }
        }
        
        .card:hover,
        .card:focus-within {
            align-items: center;

            &:before { transform: translateY(-4%); }
            &:after { transform: translateY(-50%); }

            .content {
            transform: translateY(0);

            > *:not(.title4) {
                opacity: 1;
                transform: translateY(0);
                transition-delay: calc($transition-delay / 8);
            }
            }
        }
        
        .card:focus-within {
            &:before,
            &:after,
            .content,
            .content > *:not(.title4) {
            transition-duration: 0s;
            }
        }
    }
</style>
