<script setup lang="ts">
import { useToggle } from "../../composable/useToggle";

interface NavItem {
  name: string;
  icon: string;
  link: string;
}
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

const { toggleState } = useToggle();
// const props = defineProps({
//   toggleState: { type: Boolean, required: true },
// });
</script>
<template>
  <v-navigation-drawer v-model="toggleState" clipped temporary>
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
