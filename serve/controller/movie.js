const { findMovieList } = require("../model/movie");

//region 获取电影列表
module.exports.findMovieList = async (ctx) => {
  // 获取电影数据并且 转化为对象形式
  let result = JSON.parse(JSON.stringify(await findMovieList()));
  // 判断是否有数据
  if (result.length) {
    // 筛选出还为播出的电影
    result = result.filter((value) => {
      return new Date(value.show_date + "," + value.show_time) - new Date() > 0;
    });
    for (let i = 0; i < result.length; i++) {
      for (let j = i + 1; j < result.length; j++) {
        if (result[i]["movie_id"] === result[j]["movie_id"]) {
          result.splice(j, 1);
          j = j - 1;
        }
      }
    }
    ctx.body = {
      status: 200,
      data: result,
      message: "获取电影数据成功",
    };
  } else {
    ctx.body = {
      status: 0,
      message: "获取电影数据为空",
    };
  }
};
//endregion
