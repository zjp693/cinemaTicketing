<template>
  <div id="modify_UserSign">
    <div class="top">
      <span class="icon-back" @click="router.go(-1)"></span>
      <span class="name ellipsis">修改签名</span>
      <span class="sure-btn" @click="modifyUserSign">确定</span>
    </div>
    <div class="container">
      <el-input
        class="input"
        placeholder="20个字以内"
        v-model="input"
        spellcheck="false"
        clearable
      >
      </el-input>
      <p>添加签名，了解有趣的你</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
import { updateUserSign } from "@/api/user";
import { Toast } from "vant";
const router = useRouter();
const route = useRoute();
const input = ref(null);
const userId = ref(sessionStorage.getItem("user_id"));
input.value = route.params.sign;
const modifyUserSign = () => {
  updateUserSign(userId.value, input.value).then((res) => {
    if (res.status == 200) {
      Toast.success("修改个性签名成功");
      router.go(-1);
    }
  });
};
</script>

<style lang="scss" scoped>
#modify_UserSign {
  width: 100%;
  height: 100%;
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
      font-size: 0.345rem;
      text-align: center;
    }
    .sure-btn {
      position: absolute;
      right: 0.3rem;
      font-size: 0.3125rem;
    }
  }
  .container {
    font-size: 0.3125rem;
    position: fixed;
    top: 1rem;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #f1f1f1;
    .el-input {
      margin-top: 0.4rem;
      input {
        border: none;
        outline: none;
        font-size: 0.3125rem;
      }
    }
    p {
      font-size: 0.24rem;
      color: #888;
      margin: 0.2rem;
    }
  }
}
</style>
