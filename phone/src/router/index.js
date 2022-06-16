import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home/index";
// import TabBar from "../components/TabBar/TabBar";
import Cinema from "../views/Cinema/index";
import My from "../views/My/index";
import Movie from "../views/Movie/index";
import SearchAll from "../views/Home/children/search_all.vue";
import CinemaDetail from "../components/CinemaDetail/CinemaDetail.vue";
import MovieDetail from "../components/MovieDetail/MovieDetail.vue";
// import SelectCinema from ".././views/Cinema/children/SearchCinema.vue";
import SelectCinema from "../views/Cinema/children/SearchCinema.vue";
import SearchMovie from "../views/Movie/children/SearchMovie.vue";
import selectCinema from "../components/SelectCinema/SelectCinema.vue";
import selectSeat from "../components/SelectSeat/SelectSeat.vue";
import submitOrder from "../components/SubmitOrder/SubmitOrder";
import pay from "../components/Pay/pay";
import myInfo from "../views/My/children/my_info";
import modify_username from "../views/My/children/ModifyUserName";
import modify_usersign from "../views/My/children/modify_usersign";
import my_order from "../views/My/children/MyOrder";
import my_movie from "../views/My/children/MyMovie";
import comment_panel from "../components/MovieDetail/children/CommentPanel";
const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  // 主页
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: { showTabBar: true },
  },
  // 影院
  {
    path: "/cinema",
    name: "cinema",
    component: Cinema,
    meta: { showTabBar: true },
  },
  // 我的
  {
    path: "/my",
    name: "my",
    component: My,
    meta: { showTabBar: true },
  },
  // 电影
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
  // 搜索
  {
    path: "/search_all",
    component: SearchAll,
  },
  // 电影详情
  {
    path: "/movie_detail",
    component: MovieDetail,
  },
  // 影院详情
  {
    path: "/Cinema_detail",
    component: CinemaDetail,
  },
  // 搜索影院
  {
    path: "/search_cinema",
    component: SelectCinema,
  },
  //搜索电影
  {
    path: "/search_movie",
    component: SearchMovie,
  },
  //选择影院
  {
    path: "/select_cinema",
    component: selectCinema,
  },
  // 选座
  {
    path: "/select_seat",
    component: selectSeat,
  },
  //提交订单
  {
    path: "/submit_order",
    component: submitOrder,
  },
  // 支付订单
  {
    path: "/pay",
    component: pay,
  },
  // 个人信息
  {
    path: "/my_info",
    component: myInfo,
  },
  //个人昵称
  {
    path: "/modify_username",
    name: "modify_username",
    component: modify_username,
  },
  //  个性签名
  {
    path: "/modify_usersign",
    name: "modify_usersign",
    component: modify_usersign,
  },
  //  我的订单
  {
    path: "/my_order",
    name: "my_order",
    component: my_order,
  },
  //  想看电影
  {
    path: "/my_movie",
    name: "my_movie",
    component: my_movie,
  },
  //电影评论
  {
    path: "/comment_panel",
    name: "comment_panel",
    component: comment_panel,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
