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
 
 
 ## 接口说明
 API：'/api/u_send' 
 method：post
 body：{
 device_type：ios/android 必填,
 type: 推送类型 unicast 单播 listcast 列播 broadcast 广播 每天十次
 ticker: 通知栏提示文字 必填,
 title: 通知标题 必填,
 text: 通知文字描述 必填,
 device_tokens: 当type=unicast时, 必填, 表示指定的单个设备 当type=listcast时, 必填, 要求不超过500个, 以英文逗号分隔,
 after_open: 
             //   "go_app": 打开应用
             //   "go_url": 跳转到URL
             //   "go_activity": 打开特定的activity
 open_identify: 点击推送打开地址 （为空，默认打开app）
             url: // 当after_open=go_url时，必填。
                  // 通知栏点击后跳转的URL，要求以http或者https开头
             activity:  // 当after_open=go_activity时，必填。
                          // 通知栏点击后打开的Activity
 }
 
response: 
    success：{
                  "code": 200,
                  "msg": "success",
                  "data": {
                      "msg_id": "uu2jhxb154829838900601"
                  }
              }
     error: {
                 "code": "xxx",
                 "msg": "fail",
                 "data": {
                     "error_code": "xxx",
                     "error_msg": "xxx"
                 }
             }
## 需要改进的地方
1.将一些通用的中间件绑定到app（应用）上，以便全局通用。（如： db，logger，app.context.db = db();）