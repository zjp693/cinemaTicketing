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
        <el-button type="primary" @click="addUser">添加影院</el-button>
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
          label="影院 ID"
          align="center"
          width="100"
          prop="cinema_id"
        ></el-table-column>
        <el-table-column
          label="影院名"
          align="center"
          show-password
          show-overflow-tooltip
          prop="cinema_name"
        ></el-table-column>

        <el-table-column
          label="手机"
          align="center"
          width="120"
          prop="cinema_phone"
        ></el-table-column>
        <el-table-column
          label="详细地址"
          align="center"
          show-password
          show-overflow-tooltip
          prop="specified_address"
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
    <!--影院弹框-->
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
          :model="Info"
        >
          <el-form-item label="影院名" prop="cinema_name">
            <el-col :span="16">
              <el-input v-model="Info.cinema_name" show-password></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="手机" prop="cinema_phone">
            <el-col :span="16">
              <el-input v-model="Info.cinema_phone" show-password></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="详细地址" prop="specified_address">
            <el-col :span="16">
              <el-input
                type="textarea"
                v-model="Info.specified_address"
                :autosize="{ minRows: 2, maxRows: 4 }"
              ></el-input>
            </el-col>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="manageInfo">确 定</el-button>
          </div></template
        >
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { ElMessage, ElMessageBox } from "element-plus";
import { reactive, ref } from "vue";
import {
  getAdminAddCinema,
  getAdminCinemaList,
  getAdminDeleteCinema,
  getAdminExistCinema,
  getAdminSearchCinema,
} from "@/api/cinema";
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
//影院信息
const Info = ref({});

//弹出框的标题
const dialogTitle = ref("");
//控制是否弹出
const dialogFormVisible = ref(false);
//被删除影院的个数
const number = ref(0);
//endregion

//region 获取影院数据

const news = async () => {
  await getAdminCinemaList().then((res) => {
    // 过滤的被删除的数据
    if (res.status === 200) {
      const date = res.data.filter((item) => {
        return item.state === 1;
      });
      number.value = res.total - date.length;
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
  if (searchInput.value === undefined) return;
  await getAdminSearchCinema(searchInput.value).then((res) => {
    console.log(res);
    if (res.status == 200) {
      tableData.value = res.data;
      total.value = res.total;
    }
  });
};
//endregion

//region 添加影院
const addUser = () => {
  dialogTitle.value = "添加影院";
  Info.value = {};
  dialogFormVisible.value = true;
};

//取消
const cancel = () => {
  dialogFormVisible.value = false;
  Info.value = {};
};
//确定
const manageInfo = async () => {
  dialogFormVisible.value = false;

  if (dialogTitle.value === "添加影院") {
    if (Info.value == []) {
      //添加影院
      await getAdminAddCinema(Info.value).then((res) => {
        //添加成功的提示
        if (res.status === 200) {
          //  刷新数据
          news();
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
      });
    } else {
      ElMessage({
        message: "请输入必选项",
        type: "error",
      });
    }
  }
  if (dialogTitle.value === "编辑影院信息") {
    console.log(Info.value);
    await getAdminExistCinema(Info.value).then((res) => {
      console.log(res);
      if (res.status == 200) {
        //  刷新数据
        news();
        ElMessage({
          message: res.message,
          type: "success",
        });
      }
    });
  }
};
//表单校验规则
let checkName = (rule, value, callback) => {
  if (!value) {
    callback(new Error("影院名不能为空！"));
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
let checkWord = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入详细地址"));
  } else {
    callback();
  }
};

const rules = reactive({
  cinema_name: [
    { required: true, message: "请输入影院名", trigger: "blur" },
    { validator: checkName, trigger: "blur" },
  ],
  cinema_phone: [
    { required: true, message: "请输入手机号码", trigger: "blur" },
    { validator: checkPhone, trigger: "blur" },
  ],
  specified_address: [
    { required: true, message: "请输入详细地址", trigger: "blur" },
    { validator: checkWord, trigger: "blur" },
  ],
});
//编辑
const handleEdit = (index, row) => {
  // console.log(index, row);
  dialogTitle.value = "编辑影院信息";
  dialogFormVisible.value = true;
  Info.value = row;
};
//删除
const handleDelete = (index, row) => {
  // console.log(index, row.user_id);
  ElMessageBox.confirm("此操作将永久删除该影院所有信息, 是否继续？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      console.log(row.cinema_id);
      getAdminDeleteCinema(row.cinema_id).then((res) => {
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
        message: "取消删除影院",
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
  padding-left: calc(5px + 14px + 12px);
}
</style>
