import { Router } from '../transRouter';
import { Company } from '../../models/job';

const router = new Router();
router.del('/:id', async ctx => {
    await Company.findOneAndRemove({ _id: ctx.params.id});
    ctx.status = 204;
});
router.post('/', async ctx => {
    let company = new Company(ctx.request.body);
    await company.save();
    ctx.body = company;
});
router.put('/:id', async ctx => {
    await Company.findOneAndUpdate({ _id: ctx.params.id}, ctx.request.body, { runValidators: true});
    const company = await Company.findOne({ _id: ctx.params.id});
    ctx.body = company;
});

export default router;