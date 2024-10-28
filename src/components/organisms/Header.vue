<script setup lang="ts">
import ToggleButton from "../atoms/ToggleButton.vue";
import { useToggle } from "../../composable/useToggle";
import NavLinks from "../molecules/NavLinks.vue";
import Icons from "../molecules/Icons.vue";
import { HEADER_ICONS } from "../../constant/const";

const { toggleState, changeToggleState } = useToggle();

</script>

<template>
  <v-app-bar color="primary" dark clipped-left>
    <ToggleButton v-on:clickToggle="changeToggleState" />
    <v-toolbar-title>RPC Presentation App</v-toolbar-title>
    <NavLinks :element="'header'" />
    <div class="hidden sm:flex">
      <Icons :icons="HEADER_ICONS" />
    </div>
  </v-app-bar>

  <v-navigation-drawer v-model="toggleState" clipped temporary>
    <v-container>
      <v-list-item>
        <v-list-item-title class="title">MENU</v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <NavLinks :element="'tab'" />
    </v-container>
  </v-navigation-drawer>
</template>
