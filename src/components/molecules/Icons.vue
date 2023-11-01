<script setup lang="ts">
const props = defineProps({
  icons: { required: true },
});
</script>
<template>
  <v-btn v-for="(icon, index) in icons" :key="index" class="mx-4" :icon="icon" variant="text"></v-btn>
</template>
