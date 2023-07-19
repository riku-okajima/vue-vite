<script setup lang="ts">
import NavLinks from "../molecules/NavLinks.vue";
import SearchBar from "../molecules/SearchBar.vue";

const props = defineProps({
  toggleState: { type: Boolean, required: true },
});
</script>
<template>
  <div id="menu" class="px-4 pb-2 md:hidden" v-show="props.toggleState">
    <div class="flex flex-col gap-5 text-center">
      <NavLinks />
      <div class="block sm:justify-center sm:text-center md:hidden">
        <div class="sm:m-auto sm:w-72">
          <SearchBar class="block text-center sm:flex" />
        </div>
      </div>
    </div>
  </div>
</template>
