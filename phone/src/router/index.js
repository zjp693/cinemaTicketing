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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
