<template>
  <div id="modify_username">
    <div class="top">
      <span class="icon-back" @click="router.go(-1)"></span>
      <span class="name ellipsis">修改昵称</span>
      <span class="sure-btn" @click="modifyUserName">确定</span>
    </div>
    <div class="container">
      <el-input
        class="input"
        placeholder="2-12个字符支持中英文、数字"
        v-model="input"
        spellcheck="false"
        clearable
      >
      </el-input>
      <p>添加昵称，获得更多关注</p>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { updateUserName } from "@/api/user";
import { Toast } from "vant";
const router = useRouter();
const route = useRoute();
const input = ref("");
//获取用户昵称
input.value = route.params.userName;
//修改昵称
const modifyUserName = () => {
  if (!input.value) {
    Toast.fail("用户名不能为空");
    return;
  } else if (
    !/^[a-zA-Z\u4e00-\u9fa5][0-9a-zA-Z\u4e00-\u9fa5]*$/.test(input.value)
  ) {
    Toast.fail("用户名应为中文或字母开头");
    return;
  } else if (
    !/^[a-zA-Z\u4e00-\u9fa5]{1}[0-9a-zA-Z\u4e00-\u9fa5]{1,11}$/.test(
      input.value
    )
  ) {
    Toast.fail("用户名应为2到12个字符");
    return;
  } else {
    updateUserName(sessionStorage.getItem("user_id"), input.value).then(
      (res) => {
        if (res.status == 200) {
          Toast.success("用户昵称修改成功");
          router.go(-1);
        }
      }
    );
  }
};
</script>

<style lang="scss" scoped>
#modify_username {
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
    ::v-deep .el-input {
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
