import * as Koa from 'koa';
import * as json from 'koa-json';
import * as bodyParser from 'koa-bodyparser';
import * as logger from 'koa-logger';
import * as mount from 'koa-mount';
import * as serve from 'koa-static';
import * as Pug from 'koa-pug';
const convert = require('koa-convert');
import * as path from 'path';
import * as mongoose from 'mongoose';
import router from './routes/router';
const debug: debug.IDebugger = require('debug')('trans');

const app = new Koa();
const nodeEnv = process.env.NODE_ENV || 'development';
debug(`Environment is '${nodeEnv}'`);
const isDevEnv = nodeEnv === 'development';
const isTestEnv = nodeEnv === 'test';
const isProdEnv = nodeEnv === 'production';

(<any>mongoose).Promise = global.Promise;
const connectionString = process.env.MONGO_URI;
let connectResult: mongoose.MongooseThenable;
if (connectionString) {
    debug('conn ' + connectionString);
    connectResult = mongoose.connect(connectionString);
} else if (isTestEnv) {
    connectResult = mongoose.connect('mongodb://localhost/transempregos-test');
} else if (isProdEnv) {
    throw new Error('Production has to have MONGO_URI set.');
} else {
    connectResult = mongoose.connect('mongodb://localhost/transempregos');
}
connectResult.catch(err => debug(`Could not connect to Mongo.\n${err}`));

if (!isTestEnv)
    app.use(logger());
const publicPath = path.resolve(__dirname, '../public');
app.use(mount('/dist/public', serve(publicPath)));
const nodeModulesPath = path.resolve(__dirname, '../../node_modules');
app.use(mount('/node_modules', serve(nodeModulesPath)));
app.use(convert(json()));
app.use(bodyParser());

const viewPath = path.resolve(__dirname, '../../server/views');
new Pug({
    app: app,
    viewPath: viewPath,
    noCache: isDevEnv,
    pretty: isDevEnv
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

app .use(router.routes())
    .use(router.allowedMethods());

app.on('error', (err: any, ctx: any) => {
    console.error('server error', err, ctx);
});

export default app;