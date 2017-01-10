import { browser, element, by } from 'protractor';
import { expect }  from 'chai';
describe('Home', () => {
    it('should have find jobs call', () => {
        browser.get('/');

        let title = element(by.css('.home-text-for-recruiter'));

        expect(title.getText()).to.eventually.equal('Encontre vagas para o seu talento.');
    });
});