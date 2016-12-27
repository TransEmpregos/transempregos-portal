import * as Router from 'koa-router';
import Job from '../models/job';

const router = new Router();
router.get('/', async (ctx, next) => {
    const jobs = await Job.find();
    await ctx.render('index', { jobs: jobs });
});

export default router;