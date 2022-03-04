<template>
  <div id="home">
    <div :class="['search-header', { active: headerActive }]">
      <span class="location">广州</span>
      <span class="search"
        ><span class="icon-search"></span
        ><input type="text" placeholder="找电影、影院"
      /></span>
      <span class="date"
        ><span class="calender"
          ><span class="day">
            {{
              new Date().getDate() > 10
                ? new Date().getDate()
                : "0" + new Date().getDate()
            }}
          </span></span
        ></span
      >
    </div>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img src="../../assets/swiper/1.jpg" alt="" />
        </div>
        <div class="swiper-slide">
          <img src="../../assets/swiper/2.jpg" alt="" />
        </div>
        <div class="swiper-slide">
          <img src="../../assets/swiper/3.jpg" alt="" />
        </div>
        <div class="swiper-slide">
          <img src="../../assets/swiper/4.jpg" alt="" />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>
    <div class="main">
      <div class="panel">
        <div class="header">
          <span class="red-name">正在热映</span
          ><span class="more">全部 部 <span class="icon-more"></span></span>
        </div>
        <div class="body">
          <div class="item">
            <img src="" alt="" />
            <div style="position: relative">
              <div class="describe">
                <span class="name ellipsis"></span>
                <span class="score"
                  ><i class="interger"></i>.<i class="fraction"></i
                ></span>
              </div>
            </div>
            <div class="buy">购票</div>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="header">
          <span class="blue-name">即将上映</span
          ><span class="more">全部 部 <span class="icon-more"></span></span>
        </div>
        <div class="body">
          <div class="item">
            <img src="" alt="" />
            <div style="position: relative">
              <div class="peopleNumber">
                <span
                  class="number"
                  style="
                    font-family: PingFangSC-Regular, Hiragino Sans GB,
                      sans-serif;
                    font-size: 0.3rem;
                    font-weight: 600;
                  "
                ></span
                ><span>人想看</span>
                <span class="number">暂无想看</span>
              </div>
            </div>
            <div class="presell">
              <div class="name ellipsis"></div>
              <div class="info">
                <span class="date"> 日</span>
                <span class="btn">预售</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { getMovieList } from "../../api/movie";
// getMovieList();
import { ref } from "vue";
const headerActive = ref(false);
// const getMoiveLists = ref();
// return { headerActive };
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
#home
  width 100%
  height 100%
  .search-header
    font-size 0.3125rem
    position fixed
    left 0
    z-index 999
    width 100%
    height 1rem
    display flex
    justify-content space-around
    align-items center
    &.active
      background-color #dd2727
      transition all .2s
    .location
      border 0.0125rem solid #f1f1f1
      border-radius 0.2rem
      text-align center
      padding .1rem 0.18rem
      color #fff
      background-color rgba(255,255,255,.1)
      display flex
      justify-content center
      align-items center
      font-size .25rem
    .search
      border 0.0125rem solid #f1f1f1
      border-radius 0.3125rem
      padding 0.1rem .125rem
      display flex
      justify-content center
      align-items center
      background-color #fff
      .icon-search
        font-size 0.375rem
      input
        border none
        outline none
        font-size 0.3rem
        margin-left 0.125rem
    .date
      width .6rem
      height .6rem
      border .0125rem solid #f1f1f1
      border-radius .425rem
      background-color rgba(255,255,255,.1)
      display flex
      justify-content center
      align-items center
      .calender
        display flex
        justify-content center
        align-items center
        width 76%
        height 76%
        background url('/public/images/calender/calender.svg') no-repeat
        -webkit-background-size: cover
        background-size: cover
        .day
          position relative
          top .45em
          color #fff
          font-size .6em
  .swiper-container
    width 100%
    height 3rem
    img
      width 100%
      height 100%
  .main
    width 100%
    border-top-left-radius .25rem
    border-top-right-radius .25rem
    padding-top .25rem
    padding-bottom .8rem
    position relative
    top -0.25rem
    background-color #fff
    z-index 998
    .panel
      font-size .3125rem
      padding .1rem .25rem
      border-bottom .08rem solid #f5f5f5
      .header
        display flex
        justify-content center
        align-items center
        padding 0 .125rem .2rem
        .red-name
          flex 1
          color #dd2727
          font-weight 600
        .blue-name
          flex 1
          color #2d98f3
          font-weight 600
        .more
          flex 1
          text-align right
          vertical-align middle
          font-size .25rem
      .body
        display flex
        flex-wrap wrap
        .item
          width 33.33%
          padding .125rem
          box-sizing border-box
          position relative
          overflow hidden
          img
            width 100%
            vertical-align bottom
          .describe
            position absolute
            left 0
            bottom 0
            width 100%
            display flex
            align-items center
            padding 0 .08rem
            height .4rem;
            box-sizing border-box
            background-color rgba(0,0,0,.4)
            .name
              color #fff
              font-size .25rem
              flex 6
              box-sizing border-box
              width 100%
              font-weight 600
            .score
              color #ffb400
              flex 2
              font-family  PingFangSC-Regular,Hiragino Sans GB,sans-serif
              font-weight 700
              .interger
                font-size .3rem
              .fraction
                font-size .25rem
          .buy
            height .6rem
            width 100%
            display flex
            justify-content center
            align-items center
            font-size .25rem
            background-color #dd2727
            color #fff
          .peopleNumber
            color #ffb400
            position absolute
            left 0
            bottom 0
            width 100%
            display flex
            align-items center
            padding 0 .08rem
            height .4rem
            background-color rgba(0,0,0,.4)
            font-size .25rem
            box-sizing border-box
          .presell
            height 1rem
            width 100%
            font-size .25rem
            .name
              font-weight 600
              font-size .25rem
              padding .1rem 0
              width 100%
            .info
              width 100%
              height .6rem
              font-size .25rem
              font-weight lighter
              display flex
              justify-content center
              align-items center
              text-align center
              .date
                flex 1
              .btn
                text-align center
                font-size .25rem
                flex 1
                color #fff
                width 100%
                box-sizing border-box
                padding .12rem 0
                background-color #2d98f3
                border-radius .2rem
                box-shadow .02rem .02rem .08rem #2d98f3
    .panel + .panel
      padding-top .25rem
</style>
