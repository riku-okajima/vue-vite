<script setup lang="ts">
const props = defineProps({
  isRequired: { type: Boolean, required: true },
});
</script>
<template>
  <span v-if="isRequired" class="tag bg-red-500">required</span>
  <span v-else class="tag bg-gray-400">optional</span>
</template>
