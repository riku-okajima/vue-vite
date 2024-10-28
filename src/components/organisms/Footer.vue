<script setup lang="ts">
import Icons from "../molecules/Icons.vue";
import { FOOTER_ICONS } from "../../constant/const";
</script>

<template>
  <v-footer color="primary" class="block" dark app absolute>
    <div class="block w-100 align-center md:px-4 md:flex text-center">
      <strong>Copyright(C) {{ new Date().getFullYear() }} RPC-ltd. All rights reserved.</strong>
      <v-spacer></v-spacer>
      <Icons :icons="FOOTER_ICONS" />
    </div>
  </v-footer>
</template>
