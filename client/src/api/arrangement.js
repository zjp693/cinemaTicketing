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
