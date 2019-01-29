
const  crypto = require('crypto');

const config = require('../../config/common');
const globalConfig = config[process.env.NODE_ENV||'development']['umeng'];

class UmengService {
  //安卓推送 推送类型：单播(无限制)unicast 列播（500）listcast  广播 broadcast
  static requestAndroidOptions(body) {
    let timestamp = Date.parse(new Date());
    let payload = '';
    let appkey = '';
    let appMasterSecret = '';

    //区别 ios 和 Android 推送配置
    if (body.device_type === 'android'){
      appkey = globalConfig.android.appkey;
      appMasterSecret = globalConfig.android.appMasterSecret;
      payload = {
        body: {
          ticker: "创投汇推送(android ticker)",
          title: body.title,
          text: body.text,
          after_open: body.after_open,
          url: body.url,
          activity: body.activity
        },
        display_type: 'notification'
      }
    } else {
      appkey = globalConfig.ios.appkey;
      appMasterSecret = globalConfig.ios.appMasterSecret;
      payload = {
        aps: {
          alert: {
            title: body.title,
            subtitle: body.title,
            body: body.text
          }
        },
        url: body.url,
        activity: body.activity
      }
    }

    let params = {
      appkey: appkey,
      timestamp: timestamp,
      type: body.type,
      payload: payload,
      production_mode: globalConfig.production_mode
    };

    //ios 推送APNs 分两种不同的模式 开发（sandbox）只能使用开发环境  生产（prod）只能用生产环境
    // if (body.device_type === 'ios'){
    //   params.production_mode = globalConfig.ios.production_mode;
    // }

    //单播 和 列播 需指定设备号
    if (body.type !== 'broadcast'){
      params.device_tokens = body.device_tokens;
    }
    console.log(JSON.stringify(params))

    //签名生成
    const md5 = crypto.createHash('md5');
    let md5_str = `${globalConfig.method}${globalConfig.url}/api/send${JSON.stringify(params)}${appMasterSecret}`;
    md5.update(md5_str);
    let sign = md5.digest('hex');
    console.log('sign: ', sign);

    //返回请求参数
    return {
      uri: globalConfig.url+"/api/send?sign="+sign,
      method: 'POST',
      body: params,
      timeout: 5000,
      json: true
    }
  }

  //取消推送

  //查看推送结果

  //....
}

module.exports = UmengService;