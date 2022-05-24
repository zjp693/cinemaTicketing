<template>
  <div id="select-seat">
    <div class="top">
      <span class="icon-back" @click="router.go(-1)"></span>
      <span class="name ellipsis">{{ cinemaInfo.cinema_name }}</span>
    </div>
    <div class="movie-info">
      <div class="name">{{ movieInfo.name }}</div>
      <div class="intro">
        <span class="date">{{ scheduleInfo.show_date }}</span>
        <span class="time">{{ scheduleInfo.show_time }}</span
        ><span class="language">{{ movieInfo.language }}3D</span>
      </div>
    </div>
    <div class="seat-block">
      <div class="screen">{{ scheduleInfo.hall_name }}银幕</div>
      <div class="center">银幕中央</div>
      <div class="screen-line"></div>
      <div class="row-container">
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span>6</span>
      </div>
      <div class="seat-container">
        <div
          class="row"
          v-show="hackReset"
          v-for="(itemI, indexI) in seatIJ"
          :key="indexI"
        >
          <span
            class="seat"
            v-for="(itemJ, indexJ) in itemI"
            :key="indexJ"
            :class="{
              'icon-sold-seat': itemJ === 1,
              'icon-empty-seat': itemJ === 0,
              'icon-selected-seat': itemJ === 2,
            }"
            @click.prevent="handleSelectSeat(indexI, indexJ)"
          ></span>
        </div>
      </div>
      <div class="seat-example">
        <div class="example empty-example">
          <span class="icon icon-empty-seat"></span>可选
        </div>
        <div class="example sold-example">
          <span class="icon icon-sold-seat"></span>不可选
        </div>
        <div class="example selected-example">
          <span class="icon icon-selected-seat"></span>已选
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="title" v-if="selectedSeat">已选座位</div>
      <div class="selected-seat" v-if="selectedSeat">
        <div
          class="seat-item"
          v-for="(item, index) in selectedSeatInfo"
          :key="index"
        >
          <div class="left">
            <span class="seat">{{ item[0] + 1 }}排{{ item[1] + 1 }}座</span>
            <span class="price">{{ scheduleInfo.price.toFixed(2) }}元</span>
          </div>
          <span
            class="right icon-close"
            @click="cancelSelectedSeat(item[0], item[1])"
          ></span>
        </div>
      </div>
      <span class="btn" v-if="!selectedSeat">请先选座</span>
      <span class="btn active" v-else @click="ensureSeatBtn">确认选座</span>
    </div>
  </div>
</template>

<script setup>
import { getUpdateScheduleSeat } from "../../api/cinema";
import { getScheduleById } from "../../api/cinema";
import { getMovieDetail } from "../../api/movie";
import { useRoute, useRouter } from "vue-router";
import { getCurrentCinemaDetail } from "../../api/cinema";
import { Toast, Dialog } from "vant";
import { ref } from "vue";
const router = useRouter();
const route = useRoute();
const cinemaInfo = ref({});
const movieInfo = ref({});
const scheduleInfo = ref({});
const seatInfo = ref([]);
const seatCount = ref(0);
const selectedSeat = ref(false);
const hackReset = ref(true);
const selectedSeatInfo = ref([]);
const seatIJ = ref([
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]);

// 提示
Toast.loading({
  duration: 0,
  message: "Loading...",
  forbidClick: true,
});

// 影院详情
getCurrentCinemaDetail(route.query.cinema_id).then((res) => {
  if (res.status == 200) {
    cinemaInfo.value = res.data[0];
  }
});
// 电影详情
getMovieDetail(route.query.movie_id).then((res) => {
  if (res.status == 200) {
    movieInfo.value = res.data[0];
  }
});
// 当前影院播放电影的放映时间详情
getScheduleById(route.query.schedule_id).then((res) => {
  if (res.status == 200) {
    scheduleInfo.value = res.data[0];

    seatInfo.value =
      scheduleInfo.value.seat_info === "undefined"
        ? []
        : scheduleInfo.value.seat_info;

    if (seatInfo.value.length > 0) {
      // console.log(seatInfo.value);
      // console.log(seatInfo.value);
      // seatInfo.value = JSON.parse(seatInfo.value);
      seatInfo.value.forEach((value) => {
        if (value % 10 !== 0) {
          seatIJ.value[parseInt(value / 10)][(value % 10) - 1] = 1;
        } else {
          seatIJ.value[parseInt(value / 10) - 1][9] = 1;
        }
      });
    }
    // 关闭提示
    Toast.clear();
  }
});
// 选座座位
const handleSelectSeat = (i, j) => {
  console.log(seatCount.value);
  if (seatCount.value === 4 && seatIJ.value[i][j] === 0) {
    Dialog.alert({
      title: "提示",
      message: "一次最多选择4个座位哦！",
    });
  } else {
    // 选中
    if (seatIJ.value[i][j] === 0) {
      seatIJ.value[i][j] = 2;
      selectedSeatInfo.value.push([i, j]);
      seatCount.value += 1;
      if (!selectedSeat.value) {
        selectedSeat.value = true;
      }
      // 取消选中
    } else if (seatIJ.value[i][j] === 2) {
      seatIJ.value[i][j] = 0;
      seatCount.value -= 1;
      let currentIndex;
      selectedSeatInfo.value.forEach((value, index) => {
        if (i === value[0] && j === value[1]) {
          currentIndex = index;
        }
      });
      selectedSeatInfo.value.splice(currentIndex, 1);
      if (seatCount.value === 0) {
        selectedSeat.value = false;
      }
    }
    hackReset.value = true;
  }
};
// 取消选座
const cancelSelectedSeat = (i, j) => {
  seatIJ.value[i][j] = 0;
  seatCount.value -= 1;
  let currentIndex;
  selectedSeatInfo.value.forEach((value, index) => {
    if (i === value[0] && j === value[1]) {
      currentIndex = index;
    }
  });
  selectedSeatInfo.value.splice(currentIndex, 1);
  if (seatCount.value === 0) {
    selectedSeat.value = false;
  }
};
// 确认选座
const ensureSeatBtn = () => {
  if (sessionStorage.getItem("user_id")) {
    if (seatInfo.value == "undefined") {
      seatInfo.value = [];
    }
    console.log(seatInfo.value);
    selectedSeatInfo.value.forEach((value, index) => {
      // 座位信息
      console.log(seatInfo.value);
      //console.log(value[0] * 10 + value[1] + 1);
      seatInfo.value.push(1);
      // 存储座位
      sessionStorage.setItem(
        "seat_" + (index + 1),
        value[0] * 10 + value[1] + 1
      );
      //价格
      sessionStorage.setItem("seat_count", selectedSeatInfo.value.length);
      //seatInfo.value = JSON.stringify(seatInfo.value);
      getUpdateScheduleSeat(route.query.schedule_id).then((res) => {
        if (res.status == 200) {
          Toast.loading({
            message: "锁定座位成功",
            position: "middle",
            duration: 2000,
          });
          router.push({
            path: "/submit_order",
            query: {
              cinema_id: route.query.cinema_id,
              movie_id: route.query.movie_id,
              schedule_id: route.query.schedule_id,
            },
          });
        }
      });
    });
  } else {
    router.push("/login");
  }
};
</script>

<style lang="scss" scoped>
#select-seat {
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
      text-align: center;
      font-size: 0.375rem;
    }
  }
  .movie-info {
    margin-top: 1rem;
    display: flex;
    flex-flow: column;
    padding: 0.25rem;
    .name {
      margin-bottom: 0.25rem;
      font-size: 0.345rem;
      font-weight: 700;
    }
    .intro {
      font-size: 0.28rem;
      margin-bottom: 0.25rem;
      color: #888;
      span {
        margin-right: 0.12rem;
      }
    }
  }
  .seat-block {
    width: 100%;
    background: #f1f1f1;
    position: absolute;
    left: 0;
    top: 2.5rem;
    bottom: 0;
    .screen {
      width: 4rem;
      margin: 0 auto;
      text-align: center;
      background: #dcdcdc;
      font-size: 0.25rem;
      padding: 0.08rem 0;
      border-bottom-left-radius: 0.4rem;
      border-bottom-right-radius: 0.4rem;
      position: relative;
      left: 0.28rem;
    }
    .center {
      font-size: 0.2rem;
      width: 1rem;
      position: absolute;
      text-align: center;
      padding: 0.08rem 0.1rem;
      top: 1.2rem;
      left: 50%;
      margin-left: -0.3125rem;
      letter-spacing: 0.02rem;
      background-color: #fff;
      color: #888;
      border-radius: 0.12rem;
    }
    .screen-line {
      width: 0;
      height: 4.8rem;
      border: 0.02rem dashed #dcdcdc;
      position: absolute;
      top: 1.6rem;
      left: 50%;
      margin-left: 0.28rem;
    }
    .row-container {
      position: absolute;
      top: 1.4rem;
      left: 0.25rem;
      width: 0.4rem;
      height: 4rem;
      padding: 0.6rem 0;
      background-color: rgba(168, 168, 168, 0.8);
      display: flex;
      flex-flow: column;
      text-align: center;
      justify-content: space-between;
      align-items: center;
      color: #fff;
      border-radius: 0.2rem;
      font-size: 0.25rem;
    }
    .seat-container {
      padding: 0.12rem 0;
      position: absolute;
      top: 1.8rem;
      left: 0.8rem;
      .row {
        margin-bottom: 0.25rem;
        .seat {
          font-size: 0.5rem;
          margin-left: 0.134rem;
        }
      }
    }
    .seat-example {
      position: absolute;
      top: 0.6rem;
      width: 80%;
      margin-left: 10%;
      display: flex;
      justify-content: center;
      align-items: center;
      .example {
        font-size: 0.25rem;
        color: #888;
        margin-right: 0.25rem;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon {
          font-size: 0.3rem;
          margin-right: 0.12rem;
        }
      }
    }
  }
  .bottom {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    background: #fff;
    z-index: 999;
    display: flex;
    flex-flow: column;
    padding: 0.25rem;
    padding-top: 0.32rem;
    box-sizing: border-box;
    .title {
      font-size: 0.28rem;
      font-weight: 700;
      margin-bottom: 0.25rem;
    }
    .btn {
      height: 0.8rem;
      line-height: 0.8rem;
      background-color: #f7dbb3;
      color: #fff;
      text-align: center;
      border-radius: 0.12rem;
      font-size: 0.28rem;
      &.active {
        background-color: #fe9900;
      }
    }
    .selected-seat {
      height: 1rem;
      display: flex;
      .seat-item {
        width: 25%;
        height: 0.8rem;
        display: flex;
        box-sizing: border-box;
        justify-content: space-around;
        align-items: center;
        border: 0.02rem solid #f1f1f1;
        margin-right: 0.25rem;
        &:last-child {
          margin-right: 0;
        }
        .left {
          display: flex;
          flex-flow: column;
          font-size: 0.25rem;
          .seat {
            font-size: 0.28rem;
            color: #666;
            margin-bottom: 0.12rem;
          }
          .price {
            color: #dd2727;
            font-size: 0.24rem;
          }
        }
        .right {
          font-size: 0.25rem;
        }
      }
    }
  }
}
</style>
