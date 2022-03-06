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

// 加载用户列表
export function getCurrentPageUser({ input, currentPage, pageSize }) {
  console.log(input, currentPage, pageSize);
  return requestWithToken("/users/getCurrentPageUser", "get", {
    input,
    currentPage,
    pageSize,
  });
}
