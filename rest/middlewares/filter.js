/*
* @ use 统一try catch处理中间件
* @ 用于捕获内部错误，输出日志信息
*/
const tracer = require('tracer');
const db = require('../utils/db');
const logger = tracer.dailyfile({root:'./logs', maxLogFiles: 10, allLogsFileName: 'um_push'});

module.exports = async (ctx,next)=>{
  try{
    logger.log(ctx.url);
    if (ctx.request.body){
      logger.log(ctx.request.body)
    }
    await next();
  } catch (err){
    let body = ctx.request.body;
    logger.error(err);
    let errMsg = '';
    if (!err) {
      errMsg = '未知错误';
    }
    if (typeof(err)=='string') {
      errMsg = err;
    }
    if (err.body){
      errMsg = JSON.stringify(err.body.data);
    }

    let add_attr,add_val;
    if (body.timer){
      add_attr = '(push_id,device_type,type,title,text,device_tokens,after_open,url,activity,result,timer,data)';
      add_val = `("${body.push_id}","${body.device_type}","${body.type}","${body.title}","${body.text}","${body.device_tokens}","${body.after_open}","${body.url}","${body.activity}","FAIL","${body.timer}",'${errMsg}')`;
    } else {
      add_attr = '(push_id,device_type,type,title,text,device_tokens,after_open,url,activity,result,data)';
      add_val = `("${body.push_id}","${body.device_type}","${body.type}","${body.title}","${body.text}","${body.device_tokens}","${body.after_open}","${body.url}","${body.activity}","FAIL",'${errMsg}')`;
    }
    let add_log = await db.commonSqlObj(`INSERT INTO app_push_logs ${add_attr} VALUES ${add_val};`);
    console.log(add_log);
    return ctx.error({data: errMsg});
  }
};



