import * as Router from 'koa-router';
import { Job } from '../models/job';

const router = new Router();
router.get('/', async (ctx) => {
    const jobs = await Job.find();
    ctx.body = jobs;
});
router.get('/:id', async ctx => {
    const job = await Job.findOne({ _id: ctx.params.id});
    ctx.body = job;
});
router.del('/:id', async ctx => {
    await Job.findOneAndRemove({ _id: ctx.params.id});
    ctx.status = 204;
});
router.post('/', async ctx => {
    let job = new Job(ctx.request.body);
    await job.save();
    ctx.body = job;
});
router.put('/:id', async ctx => {
    await Job.findOneAndUpdate({ _id: ctx.params.id}, ctx.request.body, { runValidators: true});
    const job = await Job.findOne({ _id: ctx.params.id});
    ctx.body = job;
});

export default router;