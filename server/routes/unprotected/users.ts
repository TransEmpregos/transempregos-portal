import { Router } from '../transRouter';
import { User } from '../../models/user';

const router = new Router();
router.post('/', async ctx => {
    const user = new User(ctx.request.body);
    user.isAdmin = false;
    const existingUser = await User.findOne({ $or: [{ userName: user.userName }, { email: user.email } ]});
    if (existingUser) {
        ctx.status = 400;
        return;
    }
    await user.save();
    ctx.body = user.toSafe();
});

export default router;