// main.ts
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";
//配置字体图标
import "@/common/css/style.css";
// 媒体查询
import "@/assets/css/adapter.css";
import "@/assets/css/reset.css";
//引入vant
import Vant from "vant";
// 引入 element
import ElementPlus from "element-plus";
import { Icon } from "vant";
// 在入口文件中（main.js），导入组件库
import vueHashCalendar from "vue3-hash-calendar";
// 引入组件CSS样式
import "vue3-hash-calendar/lib/style.css";
import "vant/lib/index.css";
import "element-plus/dist/index.css";
import "default-passive-events";

const app = createApp(App);
app
  .use(router)
  .use(store)
  .use(Vant)
  .use(ElementPlus)
  .use(Icon)
  .use(vueHashCalendar)
  .mount("#app");
