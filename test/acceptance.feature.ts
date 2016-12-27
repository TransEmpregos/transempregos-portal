import { browser, element, by } from 'protractor';
import { expect }  from 'chai';
describe('angularjs homepage', () => {
    it('should greet the named user', () => {
        browser.get('http://www.angularjs.org');

        element(by.model('yourName')).sendKeys('Julie');

        let greeting = element(by.binding('yourName'));

        expect(greeting.getText()).to.eventually.equal('Hello Julie!');
    });

    describe('todo list', () => {
        let todoList: any;

        beforeEach(() => {
            browser.get('http://www.angularjs.org');
            todoList = element.all(by.repeater('todo in todoList.todos'));
        });

        it('should list todos', () => {
            expect(todoList.count()).to.eventually.equal(2);
            expect(todoList.get(1).getText()).to.eventually.equal('build an angular app');
        });

        it('should add a todo', () => {
            let addTodo = element(by.model('todoList.todoText'));
            let addButton = element(by.css('[value="add"]'));

            addTodo.sendKeys('write a protractor test');
            addButton.click();

            expect(todoList.count()).to.eventually.equal(3);
            expect(todoList.get(2).getText()).to.eventually.equal('write a protractor test');
        });
    });
});
