const { query } = require("../db/query");

// 获取电影列表
module.exports.findMovieList = async () => {
  return await query(
    "SELECT * FROM t_schedule INNER JOIN t_movie ON t_schedule.movie_id = t_movie.movie_id;"
  );
};
