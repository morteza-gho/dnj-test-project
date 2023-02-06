<template>
   <main-header></main-header>
   <main id="main" class="container">
      <router-view></router-view>
   </main>
</template>

<script setup>
import MainHeader from './components/MainHeader.vue';
</script>

<style lang="scss">
@import "./assets/scss/style.scss";
</style>
