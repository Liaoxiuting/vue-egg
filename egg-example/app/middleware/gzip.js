module.exports = () => {
  return async function gzip(ctx, next) {
    if (!ctx.request.headers.params) {
      ctx.status = 401;
      ctx.body = {
        code: 0,
        msg: "缺少token参数"
      };
    } else {
      const user = await ctx.service.user.adminUser(ctx.request.headers.params);
      if (ctx.request.headers.params == user[0].token) {
        await next();
      } else {
        ctx.status = 401;
        ctx.body = {
          code: 0,
          msg: "缺少token参数"
        };
      }
    }
  };
};
