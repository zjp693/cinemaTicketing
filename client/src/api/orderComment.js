import { requestWithToken } from "@/utils/request";

/**
 *  获取订单列表信息
 * @returns {AxiosPromise}
 */
export function getAdminOrder() {
  return requestWithToken("/getAdminOrder", "get");
}
