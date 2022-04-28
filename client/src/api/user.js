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
  return requestWithToken("/users/getSearchUser", "get", { searchInput });
}

/**
 * 添加用户
 * @param user_name 用户名
 * @param avatar 头像
 * @param phone 手机号
 * @param password 密码
 * @param sex 性别
 * @param sign 个性签名
 * @param birthday 生日
 * @returns {AxiosPromise}
 */
export function getAddUser(userInfo) {
  return requestWithToken("/users/getAddUser", "post", {
    userInfo,
  });
}

/**
 * 上传图片
 * @param formData 图片参数
 * @returns {AxiosPromise}
 */
export function getUpLoadImg(form) {
  return requestWithToken("/users/getUpLoadImg", "post", form);
}

/**
 * 编辑用户
 * @param userInfo
 * @returns {AxiosPromise}
 */
export function getEditUser(userInfo) {
  return requestWithToken("/users/getEditUser", "post", userInfo);
}

/**
 *
 *注销用户
 * @param user_id 用户id
 * @returns {AxiosPromise}
 */
export function getDeleteUser(user_id) {
  return requestWithToken("/users/getDeleteUser", "post", { user_id });
}
