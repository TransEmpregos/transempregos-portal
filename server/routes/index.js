var router = require('koa-router')();

router.get('/', function(ctx, next) {
    //  ctx.body = 'Hello World!';
    console.log(12, ctx);
    console.log(14, ctx.render.toString());
    ctx.render('index.html', {
        title: 'Hello World Koa!'
    });
})
module.exports = router;
