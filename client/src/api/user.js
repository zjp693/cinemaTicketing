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
/**
 *  获取用户列表
 * @param
 * @param
 * @returns {AxiosPromise}
 */
export function getCurrentPageUser() {
  // console.log(currentPage, pageSize, input);
  return requestWithToken("/users/getCurrentPageUser", "get");
}

/**
 * 搜索用户
 * @param  input 搜索值
 * @returns {AxiosPromise}
 */
export function getSearchUser(searchInput) {
  // console.log(currentPage, pageSize, input);
  return requestWithToken("/users/getSearchUser", "get", { searchInput });
}
