module.exports = {
  development: {
    port: '8010',
    umeng: {
      ios: {
        appkey: 'xxxx',                  //消息推送服务提供的appkey
        appMasterSecret: 'xxxx', //服务器秘钥
      },
      android: {
        appkey: '5c3bf5a5b465f5d260000791',
        appMasterSecret: 'ay4xdtxdwvl9ob7woipzxesxceblliim',
      },
      url: 'http://msg.umeng.com',                         //umeng 请求地址
      method: 'POST'                                       //请求方式
    }
  },
  production: {
    port: '8090',
    umeng: {
      ios: {
        appkey: 'xxxx',
        appMasterSecret: 'xxxx',
      },
      android: {
        appkey: 'xxxxx',
        appMasterSecret: 'xxxxxx',
      },
      url: 'http://msg.umeng.com/api/send',
      method: 'POST'
    }
  }
};