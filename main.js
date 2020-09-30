const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const onerror = require('koa-onerror');
const logger = require('koa-logger');
let debug = require('debug')('demo:server');
let http = require('http');
const helmet = require('koa-helmet');
const koaBody = require('koa-body');
const session = require('koa-session');
const allRoutes = require('./routes/index.js');
const config = require('./config/index.js');
const userRegistry = require('./tableBusinessOperateLogic/userRegistry.js');
app.keys = ['some secret hurr'];
const env = process.env.NODE_ENV;
const isDev = (env == 'development');
const sessionConfig = {
   key: 'sessionId',   //cookie key (default is koa:sess)
   maxAge: 86400000,  // cookie的过期时间 maxAge in ms (default is 1 days)
   overwrite: true,  //是否可以overwrite    (默认default true)
   httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
   signed: true,   //签名默认true
   rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
   renew: false,  //(boolean) renew session when session is nearly expired,
};
// 设置session
// ctx.session.sessionId = '';
// 获取session
// ctx.session.sessionId;

//跨域处理文件koa-cors.js
let cors = require('koa2-cors');

app.use(
    cors({
        origin(ctx) { //设置允许来自指定域名请求
            return '*'; //只允许http://localhost:8080这个域名的请求
        },
        maxAge: 5, //指定本次预检请求的有效期，单位为秒。
        credentials: true, //是否允许发送Cookie
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
        // exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
    })
);
// error handler
onerror(app);
// app.use(session(sessionConfig, app));
app.use(helmet());
app.use(koaBody({
    multipart: true
}));
app.use(json());
isDev && app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));
// logger
isDev && app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});
// loginAuthorityVerification
app.use(async (ctx, next) => {
    await userRegistry.tokenVerification(ctx, next);
});
// routes
for(key in allRoutes) {
    let routeTemp = allRoutes[key];
    app.use(routeTemp.routes(), routeTemp.allowedMethods());
}
// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
});
let onError = function(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
};
let onListening = function() {
    let addr = server.address();
    let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
};
let server = http.createServer(app.callback());
app.listen(config.port);
server.on('error', onError);
server.on('listening', onListening);
