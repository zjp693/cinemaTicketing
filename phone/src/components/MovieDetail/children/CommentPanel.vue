<template>
  <div id="comment-panel">
    <div class="top">
      <span class="icon-close" @click="router.go(-1)"></span>
      <span class="title">看过</span>
      <span class="btn" @click="commentBtnHandle">发布</span>
    </div>
    <div class="mark">
      <span class="score"
        ><span class="number">{{ score }}</span
        >分</span
      >
      <span class="text">{{ handleScoreText }}</span>
      <el-rate v-model="starValue" allow-half @change="changeScore" />
    </div>
    <textarea
      class="comment-text"
      placeholder="好看吗？快来写下你的感受吧!"
      v-model="textarea"
    >
    </textarea>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import moment from "moment";
import { ref } from "vue";
import { getUserComment, updateUserComment } from "@/api/user";
import { Toast } from "vant";
const router = useRouter();
const route = useRoute();
const textarea = ref("");
const score = ref(0);
const starValue = ref(0);
//回显评论
getUserComment(sessionStorage.getItem("user_id"), route.query.movie_id).then(
  (res) => {
    console.log(res.data[0]);
    if (res.status == 200) {
      starValue.value = res.data[0].user_score * 0.5;
      score.value = res.data[0].user_score;
      textarea.value = res.data[0].comment_content;
    }
  }
);
//发布
const commentBtnHandle = () => {
  if (textarea.value) {
    let comment_date = moment().format("YYYY-MM-DD HH:mm:ss");
    updateUserComment(
      sessionStorage.getItem("user_id"),
      route.query.movie_id,
      score.value,
      textarea.value,
      comment_date
    ).then((res) => {
      console.log(res);
      if (res.status == 200) {
        Toast.success("评论成功，待管理员审核");
        router.go(-1);
      }
    });
  } else {
    Toast.fail("请输入评论内容");
  }
};
//
const changeScore = (grade) => {
  console.log(grade);
  score.value = grade * 2;
};
//计算分数

// //处理分数文本
// const handleScoreText = computed((score) => {
//   if (score.value === 1 || score.value === 2) {
//     return "超烂啊";
//   } else if (score.value === 3 || score.value === 4) {
//     return "比较差";
//   } else if (score.value === 5 || score.value === 6) {
//     return "一般般";
//   } else if (score.value === 7 || score.value === 8) {
//     return "还不错";
//   } else if (score.value === 9 || score.value === 10) {
//     return "棒极了";
//   }
// });
</script>

<style lang="scss" scoped>
#comment-panel {
  width: 100%;
  background-color: #fff;
  font-size: 0.3125rem;
  .top {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 1rem;
    background-color: #f9f9f9;
    position: relative;
    .icon-close {
      position: absolute;
      left: 0;
      font-size: 0.6rem;
      color: #888;
      padding: 0.25rem;
      font-weight: lighter;
    }
    .title {
      font-size: 0.3rem;
      letter-spacing: 0.04rem;
    }
    .btn {
      position: absolute;
      right: 0.25rem;
      padding: 0.16rem 0.24rem;
      background-color: #dd2727;
      color: white;
      border-radius: 0.1rem;
      font-size: 0.25rem;
    }
  }
  ::v-deep(.mark) {
    width: 100%;
    height: 100%;
    padding: 0.25rem;
    padding-bottom: 0.5rem;
    box-sizing: border-box;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    font-size: 0.25rem;
    border-bottom: 0.0125rem solid #f1f1f1;
    .score {
      color: #ffb400;
      padding: 0.25rem;
      .number {
        font-size: 0.8rem;
      }
    }
    .text {
      margin-bottom: 0.3rem;
      color: #888;
    }
    .el-rate {
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        font-size: 0.8rem;
      }
    }
  }
  .comment-text {
    font-size: 0.3125rem;
    line-height: 0.4rem;
    padding: 0.4rem;
    text-align: justify;
    width: 100%;
    height: 6rem;
    box-sizing: border-box;
    border: none;
    outline: none;
    resize: none;
  }
}
</style>
