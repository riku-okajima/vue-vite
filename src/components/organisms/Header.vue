<script setup lang="ts">
import { onMounted, onUpdated, reactive, ref } from "vue";
// import NavLink from "../molecules/NavLinks.vue";
// import ToggleButton from "../atoms/ToggleButton.vue";
// import SearchBar from "../molecules/SearchBar.vue";
// import TextLink from "../atoms/TextLink.vue";
// import ToggleMenu from "./ToggleMenu.vue";

interface State {
  toggle: boolean;
}
interface NavItem {
  name: string;
  icon: string;
  link: string;
}
const state: State = reactive({
  toggle: false,
});
const headerIcons: string[] = ["mdi-magnify", "mdi-home", "mdi-dots-vertical"];
const navItems: NavItem[] = [
  {
    name: "Add Presentation",
    icon: "mdi-pencil-plus",
    link: "/create",
  },
  {
    name: "Show Lists",
    icon: "mdi-format-list-bulleted-square",
    link: "/list",
  },
];
const changeToggleState = (): void => {
  state.toggle = !state.toggle;
};
</script>

<template>
  <!-- <nav class="sticky top-0">
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
  </nav> -->

  <v-app-bar color="primary" dark clipped-left>
    <v-app-bar-nav-icon @click.stop="changeToggleState"></v-app-bar-nav-icon>
    <v-toolbar-title>RPC Presentation App</v-toolbar-title>
    <v-tabs>
      <v-tab v-for="(item, index) in navItems" :key="index" :to="item.link">
        {{ item.name }}
      </v-tab>
    </v-tabs>
    <v-btn v-for="(icon, index) in headerIcons" :key="index" :icon="icon" variant="text" />
  </v-app-bar>
  <v-navigation-drawer v-model="state.toggle" clipped temporary>
    <v-container>
      <v-list-item>
        <v-list-item-title class="title">MENU</v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item v-for="item in navItems" :prepend-icon="item.icon" :title="item.name" :to="item.link" />
      </v-list>
    </v-container>
  </v-navigation-drawer>
</template>
