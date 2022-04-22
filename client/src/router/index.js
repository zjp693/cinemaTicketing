import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home/index";
import Login from "../views/Login";
import UserManage from "../components/UserManage";
import MovieManage from "../components/MovieManage";
import CinemaManage from "../components/CinemaManage";
import CommentManage from "../components/CommentManage";
import MovieSchedule from "../components/MovieSchedule";
import OrderManage from "../components/OrderManage";
import HallManage from "../components/HallManage";
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
      { path: "movie_manage", component: MovieManage },
      { path: "cinema_manage", component: CinemaManage },
      { path: "hall_manage", component: HallManage },
      { path: "movie_schedule", component: MovieSchedule },
      { path: "comment_manage", component: CommentManage },
      { path: "order_manage", component: OrderManage },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
