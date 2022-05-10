import { requestWithToken } from "@/utils/request";

/**
 *  影院列表
 * @returns {AxiosPromise}
 */

export function getCinemaList() {
  return requestWithToken("/cinema/getCinemaList", "get");
}
/**
 * 根据名字匹配影院
 */
export function getmatchCinemaByName(name) {
  return requestWithToken("/cinema/getmatchCinemaByName", "get", { name });
}
