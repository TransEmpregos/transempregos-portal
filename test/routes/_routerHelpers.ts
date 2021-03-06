import { Router } from '../../server/routes/transRouter';

declare module '../../server/routes/transRouter' {
    interface Router {
        findRoute(route: string): Function;
    }
}

Router.prototype.findRoute = function (route: string): Function {
    const method = this.stack.find((s: any) => s.path === route).stack[0];
    return method;
};