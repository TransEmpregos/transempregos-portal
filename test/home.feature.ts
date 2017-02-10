import { browser, element, by } from 'protractor';
import { expect }  from 'chai';
describe('Home', () => {
    it('should have find jobs call', () => {
        browser.get('/');

        let title = element.all(by.css('.title-aside-description'));

        expect(title.get(0).getText()).to.eventually.equal('Diversidade de talentos para um mundo de oportunidades');
    });
});