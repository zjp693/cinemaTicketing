// main.ts
import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as Icons from "@element-plus/icons";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//配置字体图标
import "@/assets/common/css/style.css";

const app = createApp(App);

app.use(ElementPlus, {
  locale: zhCn,
});
app.use(ElementPlus);
app.use(router);
app.use(store);

// 注册Icons 全局组件
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key]);
});
app.mount("#app");
