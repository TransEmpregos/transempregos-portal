import { Router } from '../../server/routes/_transRouter';

declare module '../../server/routes/_transRouter' {
    interface Router {
        findRoute(route: string): Function;
    }
}

Router.prototype.findRoute = function (route: string): Function {
    const method = this.stack.find((s: any) => s.path === route).stack[0];
    return method;
};