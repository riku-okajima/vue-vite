<script setup lang="ts">
import NavLinks from "../molecules/NavLinks.vue";
import { useToggle } from "../../composable/useToggle";

const { toggleState } = useToggle();
</script>
<template>
  <v-navigation-drawer :model-value="toggleState" clipped temporary>
    <v-container>
      <v-list-item>
        <v-list-item-title class="title">MENU</v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <NavLinks :element="'tab'" />
    </v-container>
  </v-navigation-drawer>
</template>
