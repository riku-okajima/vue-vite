<script setup lang="ts">
import { onMounted, onUpdated, reactive, ref } from "vue";
import ToggleButton from "../atoms/ToggleButton.vue";
import Drawer from "./Drawer.vue";
import { useToggle } from "../../composable/useToggle";
import ToggleMenu from "./ToggleMenu.vue";
import NavLinks from "../molecules/NavLinks.vue";
import Icons from "../molecules/Icons.vue";

const { toggleState, changeToggleState } = useToggle();

const headerIcons: string[] = ["mdi-magnify", "mdi-home", "mdi-dots-vertical"];
</script>

<template>
  <v-app-bar color="primary" dark clipped-left>
    <ToggleButton v-on:clickToggle="changeToggleState" />
    <v-toolbar-title>RPC Presentation App</v-toolbar-title>
    <NavLinks :element="'header'" />
    <div class="hidden sm:flex">
      <Icons :icons="headerIcons" />
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
../../composable/useToggle
