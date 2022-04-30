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
        <el-button type="primary" @click="addUser">添加电影</el-button>
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
          label="电影 ID"
          align="center"
          width="100"
          prop="movie_id"
        ></el-table-column>
        <el-table-column
          label="电影名"
          align="center"
          show-overflow-tooltip
          prop="name"
        ></el-table-column>
        <el-table-column
          label="导演"
          align="center"
          show-overflow-tooltip
          prop="director"
        ></el-table-column>
        <el-table-column
          label="类型"
          align="center"
          show-overflow-tooltip
          prop="type"
        ></el-table-column>
        <el-table-column
          label="上映时间"
          align="center"
          show-overflow-tooltip
          prop="public_date"
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
    <!--电影弹框-->
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
          :model="movieInfo"
        >
          <el-form-item label="电影名" prop="name">
            <el-col :span="16">
              <el-input v-model="movieInfo.name"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="海报" prop="poster">
            <el-col :span="16">
              <img
                :src="server + movieInfo.poster"
                ref="previewImg"
                alt=""
                style="width: 150px; height: 200px"
              />
              <div
                class="el-upload__tip"
                style="position: absolute; left: 0; top: 230px; height: 32px"
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
          <el-form-item label="导演" prop="director">
            <el-col :span="16">
              <el-input v-model="movieInfo.director"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="演员" prop="actor">
            <el-col :span="16">
              <el-input v-model="movieInfo.actor"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="片长" prop="movie_long">
            <el-col :span="16">
              <el-input v-model="movieInfo.movie_long"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="语言" prop="language">
            <el-col :span="16">
              <el-select
                v-model="movieInfo.language"
                placeholder="请选择语言"
                style="width: 100%"
              >
                <el-option
                  v-for="item in languageOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <el-col :span="16">
              <el-select
                v-model="movieInfo.type"
                placeholder="请选择类型"
                style="width: 100%"
              >
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="上映时间" prop="public_date">
            <el-col :span="16">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="movieInfo.public_date"
                style="width: 100%"
                value-format="YYYY-MM-DD"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="简介" prop="intro">
            <el-col :span="16">
              <el-input
                type="textarea"
                v-model="movieInfo.intro"
                :autosize="{ minRows: 2, maxRows: 4 }"
              ></el-input>
            </el-col>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="manageMovieInfo">确 定</el-button>
          </div></template
        >
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { ElMessage, ElMessageBox } from "element-plus";
import { ref } from "vue";
import {
  getAdminAddMovie,
  getAdminDeleteMovie,
  getAdminEditMovie,
  getAdminMovieList,
  getAdminSearchMovie,
  getAdminUpLoadImg,
} from "@/api/movie";
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
//电影信息
const movieInfo = ref({});
//图片dom
const previewImg = ref();
const uploadImg = ref();
//服务器地址
const server = "http://localhost:3001";
//弹出框的标题
const dialogTitle = ref("");
//控制是否弹出
const dialogFormVisible = ref(false);
//被注销电影的个数
const number = ref(0);
//语言
const languageOptions = ref([
  {
    value: "粤语",
    label: "粤语",
  },
  {
    value: "国语",
    label: "国语",
  },
  {
    value: "英语",
    label: "英语",
  },
  {
    value: "日语",
    label: "日语",
  },
  {
    value: "其它",
    label: "其它",
  },
]);
//类型
const typeOptions = [
  {
    value: "动漫",
    label: "动漫",
  },
  {
    value: "言情",
    label: "言情",
  },
  {
    value: "科幻",
    label: "科幻",
  },
  {
    value: "喜剧",
    label: "喜剧",
  },
  {
    value: "爱情",
    label: "爱情",
  },
  {
    value: "剧情",
    label: "剧情",
  },
  {
    value: "动作",
    label: "动作",
  },
  {
    value: "冒险",
    label: "冒险",
  },
  {
    value: "青春",
    label: "青春",
  },
  {
    value: "悬疑",
    label: "悬疑",
  },
  {
    value: "恐怖",
    label: "恐怖",
  },
  {
    value: "其它",
    label: "其它",
  },
];
//表单校验规则
let checkMovieLong = (rule, value, callback) => {
  if (!value) {
    callback(new Error("片长信息不能为空"));
  } else {
    if (/^[1-9][0-9]+分钟$/.test(value)) {
      callback();
    } else {
      callback(new Error("格式应为xx分钟"));
    }
  }
};
//表单校验规则
const rules = ref({
  name: [{ required: true, message: "电影名不能为空", trigger: "blur" }],
  poster: [{ required: true, message: "请上传电影海报", trigger: "blur" }],
  director: [{ required: true, message: "导演信息不能为空", trigger: "blur" }],
  actor: [{ required: true, message: "主演信息不能为空", trigger: "blur" }],
  movie_long: [
    { required: true, message: "片长信息不能为空", trigger: "blur" },
    { validator: checkMovieLong, trigger: "blur" },
  ],
  language: [{ required: true, message: "请选择语言", trigger: "change" }],
  type: [{ required: true, message: "请选择电影类型", trigger: "change" }],
  public_date: [{ required: true, message: "请选择上映日期", trigger: "blur" }],
  intro: [{ required: true, message: "电影简介信息不能为空", trigger: "blur" }],
});
//endregion

//region 获取电影数据

const news = async () => {
  await getAdminMovieList().then((res) => {
    console.log(res);
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
};
news();

//endregion

//region 搜索
const searchs = async () => {
  if (searchInput.value === undefined) return;
  await getAdminSearchMovie(searchInput.value).then((res) => {
    console.log(res);
    if (res.status == 200) {
      tableData.value = res.data;
      total.value = res.total;
    }
  });
};
//endregion

//region 添加电影
const addUser = () => {
  dialogTitle.value = "添加电影";
  movieInfo.value = {};
  dialogFormVisible.value = true;
};
//上传图片
const changeImg = async () => {
  let reader = new FileReader();
  reader.readAsDataURL(await uploadImg.value.files[0]); //发起异步请求
  reader.onload = function (e) {
    //读取完成后，将结果赋值给img的src
    previewImg.value.src = e.target.result;
  };
};
//取消
const cancel = () => {
  dialogFormVisible.value = false;
  movieInfo.value = {};
};
//确定
const manageMovieInfo = async () => {
  dialogFormVisible.value = false;
  let form = new FormData();
  form.append("file", uploadImg.value.files[0]);
  //图片上传
  if (uploadImg.value.files[0]) {
    console.log(1111);
    await getAdminUpLoadImg(form)
      .then((res) => {
        if (res.status == 200) {
          movieInfo.value.poster = res.data;
          console.log(movieInfo.value.poster);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if (dialogTitle.value === "添加电影") {
    //添加电影
    await getAdminAddMovie(movieInfo.value).then((res) => {
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
  }
  if (dialogTitle.value === "编辑电影信息") {
    console.log(movieInfo.value);
    await getAdminEditMovie(movieInfo.value).then((res) => {
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

//编辑
const handleEdit = (index, row) => {
  // console.log(index, row);
  dialogTitle.value = "编辑电影信息";
  dialogFormVisible.value = true;
  movieInfo.value = row;
};
//注销
const handleDelete = (index, row) => {
  // console.log(index, row.user_id);
  ElMessageBox.confirm("此操作将永久删除该电影所有信息, 是否继续？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      getAdminDeleteMovie(row.movie_id).then((res) => {
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
        message: "取消删除电影",
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
