import { requestWithToken } from "@/utils/request";

/**
 *  获取影院影厅列表信息
 * @returns {AxiosPromise}
 */
export function getAdminMovieHallList() {
  return requestWithToken("/cinema/getAdminMovieHallList", "get");
}
/**
 *  搜索影厅列表
 * @returns {AxiosPromise}
 */
export function getAdminSearchMovieHall(searchInput) {
  return requestWithToken("/cinema/getAdminSearchMovieHall", "get", {
    searchInput,
  });
}
/**
 *  添加影厅
 * @returns {AxiosPromise}
 */
export function getAdminAddMovieHall(info) {
  return requestWithToken("/cinema/getAdminAddMovieHall", "post", info);
}
/**
 *  获取影院名称
 * @returns {AxiosPromise}
 */
export function getAdminAllCinema() {
  return requestWithToken("/cinema/getAdminAllCinema", "get");
}
