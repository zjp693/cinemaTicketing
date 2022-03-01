const { query } = require("../db/query");

// 登录
module.exports.findUserInfo = async (username, password) => {
  return await query(
    "select * from user where username = ?  and password = ?",
    [username, password]
  );
};
