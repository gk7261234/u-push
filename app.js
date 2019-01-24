const Koa = require('koa');
const app = new Koa();
const convert = require('koa-convert');
const onerror = require('koa-onerror');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');

const umengRouter = require('./rest/index')

onerror(app);

//日志中间件
app.use(convert(logger()));
app.use(bodyParser());

// app.use(async ctx => {
//   // the parsed body will store in ctx.request.body
//   // if nothing was parsed, body will be an empty object {}
//   ctx.text = ctx.request.body;
// });

//访问记录
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});


//router
app.use(require('./rest/middlewares/response'));
app.use(require('./rest/middlewares/filter'));
app.use(umengRouter.routes())
  .use(umengRouter.allowedMethods());

app.on('error', function (err, ctx) {
  logger.error('sever error', err, ctx);
  return ctx.error({msg:'error'});
});

module.exports = app;