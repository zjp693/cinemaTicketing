<template>
  <div v-if="props.movieList.length">
    <div
      class="movie-item"
      v-for="(item, index) in props.movieList"
      :key="index"
    >
      <img
        :src="server + item.poster"
        alt=""
        @click="
          router.push({
            path: '/movie_detail',
            query: { movie_id: item.movie_id },
          })
        "
      />
      <div class="info">
        <div
          class="name"
          @click="
            router.push({
              path: '/movie_detail',
              query: { movie_id: item.movie_id },
            })
          "
          v-html="ruleName(item.name)"
        ></div>
        <div v-if="new Date() - new Date(item.public_date) >= 0">
          <div class="descInfo" v-if="item.score">
            评分：<span class="number">{{ item.score.toFixed(1) }}</span>
          </div>
          <div class="descInfo" v-else>暂无评分</div>
        </div>
        <div v-else>
          <div class="descInfo" v-if="item.wish_num">
            想看：<span class="number">{{ item.wish_num }}</span
            >人想看
          </div>
          <div class="descInfo" v-else>暂无想看</div>
        </div>
        <div class="descInfo">类型：{{ item.type }}</div>
        <div class="descInfo ellipsis">
          主演：<span>{{ item.actor }}</span>
        </div>
      </div>
      <span
        class="buy"
        :class="{ pre_sell: new Date(item.public_date) - new Date() > 0 }"
        @click="
          $router.push({
            path: '/select_cinema',
            query: { movie_id: item.movie_id },
          })
        "
        >{{
          new Date(item.public_date) - new Date() > 0 ? "预售" : "购票"
        }}</span
      >
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, computed } from "vue";
import { useRouter } from "vue-router";
const props = defineProps({
  movieList: {
    type: Array,
    default: () => [],
  },
  searchName: {
    type: String,
    default: "",
  },
});

setTimeout(() => {
  console.log(props);
  console.log("进来了");
}, 0);
const router = useRouter();

//服务器地址
const server = ref("http://localhost:3001");

// 计算有几个字符符合 并且改变颜色
const ruleName = computed(() => {
  return (nameString) => {
    if (props.searchName) {
      let replaceReg = new RegExp(props.searchName, "g");
      let replaceString = `<span style="color:#dd2727">${props.searchName}</span>`;
      return nameString.replace(replaceReg, replaceString);
    }
    return nameString;
  };
});
</script>

<style lang="scss" scoped>
.movie-item {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.2rem 0;
  img {
    display: inline-block;
    width: 20%;
  }
  .info {
    width: 68%;
    display: flex;
    flex-flow: column;
    padding: 0.25rem;
    font-size: 0.28rem;
    color: #9d9d9d;
    .name {
      font-weight: 700;
      font-size: 0.345rem;
      padding-bottom: 0.2rem;
      color: #333;
    }
    .descInfo {
      padding-bottom: 0.12rem;
      .number {
        color: #ffb400;
        font-family: PingFangSC-Regular, Hiragino Sans GB, sans-serif;
        font-weight: 700;
        font-size: 0.315rem;
      }
    }
  }
  .buy {
    background-color: #dd2727;
    border-radius: 0.08rem;
    font-size: 0.25rem;
    color: #fff;
    width: 12%;
    padding: 0.16rem 0.12rem;
    text-align: center;
  }
  .pre_sell {
    background-color: #2d98f3;
  }
}
</style>
