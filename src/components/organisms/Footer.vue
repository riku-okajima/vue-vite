<script setup lang="ts">
const footerIcons: Array<string> = ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"];
</script>

<template>
  <v-footer color="primary" class="block" dark app>
    <div class="d-flex w-100 align-center px-4">
      <strong>Copyright(C) {{ new Date().getFullYear() }} RPC-ltd. All rights reserved.</strong>
      <v-spacer></v-spacer>
      <v-btn v-for="(icon, index) in footerIcons" :key="index" class="mx-4" :icon="icon" variant="plain" size="small"></v-btn>
    </div>
  </v-footer>
</template>
