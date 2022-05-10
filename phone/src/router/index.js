import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home/index";
// import TabBar from "../components/TabBar/TabBar";
import Cinema from "../views/Cinema/index";
import My from "../views/My/index";
import Movie from "../views/Movie/index";

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: { showTabBar: true },
  },
  {
    path: "/cinema",
    name: "cinema",
    component: Cinema,
    meta: { showTabBar: true },
  },
  {
    path: "/my",
    name: "my",
    component: My,
    meta: { showTabBar: true },
  },
  {
    path: "/movie",
    name: "movie",
    component: Movie,
    meta: { showTabBar: true },
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
