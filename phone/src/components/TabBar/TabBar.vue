<template>
  <van-tabbar v-model="active">
    <van-tabbar-item icon="home-o" @click="router.push('/')">
      <span>首页</span>
      <template #icon="props">
        <img :src="props.active ? icon[0].active : icon[0].normal" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item icon="search" @click="router.push('movie')"
      >电影</van-tabbar-item
    >
    <van-tabbar-item icon="friends-o" @click="router.push('cinema')"
      >影院</van-tabbar-item
    >
    <van-tabbar-item icon="setting-o" @click="router.push('my')"
      >我的</van-tabbar-item
    >
  </van-tabbar>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const active = ref(0);
let router = useRouter();
const icon = ref([
  {
    normal: require("./images/home_light.svg"),
    active: require("./images/home_fill_light.svg"),
  },
  {
    normal: require("./images/movie_light.svg"),
    active: require("./images/movie_fill_light.svg"),
  },
  {
    normal: require("./images/cinema_light.svg"),
    active: require("./images/cinema_fill_light.svg"),
  },
  {
    normal: require("./images/my_light.svg"),
    active: require("./images/my_fill_light.svg"),
  },
]);
console.log(icon.value[0].active);

// const search = () => {
//   console.log(11);
//   console.log(router.push);
// };
//
</script>
<style scoped></style>
