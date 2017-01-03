import * as Router from 'koa-router';
import { Job } from '../models/job';
import { upMonitor } from '../upmonitor';

const router = new Router();
router.get('/', async (ctx) => {
    // debug(`New call to catch all, server is down: ${upMonitor.isDown}, because ${upMonitor.reason}.`);
    if (upMonitor.isDown) {
        debug('Server is down because of ${upMonitor.reason}, not trying to go the database.');
        await ctx.render('index', { jobs: null, isDown: true });
        return;
    } else {
        const jobs = await Job.find();
        await ctx.render('index', { jobs: jobs });
    }
});
export default router;