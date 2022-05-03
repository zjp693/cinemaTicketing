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
        <el-button type="primary" @click="addUser">添加影厅</el-button>
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
          label="影厅 ID"
          align="center"
          width="100"
          prop="hall_id"
        ></el-table-column>
        <el-table-column
          label="影院名"
          align="center"
          show-overflow-tooltip
          prop="cinema_name"
        ></el-table-column>

        <el-table-column
          label="影院号码"
          align="center"
          width="120"
          prop="cinema_phone"
        ></el-table-column>
        <el-table-column
          label="影厅名"
          align="center"
          show-overflow-tooltip
          prop="name"
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
        :current-page="1"
        :total="total"
      />
    </div>
    <!--影厅弹框-->
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
              <el-select
                v-model="Info.cinema_id"
                placeholder="请选择影院"
                style="width: 100%"
              >
                <el-option
                  v-for="item in options"
                  :key="item.cinema_id"
                  :label="item.cinema_name"
                  :value="item.cinema_id"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-form-item>

          <el-form-item label="影厅名" prop="name">
            <el-col :span="16">
              <el-input v-model="Info.name"></el-input>
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
import { getDeleteUser, getEditUser } from "@/api/user";
import { ElMessage, ElMessageBox } from "element-plus";
import { reactive, ref } from "vue";
import {
  getAdminMovieHallList,
  getAdminSearchMovieHall,
  getAdminAddMovieHall,
  getAdminAllCinema,
} from "@/api/moviehall";
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
//影厅信息
const Info = ref({});

//弹出框的标题
const dialogTitle = ref("");
//控制是否弹出
const dialogFormVisible = ref(false);
//被注销影厅的个数
const number = ref(0);
const options = ref([]);

//endregion
//region 获取影厅数据

const news = async () => {
  //表格数据
  await getAdminMovieHallList().then((res) => {
    // 过滤的被注销的数据
    if (res.status === 200) {
      const date = res.data.filter((item) => {
        return item.state === 1;
      });
      number.value = res.total - date.length;
      tableData.value = date;
      total.value = res.total - number.value;
    }
  });
  //获取影院名称
  await getAdminAllCinema().then((res) => {
    console.log(res);
    if (res.status === 200) {
      options.value = res.data;
    }
  });
};
news();

//endregion

//region 搜索
const searchs = async () => {
  console.log(11);
  if (searchInput.value === undefined) return;
  await getAdminSearchMovieHall(searchInput.value).then((res) => {
    // console.log(res);
    if (res.status == 200) {
      tableData.value = res.data;
      total.value = res.total;
    }
  });
};
//endregion

//region 添加影厅
const addUser = () => {
  dialogTitle.value = "添加影厅";
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

  if (dialogTitle.value === "添加影厅") {
    //添加影厅
    await getAdminAddMovieHall(Info.value).then((res) => {
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
  }
  if (dialogTitle.value === "编辑影厅信息") {
    // console.log(Info.value);
    await getEditUser(Info.value).then((res) => {
      // console.log(res);
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
let checkCinema_name = (rule, value, callback) => {
  if (!value) {
    callback(new Error("影院名不能为空！"));
  } else {
    callback();
  }
};

let checkName = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入影厅"));
  } else {
    callback();
  }
};

const rules = reactive({
  cinema_name: [
    { required: true, message: "请输入影院名", trigger: "blur" },
    { validator: checkCinema_name, trigger: "blur" },
  ],
  name: [
    { required: true, message: "请输入影厅名", trigger: "blur" },
    { validator: checkName, trigger: "blur" },
  ],
});
//编辑
const handleEdit = (index, row) => {
  // console.log(index, row);
  dialogTitle.value = "编辑影厅信息";
  dialogFormVisible.value = true;
  Info.value = row;
};
//注销
const handleDelete = (index, row) => {
  // console.log(index, row.user_id);
  ElMessageBox.confirm("此操作将永久删除该影厅所有信息, 是否继续？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      getDeleteUser(row.user_id).then((res) => {
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
        message: "取消注销影厅",
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
