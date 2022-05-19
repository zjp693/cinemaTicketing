<template>
  <div id="select-cinema">
    <div class="top">
      <span class="icon-back" @click="router.go(-1)"></span>
      <span class="name ellipsis">{{ movieInfo.name }}</span>
    </div>
    <!-- 日期 -->
    <div class="date" v-if="array">
      <ul class="ly-tab">
        <li
          v-for="(item, index) in array"
          :key="item.id"
          @click="hanleChange(index)"
        >
          {{ item.label }}
          <span :class="movieIndex == Number(index) ? 'span' : ''"></span>
        </li>
      </ul>
    </div>
    <div class="content">
      <div
        class="item"
        v-for="(item, index) in dateCinemaSchedule"
        :key="index"
        @click="
          $router.push({
            path: '/cinema_detail',
            query: {
              movie_id: $route.query.movie_id,
              cinema_id: item.cinema_id,
            },
          })
        "
      >
        <div class="left">
          <div class="name ellipsis">{{ item.cinema_name }}</div>
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
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getMovieDetail } from "../../api/movie";
import { getCurrentCinemaMovieSchedule } from "../../api/movie";
import { formatDate } from "../../common/util/formatDate";
const router = useRouter();
const route = useRoute();
// 电影信息
const movieInfo = ref("");
// 被点击
const movieIndex = ref(0);
// 所有影院信息
const cinemaScheduleInfo = ref([]);
// 影院信息
const dateCinemaSchedule = ref([]);
const array = ref([]);
// 电影信息
getMovieDetail(route.query.movie_id).then((res) => {
  if (res.status == 200) {
    movieInfo.value = res.data[0];
  }
});
// 影院信息
getCurrentCinemaMovieSchedule(route.query).then((res) => {
  console.log(res.data);
  if (res.status == 200) {
    cinemaScheduleInfo.value = res.data.cinemaScheduleInfo;
    dateCinemaSchedule.value.push(cinemaScheduleInfo.value[0]);

    // 时间格式转化
    res.data.halCinemaInfo.forEach((value) => {
      array.value.push({
        label: formatDate(new Date(value.show_date), true),
        date: value.show_date,
      });
    });
  }
});
//切换
const hanleChange = (id) => {
  dateCinemaSchedule.value = [];
  dateCinemaSchedule.value.push(cinemaScheduleInfo.value[id]);
  movieIndex.value = id;
  console.log(cinemaScheduleInfo.value[id]);
};
</script>

<style lang="scss" scoped>
#select-cinema {
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
      font-size: 0.375rem;
      line-height: 0.375rem;
      text-align: center;
    }
  }
  .ly-tab {
    position: fixed;
    top: 1rem;
    left: 0;
    overflow-x: hidden;
  }
  .ly-tab {
    width: 100%;
    display: flex;
    align-items: center;
    color: #dd2727;
    border: none;
    height: 0.8rem;
    box-shadow: 0 0px 6px 1px #eee;
    li {
      padding: 0 0.2rem;
      .span {
        position: relative;
        left: 0.3rem;
        display: block;
        margin-top: 0.1rem;
        width: 1rem;
        height: 0.05rem;
        background-color: #dd2727;
      }
    }
  }

  .select {
    position: fixed;
    left: 0;
    top: 1.68rem;
    width: 100%;
    height: 0.8rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 0.03rem solid #f1f1f1;
    border-top: 0.03rem solid #f1f1f1;
    box-sizing: border-box;
    background-color: #fff;
    .option {
      width: 33.33%;
      box-sizing: border-box;
      padding: 0.1rem 0.6rem;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      font-size: 0.28rem;
      border-right: 0.02rem solid #f1f1f1;
      &:last-child {
        border-right: none;
      }
      .arrow {
        margin-left: 0.1rem;
        padding-bottom: 0.05rem;
        &::after {
          content: "";
          width: 0;
          height: 0;
          overflow: hidden;
          font-size: 0;
          line-height: 0;
          border-width: 0.1rem;
          border-style: solid;
          border-color: #888 transparent transparent transparent;
        }
      }
    }
  }
  .content {
    margin-top: 2rem;
    font-size: 0.3125rem;
    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      padding: 0.25rem;
      width: 100%;
      margin-bottom: 0.25rem;
      .left {
        width: 100%;
        .name {
          font-size: 0.345rem;
          line-height: 0.36rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }
        .address {
          font-size: 0.28rem;
          height: 0.3rem;
          color: #666;
          margin-bottom: 0.25rem;
        }
        .label-block {
          display: flex;
          span {
            padding: 0.06rem;
            font-size: 0.1rem;
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
}
</style>
