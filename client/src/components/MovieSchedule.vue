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
              <el-icon>
                <search />
              </el-icon>搜索
            </el-button>
          </template>
        </el-input>
      </el-col>

      <el-col :span="2" :offset="1">
        <el-button type="primary" @click="addUser">安排电影</el-button>
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
        <el-table-column label="排片 ID" align="center" width="80" prop="movie_id"></el-table-column>
        <el-table-column label="电影排片名" align="center" show-overflow-tooltip prop="name"></el-table-column>
        <el-table-column label="影院名" align="center" show-overflow-tooltip prop="cinema_name"></el-table-column>
        <el-table-column label="放映大厅" align="center" show-overflow-tooltip prop="hall_name"></el-table-column>
        <el-table-column
          width="120"
          label="放映日期"
          align="center"
          show-overflow-tooltip
          prop="show_date"
        ></el-table-column>
        <el-table-column
          width="120"
          label="放映时间"
          align="center"
          show-overflow-tooltip
          prop="show_time"
        ></el-table-column>
        <el-table-column
          label="售价（元）"
          width="100"
          align="center"
          show-overflow-tooltip
          prop="price"
        ></el-table-column>

        <el-table-column align="center" width="100" label="操作">
          <template #default="scope">
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    <!--电影排片弹框-->
    <div>
      <el-dialog
        :title="dialogTitle"
        v-model="dialogFormVisible"
        :append-to-body="false"
        v-if="dialogFormVisible"
        :show-close="false"
      >
        <el-form label-position="right" :rules="rules" label-width="80px" :model="movieInfo">
          <el-form-item label="电影名" prop="movie_id">
            <el-col :span="12">
              <el-select
                v-model="movieInfo.movie_id"
                placeholder="请选择"
                style="width: 100%"
                @change="changeMovie"
              >
                <el-option
                  v-for="item in movieName"
                  :key="item.movie_id"
                  :label="item.name"
                  :value="item.movie_id"
                ></el-option>
              </el-select>
            </el-col>
          </el-form-item>

          <el-form-item label="影院" prop="cinema_id">
            <el-col :span="12">
              <el-select
                v-model="movieInfo.cinema_id"
                placeholder="请选择"
                style="width: 100%"
                @change="changeCinema"
              >
                <el-option
                  v-for="item in cinemaName"
                  :key="item.cinema_id"
                  :label="item.cinema_name"
                  :value="item.cinema_id"
                ></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="影厅" prop="hall_name">
            <el-col :span="12">
              <el-select v-model="movieInfo.hall_name" placeholder="请选择" style="width: 100%">
                <el-option
                  v-for="item in cinemaList"
                  :key="item"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="上映日期" prop="public_date">
            <el-col :span="12">
              <el-date-picker
                v-model="movieInfo.public_date"
                type="date"
                readonly
                style="width: 100%"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="放映日期" prop="show_date">
            <el-col :span="12">
              <el-date-picker
                type="date"
                placeholder="选择时间"
                v-model="movieInfo.show_date"
                style="width: 100%"
                :disabled-date="disabledDate"
                value-format="YYYY-MM-DD"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="放映时间" prop="show_time">
            <el-col :span="12">
              <el-select v-model="movieInfo.show_time" placeholder="请选择" style="width: 100%">
                <el-option
                  v-for="item in timeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="售价" prop="price">
            <el-col :span="12">
              <el-input
                type="textarea"
                v-model="movieInfo.price"
                :autosize="{ minRows: 2, maxRows: 4 }"
              ></el-input>
            </el-col>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="manageMovieInfo">确 定</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { ElMessage, ElMessageBox } from "element-plus";
import { ref } from "vue";
import {
  getAdminAddArrangemen,
  getAdminArrangementList,
  getAdminDelArrangemen,
  getAdminMovieName,
  getAdminSearchArrangemen,
} from "@/api/arrangement";
import { getAdminAllCinema, getAdminIDCinema } from "@/api/moviehall";
import { getAdminMovieList } from "@/api/movie";
//region 定义的数据

//表格所需数据
const tableData = ref([]);
//数据总条数
const total = ref();
//一页显示多少条数据
const pageSize = ref(Number(10));
// /当前页数
const currentPage = ref(Number(1));
//搜索输入的内容
const searchInput = ref();
//电影排片信息
const movieInfo = ref({});
//弹出框的标题
const dialogTitle = ref("");
//控制是否弹出
const dialogFormVisible = ref(false);
//被注销电影排片的个数
const number = ref(0);
//电影名
let movieName = ref([]);
//影院名
let cinemaName = ref([]);
//放映时间
let timeOptions = ref([
  { label: "08:05", value: "08:05" },
  { label: "12:05", value: "12:05" },
  { label: "16:05", value: "16:05" },
  { label: "20:05", value: "20:05" },
]);
//类型
// console.log(timeOptions);
let cinemaList = ref([]);
//表单校验规则
let checkPrice = (rule, value, callback) => {
  if (!value) {
    callback(new Error("售价不能为空"));
  } else {
    if (/((^[1-9]\d*)|^0)(\.\d{0,2})?$/.test(value)) {
      callback();
    } else {
      callback(new Error("请输入正确格式的售价"));
    }
  }
};
//表单校验规则
const rules = ref({
  name: [{ required: true, message: "电影名不能为空", trigger: "change" }],
  cinema_name: [
    { required: true, message: "影院名不能为空", trigger: "change" },
  ],
  hall_name: [{ required: true, message: "影厅名不能为空", trigger: "change" }],
  show_date: [
    { required: true, message: "放映日期不能为空", trigger: "change" },
  ],
  show_time: [
    { required: true, message: "放映时间不能为空", trigger: "change" },
  ],
  price: [
    { required: true, message: "售价不能为空", trigger: "blur" },
    { validator: checkPrice, trigger: "blur" },
  ],
});
//endregion

//region 获取电影排片数据
const news = async () => {
  await getAdminArrangementList().then((res) => {
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
  await getAdminAllCinema().then((res) => {
    if (res.status == 200) {
      cinemaName.value = res.data;
      // console.log(cinemaName.value);
    }
  });
  await getAdminMovieName().then((res) => {
    if (res.status == 200) {
      movieName.value = res.data;
    }
  });
};
news();
//endregion

//region 搜索
const searchs = async () => {
  if (searchInput.value === undefined) return;
  await getAdminSearchArrangemen(searchInput.value).then((res) => {
    console.log(res);
    if (res.status == 200) {
      tableData.value = res.data;
      total.value = res.total;
    }
  });
};
//endregion

//region 安排电影排片
const addUser = () => {
  dialogTitle.value = "安排电影排片";
  movieInfo.value = {};
  dialogFormVisible.value = true;
};

//取消
const cancel = () => {
  dialogFormVisible.value = false;
  movieInfo.value = {};
};
//确定
const manageMovieInfo = async () => {
  //是否弹出
  dialogFormVisible.value = false;
  //安排电影排片
  console.log(movieInfo.value);
  if (movieInfo.value) {
    await getAdminAddArrangemen(movieInfo.value).then((res) => {
      console.log(res);
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
};
//填充上映时间
const changeMovie = async (value) => {
  await getAdminMovieList().then((res) => {
    console.log(res);
    if (res.status === 200) {
      res.data.forEach((item) => {
        if (item.movie_id == value) {
          movieInfo.value.public_date = item.public_date;
        }
      });
    }
  });
};
//填充影厅信息
const changeCinema = async (value) => {
  await getAdminIDCinema(value).then((res) => {
    if (res.status === 200) {
      cinemaList.value = res.data;
    }
    console.log(cinemaList.value);
  });
};
//日期时间是否可选
const disabledDate = (time) => {
  return time.getTime() < Date.now();
};
//删除
const handleDelete = (index, row) => {
  // console.log(index, row.user_id);
  ElMessageBox.confirm(
    "此操作将永久删除该电影排片所有信息, 是否继续？",
    "提示",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }
  )
    .then(() => {
      getAdminDelArrangemen(row.schedule_id).then((res) => {
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
        message: "取消删除电影排片",
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
