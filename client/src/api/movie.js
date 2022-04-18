import { requestWithToken } from "@/utils/request";

/**
 *  加载电影列表
 * @param username
 * @param password
 * @returns {AxiosPromise}
 */

export function getMovieList() {
  return requestWithToken("/movie/list", "get");
}