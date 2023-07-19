<script setup lang="ts">
import SearchButton from "../atoms/SearchButton.vue";
import SearchInput from "../atoms/SearchInput.vue";
</script>
<template>
  <form method="get" action="#" :class="$attrs.class">
    <SearchInput />
    <SearchButton />
  </form>
</template>
