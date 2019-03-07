module.exports = {
  development: {
    port: '8010',
    umeng: {
      ios: {
        appkey: '5c4916cbb465f5f95f0011d2',                  //消息推送服务提供的appkey
        appMasterSecret: 'iteheukqxofpz927y5uiiwgudrv9tz8x', //服务器秘钥
      },
      android: {
        appkey: '5c3bf5a5b465f5d260000791',
        appMasterSecret: 'ay4xdtxdwvl9ob7woipzxesxceblliim',
      },
      url: 'http://msg.umeng.com',                         //umeng 请求地址
      method: 'POST',                                       //请求方式
      production_mode: false,                              //环境模式 false 开发 true 生产
    },
    db: {
      connectionLimit:10,
      host: 'mysql56.rdsmarphih5oppu.rds.bj.baidubce.com',
      user: 'vc265_test',
      password: '1pO398hH_',
      database: 'vc265_test',
      port: 3306
    }
  },
  production: {
    port: '8090',
    umeng: {
      ios: {
        appkey: 'xxxx',
        appMasterSecret: 'xxxx',
        production_mode: true,
      },
      android: {
        appkey: 'xxxxx',
        appMasterSecret: 'xxxxxx',
      },
      url: 'http://msg.umeng.com/api/send',
      method: 'POST'
    },
    db: {
      connectionLimit:10,
      host: 'xxxxx',
      user: 'xxxxx',
      password: 'xxxxx',
      database: 'xxxxx',
      port: 3306
    }
  }
};