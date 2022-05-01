import { requestWithToken } from "@/utils/request";

/**
 *  获取影院列表信息
 * @returns {AxiosPromise}
 */ export function getAdminCinemaList() {
  return requestWithToken("/cinema/getAdminCinemaList", "get");
}
/**
 *  获取影院列表信息
 * @returns {AxiosPromise}
 */
export function getAdminSearchCinema(searchInput) {
  return requestWithToken("/cinema/getAdminSearchCinema", "get", {
    searchInput,
  });
}
