import { Router } from './_transRouter';
import catchAllRoute from './catchAll';
import * as path from 'path';
import * as fs from 'fs';

const router = new Router();

const files = fs.readdirSync(__dirname);
const routeModuleNames = files
    .filter(f => f.indexOf('catchAll.js') !== 0 && f.indexOf('router.js') !== 0 && f.endsWith('.js'))
    .map(f => path.basename(f, '.js'));
for (const routeModuleName of routeModuleNames) {
    if (routeModuleName[0] === '_') continue;
    let routeModule = require(`./${routeModuleName}`);
    for (const routeKey in routeModule) {
        if (!routeModule.hasOwnProperty(routeKey)) continue;
        const route: Router = routeModule[routeKey];
        router.use(`/api/${routeModuleName}`, route.routes(), route.allowedMethods());
    }
}
router.use(catchAllRoute.routes(), catchAllRoute.allowedMethods());

export default router;