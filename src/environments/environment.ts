// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {

  // 是否为生产模式
  production: false,

  // 路由配置
  router: {
    useHash:          true,
    enableTracing:    false
  },

  // 日志配置
  logger: {
    // 日志等级, 详情见 CommonService
    level: 'trace'
  },

  // 网络配置
  http: {
    // 服务器
    host: 'http://47.96.143.154:9090',
    // 请求列表
    urls: {
      // 登录授权
      auth: {
        // 登录
        token:          '/auth/token'
      }
    },
    // 服务器响应内容
    rescodes: {
      // 完成
      ok:               200001
    }
  },

  // html页面使用的参数
  html: {
    // 默认图片
    defaultImg: 'https://ng.ant.design/assets/img/zorro.svg',
  }
};
