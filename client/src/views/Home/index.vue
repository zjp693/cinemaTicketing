<template>
  <div id="home">
    <el-row class="header">
      <div class="head-bar">
        <div class="left">
          <i
            class="icon-film-logo"
            style="font-size: 48px; margin-right: 5px"
          ></i>
          <span style="font-size: 16px; font-weight: bolder">淘气电影</span>
        </div>
        <div class="right">
          <img
            class="user-avatar"
            width="40px"
            height="40px"
            style="border-radius: 20px"
          />
          <el-dropdown style="margin-left: 12px">
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item @click="logout">退出</el-dropdown-item>
              </el-dropdown-menu></template
            >
          </el-dropdown>
        </div>
      </div>
    </el-row>
    <el-row class="container">
      <div class="section">
        <div class="nav-bar">
          <el-menu :default-active="currentMenuIndex" class="el-menu-vertical">
            <el-menu-item
              index="/user_manage"
              @click="handleMenuItemClick('/user_manage')"
            >
              <i class="el-icon-user-solid"></i>
              <span>用户管理</span>
            </el-menu-item>
            <el-menu-item
              index="/movie_manage"
              @click="handleMenuItemClick('/movie_manage')"
            >
              <i class="el-icon-s-kpi"></i>

              <template #title>电影管理 </template>
            </el-menu-item>
            <el-menu-item
              index="/cinema_manage"
              @click="handleMenuItemClick('/cinema_manage')"
            >
              <i class="el-icon-video-camera-solid"></i>
              <template #title>影院管理 </template>
            </el-menu-item>
            <el-menu-item
              index="/hall_manage"
              @click="handleMenuItemClick('/hall_manage')"
            >
              <i class="el-icon-bangzhu"></i>
              <template #title>影厅管理 </template>
            </el-menu-item>
            <el-menu-item
              index="/movie_schedule"
              @click="handleMenuItemClick('/movie_schedule')"
            >
              <i class="el-icon-s-fold"></i>
              <template #title>电影排片 </template>
            </el-menu-item>
            <el-menu-item
              index="/comment_manage"
              @click="handleMenuItemClick('/comment_manage')"
            >
              <i class="el-icon-s-comment"></i>
              <template #title>评论管理 </template>
            </el-menu-item>
            <el-menu-item
              index="/order_manage"
              @click="handleMenuItemClick('/order_manage')"
            >
              <i class="el-icon-s-ticket"></i>
              <template #title>订单管理 </template>
            </el-menu-item>
          </el-menu>
        </div>
        <router-view class="content" />
      </div>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from "vue";
const currentMenuIndex = ref("/user_manage");

const logout = () => {
  console.log("退出登录");
};
</script>

<style>
#home {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.left,
.right {
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-width: 1200px;
  background-color: #f5f5f5;
}
.container .section {
  width: 80%;
  min-width: 1200px;
  display: flex;
  justify-content: center;
  align-content: flex-start;
  height: 100%;
  box-sizing: border-box;
  margin-top: 30px;
}
.nav-bar {
  width: 10%;
  min-width: 200px;
  border-bottom: 1px solid #e9eaeb;
}
.container .content {
  width: 90%;
  min-width: 1000px;
  height: 720px;
  padding-top: 30px;
  background-color: #fff;
  border: 1px solid #e9eaeb;
  border-left: none;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
}
</style>
<style>
#home .header {
  width: 100%;
  min-width: 1200px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 8px 1px #ccc;
  z-index: 9;
  background-color: #fff;
}
#home .header .head-bar {
  height: 100%;
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 1200px;
}
#home .el-dropdown-link {
  cursor: pointer;
  font-size: 14px;
}
#home .el-dropdown-link:hover {
  color: #409eff;
}
#home .el-icon-arrow-down {
  font-size: 12px;
}
#home .el-menu {
  border: 1px solid #e9eaeb;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
}
#home .el-menu-item {
  height: 50px;
  line-height: 50px;
}
#home .el-menu-item,
#home .el-menu-item i {
  color: #3c4043;
}
#home .el-menu-item.is-active {
  color: #fff;
  background-color: #409eff;
}
#home .el-menu-item.is-active i {
  color: #fff;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
