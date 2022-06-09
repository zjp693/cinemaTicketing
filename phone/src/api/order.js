import { requestWithToken } from "@/utils/request";

/**
 *  用户下单
 * @param username 账号
 * @param password 密码
 * @returns {AxiosPromise}
 */

export function getUserOrder(
  userId,
  scheduleId,
  orderPhone,
  orderDate,
  ticketNum,
  totalPrice,
  orderSeatInfo,
  payType
) {
  // console.log(
  //   userId,
  //   scheduleId,
  //   orderPhone,
  //   orderDate,
  //   ticketNum,
  //   totalPrice,
  //   orderSeatInfo,
  //   payType
  // );
  return requestWithToken("/getUserOrder", "post", {
    userId,
    scheduleId,
    orderPhone,
    orderDate,
    ticketNum,
    totalPrice,
    orderSeatInfo,
    payType,
  });
}
