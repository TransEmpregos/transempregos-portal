import { Router } from '../transRouter';
import { City } from '../../models/cities';

const router = new Router();
router.get('/', async ctx => {
    const states = await City.map(a=>a);
    ctx.body = states;
});
router.get('/:id', async ctx => {
    const state = await City
                            .filter( a => a.ID == ctx.params.id)
                            .map(a => a);
    ctx.body = state;
});

export default router;