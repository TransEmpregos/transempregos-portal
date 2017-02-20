import { browser, element, by } from 'protractor';
describe('Home', () => {
    beforeEach(() => {
        browser.get('/');
        browser.ignoreSynchronization = true;
    });
    afterEach(() => browser.ignoreSynchronization = false);
    it('should have find jobs call', async () => {
        let title = element.all(by.css('.title-aside-description'));
        await title.get(0).getText().should.eventually.equal('Diversidade de talentos para um mundo de oportunidades');
    });
});