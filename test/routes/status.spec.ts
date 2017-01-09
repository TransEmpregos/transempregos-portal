// import * as Router from 'koa-router';
import { statusRouter } from '../../server/routes/status';
import { upMonitor } from '../../server/upmonitor';
import * as request from 'supertest';
import * as Koa from 'koa';
import * as http from 'http';

describe('Status route', () => {
    // these 2 tests go through a web api with super test, those are integration tests
    it('should be down by default', done => {
        upMonitor.reset();
        const app = new Koa();
        app.use(statusRouter.routes());
        const server = request.agent(http.createServer(app.callback()));
        server.get('/')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(503, {
                status: 'Server is down because \'Not yet initialized.\''
            }, done);
    });
    it('should be up after upMonitor is set', done => {
        upMonitor.set({ up: true }, 'Test');
        const app = new Koa();
        app.use(statusRouter.routes());
        const server = request.agent(http.createServer(app.callback()));
        server.get('/')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, {
                status: 'ok'
            }, done);
    });
    // these 2 tests call directly the route method, they are unit tests
    it('should be down by default (direct call)', () => {
        upMonitor.reset();
        const method = statusRouter.findRoute('/');
        let ctx: any = { };
        method(ctx, null);
        ctx.status.should.eql(503);
        ctx.body.should.eql({ status: 'Server is down because \'Not yet initialized.\'' });
    });
    it('should be up after upMonitor is set (direct call)', () => {
        upMonitor.set({ up: true }, 'Test');
        const method = statusRouter.findRoute('/');
        let ctx: any = { };
        method(ctx, null);
        ctx.status.should.eql(200);
        ctx.body.should.eql({ status: 'ok' });
    });
});