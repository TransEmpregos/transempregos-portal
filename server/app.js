const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const views = require('koa-views');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
const mount = require('koa-mount');
const koaStatic = require('koa-static');
const path = require('path');
const index = require('./routes/index');

// middlewares
app.use(bodyparser);
app.use(convert(json()));
app.use(logger());

const publicPath = path.resolve(__dirname, '../public');
const nodeModulesPath = path.resolve(__dirname, '../../node_modules');

app.use(koaStatic(publicPath));
app.use(mount('/node_modules', koaStatic(nodeModulesPath)));

const viewPath = path.resolve(__dirname, '../../server/views');
app.use(views(viewPath, { extension: 'jade' }));

app.use(async (ctx, next) => {
    try {
        await next(); // next is now a function
    } catch (err) {
        console.log(err);
        ctx.body = { message: err.message };
        ctx.status = err.status || 500;
    }
});

// logger

app.use(async (ctx, next) => {
    const start = new Date;
    await next();
    const ms = new Date - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

router.use('/', index.routes(), index.allowedMethods());

app.use(router.routes(), router.allowedMethods());
// response

app.on('error', function(err, ctx) {
    log.error('server error', err, ctx);
});


module.exports = app;