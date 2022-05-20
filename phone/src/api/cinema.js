import { requestWithToken } from "@/utils/request";

/**
 *  影院列表
 * @returns {AxiosPromise}
 */ getCurrentCinemaDetail;

export function getCinemaList() {
  return requestWithToken("/cinema/getCinemaList", "get");
}
/**
 * 根据名字匹配影院
 */
export function getmatchCinemaByName(name) {
  return requestWithToken("/cinema/getmatchCinemaByName", "get", { name });
}
/**
 *加载影院详情
 */
export function getCurrentCinemaDetail(cinema_id) {
  return requestWithToken("/cinema/getCurrentCinemaDetail", "get", {
    cinema_id,
  });
}
/**
 *加载当前影院排片
 */
export function getCurrentCinemaMovieSchedule(cinema_id) {
  return requestWithToken(
    "/cinema/getCurrentCinemaMovieSchedule",
    "get",
    cinema_id
  );
}
/**
 *加载当前影院排片
 */
export function getScheduleById(schedule_id) {
  return requestWithToken("/cinema/getScheduleById", "get", { schedule_id });
}
/**
 *影院座位信息更新
 */
export function getUpdateScheduleSeat(schedule_id, seat_info) {
  return requestWithToken("/cinema/getUpdateScheduleSeat", "post", {
    schedule_id,
    seat_info,
  });
}
