<template>
  <div id="home">
    <div class="search-header">
      <div class="location">广州</div>
      <div class="search">
        <van-icon name="search" />
        <input type="" name="" value="" placeholder="搜索电影" />
      </div>
      <div class="date"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const value = ref("");
console.log(value);
</script>

<style lang="scss" scoped>
#home {
  width: 100%;
  height: 100%;
}
</style>
