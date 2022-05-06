import { requestWithToken } from "@/utils/request";

/**
 *  // 加载电影列表
 * @param username 账号
 * @param password 密码
 * @returns {AxiosPromise}
 */

export function getMovieList() {
  return requestWithToken("/movie/list", "get");
}
