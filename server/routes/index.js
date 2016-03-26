var router = require('koa-router')();
router.get('/', async (ctx, next) => {
    await ctx.render('./index', {
        title: 'Hello World Koa!'
    });
});
module.exports = router;