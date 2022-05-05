import { requestWithToken } from "@/utils/request";

/**
 *  加载电影排片列表
 * @returns {AxiosPromise}
 */

export function getAdminArrangementList() {
  return requestWithToken("/arrangement/getAdminArrangementList", "get");
}
/**
 *  搜索电影排片信息
 * @returns {AxiosPromise}
 */

export function getAdminSearchArrangemen(searchInput) {
  return requestWithToken("/arrangement/getAdminSearchArrangemen", "get", {
    searchInput,
  });
}
/**
 *  删除电影排片信息
 * @returns {AxiosPromise}
 */

export function getAdminDelArrangemen(schedule_id) {
  return requestWithToken("/arrangement/getAdminDelArrangemen", "post", {
    schedule_id,
  });
}
/**
 *  获取电影名称
 * @returns {AxiosPromise}
 */

export function getAdminMovieName() {
  return requestWithToken("/movie/getAdminMovieName", "get");
}
/**
 *  获取电影名称
 * @returns {AxiosPromise}
 */

export function getAdminAddArrangemen(info) {
  return requestWithToken("/arrangement/getAdminAddArrangemen", "post", info);
}
