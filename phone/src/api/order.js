import { requestWithToken } from "@/utils/request";

/**
 * 用户下单
 * @param userId  用户id
 * @param scheduleId 电影id
 * @param orderPhone 订单id
 * @param orderDate 订单信息
 * @param ticketNum 买的票数
 * @param totalPrice 总价
 * @param orderSeatInfo
 * @param payType 支付状态
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
