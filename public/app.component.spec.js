"use strict";

describe('App', function() {
    let xpto;
    before(function() {
        xpto = {
            foo: sinon.spy()
        };
    });

    it('Wharever', function() {
        xpto.foo();
        xpto.foo.should.have.calledOnce;
    });
});