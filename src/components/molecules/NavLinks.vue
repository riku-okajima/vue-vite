<script setup lang="ts">
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

const props = defineProps({
  element: { type: String, required: true, validator: (value: string) => ["header", "tab"].includes(value) },
});
</script>

<template>
  <v-tabs v-if="props.element == 'header'">
    <v-tab v-for="(item, index) in navItems" :key="index" :to="item.link">
      {{ item.name }}
    </v-tab>
  </v-tabs>
  <v-list v-if="props.element == 'tab'" nav dense>
    <v-list-item v-for="item in navItems" :prepend-icon="item.icon" :title="item.name" :to="item.link" />
  </v-list>
</template>
