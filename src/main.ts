import { createApp } from "vue";
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";
import "./index.css";
import App from "./App.vue";
import router from "./router";

// 状態管理ライブラリ
const pinia = createPinia();
// 永続化ライブラリ
pinia.use(createPersistedState());

createApp(App).use(router).use(pinia).mount("#app");
