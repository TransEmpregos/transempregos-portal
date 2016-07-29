const router = require('koa-router')();
const mongoose = require('mongoose');
import Job from '../models/job';

router.get('/', async (ctx, next) => {
    const jobs = await Job.find();
    ctx.body = jobs;
});
router.get('/:id', async (ctx, next) => {
    const job = await Job.findOne({ _id: ctx.params.id});
    ctx.body = job;
});
router.del('/:id', async (ctx, next) => {
    await Job.findOneAndRemove({ _id: ctx.params.id});
    ctx.status = 204;
});
router.post('/', async (ctx, next) => {
    var job = new Job(ctx.request.body);
    await job.save();
    ctx.body = job;
});
router.put('/:id', async (ctx, next) => {
    await Job.findOneAndUpdate({ _id: ctx.params.id}, ctx.request.body, { runValidators: true});
    const job = await Job.findOne({ _id: ctx.params.id});
    ctx.body = job;
});

module.exports = router;