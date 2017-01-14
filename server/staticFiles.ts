import * as path from 'path';
import * as Koa from 'koa';
import * as mount from 'koa-mount';
import * as serve from 'koa-static';
import * as favicon from 'koa-favicon';
import { Config } from './config';
import * as compose from 'koa-compose';

export function serveStatic(): Koa.Middleware {
    const middlewares: Array<Koa.Middleware> = [];
    const distPublicPath = path.resolve(__dirname, '../public');
    middlewares.push(mount('/dist/public', serve(distPublicPath)));
    middlewares.push(favicon(path.resolve(distPublicPath, 'images', 'icons', 'favicon.ico')));
    if (!Config.isProdEnv) {
        const publicPath = path.resolve(__dirname, '../../public');
        middlewares.push(mount('/public', serve(publicPath)));
        const nodeModulesPath = path.resolve(__dirname, '../../node_modules');
        middlewares.push(mount('/node_modules', serve(nodeModulesPath)));
    }
    middlewares.push(async (ctx: Koa.Context, next: () => Promise<any>) => {
        const url = ctx.originalUrl;
        if (url.substr(0, 6) === '/dist/'
            || url.substr(0, 14) === '/node_modules/'
            || url.substr(0, 8) === '/public/') {
            ctx.status = 404;
        } else {
            await next();
        }
    });
    return compose(middlewares);
}