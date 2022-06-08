<template>
  <div id="submit-order">
    <div class="top">
      <span class="icon-back" @click="backSeatInfo"></span>
      <span class="name ellipsis">确认订单</span>
      <div class="time-down">
        <span class="icon-time"></span
        ><span class="time">{{ countdownM }}:{{ countdownS }}</span>
      </div>
    </div>
    <div class="order-info">
      <div class="info movie-name">{{ movieInfo.name }}</div>
      <div class="info date">
        <span class="day">{{ scheduleInfo.show_date }}</span
        ><span class="time">{{ scheduleInfo.show_time }}</span
        ><span class="language">{{ movieInfo.language }}3D</span>
      </div>
      <div class="info cinema">{{ cinemaInfo.cinema_name }}</div>
      <div class="info location">
        <span class="hall">{{ scheduleInfo.hall_name }}</span>
        <span class="seat" v-if="seat_1">{{
          formatSeatInfo(Number(seat_1))
        }}</span>
        <span class="seat" v-if="seat_2">{{
          formatSeatInfo(Number(seat_2))
        }}</span>
        <span class="seat" v-if="seat_3">{{
          formatSeatInfo(Number(seat_3))
        }}</span>
        <span class="seat" v-if="seat_4">{{
          formatSeatInfo(Number(seat_4))
        }}</span>
      </div>
    </div>
    <div class="content">
      <div class="tips">
        <p class="title">购票须知</p>
        <div class="intro">
          <p>1.请确认场次和时间无误，购买成功后将不予以退还</p>
          <p>
            2.由于设备故障等不可抗力因素，存在少量场次取消的情况，会进行退票退款
          </p>
          <p>3.由于影院系统不稳定等因素，存在出票失败的情况，会进行退款</p>
          <p>4.购票成功后，会收到取票码</p>
          <p>5.下单即代表你同意我们的用户服务协议</p>
        </div>
      </div>
      <div class="phone-container">
        <div class="phone">
          <label>手机号</label>
          <el-input v-model="phone" clearable> </el-input>
        </div>
        <div class="text">
          提示：手机号用于生成订单，并以短信方式将取票码发送到手机上
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="intro">
        <div class="text">不支持退票、改签</div>
        <div class="total">
          应支付<span class="money">{{
            Number(scheduleInfo.price) * Number(seats).toFixed(2)
          }}</span
          ><span>元</span>
        </div>
      </div>
      <div class="submit-btn" @click="handleSubmitOrder">提交订单</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getCurrentCinemaDetail, getScheduleById } from "@/api/cinema";
import { getMovieDetail } from "@/api/movie";
import { getSfyUserInfo } from "@/api/user";
// 影院信息;
const cinemaInfo = ref({});
//电影信息
const movieInfo = ref({});
//电影排片信息
const scheduleInfo = ref({});
// const seatInfo = ref("");
//手机号
const phone = ref("");
//时间 分
const countdownM = ref(14);
//时间 秒
const countdownS = ref(59);
const route = useRoute();
const router = useRouter();
//返回上一页
const backSeatInfo = () => {
  router.go(-1);
};
//购买的座位数
const seats = sessionStorage.getItem("seat_count");
console.log(router);
const seat_1 = ref(sessionStorage.getItem("seat_1"));
const seat_2 = ref(sessionStorage.getItem("seat_2"));
const seat_3 = ref(sessionStorage.getItem("seat_3"));
const seat_4 = ref(sessionStorage.getItem("seat_4"));
//定时器 倒计时15分钟订单自动取消
let timer = setInterval(() => {
  countdownS.value = Number(countdownS.value);
  countdownS.value = Number(countdownS.value);
  if (countdownS.value == 0) {
    if (countdownM.value !== 0) {
      countdownM.value -= 1;
      countdownS.value = 59;
    } else {
      clearInterval(timer);
      // loadInfo();
    }
  } else {
    countdownS.value -= 1;
  }
}, 1000);
//订票信息
let loadInfo = async () => {
  if (
    route.query.cinema_id &&
    route.query.movie_id &&
    route.query.schedule_id &&
    sessionStorage.getItem("user_id")
  ) {
    //影院信息
    await getCurrentCinemaDetail(route.query.cinema_id).then((res) => {
      if (res.status == 200) {
        cinemaInfo.value = res.data[0];
      }
    });
    //电影信息
    await getMovieDetail(route.query.movie_id).then((res) => {
      if (res.status == 200) {
        movieInfo.value = res.data[0];
      }
    });
    //电影放映时间信息
    await getScheduleById(route.query.schedule_id).then((res) => {
      if (res.status == 200) {
        scheduleInfo.value = res.data[0];
        console.log(scheduleInfo.value);
      }
    });
    //用户信息
    await getSfyUserInfo(sessionStorage.getItem("user_id")).then((res) => {
      console.log(res);
      if (res.status == 200) {
        phone.value = res.data[0].phone;
      }
    });
  }
};
//座位信息
const formatSeatInfo = (seatNum) => {
  if (seatNum % 10 === 0) {
    return seatNum / 10 + "排" + 10 + "座";
  } else {
    return parseInt(seatNum / 10) + 1 + "排" + (seatNum % 10) + "座";
  }
};
//时间年月日的转化
// const dateFilter = computed(() => {
//   let date = scheduleInfo.value.show_date + "";
//   // console.log(date);
//   return (
//     date.split("-")[0] +
//     "年" +
//     date.split("-")[1] +
//     "月" +
//     date.split("-")[2] +
//     "日"
//   );
// });
// console.log(dateFilter);
loadInfo();
</script>

<style lang="scss" scoped>
#submit-order {
  width: 100%;
  height: 100%;
  color: #000;
  font-size: 0.3125rem;
  overflow: hidden;
  .top {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #779db0;
    color: #fff;
    .icon-back {
      font-size: 0.4rem;
      position: absolute;
      left: 0.3rem;
    }
    .name {
      width: 60%;
      text-align: center;
      font-size: 0.375rem;
    }
    .time-down {
      position: absolute;
      right: 0.3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon-time {
        font-size: 0.4rem;
        margin-right: 0.08rem;
      }
    }
  }
  .order-info {
    margin-top: 1rem;
    background-color: #779db0;
    color: #fff;
    padding: 0.3rem;
    height: 2rem;
    .info {
      margin-bottom: 0.25rem;
      font-size: 0.28rem;
      span {
        margin-right: 0.12rem;
      }
    }
    .movie-name {
      font-size: 0.375rem;
      font-weight: 700;
    }
  }
  .content {
    background-color: #f1f1f1;
    width: 100%;
    position: fixed;
    top: 3.6rem;
    left: 0;
    bottom: 0;
    .phone-container {
      background-color: #fff;
      display: flex;
      flex-flow: column;
      margin-top: 0.12rem;
      .phone {
        width: 100%;
        box-sizing: border-box;
        height: 1rem;
        line-height: 1rem;
        display: flex;
        border-bottom: 0.02rem solid #f1f1f1;
        label {
          width: 20%;
          color: #333;
          font-size: 0.3rem;
          height: 1rem;
          display: flex;
          box-sizing: border-box;
          margin-left: 0.3rem;
        }
        .el-input {
          vertical-align: middle;
          width: 80%;
          font-size: 0.375rem;
          .el-input__inner {
            border: none;
            outline: none;
            padding: 0;
            letter-spacing: 0.02rem;
          }
        }
      }
      .text {
        color: #dd2727;
        font-size: 0.25rem;
        line-height: 0.4rem;
        padding: 0.25rem 0.3rem;
        letter-spacing: 0.02rem;
      }
    }
    .tips {
      display: flex;
      flex-flow: column;
      background-color: #fff;
      padding: 0.3rem;
      p {
        margin-bottom: 0.12rem;
        font-size: 0.25rem;
        color: #888;
        line-height: 0.4rem;
        letter-spacing: 0.02rem;
        text-align: justify;
      }
      .title {
        color: #333;
        font-size: 0.3125rem;
        font-weight: 700;
        padding-bottom: 0.25rem;
        border-bottom: 0.02rem solid #f1f1f1;
      }
    }
  }
  .bottom {
    border-top: 0.02rem solid #f1f1f1;
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    padding: 0.25rem;
    box-sizing: border-box;
    z-index: 999;
    background-color: #fff;
    .intro {
      width: 100%;
      margin-bottom: 0.25rem;
      display: flex;
      justify-content: space-between;
      font-size: 0.28rem;
      padding: 0.12rem 0;
      .text {
        color: #ffb400;
      }
      .total {
        color: #888;
        .money {
          font-size: 0.3125rem;
          color: #dd2727;
          margin-left: 0.12rem;
        }
        span {
          color: #dd2727;
          font-size: 0.2rem;
          margin-left: 0.12rem;
        }
      }
    }
    .submit-btn {
      width: 100%;
      background-color: #fe9900;
      color: #fff;
      height: 0.8rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0.12rem;
      font-size: 0.28rem;
    }
  }
}
</style>
