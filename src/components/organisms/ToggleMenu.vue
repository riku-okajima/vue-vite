<script setup lang="ts">
import NavLinks from "../molecules/NavLinks.vue";
import { useToggle } from "../../lib/useToggle";

const props = defineProps({
  toggleState: { type: Boolean, required: true },
});
</script>
<template>
  <v-navigation-drawer :model-value="props.toggleState" clipped temporary>
    <v-container>
      <v-list-item>
        <v-list-item-title class="title">MENU</v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <NavLinks :element="'tab'" />
    </v-container>
  </v-navigation-drawer>
</template>
