<template>
<div class="common-layout">
      <el-container>
      <el-aside width="200px"> <el-container>
      <el-aside width="200px">
        <!-- 菜单 -->
          <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
   <!-- 左 -->
    <el-radio-button :label="true"><el-icon><caret-left /></el-icon></el-radio-button>
    <!-- 右 -->
    <el-radio-button :label="false"><el-icon><caret-right /></el-icon></el-radio-button>
  </el-radio-group>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-menu-item index="1">
      <el-icon><setting /></el-icon>
      <template #title>学生管理</template>
    </el-menu-item>
    <el-menu-item index="2">
      <el-icon><icon-menu /></el-icon>
      <template #title>教师管理</template>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <el-icon><document /></el-icon>
      <template #title>通知管理</template>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon><setting /></el-icon>
      <template #title>添加班级</template>
    </el-menu-item>
        <el-menu-item index="5">
      <el-icon><setting /></el-icon>
      <template #title>聊天</template>
    </el-menu-item>
  </el-menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container></el-aside>
      <el-container>
        <!-- 头部 -->
        <el-header>Header</el-header>
        <!-- 主要部分 -->
        <el-main>       <div class="row">
            <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-info">
                    <div class="inner">
                        <h3 v-text="UserSize"></h3>
                        <p>总检测人数</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-bag"></i>
                    </div>
                    <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                </div>
            </div>
            <!-- ./col -->
            <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-success">
                    <div class="inner">
                        <h3 v-text="fill"></h3>
                        <p>已填报人数</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-stats-bars"></i>
                    </div>
                    <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                </div>
            </div>
            <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-danger">
                    <div class="inner">
                        <h3 v-text="hotTmp"></h3>
                        <p>今日高危人数</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-pie-graph"></i>
                    </div>
                    <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                </div>
            </div>
            <!-- ./col -->
            <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-warning">
                    <div class="inner">
                        <h3 v-text="gohubei"></h3>
                        <p>今日经过高危地区人数</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-person-add"></i>
                    </div>
                    <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                </div>
            </div>
        </div></el-main>
      </el-container>
    </el-container>
    </div>
</template>
<script  setup>
import { ref } from 'vue'


const isCollapse = ref(false)

</script>
<style scoped>
.common-layout{
  height: 100vh;
}
.common-layout .el-container{
  height: 100%;
}
.el-aside{
  height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
