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

// // 定义路由导航守卫

// to代表我要去哪个路由 from代表我来自哪个路由
// next代表 下一步去哪里 如果next()代表方形 如果next('/login')是强制跳转至/login路由
router.beforeEach((to, from, next) => {
  // 获取存在window里的token值 用来判断
  let token = window.sessionStorage.getItem("token");
  // 判断如果准备去的路由的name不是Login登入页面 并且没有授权的时候 强制跳转至name为Login的路由页面
  if (to.name !== "login" && !token)
    next({
      name: "login",
    });
  // 如果满足通过条件(去往login页面之外的路由 并且授权过) 则放行
  else next();
});

export default router;
