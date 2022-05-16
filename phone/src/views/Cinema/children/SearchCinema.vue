<template>
  <div class="search-cinema">
    <div class="header">
      <div class="search">
        <span class="icon-search"></span>
        <input
          type="text"
          placeholder="搜影院"
          v-model.trim="name"
          @change="hanlderChange"
        />
      </div>
      <span class="cancel-btn" @click="router.go(-1)">取消</span>
    </div>
    <div class="content">
      <div class="cinema-container" v-if="cinemaInfo.length">
        <!--<div class="title">影院</div>-->
        <div
          class="item"
          v-for="(item, index) in cinemaInfo"
          :key="index"
          @click="
            router.push({
              path: '/cinema_detail',
              query: { cinema_id: item.cinema_id },
            })
          "
        >
          <div class="left">
            <div
              class="name ellipsis"
              v-html="ruleName(item.cinema_name)"
            ></div>
            <div class="address ellipsis">{{ item.specified_address }}</div>
            <div class="label-block">
              <span>小吃</span><span>4D厅</span><span>杜比全景声厅</span
              ><span>巨幕厅</span>
            </div>
          </div>
          <!--<div class="right">-->
          <!--<div class="price-block"><span class="price">23</span>元起</div>-->
          <!--</div>-->
        </div>
      </div>
      <div class="tips" v-else-if="name">
        <span class="icon icon-empty-content"></span>
        <span class="text">暂时木有内容呀</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getmatchCinemaByName } from "../../../api/cinema";
const { ref, computed } = require("vue");
const { useRouter } = require("vue-router");
const router = useRouter();
const name = ref("");
const cinemaInfo = ref([]);
// const timer = ref("");
// 搜索影院
const hanlderChange = () => {
  console.log(1);
  getmatchCinemaByName(name.value).then((res) => {
    console.log(res);
    if (res.status == 200) {
      cinemaInfo.value = res.data;
    }
  });
};

const ruleName = computed(() => {
  return (nameString) => {
    let replaceReg = new RegExp(name.value, "g");
    let replaceString = `<span style="color: #dd2727">${name.value}</span>`;
    return nameString.replace(replaceReg, replaceString);
  };
});
</script>

<style lang="scss" scoped>
.search-cinema {
  width: 100%;
  background-color: #f5f5f5;
  .header {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 0 0.002rem #888;
    .search {
      flex: 4;
      display: flex;
      align-items: center;
      border-radius: 0.5rem;
      margin-left: 0.25rem;
      padding: 0.125rem 0.25rem;
      background-color: #f5f5f5;
      .icon-search {
        font-size: 0.375rem;
      }
      input {
        width: 100%;
        border: none;
        outline: none;
        background-color: #f5f5f5;
        caret-color: #dd2727;
        text-indent: 0.125rem;
        font-size: 0.3rem !important;
      }
    }
    .cancel-btn {
      flex: 1;
      font-size: 0.3rem;
      color: #dd2727;
      text-align: center;
    }
  }
  .content {
    width: 100%;
    background: #fff;
    .cinema-container {
      width: 100%;
      font-size: 0.3125rem;
      padding: 0.3rem;
      box-sizing: border-box;
      border-top: 0.04rem solid #f1f1f1;
      .title {
        font-size: 0.28rem;
        padding-bottom: 0.25rem;
        border-bottom: 0.03rem solid #f1f1f1;
      }
      .item {
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        padding: 0.25rem;
        width: 100%;
        border-bottom: 0.03rem solid #f1f1f1;
        margin-bottom: 0.25rem;
        .left {
          width: 100%;
          .name {
            font-size: 0.345rem;
            line-height: 0.36rem;
            margin-bottom: 0.25rem;
            font-weight: 700;
          }
          .address {
            font-size: 0.28rem;
            line-height: 0.3rem;
            color: #666;
            margin-bottom: 0.25rem;
          }
          .label-block {
            display: flex;
            span {
              padding: 0.06rem;
              font-size: 0.2rem;
              border: 0.01rem solid #f90;
              margin-right: 0.1rem;
              border-radius: 0.04rem;
              color: #f90;
            }
          }
        }
        .right {
          width: 20%;
          text-align: center;
          .price-block {
            color: #dd2727;
            .price {
              font-size: 0.38rem;
            }
          }
        }
      }
    }
    .tips {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-flow: column;
      font-size: 0.28rem;
      padding-top: 4rem;
      border-top: 0.04rem solid #f1f1f1;
      .icon {
        font-size: 1.6rem;
        margin-bottom: 0.25rem;
      }
      .text {
        color: #ccc;
      }
    }
  }
}
</style>
