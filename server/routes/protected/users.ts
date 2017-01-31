import { Router } from '../transRouter';
import { User, SafeUser } from '../../models/user';
const pick: Function = require('lodash/pick');

const router = new Router();
router.put('/:id', async ctx => {
    interface LoggedInUserWithId extends SafeUser {
        _id: string;
    }
    const loggedInUser: LoggedInUserWithId = ctx.state.user.user;
    if (loggedInUser._id !== ctx.params.id) {
        ctx.status = 404;
        return;
    }
    const newUserValues = pick(ctx.request.body, 'name');
    const user = await User.findOneAndUpdate({ _id: ctx.params.id }, { $set: newUserValues }, { runValidators: true, new: true });
    if (!user) {
        ctx.status = 404;
        return;
    }
    const safeUser = user.toSafe();
    ctx.body = safeUser;
});

router.get('/:id', async ctx => {
    interface LoggedInUserWithId extends SafeUser {
        _id: string;
    }
    const loggedInUser: LoggedInUserWithId = ctx.state.user.user;
    if (loggedInUser._id !== ctx.params.id) {
        ctx.status = 404;
        return;
    }
    const user = await User.findOneSafe({ _id: ctx.params.id });
    if (!user)
        ctx.status = 404;
    ctx.body = user;
});

export default router;