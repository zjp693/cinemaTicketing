import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home/index";

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
    component: () => import("../views/Login"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
