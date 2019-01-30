const validate = require('../../utils/validate');

module.exports = {
  push_validate: async function (ctx,next) {
    //要验证的必填字段
    let valRule = [
      'push_id',
      'title',
      'text',
      'device_tokens',
      'after_open',
      'type',
      'device_type',
      'open_identify',
      'timer'
    ];
    let body = ctx.request.body;
    let err = validate.validate(valRule,body);
    if (err){
      return ctx.error({error: err})
    }
    await next();
  }
};