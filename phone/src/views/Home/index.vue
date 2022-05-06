<template>
  <div id="home">
    <div :class="['search-header', { active: headerActive }]">
      <span class="location">广州</span>
      <span class="search"
        ><span class="icon-search"></span
        ><input type="text" placeholder="找电影、影院"
      /></span>
      <span class="date"
        ><span class="calender"><span class="day"></span></span
      ></span>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
