import * as Koa from 'koa';
import * as json from 'koa-json';
import * as bodyParser from 'koa-bodyparser';
import * as logger from 'koa-logger';
import * as Pug from 'koa-pug';
import { MongoError } from 'mongodb';
const convert = require('koa-convert');
import * as path from 'path';
global.log = require('debug')('trans');
import router from './routes/router';
import { startConnectionAsync, rebuildConnectionAsync } from './connectionManager';
import { Config } from './config';
import { serveStatic } from './staticFiles';

startConnectionAsync();
const app = new Koa();
if (!Config.isTestEnv)
    app.use(logger());
app.use(serveStatic());
app.use(convert(json()));
app.use(bodyParser());

const viewPath = path.resolve(__dirname, 'views');
new Pug({
    app: app,
    viewPath: viewPath,
    noCache: Config.isDevEnv,
    pretty: Config.isDevEnv,
    locals: {
        iconsDir: '/dist/public/images/icons'
    }
});

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (error) {
        if (error instanceof MongoError) {
            log('Got unhandled mongo error, checking connection.');
            rebuildConnectionAsync();
        } else {
            log(`Error on middleware\n${error}`);
        }
        ctx.body = { message: error.message };
        ctx.status = error.status || 500;
    }
});

app.use(router.routes())
    .use(router.allowedMethods());

app.on('error', (err: any, ctx: any) => {
    console.error('server error', err, ctx);
});

export default app;