/*
* @ use 统一try catch处理中间件
* @ 用于捕获内部错误，输出日志信息
*/
const tracer = require('tracer');
const logger = tracer.dailyfile({root:'./logs', maxLogFiles: 10, allLogsFileName: 'um_push'});

module.exports = async (ctx,next)=>{
  try{
    logger.log(ctx.url);
    if (ctx.request.body){
      logger.log(ctx.request.body)
    }
    await next();
  } catch (err){
    logger.error(err);
    if (!err) {
      return ctx.error({ msg:new Error('未知错误!') });
    }
    if (typeof(err)=='string') {
      return ctx.error({ msg:new Error(err) });
    }
    if (err.body){
      return ctx.error({msg: 'fail', data:err.body.data});
    }
    return ctx.error({msg:'服务器错误!'});
  }
}



