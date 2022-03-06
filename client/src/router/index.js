import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home/index";
import Login from "../views/Login";
import UserManage from "../components/UserManage.vue";

const routes = [
  // 登录
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      { path: "/", redirect: "/user_manage" },
      { path: "user_manage", component: UserManage },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
