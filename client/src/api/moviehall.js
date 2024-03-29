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

/**
 *  删除影厅
 * @returns {AxiosPromise}
 */
export function getAdminDelMovieHall(hall_id) {
  return requestWithToken("/cinema/getAdminDelMovieHall", "post", { hall_id });
}
/**
 *  编辑影厅
 * @returns {AxiosPromise}
 */
export function getAdminEditHall(info) {
  return requestWithToken("/cinema/getAdminEditHall", "post", info);
}
/**
 *  返回指定影院影厅
 * @returns {AxiosPromise}
 */
export function getAdminIDCinema(cinema_id) {
  return requestWithToken("/cinema/getAdminIDCinema", "get", { cinema_id });
}
