"use strict";

const Controller = require("egg").Controller;
const tokenFn = require("../utils/jwtToken.js");
const data = require("./routerData.js");
class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = "hi, egg悟生境";
  }
  //注册
  async register() {
    const { ctx } = this;
    let { user, phone } = ctx.request.body;
    let str = await ctx.service.user.loginFn(user, phone);
    console.log(str,'====str==')
    if (str.length == 0) {
      let token = tokenFn(str[0].id);
      let strtoken = await ctx.service.user.addtoken(token, phone);
      let strs = await ctx.service.user.registerFn(user, phone);
      if (strs.affectedRows == 1) {
        ctx.body = {
          code: 1,
          msg: "注册成功"
        };
      } else {
        ctx.body = {
          code: 0,
          msg: "请重新注册"
        };
      }
    } else {
      ctx.body = {
        code: 0,
        msg: "已被注册过"
      };
    }
}
  // 登录
  async login() {
    const { ctx } = this;
    let { user, phone } = ctx.request.body;
    let str = await ctx.service.user.loginFn(user, phone);
    if (str.length != 0) {
      if (str[0].token) {
        ctx.body = {
          code: 1,
          id: str[0].id,
          token: str[0].token,
          msg: "登录成功"
        };
      } else {
        let token = tokenFn(str[0].id);
        let strtoken = await ctx.service.user.addtoken(token, phone);
        if (strtoken.affectedRows == 1) {
          ctx.body = {
            code: 1,
            id: str[0].id,
            token,
            msg: "登录成功"
          };
        } else {
          ctx.body = {
            code: 0,
            msg: "请重新登录"
          };
        }
      }
    } else {
      ctx.body = {
        code: 0,
        msg: "请重新登录"
      };
    }
  }
  // 首页
  async home() {
    const { ctx } = this;
    let { params } = ctx.request.query;
    let admin_user = await ctx.service.user.adminUser(params);
    let list = [];
    if (admin_user.length > 0) {
      if (admin_user[0].role == "admin") {
        list = data.filter(v => {
          for (const key in v) {
            return key == admin_user[0].role;
          }
        });
        if (admin_user[0].imgs) {
          ctx.body = {
            code: 1,
            list: list[0].admin,
            img: admin_user[0].imgs,
            msg: "获取数据成功"
          };
        } else {
          ctx.body = {
            code: 1,
            list: list[0].admin,
            msg: "获取数据成功"
          };
        }
      } else {
        list = data.filter(v => {
          for (const key in v) {
            return key == 'user';
          }
        });
        if (admin_user[0].imgs) {
          ctx.body = {
            code: 1,
            list: list[0].user,
            img: admin_user[0].imgs,
            msg: "获取数据成功"
          };
        } else {
          ctx.body = {
            code: 1,
            list: list[0].user,
            msg: "获取数据成功"
          };
        }
      }
    } else {
      ctx.body = {
        msg: "获取数据失败，没有权限",
        code: 0
      };
    }
  }
  async shopgin(){
    let { ctx } =this;
    let data=await ctx.service.user.shopginFn();
    ctx.body=data
  }
}

module.exports = HomeController;
