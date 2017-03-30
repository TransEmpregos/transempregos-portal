import { browser, element, by } from 'protractor';
describe('Home', () => {
    it('should have find jobs call', async () => {
        browser.get('/');

        let title = element.all(by.css('.home-text-for-candidate'));

        await title.get(0).getText().should.eventually.equal('Encontre vagas para o seu talento');
    });
});