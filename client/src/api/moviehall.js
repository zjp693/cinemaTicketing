import { requestWithToken } from "@/utils/request";

/**
 *  获取影厅列表信息
 * @returns {AxiosPromise}
 */ export function getAdminMovieHallList() {
  return requestWithToken("/cinema/getAdminMovieHallList", "get");
}
/**
 *  搜索影厅列表
 * @returns {AxiosPromise} getAdminSearchMovieHall
 */ export function getAdminSearchMovieHall(searchInput) {
  return requestWithToken("/cinema/getAdminSearchMovieHall", "get", {
    searchInput,
  });
}
