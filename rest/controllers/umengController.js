const umengService = require('../service/umengService');
const request = require('client-request/promise');
const db = require('../utils/db');

class UmengController {
  static async test (ctx) {
    return ctx.success({msg: "success"});
  }
  static async send (ctx) {
    let body = ctx.request.body;
    let options = umengService.requestAndroidOptions(body);
    let result = await request(options);
    let res = result.body;
    if (res.ret === 'SUCCESS'){
      let add_log = await db.commonSqlObj(`INSERT INTO app_push_log 
      (device_type,type,ticker,title,text,device_tokens,after_open,url,activity,result,timer,data) 
      VALUES
      ("${body.device_type}","${body.type}","${body.ticker}","${body.title}","${body.text}","${body.device_tokens}","${body.after_open}","${body.url}","${body.activity}","${res.ret}","${body.timer}",'${JSON.stringify(res.data)}');`);
      console.log(add_log);
      return ctx.success({data: res.data});
    }else {
      return ctx.error({data: res.data});
    }
  }

}
module.exports = UmengController;