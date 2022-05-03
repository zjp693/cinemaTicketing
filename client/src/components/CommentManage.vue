<template>
  <div id="user-manage">
    <!--  搜索-->
    <div class="top">
      <el-col :span="12">
        <el-input
          placeholder="请输入内容"
          v-model="searchInput"
          class="input-with-select"
          clearable
          style="width: 100%"
        >
          <template #append>
            <el-button @click="searchs" @keyup="searchs">
              <el-icon><search /></el-icon> 搜索</el-button
            >
          </template>
        </el-input>
      </el-col>
    </div>
    <!--表格-->
    <div class="user-table">
      <el-table
        border
        :data="
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
      >
        <el-table-column
          label="评论 ID"
          align="center"
          width="100"
          prop="comment_id"
        >
        </el-table-column>
        <el-table-column
          label="用户名"
          width="120"
          show-overflow-tooltip
          prop="user_name"
        >
        </el-table-column>
        <el-table-column label="电影名" show-overflow-tooltip prop="name">
        </el-table-column>
        <el-table-column
          label="评论时间"
          show-overflow-tooltip
          prop="comment_date"
        >
        </el-table-column>
        <el-table-column
          label="用户评分"
          width="80"
          align="center"
          prop="user_score"
        >
        </el-table-column>
        <el-table-column
          label="评论内容"
          show-overflow-tooltip
          prop="comment_content"
        >
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template #default="scope">
            <el-button
              v-if="!scope.row.is_pass"
              size="small"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
              >通过</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--    分页-->
    <div class="block" v-if="tableData.length">
      <el-pagination
        background
        layout="prev, pager, next"
        v-model:page-size="pageSize"
        v-model:current-page="currentPage"
        :current-page="1"
        :total="total"
      />
    </div>
  </div>
</template>

<script setup>
import { ElMessage, ElMessageBox } from "element-plus";
import { ref } from "vue";
import {
  getAdminCommentList,
  getAdminSearchComment,
  getAdminDeleteComment,
} from "@/api/comment";
//region 定义的数据

//表格所需数据
const tableData = ref([]);
//数据总条数
const total = ref();
//一页显示多少条数据
const pageSize = ref(10);
// /当前页数
const currentPage = ref(1);
//搜索输入的内容
const searchInput = ref();

//被注销影厅的个数
const number = ref(0);

//endregion
//region 获取影厅数据

const news = async () => {
  //表格数据
  await getAdminCommentList().then((res) => {
    console.log(res);
    // 过滤的被注销的数据
    if (res.status === 200) {
      const date = res.data.filter((item) => {
        return item.state == 1;
      });
      console.log(date);
      number.value = res.total - date.length;
      tableData.value = date;
      total.value = res.total - number.value;
    }
  });
};
news();

//endregion

//region 搜索
const searchs = async () => {
  await getAdminSearchComment(searchInput.value).then((res) => {
    if (res.status == 200) {
      tableData.value = res.data;
      total.value = res.total;
    }
  });
};
//endregion

//region
//注销
const handleDelete = (index, row) => {
  // console.log(index, row.user_id);
  ElMessageBox.confirm("此操作将永久删除该影厅所有信息, 是否继续？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      getAdminDeleteComment(row.comment_id).then((res) => {
        if (res.status == 200) {
          //  刷新数据
          news();
          ElMessage({
            type: "success",
            message: res.message,
          });
        }
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消删除评论",
      });
    });
};
//endregion
</script>

<style scoped>
.user-table {
  width: 90%;
  min-width: 900px;
  margin: 0 auto 30px;
}
.top {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
  margin-bottom: 30px;
}
.block {
  display: flex;
  justify-content: center;
}
.el-dialog__body {
  text-align: center;
}
.el-dialog__body .el-form-item {
  padding-left: 20%;
}
:deep(.el-input__inner) {
  padding-left: calc(5px + 14px + 12px) !important;
}
</style>
