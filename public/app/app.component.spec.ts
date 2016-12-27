describe('App', function() {
    let xpto: any;
    before(function() {
        xpto = {
            foo: sinon.spy()
        };
    });

    it('Whatever', function() {
        xpto.foo();
        xpto.foo.should.have.calledOnce;
    });
});