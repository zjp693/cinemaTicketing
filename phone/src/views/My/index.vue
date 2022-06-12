<template>
  <div id="my">
    <div class="header">
      <div class="left">
        <div class="avatar">
          <img :src="avatar" alt="" />
        </div>
        <span
          @click="router.push('login')"
          v-if="!myData.user_id"
          class="go-login"
          >登录/注册</span
        >
        <div v-else class="user-info">
          <span
            class="ellipsis"
            style="
              font-size: 0.375rem;
              line-height: 0.6rem;
              margin-bottom: 0.12rem;
            "
            >{{ myData.user_name }}</span
          >
          <span class="ellipsis">{{
            myData.sign ? myData.sign : "同学有点懒，还没写下签名"
          }}</span>
        </div>
      </div>
      <div class="right" v-if="myData.user_name" @click="viewUserInfo">
        <span>个人信息</span><span class="icon-more"></span>
      </div>
    </div>
    <div class="content">
      <div class="list">
        <div class="item" @click="viewMyOrder">
          我的订单 <span class="icon-more"></span>
        </div>
        <div class="item" @click="viewMyMovie(1)">
          想看的电影 <span class="icon-more"></span>
        </div>
        <div class="item" @click="viewMyMovie(0)">
          看过的电影 <span class="icon-more"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getSfyUserInfo } from "@/api/user";
const router = useRouter();
// 个人资料说
const myData = ref([]);
// 默认头像
const avatar = ref("http://localhost:3001/images/avatar/userIcon.png");
if (sessionStorage.getItem("user_id")) {
  getSfyUserInfo(sessionStorage.getItem("user_id")).then((res) => {
    console.log(res.data[0]);
    if (res.status == 200) {
      myData.value = res.data[0];
      avatar.value = "http://localhost:3000" + res.data[0].avatar;
    }
  });
}
//查看个人信息
const viewUserInfo = () => {
  if (sessionStorage.getItem("user_id")) {
    router.push("my_info");
  }
};
//查看个人订单
const viewMyOrder = () => {
  if (sessionStorage.getItem("user_id")) {
    router.push({
      path: "my_order",
      query: { user_id: sessionStorage.getItem("user_id") },
    });
  } else {
    router.push("login");
  }
};
//查看个人电影
const viewMyMovie = (flag) => {
  if (sessionStorage.getItem("user_id")) {
    router.push({
      path: "my_movie",
      query: { user_id: sessionStorage.getItem("user_id"), wish_movie: flag },
    });
  } else {
    router.push("login");
  }
};
</script>

<style lang="scss" scoped>
#my {
  width: 100%;
  height: 100%;
  .header {
    font-size: 0.3125rem;
    font-weight: bolder;
    height: 2.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #dd2727;
    color: #fff;
    position: relative;
    .left {
      width: 4rem;
      height: 2rem;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 0.4rem;
      .avatar {
        position: absolute;
        box-sizing: border-box;
        border: 0.08rem solid #f1f1f1;
        left: 0;
        width: 1.6rem;
        height: 1.6rem;
        border-radius: 50%;
        overflow: hidden;
        font-size: 0;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .go-login {
        position: absolute;
        left: 2rem;
      }
      .user-info {
        width: 100%;
        position: absolute;
        left: 2rem;
        display: flex;
        flex-flow: column;
        span:last-child {
          font-size: 0.25rem;
        }
      }
    }
    .right {
      display: flex;
      font-weight: lighter;
      justify-content: center;
      align-items: center;
      font-size: 0.24rem;
      width: 1.2rem;
      height: 0.4rem;
      padding: 0 0.2rem;
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: 0.2rem 0 0 0.2rem;
    }
  }
  .content {
    border-top: 0.4rem solid #f1f1f1;
    font-size: 0.3125rem;
    position: fixed;
    top: 2.8rem;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #f1f1f1;
    .list {
      background-color: #fff;
      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.3rem;
        font-size: 0.3125rem;
        border-bottom: 0.12rem solid #f1f1f1;
      }
      .icon-more {
        font-weight: 700;
      }
    }
  }
}
</style>
