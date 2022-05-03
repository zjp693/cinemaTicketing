import { requestWithToken } from "@/utils/request";

/**
 *  获取订单列表信息
 * @returns {AxiosPromise}
 */
export function getAdminOrder() {
  return requestWithToken("/getAdminOrder", "get");
}
/**
 *  搜索订单列表信息
 * @returns {AxiosPromise}
 */
export function getAdminSearchOrder(searchInput) {
  return requestWithToken("/getAdminSearchOrder", "get", { searchInput });
}
/**
 *  删除订单
 * @returns {AxiosPromise}
 */
export function getAdminDelOrder(order_id) {
  return requestWithToken("/getAdminDelOrder", "post", { order_id });
}
