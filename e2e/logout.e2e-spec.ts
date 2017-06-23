import { SettingsPageObject } from './page-objects/settings-page-object';
import { browser, element, by, ElementFinder, protractor, $, ExpectedConditions } from 'protractor';
import { LoginPageObject } from './page-objects/login-page-object';

describe('Logout E2E Test', () => {

  let originalTimeout;
  let loginPage: LoginPageObject = new LoginPageObject();
  let settingsPage: SettingsPageObject = new SettingsPageObject();

  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  beforeEach(() => {
    loginPage.loadPage();
  });

  afterEach(function () {
    browser.manage().deleteAllCookies();
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
    browser.executeScript('window.indexedDB.deleteDatabase("imsClientDB")');
  });

  it('Should return to Loginscreen', () => {
    settingsPage.loadPage();
    settingsPage.logout();
    loginPage.getServerInputText().then(text => expect(text).toEqual(loginPage.server));
    loginPage.getUserInputText().then(text => expect(text).toEqual(loginPage.user));
    loginPage.getPasswordInputText().then(text => expect(text).toEqual(''));
  });
});

function waitUntilElementsAreClickable() {
  browser.wait(ExpectedConditions.stalenessOf($('.click-block-active')));
  browser.sleep(1000);
}

function waitUntilPageReady() {
  browser.sleep(2000);
}
