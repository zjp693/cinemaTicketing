<template>
  <div id="pay">
    <div class="top">
      <span class="icon-back" @click="back"></span>
      <span class="name ellipsis">支付订单</span>
    </div>
    <div class="order-info">
      <div class="time-down">
        <div class="title">支付剩余时间</div>
        <div class="time">
          <div class="minute">
            <span>{{ countdown_m_b }}</span
            ><span>{{ countdown_m_s }}</span>
          </div>
          <p>:</p>
          <div class="second">
            <span>{{ countdown_s_b }}</span
            ><span>{{ countdown_s_s }}</span>
          </div>
        </div>
      </div>
      <div class="order-num">
        <span class="left icon-shop"></span>
        <div class="right">
          <div class="total">¥{{ total_price.toFixed(2) }}</div>
          <div class="num">订单编号：{{ order_num }}</div>
        </div>
      </div>
    </div>
    <div class="pay-type">
      <div class="wechat type">
        <span class="icon icon-wechat"></span>
        <p>微信支付</p>
        <span
          :class="[
            { 'icon-circle-selected-fill': selectPayType },
            { 'icon-circle-unselect': !selectPayType },
          ]"
          @click="
            selectPayType ? selectPayType : (selectPayType = !selectPayType)
          "
        ></span>
      </div>
      <div class="alipay type">
        <span class="icon icon-alipay"></span>
        <p>支付宝</p>
        <span
          :class="[
            { 'icon-circle-selected-fill': !selectPayType },
            { 'icon-circle-unselect': selectPayType },
          ]"
          @click="
            !selectPayType ? selectPayType : (selectPayType = !selectPayType)
          "
        ></span>
      </div>
    </div>
    <div class="bottom">
      <div class="pay-btn" @click="handlePay">确认支付</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { getScheduleById } from "@/api/cinema";
import { Dialog } from "vant";
const scheduleInfo = ref([]);
const seatInfo = ref([]);

const countdown_m_b = ref("");
const countdown_m_s = ref("");
const countdown_s_b = ref("");
const countdown_s_s = ref("");
const selectPayType = ref(true); //微信
// const timer = ref("");
const total_price = ref(0); //价格
const order_num = ref(0); //数量
total_price.value = JSON.parse(sessionStorage.getItem("total_price"));
order_num.value = JSON.parse(sessionStorage.getItem("order_num"));
const route = useRoute();
//加载初始化数据
const loadInfo = async () => {
  await getScheduleById(route.query.schedule_id).then((res) => {
    scheduleInfo.value = res.data;
    console.log(res.data);
    seatInfo.value = scheduleInfo.value.seat_info;
    if (seatInfo.value) {
      seatInfo.value = JSON.parse(seatInfo.value);
    }
    console.log(scheduleInfo.value);
  });
};
loadInfo();
</script>

<style lang="scss" scoped>
#pay {
  width: 100%;
  height: 100%;
  color: #000;
  font-size: 0.3125rem;
  .top {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #dd2727;
    color: #fff;
    .icon-back {
      font-size: 0.4rem;
      position: absolute;
      left: 0.3rem;
    }
    .name {
      width: 60%;
      font-size: 0.345rem;
      text-align: center;
    }
  }
  .order-info {
    margin-top: 1rem;
    height: 3rem;
    border-bottom: 0.04rem dashed #f1f1f1;
    .time-down {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-flow: column;
      padding-bottom: 0.25rem;
      border-bottom: 0.04rem dashed #ccc;
      margin: 0 0.25rem;
      .title {
        padding: 0.2rem 0;
        font-size: 0.28rem;
      }
      .time {
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          font-size: 0.25rem;
          display: inline-block;
          text-align: center;
          line-height: 0.36rem;
          width: 0.36rem;
          height: 0.36rem;
          background-color: #333;
          color: #fff;
          &:first-child {
            margin-right: 0.12rem;
          }
        }
        p {
          padding: 0 0.12rem;
        }
      }
    }
    .order-num {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 0.4rem;
      position: relative;
      .left {
        font-size: 1rem;
        position: absolute;
        left: 0.8rem;
        top: 0.4rem;
      }
      .right {
        position: absolute;
        left: 2.2rem;
        top: 0.4rem;
        display: flex;
        flex-flow: column;
        .total {
          font-size: 0.46rem;
          margin-bottom: 0.21rem;
        }
        .num {
          font-size: 0.28rem;
          letter-spacing: 0.02rem;
        }
      }
    }
  }
  .pay-type {
    border-top: 0.2rem solid #f1f1f1;
    position: fixed;
    width: 100%;
    left: 0;
    top: 4rem;
    bottom: 0;
    background-color: #f1f1f1;
    .type {
      padding: 0.25rem 0.3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      border-bottom: 0.04rem solid #f1f1f1;
      background-color: #fff;
      span {
        font-size: 0.6rem;
      }
      p {
        position: absolute;
        left: 1.2rem;
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
    .pay-btn {
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
