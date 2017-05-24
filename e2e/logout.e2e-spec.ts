import { browser, element, by, ElementFinder, protractor, $, ExpectedConditions } from 'protractor';
import { LoginPageOjbect } from './page-objects/login-page-object';

describe('Logout E2E Test', () => {

  let originalTimeout;
  let loginPage: LoginPageOjbect;
  let moreButton: ElementFinder = element(by.id('barButtonMore'));
  let logoutButton: ElementFinder = element(by.id('morePopoverLogoutButton'));

  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  beforeEach(() => {
    loginPage = new LoginPageOjbect();
    loginPage.loadPage();
  });

  afterEach(function () {
    browser.manage().deleteAllCookies();
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
    browser.executeScript('window.indexedDB.deleteDatabase("imsClientDB")');
  });

  it('Should return to Loginscreen', () => {
    loginPage.login();
    waitUntilElementsAreClickable();
    moreButton.click();
    waitUntilElementsAreClickable();
    logoutButton.click();
    waitUntilPageReady();
    loginPage.getServerInputText().then(text => expect(text).toEqual(loginPage.server));
    loginPage.getUserInputText().then(text => expect(text).toEqual(loginPage.user));
    loginPage.getPasswordInputText().then(text => expect(text).toEqual(''));
  });
});

function waitUntilElementsAreClickable() {
  browser.wait(ExpectedConditions.stalenessOf($('.click-block-active')));
  browser.sleep(500);
}

function waitUntilPageReady() {
  browser.sleep(1000);
}
