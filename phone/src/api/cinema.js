import { requestWithToken } from "@/utils/request";

/**
 *  影院列表
 * @returns {AxiosPromise}
 */

export function getCinemaList() {
  return requestWithToken("/cinema/getCinemaList", "get");
}
