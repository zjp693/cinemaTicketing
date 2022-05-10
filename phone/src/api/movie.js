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
