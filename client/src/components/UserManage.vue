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
      <el-col :span="2" :offset="1">
        <el-button type="primary" @click="addUser">添加用户</el-button>
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
      <el-pagination
        background
        layout="prev, pager, next"
        v-model:page-size="pageSize"
        v-model:current-page="currentPage"
        :total="total"
      />
    </div>
    <!--用户弹框-->
    <div>
      <el-dialog
        :title="dialogTitle"
        v-model="dialogFormVisible"
        :append-to-body="false"
        v-if="dialogFormVisible"
        :show-close="false"
      >
        <el-form
          label-position="right"
          :rules="rules"
          label-width="80px"
          :model="userInfo"
        >
          <el-form-item label="用户名" prop="user_name">
            <el-col :span="16">
              <el-input v-model="userInfo.user_name"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="头像">
            <el-col :span="16">
              <img
                :src="
                  userInfo.avatar
                    ? userInfo.avatar
                    : server + '/images/avatar/monkey.png'
                "
                ref="previewImg"
                alt=""
                style="width: 80px; height: 80px"
              />
              <div
                class="el-upload__tip"
                style="position: absolute; left: 0; top: 118px; height: 32px"
              >
                只能上传jpg/png文件，且不超过2M（默认为系统头像）
              </div>
              <div style="position: relative; height: 64px">
                <el-button
                  size="small"
                  type="primary"
                  style="position: absolute; left: 0; top: 0; cursor: pointer"
                  >点击上传</el-button
                >

                <input
                  type="file"
                  name="file"
                  id="file"
                  ref="uploadImg"
                  accept="image/png, image/jpeg, image/gif, image/jpg"
                  style="
                    position: absolute;
                    left: 0;
                    top: 0;
                    opacity: 0;
                    height: 32px;
                    width: 80px;
                    cursor: pointer;
                  "
                  @change="changeImg"
                />
              </div>
            </el-col>
          </el-form-item>
          <el-form-item label="手机" prop="phone">
            <el-col :span="16">
              <el-input v-model="userInfo.phone"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-col :span="16">
              <el-input v-model="userInfo.password" show-password></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-col :span="16">
              <el-select
                v-model="userInfo.sex"
                placeholder="请选择性别"
                style="width: 100%"
              >
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="生日">
            <el-col :span="16" prop="birthday">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="userInfo.birthday"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="个人签名" prop="sign">
            <el-col :span="16">
              <el-input
                type="textarea"
                v-model="userInfo.sign"
                :autosize="{ minRows: 2, maxRows: 4 }"
              ></el-input>
            </el-col>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="manageUserInfo">确 定</el-button>
          </div></template
        >
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import {
  getAddUser,
  getCurrentPageUser,
  getSearchUser,
  getUpLoadImg,
} from "@/api/user";
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";
//region 定义的数据

//表格所需数据
const tableData = ref([]);
//数据总条数
const total = ref();
//一页显示多少条数据
const pageSize = ref(8);
// /当前页数
const currentPage = ref(1);
//搜索输入的内容
const searchInput = ref();
//用户信息
const userInfo = ref({});
//图片dom
const previewImg = ref();
const uploadImg = ref();
//服务器地址
const server = "http://localhost:3001";
//弹出框的标题
const dialogTitle = ref("");
//控制是否弹出
const dialogFormVisible = ref(false);
//endregion

//region 获取用户数据
getCurrentPageUser().then((res) => {
  if (res.status === 200) {
    tableData.value = res.data;
    total.value = res.total;
  }
});
//endregion

//region 搜索
const searchs = () => {
  if (searchInput.value === undefined) return;
  getSearchUser(searchInput.value).then((res) => {
    console.log(res);
    if (res.status == 200) {
      tableData.value = res.data;
      total.value = res.total;
    }
  });
};
//endregion

//region 添加用户
const addUser = () => {
  dialogTitle.value = "添加用户";
  userInfo.value = {};
  dialogFormVisible.value = true;
};
//上传图片
const changeImg = () => {
  let reader = new FileReader();
  reader.readAsDataURL(uploadImg.value.files[0]); //发起异步请求
  reader.onload = function (e) {
    //读取完成后，将结果赋值给img的src
    previewImg.value.src = e.target.result;
  };
};
//取消
const cancel = () => {
  dialogFormVisible.value = false;
  userInfo.value = {};
};
//确定
const manageUserInfo = () => {
  dialogFormVisible.value = false;
  let form = new FormData();
  form.append("file", uploadImg.value.files[0]);
  getUpLoadImg(form).then((res) => {
    if (res.status == 200) {
      userInfo.value.avatar = res.data;
    }
  });
  getAddUser(userInfo.value).then((res) => {
    console.log(res);
    //添加成功的提示
    if (res.status === 200) {
      getCurrentPageUser();
      ElMessage({
        message: res.message,
        type: "success",
      });
    } else {
      ElMessage({
        message: res.message,
        type: "warning",
      });
    }
    //  刷新数据
    getCurrentPageUser().then((res) => {
      if (res.status == 200) {
        tableData.value = res.data;
        total.value = res.total;
      }
    });
  });
};
//表单校验规则
let checkName = (rule, value, callback) => {
  if (!value) {
    callback(new Error("用户名不能为空！"));
  } else {
    callback();
  }
};
let checkPhone = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入手机号码"));
  } else {
    if (/^1[3|4|5|6|7|8][0-9]{9}$/.test(value)) {
      callback();
    } else {
      callback(new Error("请输入正确格式的手机号码"));
    }
  }
};
let checkPassword = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入密码"));
  } else {
    callback();
  }
};

const rules = reactive({
  user_name: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { validator: checkName, trigger: "blur" },
  ],
  phone: [
    { required: true, message: "请输入手机号码", trigger: "blur" },
    { validator: checkPhone, trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { validator: checkPassword, trigger: "blur" },
  ],
});
//编辑
const handleEdit = (index, row) => {
  console.log(index, row);
  dialogTitle.value = "编辑用户信息";
  dialogFormVisible.value = true;
  userInfo.value = row;
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
  padding-left: calc(5px + 14px + 12px);
}
</style>
