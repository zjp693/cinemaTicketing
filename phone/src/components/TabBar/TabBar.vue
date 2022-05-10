<template>
  <van-tabbar v-model="active" active-color="#ee0a24" inactive-color="#000">
    <van-tabbar-item name="home" icon="home-o" @click="router.push('/')">
      <span>首页</span>
      <template #icon="props">
        <img :src="props.active ? icon[0].active : icon[0].normal" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item name="movie" icon="search" @click="router.push('movie')">
      <span>电影</span>
      <template #icon="props">
        <img :src="props.active ? icon[1].active : icon[1].normal" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item
      name="cinema"
      icon="friends-o"
      @click="router.push('cinema')"
    >
      <span>影院</span>
      <template #icon="props">
        <img :src="props.active ? icon[2].active : icon[2].normal" /> </template
    ></van-tabbar-item>
    <van-tabbar-item name="my" icon="setting-o" @click="router.push('my')">
      <span>我的</span>
      <template #icon="props">
        <img :src="props.active ? icon[3].active : icon[3].normal" /> </template
    ></van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
const active = ref("home");
let router = useRouter();
let route = useRoute();

onMounted(() => {
  active.value = route.name;
});
// setInterval(() => {
//   console.log(active.value);
// });

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
</script>
<style scoped>
.van-tabbar-item .van-badge__wrapper img {
  height: 0.5rem;
}
.van-tabbar-item__text span {
  font-size: 0.27rem;
}
</style>
