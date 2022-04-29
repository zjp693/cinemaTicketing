import { requestWithToken } from "@/utils/request";

/**
 *  加载电影列表信息
 * @returns {AxiosPromise}
 */

export function getAdminMovieList() {
  return requestWithToken("/movie/getAdminMovieList", "get");
}

/**
 *  搜索电影
 * @returns {AxiosPromise}
 */

export function getAdminSearchMovie(searchInput) {
  return requestWithToken("/movie/getAdminSearchMovie", "get", { searchInput });
}
/**
 *  添加电影
 * @returns {AxiosPromise}
 */

export function getAdminDeleteMovie(movie_id) {
  console.log(movie_id);
  return requestWithToken("/movie/getAdminDeleteMovie", "post", { movie_id });
}
/**
 *  添加电影
 * @returns {AxiosPromise}
 */

export function getAdminAddMovie(info) {
  return requestWithToken("/movie/getAdminAddMovie", "post", info);
}

/**
 *  上传图片
 * @returns {AxiosPromise}
 */

export function getAdminUpLoadImg(info) {
  return requestWithToken("/movie/getAdminUpLoadImg", "post", info);
}
