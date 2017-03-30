import { Router } from '../transRouter';
import { Company } from '../../models/job';
import { Job } from '../../models/job';

const router = new Router();
router.get('/', async ctx => {
    const companies = await Company.find();
    ctx.body = companies;
});
router.get('/:id', async ctx => {
    const company = await Company.findOne({ _id: ctx.params.id});
    ctx.body = company;
});

// api para pegar as jobs de uma company específica
router.get('/:id/jobs', async ctx => {
    const jobs = await Job.find({ companyId: ctx.params.id});

    // condição para ver se existe job numa company
    // const thereAreJobs = ( await Job.count({ companyId: ctx.params.id}) ) > 0;
    ctx.body = jobs;
});

export default router;