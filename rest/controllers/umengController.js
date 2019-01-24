const umengService = require('../service/umengService');
const request = require('client-request/promise');
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
      return ctx.success({msg: "success", data: res.data});
    }else {
      return ctx.error({msg: "fail", data: res.data});
    }
  }

}
module.exports = UmengController;