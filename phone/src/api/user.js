import { requestWithToken } from "@/utils/request";

/**
 *  账号密码登录
 * @param username 账号
 * @param password 密码
 * @returns {AxiosPromise}
 */
export function login({ username, password }) {
  return requestWithToken("/login", "post", { username, password });
}

// 加载电影列表
export function getMovieList() {
  return requestWithToken("/movie/list", "get");
}

