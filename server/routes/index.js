const router = require('koa-router')();
const mongoose = require('mongoose');
import Job from '../models/job';

router.get('/', async (ctx, next) => {
    const jobs = await Job.find();
    await ctx.render('./index', { jobs: jobs });
});

module.exports = router;