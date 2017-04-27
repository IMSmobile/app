import { browser, element, by, ElementFinder } from 'protractor';

let loginButton: ElementFinder = element.all(by.className('button-login')).first();

describe('Login E2E Test', () => {

  var originalTimeout;

  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });


    beforeEach(() => {
        browser.get('');
    });

    it('Toast Message appears with failed login attempt', () => {
        loginButton.click();
        element.all(by.className('toast-message')).count().then(c => expect(c).toBe(1));
    });
});
