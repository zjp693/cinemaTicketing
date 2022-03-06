const { query } = require("../db/query");


//#region  客户端
// 登录
module.exports.findUserInfo = async (username, password) => {
  return await query(
    "select * from user where username = ?  and password = ?",
    [username, password]
  );
};
//#endregion
 
//#region  后台管理系统
// 管理员登录
module.exports.findAdmiLogin = async (username,password) => {
  return await query(
    "SELECT * FROM t_admin WHERE name = ? and password = ? ",
    [username,password]
  );
};
// 获取用户信息
module.exports.findAdminInfo = async (id) => {
  return await query(
    "SELECT * FROM t_admin WHERE admin_id = ? ",[id]
  );
};
// 获取当前页信息 
module.exports.findCurrentPageUser = async (input,start,pageSize) => {
  if(input){
    return await query(
      `SELECT * FROM t_user WHERE user_name like '%${input}%' limit ${start},${pageSize}  `
    );
  }else{
    return await query(
      `SELECT * FROM t_user WHERE user_name limit ${start},${pageSize}`,
    );
  }
 
};
//#endregion


