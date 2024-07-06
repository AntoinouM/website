<script setup>

    const props = defineProps({
        textColor: String,
    })

    const burgerShow = ref(false);
    const mobileNav = ref(false);

</script>

<template>

    <div class="nav-wrapper">
      <nav class="navbar">        
        <ul :class="{mobileNav: mobileNav}" class="nav nav-items">
          <li class="nav-item"><a href="#">Retreat</a></li>
          <li class="nav-item"><a href="#">Accommodation</a></li>
        </ul>
        <img src="/public/Logo/Logo_funky.png" alt="The Mind Retreat Logo">
        <ul :class="{mobileNav: mobileNav}" class="nav nav-items nav-items-second">
          <li class="nav-item"><a href="#">Therapy</a></li>
          <li class="nav-item"><a href="#">Hypnotherapy</a></li>
        </ul>
        <div @click="burgerShow = !burgerShow; mobileNav = !mobileNav" :class="{ open: burgerShow }" class="menu-toggle" ref="mobile-menu">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
      </nav>
  </div>

</template>

<style lang="scss" scoped>

  .nav-wrapper{
    position: relative;
    display: inline-block;
  }
    
  .nav-wrapper::after{
    content: '';
    display: block;
    margin: auto;
    height: 1px;
    width: 0%;
    background: transparent;
    transition: width .5s ease, background-color .5s ease;
    animation-timeline: view();
    animation-range-start: calc(100dvh - $navbar-height);
    animation-range-end: calc(100dvh);
    animation-name: draw-border;
    animation-fill-mode: forwards;
    animation-timing-function: linear;
  }

  @keyframes draw-border {
    from {
      width: 0%;
      background: transparent;
    }
    to {
      width: 100%;
      background: $night-blue;
    }
  }

  @keyframes remove-border {
    from {
      width: 100%;
      background: $night-blue;
    }
    to {
      width: 0%;
      background: transparent;
    }
  }

</style>
