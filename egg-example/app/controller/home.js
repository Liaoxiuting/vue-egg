'use strict';

const Controller = require('egg').Controller;
const tokenFn=require('../utils/jwtToken.js')
// import tokenFn from '../utils/jwtToken.js';
class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg悟生境';
  }
  //注册
  async register(){
    const { ctx }=this;
    let {user,phone}=ctx.request.body;
    let str=await ctx.service.user.loginFn(user,phone)
    if (str.length<=0) {
      let strs=await ctx.service.user.registerFn(user,phone)
      if (strs.affectedRows==1) {
        ctx.body = {
          code:1,
          msg:"注册成功"
        };
      }else{
        ctx.body = {
          code:0,
          msg:'请重新注册'
        };
      }
    }else{
      ctx.body = {
        code:0,
        msg:'已被注册过'
      };
    } 
  }
  // 登录
  async login() {
    const { ctx } = this;
    let {user,phone} =ctx.request.body;
    console.log(phone,'----ctx.request---',user)
    let str=await ctx.service.user.loginFn(user,phone)
    console.log(str[0],'str----',str[0].token,'-----str',str[0].id)
    if (str[0].token) {
      ctx.body = {
        code:1,
        id:str[0].id,
        token:str[0].token,
        msg:"登录成功"
      };
    }else{
      let token=tokenFn(str[0].id)
      let strtoken=await ctx.service.user.addtoken(token,phone)
      if (strtoken.affectedRows==1) {
        ctx.body = {
          code:1,
          id:str[0].id,
          token,
          msg:"登录成功"
        };
      }else{
        ctx.body = {
          code:0,
          msg:'请重新登录'
        };
      }
    }
  }
  async home() {
    const { ctx } = this;
    ctx.body = 'hi, home';
  }
}

module.exports = HomeController;
