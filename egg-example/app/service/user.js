const Service = require('egg').Service;

class UserService extends Service {
  async loginFn(user,phone) {//登录时获取 当前用户信息
    return await this.app.mysql.query(`select * from login where user='${user}' and phone='${phone}'`);
  }
  async addtoken(token,phone){//更改token值
    return await this.app.mysql.query(`update login set token='${token}' where phone=${phone}`);
  }
  async registerFn(user,phone,role='user') {//注册时 往数据裤里增加 此用户信息
    return await  this.app.mysql.query(`insert into login (user,phone,role) values ('${user}',${phone},${role})`);
  }
  async adminUser(token){//根据登录用户的 token 判断用户的权限
    return await this.app.mysql.query(`select * from login where token='${token}'`)
  }
  async shopginFn(){
    return await this.app.mysql.query(`select * from shop`);
  }
}

module.exports = UserService;