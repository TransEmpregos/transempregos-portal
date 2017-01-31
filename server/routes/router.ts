import { Router } from './transRouter';
import catchAllRoute from './unprotected/catchAll';
import * as path from 'path';
import * as fs from 'fs';
import { jwt } from './jwt';

export const router = new Router();

addRoutes('unprotected');
addRoutes('protected');
router.use(catchAllRoute.routes(), catchAllRoute.allowedMethods());

log('Routes: ' + router.stack.filter(s => s.methods.length).map(s => s.methods.join('|')  + ' ' + s.path));

function addRoutes(base: 'protected'|'unprotected') {
    const routes = getRouteModuleNames(path.resolve(__dirname, base));
    for (const routeModuleName of routes) {
        const routeModule = require(`./${base}/${routeModuleName}`);
        for (const routeKey in routeModule) {
            if (!routeModule.hasOwnProperty(routeKey)) continue;
            const route: Router = routeModule[routeKey];
            if (base === 'protected')
                router.use(`/api/${routeModuleName}`, jwt, route.routes(), route.allowedMethods());
            else
                router.use(`/api/${routeModuleName}`, route.routes(), route.allowedMethods());
        }
    }
}

function getRouteModuleNames(directory: string) {
    const files = fs.readdirSync(directory);
    const routeModuleNames = files
        .filter(f =>
            !f.startsWith('_')
            && f.indexOf('catchAll.js') !== 0
            && f.endsWith('.js'))
        .map(f => path.basename(f, '.js'));
    return routeModuleNames;
}