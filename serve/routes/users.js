const { login } = require("../controller/users");

const router = require("koa-router")();

router.prefix("/users");
// 登录
router.post("/login", login);

module.exports = router;
