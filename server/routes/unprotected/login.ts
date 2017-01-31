import { Router } from '../transRouter';
import { IRouterContext } from 'koa-router';
import { User } from '../../models/user';

const router = new Router();
router.post('/', async ctx => {
    const { userNameOrEmail, password } = ctx.request.body;
    if (!userNameOrEmail || !password) {
        return failLogin(ctx);
    }
    const user = await User.loginAsync({ userNameOrEmail, password });
    if (user) {
        ctx.body = user;
        ctx.status = 200;
    } else {
        return failLogin(ctx);
    }
});

function failLogin(ctx: IRouterContext) {
    ctx.status = 404;
}

export default router;