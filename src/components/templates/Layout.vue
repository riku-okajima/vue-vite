<script setup lang="ts">
import Header from "../organisms/Header.vue";
import Footer from "../organisms/Footer.vue";
</script>
<template>
  <Header />
  <div class="px-4 py-24 max-w-2xl m-auto">
    <router-view />
  </div>
  <Footer />
</template>
