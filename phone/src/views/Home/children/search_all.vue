<template>
  <div class="search-all">
    <div class="header">
      <div class="search">
        <span class="icon-search"></span>
        <input type="text" placeholder="搜影片、影院" v-model.trim="name" />
      </div>
      <span class="cancel-btn" @click="router.go(-1)">取消</span>
    </div>
    <div class="content">
      <div class="movie-container" v-if="movieInfo.length">
        <div class="title">影片</div>
        <movie-item :movieList="movieInfo" :searchName="name"></movie-item>
      </div>
      <div class="cinema-container" v-if="cinemaInfo.length">
        <div class="title">影院</div>
        <div
          class="item"
          v-for="(item, index) in cinemaInfo"
          :key="index"
          @click="
            $router.push({
              path: '/cinema_detail',
              query: { cinema_id: item.cinema_id },
            })
          "
        >
          <div class="left">
            <div class="name ellipsis">
              {{ item.cinema_name }}
            </div>
            <div class="address ellipsis">{{ item.specified_address }}</div>
            <div class="label-block">
              <span>小吃</span><span>4D厅</span><span>杜比全景声厅</span
              ><span>巨幕厅</span>
            </div>
          </div>
          <!--<div class="right">-->
          <!--<div class="price-block"><span class="price">23</span>元起</div>-->
          <!--</div>-->
        </div>
      </div>
      <div class="tips" v-if="name && !movieInfo.length && !cinemaInfo.length">
        <span class="icon icon-empty-content"></span>
        <span class="text">暂时木有内容呀</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import MovieItem from "../../../components/MovieItem/MovieItem.vue";
import { ref, watch } from "vue";
import { getmatchMovieByName } from "../../../api/movie";
import { getmatchCinemaByName } from "../../../api/cinema";
import { useRouter } from "vue-router";
const name = ref("");
const movieInfo = ref([]);
const cinemaInfo = ref([]);
const router = useRouter();
// const serve = "http://localhost:3000";
// const timer = ref("");
watch(name, (newVal, oldVal) => {
  console.log(newVal, oldVal);
  movieInfo.value = [];
  cinemaInfo.value = [];
  if (newVal) {
    getmatchMovieByName(name.value).then((res) => {
      if (res.status == 200) {
        movieInfo.value = res.data;
      }
    });
    getmatchCinemaByName(name.value).then((res) => {
      if (res.status == 200) {
        cinemaInfo.value = res.data;
      }
    });
  }
});
// watch:{
//   async name(newVal,oldVal){
//     movieInfo = [];
//     cinemaInfo = [];
//     clearTimeout(timer);
//     if (newVal) {
//       timer = setTimeout(async() => {
//       let json = await matchMovieByName(newVal);
//       if (json.success_code===200){
//         movieInfo = json.data;
//       }
//       json = await matchCinemaByName(newVal);
//       if (json.success_code===200){
//         cinemaInfo = json.data;
//       }
//     }, 500);
//     }
//   }
// },
</script>

<style lang="scss" scoped>
.search-all {
  width: 100%;
  background-color: #f5f5f5;
  .header {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 0 0.002rem #888;
    .search {
      flex: 4;
      display: flex;
      align-items: center;
      border-radius: 0.5rem;
      margin-left: 0.25rem;
      padding: 0.125rem 0.25rem;
      background-color: #f5f5f5;
      .icon-search {
        font-size: 0.375rem;
      }
      input {
        width: 100%;
        border: none;
        outline: none;
        background-color: #f5f5f5;
        caret-color: #dd2727;
        text-indent: 0.125rem;
        font-size: 0.3rem !important;
      }
    }
    .cancel-btn {
      flex: 1;
      font-size: 0.3rem;
      color: #dd2727;
      text-align: center;
    }
  }
  .content {
    width: 100%;
    background: #fff;
    .movie-container {
      width: 100%;
      font-size: 0.3125rem;
      padding: 0.3rem;
      box-sizing: border-box;
      border-top: 0.04rem solid #f1f1f1;
      .title {
        font-size: 0.3rem;
        padding-bottom: 0.25rem;
        border-bottom: 0.03rem solid #f1f1f1;
      }
      .item {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 0.25rem;
        border-bottom: 0.03rem solid #f1f1f1;
        img {
          display: inline-block;
          width: 20%;
          border-radius: 0.1rem;
        }
        .info {
          width: 68%;
          display: flex;
          flex-flow: column;
          padding: 0.25rem;
          font-size: 0.25rem;
          color: #9d9d9d;
          .name {
            font-weight: bolder;
            padding-bottom: 0.2rem;
            color: #333;
          }
          .type {
            padding-bottom: 0.2rem;
          }
          .people {
            padding-bottom: 0.2rem;
            .number {
              color: #ffb400;
            }
          }
          .score {
            padding-bottom: 0.2rem;
            .number {
              color: #ffb400;
            }
          }
        }
        .buy {
          width: 12%;
          padding: 0.16rem 0.12rem;
          text-align: center;
          background-color: #dd2727;
          border-radius: 24%;
          font-size: 0.25rem;
          color: #fff;
        }
        .presell {
          background-color: #2d98f3;
          width: 12%;
          padding: 0.16rem 0.12rem;
          text-align: center;
          border-radius: 20%;
          font-size: 0.25rem;
          color: #fff;
        }
      }
    }
    .cinema-container {
      width: 100%;
      font-size: 0.3125rem;
      padding: 0.3rem;
      box-sizing: border-box;
      border-top: 0.04rem solid #f1f1f1;
      .title {
        font-size: 0.3rem;
        padding-bottom: 0.25rem;
        border-bottom: 0.03rem solid #f1f1f1;
      }
      .item {
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        padding: 0.25rem;
        width: 100%;
        border-bottom: 0.03rem solid #f1f1f1;
        margin-bottom: 0.25rem;
        .left {
          width: 100%;
          .name {
            font-size: 0.345rem;
            line-height: 0.36rem;
            margin-bottom: 0.25rem;
            font-weight: 700;
          }
          .address {
            font-size: 0.28rem;
            line-height: 0.3rem;
            color: #666;
            margin-bottom: 0.25rem;
          }
          .label-block {
            display: flex;
            span {
              padding: 0.06rem;
              font-size: 0.2rem;
              border: 0.01rem solid #f90;
              margin-right: 0.1rem;
              border-radius: 0.04rem;
              color: #f90;
            }
          }
        }
        .right {
          width: 20%;
          text-align: center;
          .price-block {
            color: #dd2727;
            .price {
              font-size: 0.38rem;
            }
          }
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
}
</style>
