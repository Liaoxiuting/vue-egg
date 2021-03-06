"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const gzip = app.middleware.gzip({});
  router.get("/", controller.home.index);
  router.get("/home", gzip, controller.home.home);
  // router.get('/home',controller.home.home);
  router.post("/login", controller.home.login);
  router.post("/register", controller.home.register);
  router.get("/shopgin", controller.home.shopgin);
  router.get("/userstatistics", controller.home.statistics); //获取用户
  router.post("/userstatistics/deleterow", controller.home.deleteRow); //删除用户
  router.post("/userstatistics/modifyrow", controller.home.modifyRow); //修改用户
  router.post("/addshoping", controller.shop.addshoping); //加入购物
};
