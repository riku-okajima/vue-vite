<script setup lang="ts">
interface Props {
  message: string;
  to: string;
}

const props = withDefaults(defineProps<Props>(), {
  message: "link",
  to: "/",
});
</script>

<template>
  <router-link :to="props.to" :class="$attrs.class">{{ props.message }}</router-link>
</template>
