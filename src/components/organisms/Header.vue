<script setup lang="ts">
import { onMounted, onUpdated, reactive, ref } from "vue";
import NavLink from "../molecules/NavLinks.vue";
import ToggleButton from "../atoms/ToggleButton.vue";
import SearchBar from "../molecules/SearchBar.vue";
import TextLink from "../atoms/TextLink.vue";
import ToggleMenu from "./ToggleMenu.vue";

interface State {
  toggle: boolean;
}

const state: State = reactive({
  toggle: false,
});

const changeToggleState = (): void => {
  state.toggle = !state.toggle;
};
</script>

<template>
  <nav class="sticky top-0">
    <div class="bg-gray-light">
      <div class="mx-auto px-4">
        <div class="flex h-14 items-center justify-between">
          <div class="flex items-center lg:px-0 w-full">
            <TextLink class="flex items-center text-lg font-normal text-black" to="#" message="RPC Presentation App" />
            <div class="hidden md:flex flex-1">
              <div class="flex gap-4 items-center flex-1 justify-around">
                <NavLink />
                <div class="hidden md:flex">
                  <SearchBar class="flex" />
                </div>
              </div>
            </div>
          </div>
          <ToggleButton v-on:clickToggle="changeToggleState" />
        </div>
      </div>
      <ToggleMenu :toggleState="state.toggle" />
    </div>
  </nav>
</template>
