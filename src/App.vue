<script setup lang="ts">
import { Ref, ref, watch } from "vue";
import { RouteRecordName, RouteRecordRaw, Router, useRouter } from "vue-router";
import Layout from "./components/templates/Layout.vue";
import { PAGE_HEADER } from "./constant/const";

const router:Router = useRouter()
const pageTitle: Ref<string|undefined> = ref('')

const updatePageTitle = () => {
  const routeList: readonly RouteRecordRaw[] = router.options.routes
  const targetRouteName:RouteRecordName|undefined = routeList.find(route => route['path'] == router.currentRoute.value.path)?.name
  pageTitle.value = PAGE_HEADER.find(item => item['name'] == targetRouteName)?.title
}
watch(() => router.currentRoute.value.path, () => {updatePageTitle()})

</script>
<template>
  <v-app>
    <v-main>
      <Layout :title='pageTitle'/>
    </v-main>
  </v-app>
</template>