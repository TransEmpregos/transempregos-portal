import { Router } from '../transRouter';
import { State } from '../../models/state';
import { City } from '../../models/cities'

const router = new Router();
router.get('/', async ctx => {
    const states = await State.map(a=>a);
    ctx.body = states;
});
router.get('/:id', async ctx => {
    const state = await State
                            .filter( a => a.ID == ctx.params.id)
                            .map(a => a);
    ctx.body = state;
});

router.get('/:id/cities', async ctx => {
    const cities = await City.filter( a => a.Estado == ctx.params.id)
                            .map(a => a);
    ctx.body = cities;
});

export default router;