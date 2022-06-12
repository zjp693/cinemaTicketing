<template>
  <div id="my-order">
    <div class="top">
      <span class="icon-back" @click="router.go(-1)"></span>
      <span class="name ellipsis">我的订单</span>
    </div>
    <div class="order-container" v-if="myOrderInfo.length">
      <div class="item" v-for="item in myOrderInfo" :key="item.id">
        <div class="item-top">
          <span class="cinema-name">{{ item.cinema_name }}</span>
          <span class="status">已完成</span>
        </div>
        <div class="item-center">
          <div class="left">
            <img :src="server + item.poster" alt width="100%" height="100%" />
          </div>
          <div class="right">
            <div class="movie">
              {{ item.name }}
              <span class="num">{{ item.ticket_num }}张</span>
            </div>
            <div class="date">
              <span class="day">{{
                item.show_date.split("-")[1] +
                "月" +
                item.show_date.split("-")[2] +
                "日"
              }}</span>
              <span class="time">{{ item.show_time }}</span>
            </div>
            <div class="cinema">
              <span class="hall">{{ item.hall_name }}</span>
              <span
                class="seat"
                v-for="(itemSeat, valueSeat) in JSON.parse(
                  item.order_seat_info
                )"
                :key="valueSeat"
                >{{ itemSeat }}</span
              >
            </div>
          </div>
        </div>
        <div class="item-bottom">
          <div class="price">
            总价:
            <span>{{ item.ticket_total_price }}元</span>
          </div>
        </div>
      </div>
    </div>
    <div class="tips" v-else>
      <span class="icon icon-empty-content"></span>
      <span class="text">暂时木有内容呀</span>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { getOrderByUserId } from "@/api/user";
const router = useRouter();
const userId = ref(sessionStorage.getItem("user_id"));
const myOrderInfo = ref([]);
const server = "http://localhost:3001";
const seat_info = ref("");
const loadInfo = () => {
  getOrderByUserId(userId.value).then((res) => {
    console.log(res);
    if (res.status == 200) {
      myOrderInfo.value = res.data;
      res.data.map((item) => {
        seat_info.value = formatSeat(JSON.parse(item.order_seat_info));
        JSON.parse(item.order_seat_info).map((item) => {
          console.log(item);
        });
        // console.log(JSON.parse(item.order_seat_info));
        console.log(seat_info.value);
      });
      myOrderInfo.value.sort((a, b) => {
        return new Date(b.order_date) - new Date(a.order_date);
      });
    }
  });
  const formatSeat = (num) => {
    if (num % 10 === 0) {
      return num / 10 + "排" + 10 + "座";
    } else {
      return parseInt(num / 10) + 1 + "排" + (num % 10) + "座";
    }
  };
};
loadInfo();
</script>

<style lang="scss" scoped>
#my-order {
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
    background-color: #dd2727;
    color: #fff;
    .icon-back {
      font-size: 0.4rem;
      position: absolute;
      left: 0.3rem;
    }
    .name {
      width: 60%;
      text-align: center;
      font-size: 0.345rem;
    }
  }
  .order-container {
    display: flex;
    flex-flow: column;
    margin-top: 1rem;
    width: 100%;
    background: #f1f1f1;
    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-flow: column;
      padding: 0.3rem;
      background: #fff;
      border-bottom: 0.03rem solid #f1f1f1;
      .item-top,
      .item-center,
      .item-bottom {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.28rem;
        color: #333;
      }
      .item-top {
        padding-bottom: 0.12rem;
      }
      .item-center {
        width: 100%;
        justify-content: flex-start;
        padding: 0.12rem 0;
        .left {
          width: 16%;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .right {
          align-self: flex-start;
          .movie {
            font-weight: bolder;
            font-size: 0.25rem;
            margin: 0.2rem;
            margin-bottom: 0.3rem;
            .num {
              margin-left: 0.12rem;
            }
          }
          .date,
          .cinema,
          .price {
            margin: 0.2rem;
            span {
              margin-right: 0.12rem;
            }
          }
        }
      }
      .item-bottom {
        margin-top: 0.12rem;
      }
    }
  }
  .tips {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    font-size: 0.28rem;
    padding-top: 4rem;
    border-top: 0.04rem solid #f1f1f1;
    .icon {
      font-size: 1.6rem;
      margin-bottom: 0.25rem;
    }
    .text {
      color: #ccc;
    }
  }
}
</style>
