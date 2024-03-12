<script setup lang="ts">
import Header from "../organisms/Header.vue";
import Footer from "../organisms/Footer.vue";

const props = defineProps({
  title: {type: String},
})
</script>
<template>
  <Header />
  <!-- <div class="px-4 py-10 max-w-5xl m-auto"> -->
  <v-container>
    <h4 class="mb-6 m-auto max-w-4xl">{{ props.title }}</h4>
    <router-view class="max-w-4xl"/>
  </v-container>
  <!-- </div> -->
  <Footer />
</template>
