import * as Koa from 'koa';
import * as json from 'koa-json';
import * as bodyParser from 'koa-bodyparser';
import * as logger from 'koa-logger';
import * as mount from 'koa-mount';
import * as serve from 'koa-static';
import * as Pug from 'koa-pug';
const convert = require('koa-convert');
import * as path from 'path';
global.debug = require('debug')('trans');
import router from './routes/router';
import { startConnection } from './connectionManager';
import { Config } from './config';

startConnection();
const app = new Koa();
if (!Config.isTestEnv)
    app.use(logger());
const publicPath = path.resolve(__dirname, '../public');
app.use(mount('/dist/public', serve(publicPath)));
const nodeModulesPath = path.resolve(__dirname, '../../node_modules');
app.use(mount('/node_modules', serve(nodeModulesPath)));
app.use(convert(json()));
app.use(bodyParser());

const viewPath = path.resolve(__dirname, 'views');
new Pug({
    app: app,
    viewPath: viewPath,
    noCache: Config.isDevEnv,
    pretty: Config.isDevEnv
});

app.use(async (ctx, next) => {
    try {
        await next(); // next is now a function
    } catch (err) {
        console.error(err);
        ctx.body = { message: err.message };
        ctx.status = err.status || 500;
    }
});

app.use(router.routes())
    .use(router.allowedMethods());

app.on('error', (err: any, ctx: any) => {
    console.error('server error', err, ctx);
});

export default app;