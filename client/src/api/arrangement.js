import { requestWithToken } from "@/utils/request";

/**
 *  加载评论列表信息
 * @returns {AxiosPromise}
 */

export function getAdminArrangementList() {
  return requestWithToken("/arrangement/getAdminArrangementList", "get");
}
