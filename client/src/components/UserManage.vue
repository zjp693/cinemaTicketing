<template>
  <div id="user-manage">
    <!--  搜索-->
    <div class="top">
      <el-col :span="12">
        <el-input
          placeholder="请输入内容"
          v-model="input"
          class="input-with-select"
          clearable
          style="width: 100%"
        >
          <template #append>
            <el-button icon="el-icon-search" @click="search">搜索</el-button>
          </template>
        </el-input>
      </el-col>
      <el-col :span="2" :offset="1">
        <el-button type="primary" @click="addUser">添加用户</el-button>
      </el-col>
    </div>
    <!--表格-->
    <div class="user-table">
      <el-table border :data="tableData">
        <el-table-column
          label="用户 ID"
          align="center"
          width="100"
          prop="user_id"
        ></el-table-column>
        <el-table-column
          label="用户名"
          align="center"
          width="120"
          show-overflow-tooltip
          prop="user_name"
        ></el-table-column>
        <el-table-column
          label="性别"
          align="center"
          width="60"
          prop="sex"
        ></el-table-column>
        <el-table-column
          label="手机"
          align="center"
          width="120"
          prop="phone"
        ></el-table-column>
        <el-table-column
          label="个人签名"
          show-overflow-tooltip
          prop="sign"
        ></el-table-column>
        <el-table-column align="center" width="200" label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >注销</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--    分页-->
    <div class="block" v-if="tableData.length">
      <!--      <el-pagination-->
      <!--        @current-change="currentChange"-->
      <!--        background-->
      <!--        layout="prev, pager, next"-->
      <!--        :page-size="8"-->
      <!--        :total="111"-->
      <!--      ></el-pagination>-->
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="3"
        :total="total"
      />
    </div>
  </div>
</template>

<script setup>
import { getCurrentPageUser } from "@/api/user";
import { ref } from "vue";
//表格数据
const tableData = ref([]);
const total = ref();

getCurrentPageUser({ currentPage: 1, pageSize: 5, input: "" }).then((res) => {
  console.log(res);
  if (res.status == 200) {
    tableData.value = res.data;
    total.value = res.total;
  }
});
</script>

<style>
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
  text-align: center;
}
.el-dialog__header {
  text-align: center;
}
.el-dialog__body .el-form-item {
  padding-left: 20%;
}
</style>
