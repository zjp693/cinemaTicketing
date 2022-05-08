<template>
  <div id="home">
    <!-- 头部 -->
    <div class="search-header">
      <div class="location">广州</div>
      <div class="search">
        <van-icon name="search" />
        <input type="" name="" value="" placeholder="搜索电影" />
      </div>
      <div class="date"></div>
    </div>
    <!-- 轮播图 -->
    <div class="swiper"></div>
    <!-- 主要的 -->
    <main></main>
  </div>
</template>

<script setup>
import { ref } from "vue";
const value = ref("");
console.log(value);
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
      // color: #fff;
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
}
</style>
