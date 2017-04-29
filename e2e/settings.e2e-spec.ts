import { browser, element, by, ElementFinder, ExpectedConditions, protractor, $ } from 'protractor';
import { LoginPageOjbect } from './login-page-object';

describe('Settings E2E Test', () => {

  let originalTimeout;
  let loginPage = new LoginPageOjbect();
  let moreButton: ElementFinder = element(by.id('barButtonMore'));
  let settingsButton: ElementFinder = element(by.id('morePopoverSettingsButton'));
  let settingsShowRestUrlFieldToggle: ElementFinder = element(by.id('settingsShowRestUrlFieldToggle'));

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


  it('Should store user and server into settings', () => {
    loginPage.login();
    waitUntilStorageReady();
    loginPage.loadPage();
    loginPage.getServerInputText().then(text => expect(text).toEqual(loginPage.server));
    loginPage.getUserInputText().then(text => expect(text).toEqual(loginPage.user));
    loginPage.getPasswordInputText().then(text => expect(text).toEqual(''));
  });

  it('Should disable server field through disabling in settingspage', () => {
    loginPage.login();
    waitUntilElementsAreClickable();
    moreButton.click();
    waitUntilElementsAreClickable();
    settingsButton.click();
    waitUntilElementsAreClickable();
    settingsShowRestUrlFieldToggle.click();
    waitUntilStorageReady();
    loginPage.loadPage();
    loginPage.isServerInputPresent().then(displayed => expect(displayed).toBeFalsy());
  });

});

function waitUntilElementsAreClickable() {
  browser.wait(ExpectedConditions.stalenessOf($('.click-block-active')));
  browser.sleep(500);
}

function waitUntilStorageReady() {
  browser.sleep(1000);
}
