<template>
  <div id="home">
    <!-- 头部 -->
    <div :class="['search-header', { active: headerActive }]">
      <span class="location">广州</span>
      <span class="search"
        ><span class="icon-search"></span
        ><input
          type="text"
          placeholder="找电影、影院"
          @focus="$router.push('search_all')"
      /></span>
      <span class="date"
        ><span class="calender"
          ><span class="day">{{
            new Date().getDate() > 10
              ? "0" + new Date().getDate()
              : new Date().getDate()
          }}</span></span
        ></span
      >
    </div>
    <!-- 轮播图 -->
    <div class="swiper-container">
      <van-swipe
        class="my-swipe"
        :autoplay="3000"
        indicator-color="white"
        style="height: 3rem"
      >
        <van-swipe-item v-for="image in images" :key="image">
          <img :src="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 主要的 -->
    <main>
      <div class="main">
        <div class="panel">
          <div class="header" v-if="hotMovieList">
            <span class="red-name">正在热映</span
            ><span
              class="more"
              @click="$router.push({ path: '/movie', query: { hotMovie: 1 } })"
              >全部{{ hotMovieList.length }}部 <span class="icon-more"></span
            ></span>
          </div>
          <div class="body">
            <div
              class="item"
              v-for="(item, index) in hotMovieList.slice(0, 6)"
              :key="index"
            >
              <img
                :src="server + item.poster"
                alt=""
                @click="
                  $router.push({
                    path: '/movie_detail',
                    query: { movie_id: item.movie_id },
                  })
                "
              />
              <div style="position: relative">
                <div class="describe">
                  <span class="name ellipsis">{{ item.name }}</span>
                  <span class="score" v-if="item.score"
                    ><i class="interger">{{
                      item.score.toFixed(1).split(".")[0]
                    }}</i
                    >.<i class="fraction">{{
                      item.score.toFixed(1).split(".")[1]
                    }}</i></span
                  >
                </div>
              </div>
              <div
                class="buy"
                @click="
                  $router.push({
                    path: '/select_cinema',
                    query: { movie_id: item.movie_id },
                  })
                "
              >
                购票
              </div>
            </div>
          </div>
        </div>
        <div class="panel">
          <div class="header">
            <span class="blue-name">即将上映</span
            ><span
              class="more"
              @click="$router.push({ path: '/movie', query: { hotMovie: 0 } })"
              >全部{{ notShowMovieList.length }}部
              <span class="icon-more"></span
            ></span>
          </div>
          <div class="body">
            <div
              class="item"
              v-for="(item, index) in notShowMovieList.slice(0, 6)"
              :key="index"
            >
              <img
                :src="server + item.poster"
                alt=""
                @click="
                  $router.push({
                    path: '/movie_detail',
                    query: { movie_id: item.movie_id },
                  })
                "
              />
              <div style="position: relative">
                <div class="peopleNumber">
                  <span
                    class="number"
                    v-if="item.wish_num"
                    style="
                      font-family: PingFangSC-Regular, Hiragino Sans GB,
                        sans-serif;
                      font-size: 0.3rem;
                      font-weight: 600;
                    "
                    >{{ item.wish_num }}</span
                  ><span v-if="item.wish_num">人想看</span>
                  <span class="number" v-else>暂无想看</span>
                </div>
              </div>
              <div class="presell">
                <div class="name ellipsis">{{ item.name }}</div>
                <div class="info">
                  <span class="date"
                    >{{ item.public_date.split("-")[1] }}月{{
                      item.public_date.split("-")[2]
                    }}日</span
                  >
                  <span
                    class="btn"
                    @click="
                      $router.push({
                        path: '/select_cinema',
                        query: { movie_id: item.movie_id },
                      })
                    "
                    >预售</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { findMovieList } from "@/api/movie";

//服务器地址
const server = ref("http://localhost:3001");
//是否显示头部搜索背景颜色
const headerActive = ref(false);
//热门电影列表
const hotMovieList = ref([]);
//未上映电影列表
const notShowMovieList = ref([]);
const images = [
  require("@/assets/swiper/1.jpg"),
  require("@/assets/swiper/2.jpg"),
  require("@/assets/swiper/3.jpg"),
  require("@/assets/swiper/4.jpg"),
];
findMovieList().then((res) => {
  // console.log(res);
  if (res.status == 200) {
    res.data.forEach((value) => {
      if (new Date() - new Date(value.public_date) >= 0) {
        hotMovieList.value.push(value);
      } else {
        notShowMovieList.value.push(value);
      }
    });
    hotMovieList.value.sort((a, b) => {
      return b.score - a.score;
    });
    notShowMovieList.value.sort((a, b) => {
      return b.wish_num - a.wish_num;
    });
  }
});
</script>

<style lang="scss" scoped>
#home {
  width: 100%;
  height: 100%;
  .search-header {
    font-size: 0.3125rem;
    position: fixed;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;

    &.active {
      background-color: #dd2727;
      transition: all 0.2s;
    }

    .location {
      border: 0.0125rem solid #f1f1f1;
      border-radius: 0.2rem;
      text-align: center;
      padding: 0.1rem 0.18rem;
      color: #fff;
      background-color: rgba(255, 255, 255, 0.1);
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.25rem;
    }

    .search {
      border: 0.0125rem solid #f1f1f1;
      border-radius: 0.3125rem;
      padding: 0.1rem 0.125rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      .icon-search {
        font-size: 0.375rem;
      }

      input {
        border: none;
        outline: none;
        font-size: 0.3rem;
        margin-left: 0.125rem;
      }
    }

    .date {
      width: 0.6rem;
      height: 0.6rem;
      border: 0.0125rem solid #f1f1f1;
      border-radius: 0.425rem;
      background-color: rgba(255, 255, 255, 0.1);
      display: flex;
      justify-content: center;
      align-items: center;

      .calender {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 76%;
        height: 76%;
        background: url("../../assets/calender/calender.svg") no-repeat;
        -webkit-background-size: cover;
        background-size: cover;

        .day {
          position: relative;
          top: 0.45em;
          color: #fff;
          font-size: 0.6em;
        }
      }
    }
  }
  .swiper-container {
    width: 100%;
    height: 3rem;
    overflow: hidden;
    .my-swipe .van-swipe-item {
      width: 100%;
      height: 100%;
      color: #fff;
      font-size: 20px;
      line-height: 150px;
      text-align: center;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  main {
    width: 100%;
    .main {
      width: 100%;
      border-top-left-radius: 0.25rem;
      border-top-right-radius: 0.25rem;
      padding-top: 0.25rem;
      padding-bottom: 0.8rem;
      position: relative;
      top: -0.25rem;
      background-color: #fff;
      color: #f1f1f1;
      z-index: 998;
      .panel {
        font-size: 0.3125rem;
        padding: 0.1rem 0.25rem;
        border-bottom: 0.08rem solid #f5f5f5;

        .header {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 0.125rem 0.2rem;

          .red-name {
            flex: 1;
            color: #dd2727;
            font-weight: 600;
          }

          .blue-name {
            flex: 1;
            color: #2d98f3;
            font-weight: 600;
          }

          .more {
            flex: 1;
            text-align: right;
            vertical-align: middle;
            font-size: 0.25rem;
            color: #1e1e1e;
          }
        }

        .body {
          display: flex;
          flex-wrap: wrap;

          .item {
            width: 33.33%;
            padding: 0.125rem;
            box-sizing: border-box;
            position: relative;
            overflow: hidden;

            img {
              width: 100%;
              vertical-align: bottom;
            }

            .describe {
              position: absolute;
              left: 0;
              bottom: 0;
              width: 100%;
              display: flex;
              align-items: center;
              padding: 0 0.08rem;
              height: 0.4rem;
              box-sizing: border-box;
              background-color: rgba(0, 0, 0, 0.4);

              .name {
                color: #fff;
                font-size: 0.25rem;
                flex: 6;
                box-sizing: border-box;
                width: 100%;
                font-weight: 600;
              }

              .score {
                color: #ffb400;
                flex: 2;
                font-family: PingFangSC-Regular, Hiragino Sans GB, sans-serif;
                font-weight: 700;

                .interger {
                  font-size: 0.3rem;
                }

                .fraction {
                  font-size: 0.25rem;
                }
              }
            }

            .buy {
              height: 0.6rem;
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 0.25rem;
              background-color: #dd2727;
              color: #fff;
            }

            .peopleNumber {
              color: #ffb400;
              position: absolute;
              left: 0;
              bottom: 0;
              width: 100%;
              display: flex;
              align-items: center;
              padding: 0 0.08rem;
              height: 0.4rem;
              background-color: rgba(0, 0, 0, 0.4);
              font-size: 0.25rem;
              box-sizing: border-box;
            }

            .presell {
              height: 1rem;
              width: 100%;
              font-size: 0.25rem;

              .name {
                font-weight: 600;
                font-size: 0.25rem;
                padding: 0.1rem 0;
                width: 100%;
                color: #2b2b2b;
              }

              .info {
                width: 100%;
                height: 0.6rem;
                font-size: 0.25rem;
                font-weight: lighter;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;

                .date {
                  color: #2b2b2b;
                }

                .btn {
                  text-align: center;
                  font-size: 0.25rem;
                  flex: 1;
                  color: #fff;
                  width: 100%;
                  box-sizing: border-box;
                  padding: 0.12rem 0;
                  background-color: #2d98f3;
                  border-radius: 0.2rem;
                  box-shadow: 0.02rem 0.02rem 0.08rem #2d98f3;
                }
              }
            }
          }
        }
      }

      .panel + .panel {
        padding-top: 0.25rem;
      }
    }
  }
}
</style>
