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
    // console.log(str.length,'====str==')
    if (str.length != 0) {
      ctx.body = {
        code: 0,
        msg: "已被注册过"
      };
    } else {
      let token = tokenFn(phone);
      let now = new Date().getTime(); //当前日期 的时间戳 【getTime()转时间戳】
      // console.log('createTime---',now,'---createTime')
      let strs = await ctx.service.user.registerFn(user, phone,now);
      // console.log(strs,'---strs')
      if (strs.affectedRows == 1) {
        await ctx.service.user.addtoken(token, phone);
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
    }
}
  // 登录
  async login() {
    const { ctx } = this;
    let { user, phone } = ctx.request.body;
    let str = await ctx.service.user.loginFn(user, phone);
    // console.log('login--str',str)
    if (str.length > 0) {
      if (str[0].token) {
        // console.log('login--str[0].token',str[0].token)
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
    // console.log('home---ctx.request.query',ctx.request.query)
    let { token } = ctx.request.query;
    // console.log('home---paarams',token)
    let admin_user = await ctx.service.user.adminUser(token);
    let list = [];
    // console.log(admin_user)
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
  //商品数据
  async shopgin(){
    let { ctx } =this;
    let data=await ctx.service.user.shopginFn();
    ctx.body=data
  }
  // 用户数据
  async statistics(){
    let {ctx}=this;
    let data=await ctx.service.user.userStatisticsFn();
    // console.log('statistics---data',data)
    if (data.length!=0) {
      data.map((v)=>{
        delete(v.token)//将数据里的 每一项的 token 接去掉 避免用户的 token（关键信息）泄漏
      })
      ctx.body={
        code:1,data,msg:'请求成功'
      }
    }else{
      ctx.body={
        code:0,msg:'请求失败'
      }
    }
    
  }
  // 用户数据  移除
   async deleteRow(){
      let {ctx}=this;
      let { id } = ctx.request.body;
      // console.log(id,'------id')
      let str= await ctx.service.user.deleteRowFn(id)
      // console.log(str,'------str')
      if (str.affectedRows==1) {
        let data=await ctx.service.user.userStatisticsFn();
        // console.log('statistics---data',data)
        if (data.length!=0) {
          data.map((v)=>{
            delete(v.token)//将数据里的 每一项的 token 接去掉 避免用户的 token（关键信息）泄漏
          })
          ctx.body={
            code:1,data,msg:'请求成功'
          }
        }
      }
   }
  // 用户数据  修改
  async modifyRow(){
      let {ctx}=this;
      let { id ,user ,texts,imgs} = ctx.request.body;
      console.log(id ,user ,texts,imgs)
      if (id&&user&&texts) {
        let str = await ctx.service.user.modifyRowFn(id,user,texts,imgs)
        if (str.affectedRows==1) {
          let data=await ctx.service.user.userStatisticsFn();
          // console.log('statistics---data',data)
          if (data.length!=0) {
            data.map((v)=>{
              delete(v.token)//将数据里的 每一项的 token 接去掉 避免用户的 token（关键信息）泄漏
            })
            ctx.body={
              code:1,data,msg:'请求成功'
            }
          }
        }
      }else{
        ctx.body={
          code:0,
          msg:"请求失败",
        }
      }
  }
}

module.exports = HomeController;
