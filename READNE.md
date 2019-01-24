## 主要技术栈 

```
node koa2 es6 async/await Restful Api
```

## 开发使用 node 版本
 * 10.13.0
 
 
## 项目结构
 * 启动文件： ./bin/www
 * 配置文件： ./config/common.js (生产、开发 参数配置)
 * 日志记录： ./logs/*
 * 业务逻辑： ./rest/controller/*
 * 路由： ./rest/routers/*
 * 业务支持(服务)：./rest/service/*
 * 中间件：   ./middlewares/*
 * 工具类：   ./utils/*
 * 入口文件： app.js
 
 
 ## 项目启动
 生产环境：npm run start
 开发环境：npm run dev
 