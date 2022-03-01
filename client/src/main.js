// main.ts
import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as Icons from "@element-plus/icons";
import App from "./App.vue";
import router from "./router";
import store from "./store";
const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.use(store);
// 注册Icons 全局组件
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key]);
});
app.mount("#app");
