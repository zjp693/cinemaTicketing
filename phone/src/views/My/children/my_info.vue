<template>
  <div id="my-info">
    <div class="top">
      <span class="icon-back" @click="router.go(-1)"></span>
      <span class="name ellipsis">我的资料</span>
    </div>
    <div class="info-container">
      <div class="list">
        <div class="item" style="position: relative">
          头像
          <div class="right">
            <img
              :src="avatar"
              ref="previewImg"
              alt
              style="width: 1rem; height: 1rem; border-radius: 50%"
            />
            <i class="icon-more"></i>
          </div>

          <input
            type="file"
            id="file"
            name="file"
            ref="uploadImg"
            accept="image/png, image/jpeg, image/gif, image/jpg"
            style="
              position: absolute;
              left: 0;
              top: 0;
              height: 100%;
              width: 100%;
              opacity: 0;
            "
            @change="changeImg"
          />
        </div>

        <div
          class="item"
          @click.prevent="
            router.push({
              name: 'modify_username',
              params: { userName: userName },
            })
          "
        >
          <span>昵称</span>
          <span class="right">
            {{ userName ? userName : "未填写" }}
            <i class="icon-more"></i>
          </span>
        </div>
        <div class="item" @click.prevent="showSexPanel = true">
          <span>性别</span>
          <span class="right">
            {{ userSex ? userSex : "未填写" }}
            <i class="icon-more"></i>
          </span>
        </div>
        <div class="item" @click="showDatePicker = true">
          <span>生日</span>
          <span class="right">
            {{ birthday }}
            <i class="icon-more"></i>
          </span>
        </div>
        <div
          class="item sign"
          @click.prevent="
            $router.push({ name: 'modify_usersign', params: { sign: sign } })
          "
        >
          <span>个人签名</span>
          <span class="right">
            <span class="ellipsis sign">{{ sign ? sign : "未填写" }}</span>
            <i class="icon-more"></i>
          </span>
        </div>
      </div>
      <div class="logout">
        <span class="logout-btn" @click="logout()">退出</span>
      </div>
    </div>
    <div class="modify_sex" v-show="showSexPanel" @click="showSexPanel = false">
      <div class="container" @click.stop>
        <div class="content">
          <div class="title">修改性别</div>
          <div class="item" @click="modifyUserSex('男')">
            <i class="icon-male"></i>男
          </div>
          <div class="item" @click="modifyUserSex('女')">
            <i class="icon-female"></i>女
          </div>
        </div>
      </div>
    </div>
    <!--    <date-picker-->
    <!--      :show-picker-model="showDatePicker"-->
    <!--      :default-date="new Date(birthday)"-->
    <!--      @cancel="handleCancel"-->
    <!--      @confirm="handleConfirm"-->
    <!--    />-->
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Dialog } from "vant";
import { useRouter } from "vue-router";
import { getSfyUserInfo } from "@/api/user";

const userName = ref(""); //用户名
const userPwd = ref(""); //密码
const userSex = ref(""); //性别
const avatar = ref(""); //头像
// const avatarSrc = ref("");
const uploadImg = ref(""); //上传的图片
const previewImg = ref(""); //图片
const birthday = ref(null); //生日
const sign = ref(""); //用户签名
const userData = ref({});
const showDatePicker = ref(false);
const showSexPanel = ref(false);
const router = useRouter();
//获取用户信息
const loadUsersInfo = async () => {
  if (sessionStorage.getItem("user_id")) {
    await getSfyUserInfo(sessionStorage.getItem("user_id")).then((res) => {
      if (res.status == 200) {
        console.log(res);
        userData.value = res.data[0];
        avatar.value = "http://localhost:3000" + res.data[0].avatar;
        userName.value = res.data[0].user_name;
        userSex.value = res.data[0].sex;
        birthday.value = res.data[0].birthday;
        sign.value = res.data[0].sign;
        userPwd.value = res.data[0].password;
      }
    });
  }
};
loadUsersInfo();
//上传头像
const changeImg = () => {
  let reader = new FileReader();
  reader.readAsDataURL(uploadImg.value.files[0]); //发起异步请求
  reader.onload = function (res) {
    //读取完成后，将结果赋值给img的src
    console.log(res);
    modifyUserAvatar();
    previewImg.value.src = res.target.result;
  };
};
const modifyUserAvatar = () => {
  if (!sessionStorage.getItem("user_id")) {
  }
};
</script>

<style lang="scss" scoped>
#my-info {
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
      font-size: 0.345rem;
      text-align: center;
    }

    .save-btn {
      position: absolute;
      right: 0.3rem;
    }
  }

  .info-container {
    font-size: 0.3125rem;
    position: fixed;
    top: 1rem;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #f1f1f1;

    .list {
      background-color: #fff;
      margin-top: 0.4rem;

      ::v-deep .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.3rem 0.36rem;
        border-bottom: 0.02rem solid #f1f1f1;
        position: relative;

        .right {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          color: #888;
          width: 60%;

          .sign {
            display: inline-block;
            width: 100%;
            text-align: right;
          }
        }
      }
    }

    .logout {
      position: fixed;
      bottom: 0;
      width: 100%;
      left: 0;
      line-height: 0.8rem;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.25rem;
      box-sizing: border-box;

      .logout-btn {
        width: 100%;
        height: 100%;
        background-color: #dd2727;
        color: #fff;
        border-radius: 0.1rem;
      }
    }
  }

  .modify_sex {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2040;

    .container {
      position: fixed;
      width: 5rem;
      height: 3rem;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0.08rem;
      z-index: 2041;

      .content {
        width: 80%;

        .title {
          font-size: 0.345rem;
          font-weight: 700;
          margin-bottom: 0.6rem;
        }

        .item {
          margin-bottom: 0.2rem;
          height: 0.6rem;
          display: flex;
          align-items: center;

          i {
            font-size: 0.375rem;
            margin-right: 0.24rem;
          }
        }
      }
    }
  }
}
</style>
