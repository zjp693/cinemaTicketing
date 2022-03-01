const { findUserInfo } = require("../model/users");
const jwt = require("jsonwebtoken");
// 登录
module.exports.login = async (ctx) => {
  const { username, password } = ctx.request.body;

  // // 在数据库查询用户信息是否有
  // const result = await findUserInfo(
  //   username,
  //   cryptoPaddword(password + secret)
  // );

  // 用户是否存在
  if (result[0]) {
    // 根据用户名和密码生成token
    const token = jwt.sign(
      {
        username,
        password,
      },
      jwtSecret,
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
