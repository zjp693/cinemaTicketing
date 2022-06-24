<template>
  <div id="movie-detail">
    <div class="top">
      <span class="icon-back" @click="router.go(-1)"></span>
      <span class="name">{{ movieDetail.name }}</span>
    </div>
    <div class="info">
      <img :src="server + movieDetail.poster" alt="" />
      <div class="describe">
        <div class="name">{{ movieDetail.name }}</div>
        <div class="small type">类型：{{ movieDetail.type }}</div>
        <div class="small ellipsis">主演：{{ movieDetail.actor }}</div>
        <div class="small play-time">片长：{{ movieDetail.movie_long }}</div>
        <div class="small show-time">
          上映：{{ movieDetail.public_date }}上映
        </div>
      </div>
    </div>
    <div class="action">
      <div
        class="btn"
        :class="{ active: !notWishMovie }"
        @click="wishBtnHandle"
      >
        <span class="icon-like-fill"></span><span>想看</span>
      </div>
    </div>
    <div class="public-praise">
      <div class="header">
        <div class="title">口碑</div>
        <div class="wish" v-if="isShowMovie">
          <span v-if="movieDetail.wish_num"
            >{{ movieDetail.wish_num }}人想看</span
          >
          <span v-else>暂无想看</span>
        </div>
      </div>
      <div class="mark" v-if="isShowMovie">
        <div class="left">
          <el-rate v-model="starValue" size="small" allow-half disabled />
        </div>
        <div class="right">
          <div class="score">
            {{ averageScore ? averageScore : 0 }}<span class="small">分</span>
          </div>
          <div class="score-people">
            {{ commentNum ? commentNum : "暂无" }}人评
          </div>
        </div>
      </div>
      <div class="wish" v-else>
        <span class="wish-number"
          ><span
            v-if="movieDetail.wish_num"
            style="
              font-family: PingFangSC-Regular, Hiragana Sans GB, sans-serif;
              font-size: 0.6rem;
            "
            >{{ movieDetail.wish_num }}</span
          ><span v-else>暂无</span></span
        >人想看
      </div>
    </div>
    <div class="intro">
      <div class="title">简介</div>
      <div class="content">
        {{ movieDetail.intro }}
      </div>
    </div>
    <div class="comment">
      <div class="header">
        <span class="title">评论</span
        ><span class="join" @click="watchedBtnHandle">参与评论</span>
      </div>
      <div class="content">
        <div class="comment-container" v-if="currentUserCommentDate.length">
          <span class="title">我的讨论</span>
          <div class="comment-item">
            <div class="left">
              <img :src="server + currentUserCommentDate[0].avatar" alt="" />
            </div>
            <div class="right">
              <div class="user-name">
                {{ currentUserCommentDate[0].user_name }}
              </div>
              <div class="scored">
                给这部作品打了{{ currentUserCommentDate[0].user_score }}分
              </div>
              <div class="comment-content">
                {{ currentUserCommentDate[0].comment_content }}
              </div>
              <div class="bottom">
                <!--                {{-->
                <!--                  formatCommentDate()-->
                <!--                }}-->
                <span class="comment-date">{{
                  currentUserCommentDate[0].comment_date
                }}</span>

                <span
                  class="support"
                  @click="
                    supportBtnHandle(currentUserCommentDate[0].comment_id)
                  "
                  :class="{
                    active: userIsSupportComment(
                      currentUserCommentDate[0].support_user
                    ),
                  }"
                  ><span class="icon-support"></span
                  ><span class="number">{{
                    currentUserCommentDate[0].support_num
                  }}</span></span
                >
              </div>
            </div>
          </div>
        </div>
        <div
          class="comment-container comment-list-container"
          v-if="otherUserCommentDate.length"
        >
          <span class="title">精选评论</span>
          <div
            class="comment-item"
            v-for="(item, index) in otherUserCommentDate"
            :key="index"
          >
            <div class="left"><img :src="server + item.avatar" alt="" /></div>
            <div class="right">
              <div class="user-name">{{ item.user_name }}</div>
              <div class="scored">给这部作品打了{{ item.user_score }}分</div>
              <div class="comment-content">{{ item.comment_content }}</div>
              <div class="bottom">
                <span class="comment-date">{{
                  formatCommentDate(item.comment_date)
                }}</span>
                <span
                  class="support"
                  @click="supportBtnHandle(item.comment_id)"
                  :class="{ active: userIsSupportComment(item.support_user) }"
                  ><span class="icon-support"></span
                  ><span class="number">{{ item.support_num }}</span></span
                >
              </div>
            </div>
          </div>
        </div>
        <span
          class="tips"
          v-if="!currentUserCommentDate.length && !otherUserCommentDate.length"
          >暂无评论！</span
        >
      </div>
    </div>
    <div class="buy">
      <div
        class="btn"
        @click="
          router.push({
            path: '/select_cinema',
            query: { movie_id: route.query.movie_id },
          })
        "
      >
        特惠购票
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getMovieDetail, getisWishMovie, getWishMovies } from "@/api/movie";
import { Toast } from "vant";
import {
  getAllUserComment,
  getCommentByID,
  UpdateUserSupport,
} from "@/api/user";
import moment from "moment";
import { formatDate } from "@/common/util/formatDate";

const router = useRouter();
const route = useRoute();

//#region 定义所需要的数据
// 想看
const starValue = ref(null);
// 评分
const averageScore = ref(0);
// 评论数
const commentNum = ref(0);
//服务器地址
const server = ref("http://localhost:3001");
// 电影数据
const movieDetail = ref([]);
// 电影是否上映
const isShowMovie = ref(false);
// 是否想看
const notWishMovie = ref(true);
//当前我的评论
const currentUserCommentDate = ref([]);
//精选评论
const otherUserCommentDate = ref([]);
const id = ref(route.query.movie_id);
// 加载电影详情
const loadMovieDetail = () => {
  //电影信息
  getMovieDetail(id.value).then((res) => {
    if (res.status == 200) {
      movieDetail.value = res.data[0];
      // console.log(res);
      // 判断电影是否上映
      new Date() - new Date(movieDetail.value.public_date) >= 0
        ? (isShowMovie.value = true)
        : (isShowMovie.value = false);
      if (isShowMovie.value) {
        // 评分
        starValue.value = movieDetail.value.score * (0.5).toFixed(1);
      }
      if (sessionStorage.getItem("user_id"))
        getisWishMovie(
          sessionStorage.getItem("user_id"),
          route.query.movie_id
        ).then((res) => {
          // console.log(res);
          if (res.status == 200) {
            notWishMovie.value = false;
          } else {
            notWishMovie.value = true;
          }
        });
    }
  });
  //通过审核的评论
  getAllUserComment(route.query.movie_id).then((res) => {
    // console.log(res.data);
    if (res.status == 200) {
      let currentIndex = -1;
      let sum = 0;
      //评论数
      commentNum.value = res.data.length;
      //遍历评论数
      res.data.forEach((item, index) => {
        // console.log(item, index);
        if (item.user_id == sessionStorage.getItem("user_id")) {
          currentIndex = index;
        }
        sum += item.user_score;
      });

      //   //评分
      averageScore.value = sum / res.data.length;
      if (averageScore.value !== 0 && averageScore.value !== 10) {
        averageScore.value = averageScore.value.toFixed(1);
      }
      //   //想看
      starValue.value = averageScore.value * 0.5;
      if (currentIndex === -1) {
        currentUserCommentDate.value = [];
      } else {
        currentUserCommentDate.value = res.data.splice(currentIndex, 1);
        currentUserCommentDate.value.forEach((item) => {
          currentUserCommentDate.value.comment_date = formatCommentDate(
            item.comment_date
          );
        });
        // console.log(currentUserCommentDate.value);
      }
      otherUserCommentDate.value = res.data;
      otherUserCommentDate.value.sort((a, b) => {
        return b.support_num - a.support_num;
      });
    }
  });
};
loadMovieDetail();
//用户想看电影
const wishBtnHandle = () => {
  getWishMovies(
    sessionStorage.getItem("user_id"),
    id.value,
    notWishMovie.value
  ).then((res) => {
    // console.log(res);
    if (res.status == 200) {
      notWishMovie.value = !notWishMovie.value;
      Toast.success(res.message);
      // console.log(notWishMovie.value);
    }
  });
};
//参与评论
const watchedBtnHandle = () => {
  //用户已登录
  if (sessionStorage.getItem("user_id")) {
    router.push({
      path: "/comment_panel",
      query: { movie_id: route.query.movie_id },
    });
  } else {
    router.push("/login");
  }
};
// //点赞
const supportBtnHandle = async (commentId) => {
  // console.log(commentId);
  if (sessionStorage.getItem("user_id")) {
    await getCommentByID(commentId).then((res) => {
      //点赞的用户 点赞数
      let supportUser, supportNum;
      if (res.status === 200) {
        res.data.forEach((item) => {
          if (item.support_user) {
            //有点赞数据
            supportUser = JSON.parse(item.support_user);
            //当前用户已点赞
            if (
              supportUser.indexOf(Number(sessionStorage.getItem("user_id"))) >
              -1
            ) {
              //取消点赞
              supportUser.splice(
                supportUser.indexOf(Number(sessionStorage.getItem("user_id"))),
                1
              );
              //更新点赞数
              supportNum = supportUser.length;
              // 无点赞数则将记录用户id的数组为null
              if (!supportUser.length) {
                supportUser = null;
              }
            }
          } else {
            //无点赞数据
            supportUser = [];
            supportUser.push(Number(sessionStorage.getItem("user_id")));
            supportNum = supportUser.length;
          }
        });
        //判断是否被点赞
        if (supportUser) {
          supportUser = JSON.stringify(supportUser);
        }
        UpdateUserSupport(commentId, supportNum, supportUser).then((res) => {
          if (res.status === 200) {
            //获取所有用户通过审核的评论
            loadMovieDetail();
          }
        });
      }
    });
  }
};

//判断用户是否已点赞
//判断用户是否点赞
const userIsSupportComment = (supportStrArr) => {
  if (
    supportStrArr &&
    JSON.parse(supportStrArr).indexOf(
      Number(sessionStorage.getItem("user_id"))
    ) > -1
  ) {
    return true;
  } else {
    return false;
  }
};
//处理评论日期
const formatCommentDate = (date) => {
  return formatDate(
    new Date(moment(date).format("YYYY-MM-DD HH:mm:ss")),
    false
  );
};
//#endregion
</script>

<style lang="scss" scoped>
#movie-detail {
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #242342 0%, #11182b 100%);
  color: #fff;
  font-size: 0.3125rem;
  overflow: hidden;
  overflow-y: scroll;
  .top {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.2rem;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #242342;
    z-index: 999;
    .icon-back {
      font-size: 0.4rem;
      position: absolute;
      left: 0.3rem;
    }
  }
  .info {
    width: 90%;
    padding: 0.2rem;
    box-sizing: border-box;
    height: 3rem;
    margin: 1rem auto 0;
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #333;
    border-radius: 0.2rem;
    img {
      width: 28%;
      box-sizing: border-box;
      border-radius: 0.05rem;
    }
    .describe {
      width: 62%;
      .name {
        font-size: 0.345rem;
        font-weight: 700;
        margin-bottom: 0.12rem;
      }
      .small {
        font-size: 0.28rem;
        margin-bottom: 0.12rem;
      }
    }
  }
  .action {
    width: 90%;
    height: 1rem;
    margin: 0 auto;
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 0.2rem;
    .btn {
      font-size: 0.4rem;
      width: 36%;
      height: 0.6rem;
      border-radius: 0.3rem;
      background-color: #ffb400;
      display: flex;
      justify-content: center;
      align-items: center;
      &.active {
        background-color: #fff1d4;
        color: #fe9a02;
      }
      span:last-child {
        font-size: 0.25rem;
        margin-left: 0.1rem;
      }
    }
  }
  .public-praise {
    width: 90%;
    height: auto;
    margin: 0.2rem auto;
    box-sizing: border-box;
    padding: 0.25rem;
    background-color: #3a3a52;
    border-radius: 0.2rem;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.25rem;
      .title {
        font-weight: bolder;
      }
      .wish {
        font-size: 0.25rem;
        padding: 0.04rem 0;
      }
    }
    .mark {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      .right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .score {
          font-size: 0.68rem;
          font-weight: bolder;
          color: #ffb400;
          margin-bottom: 0.1rem;
          .small {
            font-size: 0.25rem;
          }
        }
        .score-people {
          font-size: 0.2rem;
          color: #ffb400;
        }
      }
      .left {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ffb400;
        i {
          font-size: 0.6rem;
        }
      }
    }
    .wish {
      font-size: 0.4rem;
      padding: 0.2rem 0;
      vertical-align: text-bottom;
      line-height: 0.48rem;
      letter-spacing: 0.04rem;
      .wish-number {
        font-size: 0.48rem;
        color: #ffb400;
        font-weight: bolder;
      }
    }
  }
  .intro {
    width: 90%;
    height: auto;
    margin: 0.2rem auto;
    box-sizing: border-box;
    padding: 0.25rem;
    background-color: #3a3a52;
    border-radius: 0.2rem;
    .title {
      font-weight: bolder;
      color: #fff;
      margin-bottom: 0.25rem;
    }
    .content {
      text-align: justify;
      font-size: 0.28rem;
      line-height: 0.4rem;
    }
  }
  .comment {
    width: 100%;
    box-sizing: border-box;
    padding: 0.25rem;
    height: auto;
    margin: 0 auto;
    background-color: #fff;
    color: #333;
    border-top-left-radius: 0.2rem;
    border-top-right-radius: 0.2rem;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 1rem;
      .title {
        font-weight: bolder;
        padding: 0.25rem;
      }
      .join {
        padding: 0.14rem;
        background-color: #dd2727;
        margin-right: 0.25rem;
        color: #fff;
        border-radius: 0.12rem;
        font-size: 0.24rem;
      }
    }
    .content {
      width: 100%;
      padding: 0.25rem;
      padding-bottom: 0;
      box-sizing: border-box;
      margin-bottom: 1rem;
      .comment-container {
        width: 100%;
        .title {
          font-weight: lighter;
          font-size: 0.25rem;
          padding-bottom: 0.25rem;
        }
        .comment-item {
          display: flex;
          padding-top: 0.25rem;
          .left {
            width: 10%;
            height: 10%;
            border-radius: 50%;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .right {
            margin: 0 0.25rem 0.25rem;
            font-size: 0.3125rem;
            width: 100%;
            .user-name {
              font-size: 0.25rem;
              font-weight: bolder;
              margin-bottom: 0.1rem;
            }
            .scored {
              font-size: 0.2rem;
              font-weight: lighter;
              margin-bottom: 0.1rem;
            }
            .comment-content {
              font-size: 0.28rem;
              line-height: 0.4rem;
              margin-bottom: 0.1rem;
              text-align: justify;
            }
            .bottom {
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 0.28rem;
              .comment-date {
                font-size: 0.24rem;
              }
              .support {
                padding: 0.1rem;
                border: 0.01rem solid #ccc;
                border-radius: 0.24rem;
                &.active {
                  color: #dd2727;
                  border: 0.01rem solid #dd2727;
                }
                .number {
                  font-weight: lighter;
                  margin-left: 0.1rem;
                  font-size: 0.25rem;
                }
              }
            }
          }
        }
      }
      .tips {
        font-size: 0.25rem;
      }
    }
  }
  .buy {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 1rem;
    background-color: #fff;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    .btn {
      width: 90%;
      height: 0.8rem;
      background-color: #dd2727;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0.4rem;
      font-weight: lighter;
    }
  }
}
</style>
