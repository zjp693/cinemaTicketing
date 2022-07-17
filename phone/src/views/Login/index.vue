<template>
  <div id="login">
    <div class="top">
      <span class="icon-close" @click="router.go(-1)"></span>
    </div>
    <div class="login-container">
      <div class="login-header logo">
        <span class="icon icon-film-logo"></span>
        <p class="title">影院票务系统</p>
        <i class="eng-title">Monkey Movie</i>
      </div>
      <div class="login-content">
        <div class="login-type">
          <span :class="{ active: loginType }" @click="changeLoginType">验证码登录</span>
          <span :class="{ active: !loginType }" @click="changeLoginType">密码登录</span>
        </div>
        <div class="login-main">
          <form>
            <!--手机验证码登录部分-->
            <div v-show="loginType" class="login-phone">
              <section class="login-info">
                <input type="tel" placeholder="手机号" v-model="phone" />
                <button
                  v-if="countDown === 0"
                  :class="{ phone_right: checkPhone }"
                  @click.prevent="getValidateCode"
                >获取验证码</button>
                <button v-else class="phone_right">重新获取({{ countDown }}s)</button>
              </section>
              <section class="login-info login-verification">
                <input type="tel" placeholder="验证码" v-model="phoneCode" />
              </section>
              <section class="login-info login-hint">
                温馨提示：未注册的手机号，验证后将自动注册账户，且代表已同意
                <a href="javascript:;">《服务协议与隐私政策》</a>
              </section>
            </div>
            <!--账号登录部分-->
            <div v-show="!loginType" class="login-password">
              <section class="login-info">
                <input type="text" placeholder="用户名" v-model="userName" />
              </section>
              <section class="login-info login-verification">
                <input type="password" placeholder="密码" v-show="!isShowPassword" v-model="password" />
                <input type="text" placeholder="密码" v-show="isShowPassword" v-model="password" />
                <div class="switch-show">
                  <span class="icon-eye-close-fill" v-show="!isShowPassword" @click="changePwdShow"></span>
                  <span class="icon-eye-open-fill" v-show="isShowPassword" @click="changePwdShow"></span>
                </div>
              </section>
              <section class="login-info">
                <input type="text" placeholder="验证码" v-model="captcha" />

                <div class="captcha" v-html="captchaSrc" @click="refreshCaptcha"></div>
              </section>
            </div>
            <button class="login-submit" @click.prevent="login">登录</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { Dialog } from "vant";
import {
  getPhoneCode,
  phoneLogin,
  getCaptchaSrc,
  accountLogin,
} from "../../api/user";
import { useRouter } from "vue-router";
import { Toast } from "vant";
const phone = ref(""); // 手机号码
const phoneCode = ref(""); //手机验证码
const userName = ref(""); //用户名
const password = ref(""); //密码
const captcha = ref(""); //图形验证码
const loginType = ref(true); //登录方式
const countDown = ref(0); //倒计时
const isShowPassword = ref(false); //密码显示方式
const captchaSrc = ref();

const router = useRouter();
//选择登录类型
const changeLoginType = () => {
  loginType.value = !loginType.value;
};
//选择密码显示方式
const changePwdShow = () => {
  isShowPassword.value = !isShowPassword.value;
};
//检查手机格式
const checkPhone = computed(() => {
  return /^1[3|4|5|6|7|8][0-9]{9}$/.test(phone.value);
});

//登录
const login = async () => {
  //判断登录模式
  if (loginType.value) {
    //手机登录
    if (phone.value === "") {
      Dialog.alert({
        title: "提示",
        message: "请输入手机号码",
      });
    } else if (!checkPhone.value) {
      // MessageBox.alert("请输入正确的手机号码");
      Dialog.alert({
        title: "提示",
        message: "请输入正确的手机号码",
      });
    } else if (phoneCode.value === "") {
      // MessageBox.alert("请输入手机验证码");
      Dialog.alert({
        title: "提示",
        message: "请输入手机验证码",
      });
    } else {
      await phoneLogin(phone.value, phoneCode.value).then((res) => {
        console.log(res);
        if (res.status === 200) {
          Toast({
            message: "登录成功",
            position: "middle",
            duration: 2000,
          });
          // 存储token
          sessionStorage.setItem("token", res.token);
          sessionStorage.setItem("user_id", res.user_id);

          router.go(-1);
        }
        Dialog.alert({
          title: "提示",
          message: res.message,
        });
      });
    }
  } else {
    //账号密码登录
    if (userName.value === "") {
      Dialog.alert({
        title: "提示",
        message: "请输入用户名",
      });
    } else if (password.value === "") {
      Dialog.alert({
        title: "提示",
        message: "请输入密码",
      });
    } else if (captcha.value === "") {
      Dialog.alert({
        title: "提示",
        message: "请输入验证码",
      });
    } else {
      await accountLogin(userName.value, password.value, captcha.value).then(
        (res) => {
          // console.log(res);
          if (res.status == 200) {
            Toast({
              message: "登录成功",
              position: "middle",
              duration: 2000,
            });
            // 存储token
            sessionStorage.setItem("token", res.token);
            sessionStorage.setItem("user_id", res.user_id);

            //跳转到你登录的地方
            router.go(-1);
          }
        }
      );
      refreshCaptcha();
    }
  }
};

// 获取验证码
const refreshCaptcha = () => {
  // 获取图片验证码
  getCaptchaSrc().then((res) => {
    if (res.status == 200) {
      captchaSrc.value = res.data;
    }
  });
};
refreshCaptcha();
const getValidateCode = async () => {
  // 是否通过手机格式验证
  if (checkPhone.value) {
    // 60秒倒计时
    countDown.value = 60;
    let timer = setInterval(() => {
      countDown.value--;
      if (countDown.value === 0) {
        clearInterval(timer);
      }
    }, 1000);
    await getPhoneCode(phone.value).then((res) => {
      console.log(res);
      if (res.status == 200) {
        Dialog.alert({
          title: "提示",
          message: `手机验证码为：${res.data}`,
        });
      } else {
        Dialog.alert({
          title: "提示",
          message: `手机验证码获取失败`,
        });
        clearInterval(timer);
        countDown.value = 0;
      }
    });
  } else {
    Dialog.alert({
      title: "提示",
      message: "手机号码格式不正确",
    });
  }
};
</script>

<style lang="scss" scoped>
#login {
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
    color: #dd2727;
    .icon-close {
      font-size: 0.6rem;
      position: absolute;
      left: 0.3rem;
    }
    .name {
      width: 60%;
    }
  }
  .login-container {
    margin-top: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    .login-header {
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 0.2rem;
      .icon {
        font-size: 2rem;
      }
      .title,
      .eng-title {
        font-size: 0.3125rem;
        font-weight: bolder;
        text-align: center;
        color: #dd2727;
      }
      .title {
        text-indent: 0.2rem;
        letter-spacing: 0.14rem;
        margin-bottom: 0.04rem;
      }
      .eng-title {
        letter-spacing: 0.02rem;
        font-size: 0.21rem;
      }
    }
    .login-content {
      width: 100%;
      background-color: #fff;
      .login-type {
        width: 100%;
        font-size: 0.25rem;
        font-weight: 700;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 0.25rem;
        span {
          margin: 0.25rem;
          padding-bottom: 0.25rem;
          box-sizing: border-box;
        }
        .active {
          color: #dd2727;
          border-bottom: 0.04rem solid #dd2727;
        }
      }
      .login-main {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        form {
          width: 100%;
          .login-phone,
          .login-password {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-flow: column;
            .login-info {
              position: relative;
              margin-bottom: 0.25rem;
              width: 70%;
              input {
                width: 100%;
                height: 0.8rem;
                padding-left: 0.2rem;
                box-sizing: border-box;
                border: 0.02rem solid #888;
                border-radius: 0.12rem;
                outline: 0;
                &:focus {
                  border: 0.02rem solid #dd2727;
                }
              }
            }
            .login-info > button {
              position: absolute;
              top: 50%;
              right: 0.2rem;
              height: 80%;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 0.25rem;
              background: transparent;
              outline: none;
              &.phone_right {
                color: #e02e24;
              }
            }
            .login-info > .switch-show,
            .login-info > .captcha {
              position: absolute;
              top: 50%;
              right: 0.2rem;
              transform: translateY(-50%);
            }
            .login-info > .captcha {
              height: 96%;
            }
            .login-hint {
              color: #888;
              font-size: 0.24rem;
              line-height: 20px;
              > a {
                color: #dd2727;
              }
            }
          }
          .login-submit {
            display: block;
            width: 70%;
            height: 0.8rem;
            margin: 0.16rem auto;
            border-radius: 0.12rem;
            background: #dd2727;
            color: #fff;
            text-align: center;
            font-size: 0.3125rem;
            line-height: 0.8rem;
            border: 0;
          }
        }
      }
    }
  }
}
</style>
