import { createRouter, createWebHistory } from "vue-router";
import Create from "../pages/Create.vue";
import Delete from "../pages/Delete.vue";
import Detail from "../pages/Detail.vue";
import List from "../pages/List.vue";
import Update from "../pages/Update.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/create",
    },
    {
      path: "/create",
      name: "Create",
      component: Create,
    },
    {
      path: "/delete",
      name: "Delete",
      component: Delete,
    },
    {
      path: "/detail",
      name: "Detail",
      component: Detail,
    },
    {
      path: "/list",
      name: "List",
      component: List,
    },
    {
      path: "/update",
      name: "Update",
      component: Update,
    },
  ],
});

export default router;
