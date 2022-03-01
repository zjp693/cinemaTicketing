const { login } = require("../controller/users");

const router = require("koa-router")();

router.prefix("/users");

router.get("/", function (ctx, next) {
  ctx.body = "this is a users response!";
});
// 登录
router.post("/login", login);

module.exports = router;
