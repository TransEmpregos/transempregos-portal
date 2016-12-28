import { browser, element, by } from 'protractor';
import { expect }  from 'chai';
describe('Home', () => {
    it('should have a title', () => {
        browser.get('/');

        let title = element(by.css('a.navbar-brand'));

        expect(title.getText()).to.eventually.equal('Transempregos');
    });
});