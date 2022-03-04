const { findMovieList } = require("../controller/movie");

const router = require("koa-router")();

router.prefix("/movie");
// 电影列表
router.get("/list", findMovieList);
module.exports = router;
