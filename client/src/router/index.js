import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../components/home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  // 登录
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
