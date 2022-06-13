import { requestWithToken } from "@/utils/request";

/**
 *  // 加载电影列表
 * @param username 账号
 * @param password 密码
 * @returns {AxiosPromise}
 */

export function getMovieList() {
  return requestWithToken("/movie/getMovieList", "get");
}
/**
 * 根据名字匹配电影
 */
export function getmatchMovieByName(name) {
  return requestWithToken("/movie/getmatchMovieByName", "get", { name });
}
/**
 * 加载电影详情
 */
export function getMovieDetail(movie_id) {
  return requestWithToken("/movie/getMovieDetail", "get", { movie_id });
}
/**
 * 是否想看电影
 */
export function getisWishMovie(user_id, movie_id) {
  return requestWithToken("/movie/getisWishMovie", "get", {
    user_id,
    movie_id,
  });
}
/**
 * 加载当前电影排片
 */
export function getCurrentCinemaMovieSchedule(movie_id) {
  return requestWithToken(
    "/movie/getCurrentCinemaMovieSchedule",
    "get",
    movie_id
  );
}

/**
 * 获取当前用户想看的电影
 * @param movie_id
 * @returns {AxiosPromise}
 */
export function getWishMovieByUserId(user_id) {
  return requestWithToken("/movie/getWishMovieByUserId", "get", { user_id });
}

/**
 * 获取当前用户看过的电影
 * @param user_id
 * @returns {AxiosPromise}
 */
export function getIsWatchedMovieByUserId(user_id) {
  return requestWithToken("/movie/getIsWatchedMovieByUserId", "get", {
    user_id,
  });
}
