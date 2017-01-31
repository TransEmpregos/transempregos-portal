import { Router } from '../transRouter';
import { Job } from '../../models/job';

const router = new Router();
router.get('/', async ctx => {
    const jobs = await Job.find();
    ctx.body = jobs;
});
router.get('/:id', async ctx => {
    const job = await Job.findOne({ _id: ctx.params.id});
    ctx.body = job;
});

export default router;