<script setup lang="ts">
import { NAV_ITEMS } from '../../constant/const'

const props = defineProps({
  element: { type: String, required: true, validator: (value: string) => ["header", "tab"].includes(value) },
});
</script>

<template>
  <v-tabs v-if="props.element == 'header'">
    <v-tab v-for="(item, index) in NAV_ITEMS" :key="index" :to="item.link">
      {{ item.name }}
    </v-tab>
  </v-tabs>
  <v-list v-if="props.element == 'tab'" nav dense>
    <v-list-item v-for="item in NAV_ITEMS" :prepend-icon="item.icon" :title="item.name" :to="item.link" />
  </v-list>
</template>
