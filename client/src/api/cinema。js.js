import { requestWithToken } from "@/utils/request";

/**
 *  获取影院列表信息
 * @returns {AxiosPromise}
 */ export function getAdminCinemaList() {
  return requestWithToken("/cinema/getAdminCinemaList", "get");
}
/**
 *  搜索影院信息
 * @returns {AxiosPromise}
 */
export function getAdminSearchCinema(searchInput) {
  return requestWithToken("/cinema/getAdminSearchCinema", "get", {
    searchInput,
  });
}
/**
 *  添加影院信息
 * @returns {AxiosPromise}
 */
export function getAdminAddCinema(info) {
  return requestWithToken("/cinema/getAdminAddCinema", "post", info);
}
