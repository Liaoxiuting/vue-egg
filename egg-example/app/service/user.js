const Service = require('egg').Service;

class UserService extends Service {
  async loginFn(user,phone) {//登录时获取 当前用户信息
    return await this.app.mysql.query(`select * from login where user='${user}' and phone='${phone}'`);
  }
  async addtoken(token,phone){//更改token值
    return await this.app.mysql.query(`update login set token='${token}' where phone=${phone}`);
  }
  async registerFn(user,phone) {//注册时 往数据裤里增加 此用户信息
    return await  this.app.mysql.query(`insert into login (user,phone) values ('${user}',${phone})`);
  }
}

module.exports = UserService;