// main.ts
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";
//配置字体图标
import "@/common/css/style.css";
//引入vant
import Vant from "vant";
import { Icon } from "vant";
import "vant/lib/index.css";
const app = createApp(App);
app.use(router).use(store).use(Vant).use(Icon).mount("#app");
