/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1575448510679_2563';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    mysql : {
      // 单数据库信息配置
      client: {
        // host
        host: 'localhost',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: '123321',
        // 数据库名
        database: 'kaikeba',
      },
      // 是否加载到 app 上，默认开启
      app: true
    },
    bodyParser : {
      enable: true,
      encoding: 'utf8',
      formLimit: '100kb',
      jsonLimit: '100kb',
      strict: true,
      onerror(err) {
        err.message += ', check bodyParser config';
        throw err;
      }
    },
    security : {
      csrf: false
    },
    cors : {
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    }
  };

  return {
    ...config,
    ...userConfig,
  };
};
