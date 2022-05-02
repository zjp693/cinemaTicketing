import { requestWithToken } from "@/utils/request";

/**
 *  获取影厅列表信息
 * @returns {AxiosPromise}
 */ export function getAdminMovieHallList() {
  return requestWithToken("/cinema/getAdminMovieHallList", "get");
}
