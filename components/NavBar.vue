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
    


</style>
