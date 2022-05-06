<template>
  <div id="login">
    <div class="box">
      <el-form :label-position="labelPosition" label-width="50px">
        <h3>影院售票管理系统</h3>
        <el-form-item label="用户">
          <el-input
            v-model="username"
            clearable
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            placeholder="请输入密码"
            v-model="password"
            show-password
            @keyup.enter="login"
          ></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 30px; margin-left: 30px">
          <el-button @click="reset">重置</el-button>
          <el-button type="primary" @click="adminLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { login } from "@/api/user";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
const router = useRouter();
const username = ref("");
const password = ref("");
const labelPosition = ref("right");
const reset = () => {
  username.value = password.value = "";
};
const adminLogin = async () => {
  await login({ username: username.value, password: password.value }).then(
    (res) => {
      console.log(res);
      if (res.status == 200) {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("admin_id", res.data.result[0].admin_id);
        ElMessage({
          message: res.message,
          type: "success",
        });
        router.push("/");
      }
    }
  );
};
</script>

<style scoped>
#login {
  width: 100%;
  height: 100%;
  background: url("../../assets/bg/bg_admin.png") repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  color: #fff;
}
.box {
  width: 500px;
  height: 400px;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  border-radius: 4px;
  box-shadow: 0 0 8px 8px #ccc;
}
h3 {
  margin-bottom: 40px;
  font-size: 36px;
  letter-spacing: 2px;
  color: #888;
  text-align: center;
}
.el-button + .el-button {
  margin-left: 30px;
}
.el-button {
  border: 1px solid #b6aaaa;
}
</style>
