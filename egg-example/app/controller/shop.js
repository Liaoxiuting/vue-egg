"use strict";

const Controller = require("egg").Controller;
const tokenFn = require("../utils/jwtToken.js");
const data = require("./routerData.js");
class Shop extends Controller {
  // 用户数据  修改
  async addshoping() {
    let { ctx } = this;
    let { id, conts } = ctx.request.body;
    console.log(id,'id',conts,'conts')
    let str = await ctx.service.user.shopAdd(id, conts);
    if (str.affectedRows == 1) {
      ctx.body = {
        code: 1,
        msg: "请求成功"
      };
    } else {
      ctx.body = {
        code: 0,
        msg: "请求失败"
      };
    }
  }
}

module.exports = Shop;
