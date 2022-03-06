const { login,admiLogin,getAdminInfo,getCurrentPageUser } = require("../controller/users");

const router = require("koa-router")();

router.prefix("/users");

//#region   客户端
// 客户端登录
router.post("/login", login);
//#endregion



//#region  后台管理系统
// 管理员登录
router.post("/admiLogin", admiLogin);
// 获取用户信息
router.get("/getAdminInfo", getAdminInfo);
// 获取当前页用户
router.get("/getCurrentPageUser",getCurrentPageUser)
//#endregion
module.exports = router;
