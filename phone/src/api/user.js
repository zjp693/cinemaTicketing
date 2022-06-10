import { requestWithToken } from "@/utils/request";

/**
 *  获取手机验证码
 * @returns {AxiosPromise}
 */
export function getPhoneCode(phone) {
  return requestWithToken("/users/getPhoneCode", "get", { phone });
}
/**
 *  图形验证码
 * @returns {AxiosPromise}
 */
export function getCaptchaSrc() {
  return requestWithToken("/users/getcaptcha", "get");
}

/**
 *  账号密码登录
 * @param username 账号
 * @param password 密码
 * @returns {AxiosPromise}
 */
export function accountLogin(username, password, captcha) {
  console.log(username, password, captcha);
  return requestWithToken("/users/login", "post", {
    username,
    password,
    captcha,
  });
}
/**
 *  手机号码登录
 * @param phone 手机号码
 * @returns {AxiosPromise}
 */
export function phoneLogin(phone, phoneCode) {
  return requestWithToken("/users/phoneLogin", "post", { phone, phoneCode });
}
/**
 *  获取用户信息
 * @returns {AxiosPromise}
 */
export function getSfyUserInfo(user_id) {
  return requestWithToken("/users/getSfyUserInfo", "get", {
    user_id,
  });
}
/**
 *  用户上传图片
 * @returns {AxiosPromise}
 */
export function getUserUpLoadImg(info) {
  return requestWithToken("/users/getUserUpLoadImg", "post", info);
}

/**
 *  修改用户头像
 * @returns {AxiosPromise}
 */
export function updateUserAvatar(user_id, userNweAvatar) {
  return requestWithToken("/users/updateUserAvatar", "post", {
    user_id,
    userNweAvatar,
  });
}

/**
 * 修改用户昵称
 * @param user_id
 * @param userNweAvatar
 * @returns {AxiosPromise}
 */
export function updateUserName(user_id, userName) {
  return requestWithToken("/users/updateUserName", "post", {
    user_id,
    userName,
  });
}

/**
 * 修改用户性别
 * @param user_id
 * @param sex
 * @returns {AxiosPromise}
 */
export function getUpdateUserSex(user_id, sex) {
  return requestWithToken("/users/updateUserSex", "post", {
    user_id,
    sex,
  });
}

/**
 *  修改用户生日
 * @param user_id
 * @param sex
 * @returns {AxiosPromise}
 */
export function updateUserBirthday(user_id, birthday) {
  return requestWithToken("/users/updateUserBirthday", "post", {
    user_id,
    birthday,
  });
}

/**
 * 修改个性签名
 * @param user_id
 * @param sign
 * @returns {AxiosPromise}
 */
export function updateUserSign(user_id, sign) {
  return requestWithToken("/users/updateUserSign", "post", {
    user_id,
    sign,
  });
}
