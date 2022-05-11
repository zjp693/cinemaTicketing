<template>
  <div id="app">
    <router-view />
    <TabBar v-if="router.meta.showTabBar" />
  </div>
</template>

<script setup>
import TabBar from "./components/TabBar/TabBar";
import { useRoute } from "vue-router";
const router = useRoute();
</script>
<style lang="scss">
body,
html,
#app {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>
