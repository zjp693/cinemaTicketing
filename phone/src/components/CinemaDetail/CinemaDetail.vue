<template>
  <div id="cinema-detail">
    <div class="top">
      <span class="icon-back" @click="router.go(-1)"></span>
      <span class="name ellipsis">{{ currentCinemaInfo.cinema_name }}</span>
    </div>
    <div class="cinema-info">
      <span class="name">{{ currentCinemaInfo.cinema_name }}</span>
      <span class="address"
        ><span class="icon icon-address"></span
        >{{ currentCinemaInfo.specified_address }}</span
      >
      <span class="tel"
        ><span class="icon icon-tel"></span
        >{{ currentCinemaInfo.cinema_phone }}</span
      >
    </div>
    <el-carousel
      :autoplay="autoplay"
      :interval="1"
      type="card"
      height="5rem"
      arrow="never"
      :loop="false"
      indicator-position="none"
      :initial-index="initMovieId"
      @change="changeCarousel"
      v-if="carouselReset"
    >
      <!-- 走马灯 -->
      <el-carousel-item v-for="(item, index) in hasMovieInfo" :key="index">
        <a
          href="#"
          @click.prevent="
            router.push({
              path: '/movie_detail',
              query: { movie_id: item.movie_id },
            })
          "
          ><img :src="server + item.poster" alt=""
        /></a>
      </el-carousel-item>
    </el-carousel>

    <div
      class="movie-info"
      v-for="(item, index) in hasMovieInfo"
      :key="index"
      v-show="movieIndex === Number(index)"
    >
      <span class="arrow"></span>
      <span class="main"
        ><span class="name">{{ item.name }}</span
        ><span class="score"
          ><span class="num" v-if="item.score"
            >{{ item.score.toFixed(1) }}分</span
          ><span v-else style="font-size: 0.28rem">暂无评分</span></span
        ></span
      >
      <span class="intro">
        <span class="time">{{ item.movie_long }}</span
        ><span class="split">|</span><span class="type">{{ item.type }}</span
        ><span class="split">|</span
        ><span class="actors">{{ item.actor }}</span>
      </span>
    </div>
    <!-- <ly-tab
      v-model="selectedId"
      :items="items"
      :options="options"
      class="ly-tab"
      v-if="hackReset"
      @change="changeLyTabItem"
    /> -->
    <div class="ticket-container">
      <div class="item" v-for="(item, index) in movieDaySchedule" :key="index">
        <div class="left">
          <span class="start-date">{{ item.show_time }}</span>
          <span class="end-date">{{ endDate(item) }}散场</span>
        </div>
        <div class="center">
          <div class="info">
            <span class="language">{{ item.language }}3D</span>
            <span class="hall">{{ item.hall_name }}</span>
          </div>
          <div class="price">{{ item.price.toFixed(2) }}元</div>
        </div>
        <div class="right">
          <span
            class="buy-btn"
            @click="
              router.push({
                path: '/select_seat',
                query: {
                  cinema_id: item.cinema_id,
                  movie_id: item.movie_id,
                  schedule_id: item.schedule_id,
                },
              })
            "
            >购票</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 提示
import { Toast } from "vant";
import { ref } from "vue";
import {
  getCurrentCinemaDetail,
  getCurrentCinemaMovieSchedule,
} from "../../api/cinema";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
// 幻灯片的索引
const initMovieId = ref(0);
//当前影院信息
const currentCinemaInfo = ref({});
//影院的电影信息
const hasMovieInfo = ref([]);
//所有的电影安排
// const allMovieSchedule = ref([]);
//电影某天的安排
const movieDaySchedule = ref([]);
// const hackReset = ref(false);
const carouselReset = ref(true);
const movieIndex = ref(0);
const autoplay = ref(true);
//服务器地址
const server = ref("http://localhost:3001");
const changeCarousel = (index) => {
  initMovieId.value = index;
  console.log(index);
  console.log(hasMovieInfo.value[initMovieId.value]);
  let aa = movieDaySchedule.value.filter((item) => {
    console.log(item);
    return (item.movie_id = hasMovieInfo.value[initMovieId.value].movie_id);
  });
  console.log(aa);
};
// 提示
Toast.loading({
  duration: 0,
  message: "Loading...",
  forbidClick: true,
});

// 影院详情
getCurrentCinemaDetail(route.query.cinema_id).then((res) => {
  // console.log(res);
  if (res.status == 200) {
    currentCinemaInfo.value = res.data[0];
  }
});
getCurrentCinemaMovieSchedule(route.query.cinema_id).then((res) => {
  // console.log(res);
  if (res.status == 200) {
    hasMovieInfo.value = res.data.hasMovieInfo;
    movieDaySchedule.value = res.data.movieScheduleInfo;
    movieDaySchedule.value.map((item) => {
      console.log(item.movie_id);
    });
    Toast.clear();
    // console.log(res.data);
    // console.log(movieDaySchedule.value[0]);
  }
});
//影片结束时间
const endDate = (item) => {
  let h = parseInt(
    Number(item.show_time.split(":")[0]) + parseInt(item.movie_long) / 60
  );
  let m =
    Number(item.show_time.split(":")[1]) + (parseInt(item.movie_long) % 60);
  if (m > 59) {
    return (
      (h + parseInt(m / 60) < 10
        ? "0" + (h + parseInt(m / 60))
        : h + parseInt(m / 60)) +
      ":" +
      (m % 60 < 10 ? "0" + (m % 60) : m % 60)
    );
  } else {
    return (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m);
  }
};
</script>

<style scoped lang="scss">
#cinema-detail {
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
    z-index: 999;
    .icon-back {
      font-size: 0.4rem;
      position: absolute;
      left: 0.3rem;
    }
    .name {
      width: 60%;
      font-size: 0.375rem;
      text-align: center;
      line-height: 0.375rem;
    }
  }
  .cinema-info {
    margin-top: 1rem;
    color: #888;
    display: flex;
    flex-flow: column;
    padding: 0.25rem;
    .name {
      color: #000;
      font-size: 0.345rem;
      font-weight: 700;
      margin-bottom: 0.25rem;
    }
    .address,
    .tel {
      margin-bottom: 0.12rem;
      font-size: 0.28rem;
      line-height: 0.375rem;
      display: flex;
      letter-spacing: 0.02rem;
      align-items: flex-start;
      .icon {
        font-size: 0.375rem;
        margin-right: 0.08rem;
      }
    }
  }
  .movie-info {
    height: 1.4rem;
    display: flex;
    flex-flow: column;
    align-items: center;
    .arrow {
      border: 0.2rem solid transparent;
      border-bottom: 0.2rem solid #fff;
      margin-top: -0.38rem;
      z-index: 999;
    }
    .main {
      font-size: 0.345rem;
      .name {
        line-height: 0.8rem;
        font-weight: 700;
      }
      .score {
        color: #ffb400;
        margin-left: 0.25rem;
        font-size: 0.1rem;
        .num {
          font-size: 0.3125rem;
          font-weight: 700;
          font-family: PingFangSC-Regular, Hiragino Sans GB, sans-serif;
        }
      }
    }
    .intro {
      font-size: 0.25rem;
      color: #888;
      .split {
        margin: 0 0.08rem;
      }
    }
  }
  .el-carousel {
    background: linear-gradient(to bottom, #242342 0%, #11182b 100%);
    .el-carousel__item {
      margin-top: 0.25rem;
      height: 90%;
      a {
        font-size: 0.3125rem;
        padding-top: 0.04rem;
        img {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          border: 0.06rem solid #fff;
        }
      }
    }
  }

  .ly-tab {
    color: #000;
    border: none;
  }
  .ticket-container {
    padding: 0.25rem;
    .item {
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-bottom: 0.02rem solid #f1f1f1;
      padding: 0.25rem 0;
      .left {
        flex: 1;
        display: flex;
        flex-flow: column;
        justify-content: center;
        .start-date {
          font-weight: bolder;
          font-size: 0.375rem;
          margin-bottom: 0.12rem;
        }
        .end-date {
          color: #888;
          font-size: 0.25rem;
        }
      }
      .center {
        flex: 3;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 0.25rem;
        .info {
          display: flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;
          margin-left: 0.25rem;
          .language {
            font-size: 0.28rem;
            margin-bottom: 0.12rem;
          }
          .hall {
            color: #888;
            font-size: 0.25rem;
          }
        }
        .price {
          color: #dd2727;
          margin-right: 0.25rem;
        }
      }
      .right {
        flex: 1;
        text-align: center;
        border: 0.0125rem solid #dd2727;
        padding: 0.12rem 0;
        border-radius: 0.25rem;
        color: #dd2727;
        font-size: 0.25rem;
      }
    }
  }
}
</style>
