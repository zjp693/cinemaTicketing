<template>
  <div>
    <div
      style="
        width: 25%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      "
    >
      <transition name="el-fade-in-linear">
        <el-card
          class="box-card"
          shadow="hover"
          style="text-align: center"
          @keyup="login"
        >
          <div class="clearfix" style="text-align: center">
            <h2 style="font-size: 1rem">校园疫情防控管理系统</h2>
          </div>
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model="input_user"
            placeholder="请输入用户名"
            class="inp"
          ></el-input>
          <div style="height: 1.3rem"></div>
          <el-input
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            v-model="input_pwd"
            show-password
            class="inp"
          ></el-input>
          <el-radio-group
            v-model="radio3"
            size="small"
            style="
              display: flex;
              justify-content: space-around;
              margin-top: 1.3rem;
            "
          >
            <el-radio label="1" border>管理员</el-radio>
            <el-radio label="2" border>学生</el-radio>
            <el-radio label="3" border>教师</el-radio>
          </el-radio-group>
          <el-button type="primary" class="button" size="small" @click="login"
            >登录</el-button
          >
        </el-card>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
// import {login} from "../../api/user";
// import {} from
const input_user = ref("");
const input_pwd = ref("");
const radio3 = ref(1);

const login = () => {
  console.log(input_user.value);
};
</script>

<style lang="scss" scoped>
.login {
  h3 {
    text-align: center;
    height: 60px;
    line-height: 20px;
    border-bottom: 1px solid rgb(170, 170, 170);
    color: rgb(92, 92, 92);
  }
  .inp {
    margin-top: 10px;
  }
  .button {
    margin-top: 20px;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
