<template>
  <div id="my-movie">
    <div class="top">
      <span class="icon-back" @click="router.go(-1)"></span>
      <span class="name ellipsis" v-if="isWatched">想看的电影</span>
      <span class="name ellipsis" v-else>看过的电影</span>
    </div>
    <div class="movie">
      <div v-show="isWatched" class="want">
        <movieitem :movieList="wishMovie"></movieitem>
        <div class="tips" v-if="wishMovie.length === 0">
          <span class="icon icon-empty-content"></span>
          <span class="text">暂时木有内容呀</span>
        </div>
      </div>
      <div v-show="!isWatched" class="watched">
        <div
          class="item"
          v-for="(item, index) in isWatchedMovie"
          :key="index"
          @click="
            router.push({
              path: 'movie_detail',
              query: { movie_id: item.movie_id },
            })
          "
        >
          <img :src="server + item.poster" alt="" />
          <div class="info">
            <div class="name">{{ item.name }}</div>
            <div class="date">
              {{
                new Date(item.comment_date)
                  .toLocaleDateString()
                  .replaceAll("/", "-")
              }}
            </div>
            <div v-if="item.commentContent">
              <div class="my-score">
                <span>评论：</span>
                <el-rate
                  v-model="item.user_score"
                  allow-half
                  :disabled="true"
                />
              </div>
              <div class="my-comment ellipsis">{{ item.commentContent }}</div>
            </div>
            <div v-else>
              <div class="my-score">
                <span>暂未评论</span>
              </div>
            </div>
          </div>
        </div>
        <div class="tips" v-if="isWatchedMovie.length === 0">
          <span class="icon icon-empty-content"></span>
          <span class="text">暂时木有内容呀</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import movieitem from "@/components/MovieItem/MovieItem";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getIsWatchedMovieByUserId, getWishMovieByUserId } from "@/api/movie";
const router = useRouter();
const route = useRoute();
const isWatched = ref(false);
const wishMovie = ref([]);
const isWatchedMovie = ref([]);
const userId = ref(sessionStorage.getItem("user_id"));
//服务器地址
const server = ref("http://localhost:3001");
isWatched.value = JSON.parse(route.query.wish_movie);
//想看的电影
getWishMovieByUserId(userId.value).then((res) => {
  console.log(res);
  if (res.status == 200) {
    wishMovie.value = res.data;
    wishMovie.value.sort((a, b) => {
      return new Date(a.public_date) - new Date(b.public_date);
    });
  }
});
//用户看过的电影
getIsWatchedMovieByUserId(userId.value).then((res) => {
  console.log(res);
  if (res.status == 200) {
    isWatchedMovie.value = res.data;
  }
});
</script>

<style lang="scss" scoped>
#my-movie {
  width: 100%;
  height: 100%;
  color: #000;
  font-size: 0.3125rem;
  overflow: hidden;
  overflow-y: scroll;
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
      text-align: center;
      font-size: 0.345rem;
    }
  }
  .movie {
    .option {
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 0.12rem solid #f1f1f1;
      position: fixed;
      left: 0;
      width: 100%;
      background-color: #fff;
      height: 0.8rem;
      span {
        padding: 0.25rem;
        box-sizing: border-box;
        font-size: 0.3rem;
        border-bottom: 0.04rem solid transparent;
      }
      .active {
        color: #dd2727;
        border-bottom: 0.04rem solid #dd2727;
      }
    }
    .want,
    .watched {
      padding: 0 0.3rem;
      padding-top: 1rem;
      .item {
        display: flex;
        align-items: center;
        padding: 0.2rem 0;
        img {
          display: inline-block;
          width: 20%;
        }
        .info {
          width: 70%;
          display: flex;
          flex-flow: column;
          padding: 0.25rem;
          font-size: 0.25rem;
          color: #9d9d9d;
          overflow: hidden;
          .name {
            font-weight: 700;
            font-size: 0.345rem;
            padding-bottom: 0.2rem;
            color: #333;
          }
          .date {
            line-height: 0.5rem;
          }
          .my-score {
            display: flex;
            align-items: center;
            color: #ffb400;
            //padding-bottom: 0.2rem;
            font-size: 0.28rem;
            span {
              margin-right: 0.12rem;
            }
          }
          .my-comment {
            padding-bottom: 0.3rem;
          }
          .actors {
            padding-bottom: 0.2rem;
          }
          .people {
            padding-bottom: 0.2rem;
            .number {
              color: #ffb400;
            }
          }
          .score {
            padding-bottom: 0.2rem;
            .number {
              color: #ffb400;
            }
          }
        }
        .buy {
          width: 10%;
          padding: 0.16rem 0.12rem;
          text-align: center;
          background-color: #dd2727;
          border-radius: 20%;
          font-size: 0.25rem;
          color: #fff;
        }
        .presell {
          background-color: #2d98f3;
          width: 10%;
          padding: 0.16rem 0.12rem;
          text-align: center;
          border-radius: 20%;
          font-size: 0.25rem;
          color: #fff;
        }
      }
      .tips {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
        font-size: 0.28rem;
        padding-top: 4rem;
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
}
</style>
