<template>
  <div id="movie">
    <div class="tab-header">
      <span class="location">广州</span>
      <span
        :class="['normal', { active: isHotMovie }]"
        @click="optionMovieType(true)"
        >正在热映</span
      >
      <span
        :class="['normal', { active: !isHotMovie }]"
        @click="optionMovieType(false)"
        >即将上映</span
      >
      <span class="icon-search" @click="$router.push('search_movie')"></span>
    </div>
    <div class="tab-content" ref="container">
      <div class="panel" v-show="isHotMovie">
        <movie-item :movieList="hotMovieList"></movie-item>
      </div>
      <div class="panel" v-show="!isHotMovie">
        <movie-item :movieList="notShowMovieList"></movie-item>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import MovieItem from "../../components/MovieItem/MovieItem";
import { getMovieList } from "../../api/movie";
//切换电影选项
const isHotMovie = ref(true);

//服务器地址
// const server = ref("http://localhost:3001");
//热门电影列表
const hotMovieList = ref([]);
//未上映电影列表
const notShowMovieList = ref([]);
getMovieList().then((res) => {
  console.log(res);
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
//改变电影类型
const optionMovieType = (flag) => {
  isHotMovie.value = flag;
  window.scroll(0, 0);
};
</script>

<style scoped lang="scss">
#movie {
  width: 100%;
  height: 100%;
  .tab-header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 1rem;
    width: 100%;
    font-size: 0.3125rem;
    background-color: #dd2727;
    color: #fff;
    position: fixed;
    left: 0;
    top: 0;
  }
  .normal {
    opacity: 0.6;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
    &.active {
      color: #fff;
      border-bottom: 0.06rem solid #fff;
      opacity: 1;
    }
  }

  .icon-search {
    font-size: 0.48rem;
  }

  .tab-content {
    margin-top: 1rem;
    font-size: 0.3125rem;
    padding: 0 0.3rem;
    padding-bottom: 1rem;
  }
  .panel {
    width: 100%;
  }
  .item {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0.2rem 0;
    border-bottom: 0.03rem solid #f1f1f1;
  }

  img {
    display: inline-block;
    width: 20%;
  }

  .info {
    width: 68%;
    display: flex;
    flex-flow: column;
    padding: 0.25rem;
    font-size: 0.28rem;
    color: #9d9d9d;
  }
  .name {
    font-weight: 700;
    font-size: 0.345rem;
    padding-bottom: 0.2rem;
    color: #333;
  }

  .type {
    padding-bottom: 0.12rem;
  }
  .people {
    padding-bottom: 0.12rem;
  }
  .number {
    color: #ffb400;
    font-family: PingFangSC-Regular, Hiragino Sans GB, sans-serif;
    font-weight: 700;
    font-size: 0.315rem;
  }

  .score {
    padding-bottom: 0.12rem;
  }
  .number {
    color: #ffb400;
    font-family: PingFangSC-Regular, Hiragino Sans GB, sans-serif;
    font-weight: 700;
    font-size: 0.315rem;
  }

  .buy {
    width: 12%;
    padding: 0.16rem 0.12rem;
    text-align: center;
    background-color: #dd2727;
    border-radius: 0.08rem;
    font-size: 0.25rem;
    color: #fff;
  }

  .presell {
    background-color: #2d98f3;
    width: 12%;
    padding: 0.16rem 0.12rem;
    text-align: center;
    border-radius: 0.08rem;
    font-size: 0.25rem;
    color: #fff;
  }
}
</style>
