import { Router } from '../transRouter';
import { upMonitor } from '../../upmonitor';

export const statusRouter = new Router();
statusRouter.get('/', ctx => {
    if (upMonitor.isUp) {
        ctx.status = 200;
        ctx.body = { status: 'ok' };
    } else {
        ctx.status = 503;
        ctx.body = { status: `Server is down because '${upMonitor.reason}'` };
    }
});