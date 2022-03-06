const {
  findUserInfo,
  findAdmiLogin,
  findAdminInfo,
  findCurrentPageUser,
} = require("../model/users");
const jwt = require("jsonwebtoken");
//#region  客户端登录
module.exports.login = async (ctx) => {
  const { username, password } = ctx.request.body;
  // // 在数据库查询用户信息是否有
  const result = await findUserInfo(username, password);
  // 用户是否存在
  if (result[0]) {
    // 根据用户名和密码生成token
    const token = jwt.sign(
      {
        username,
        password,
      },
      "secret",
      { expiresIn: "1h" }
    );
    ctx.body = {
      status: 200,
      data: {
        token,
      },
      message: "登录成功",
    };
  } else {
    ctx.body = {
      status: 0,
      message: "登录失败，请检查用户名或者密码",
    };
  }
};
//#endregion

//#region  后台管理系统

//#region  管理员登录
module.exports.admiLogin = async (ctx) => {
  const { username, password } = ctx.request.body;
  // // 在数据库查询用户信息是否有
  const result = await findAdmiLogin(username, password);

  // // 用户是否存在
  if (result[0]) {
    // 根据用户名和密码生成token
    const token = jwt.sign(
      {
        username,
        password,
      },
      "secret",
      { expiresIn: "1h" }
    );
    ctx.body = {
      status: 200,
      data: {
        token,
      },
      message: "登录成功",
    };
  } else {
    ctx.body = {
      status: 0,
      message: "登录失败，请检查用户名或者密码",
    };
  }
};
//#endregion

//#region 获取用户信息
module.exports.getAdminInfo = async (ctx) => {
  // 获取用户ID
  const { admin_id } = ctx.request.query;
  // 获取的用户信息转为对象
  const result = JSON.parse(JSON.stringify(await findAdminInfo(admin_id)));
  if (result[0]) {
    // console.log(result);
    ctx.body = {
      status: 200,
      data: result,
      message: "获取用户信息成功",
    };
  } else {
    ctx.body = {
      status: 0,
      message: "获取用户信息失败",
    };
  }
};
// #endregion

//#region  获取当前页用户信息
module.exports.getCurrentPageUser = async (ctx) => {
  //结构输入值
  let { currentPage, pageSize, input } = ctx.query;
  console.log(currentPage, pageSize, input);
  // 开始的数值
  let start = Number((currentPage - 1) * pageSize);
  // 结束的数值
  pageSize = Number(pageSize);
  // 一共返回的数值有几条
  let total;
  // 获取的用户信息转为对象
  const result = JSON.parse(
    JSON.stringify(await findCurrentPageUser(input, start, pageSize))
  );
  if (result[0]) {
    ctx.body = {
      status: 200,
      data: result,
      message: "获取用户列表成功",
      total: result.length,
    };
  } else {
    ctx.body = {
      status: 0,
      data: result,
      message: "获取用户列表成功",
    };
  }
};
//
//#endregion

//#region 上次图片到服务器
// module.exports.getCurrentPageUser=async(ctx)=>{

// }
//#endregion
//#endregion

// module.exports.getCurrentPageUser=async(ctx)=>{

// }
