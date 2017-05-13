import { browser, element, by, ElementFinder, ExpectedConditions, protractor, $ } from 'protractor';
import { LoginPageOjbect } from './login-page-object';

describe('Settings E2E Test', () => {

  let originalTimeout;
  let loginPage = new LoginPageOjbect();
  let moreButton: ElementFinder = element(by.id('barButtonMore'));
  let settingsButton: ElementFinder = element(by.id('morePopoverSettingsButton'));
  let settingsShowRestUrlFieldToggle: ElementFinder = element(by.id('settingsShowRestUrlFieldToggle'));
  let settingsImageFieldSettingButton: ElementFinder = element(by.id('settingsImageFieldSettingButton'));
  let settingsImageFieldIADeletedToggle: ElementFinder = element(by.id('settingsImageFieldIADeletedToggle'));
  let settingsImageFieldIADeletedToggleChecked: ElementFinder = $('#settingsImageFieldIADeletedToggle .toggle-checked');

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

  it('Should persist image field settings', () => {
    loginPage.login();
    waitUntilElementsAreClickable();
    moreButton.click();
    waitUntilElementsAreClickable();
    settingsButton.click();
    waitUntilElementsAreClickable();
    settingsImageFieldSettingButton.click();
    waitUntilElementsAreClickable();
    browser.isElementPresent(settingsImageFieldIADeletedToggleChecked).then(present => expect(present).toBeFalsy());
    settingsImageFieldIADeletedToggle.click();
    waitUntilStorageReady();
    loginPage.loadPage();
    waitUntilElementsAreClickable();
    loginPage.passwordInput.sendKeys(loginPage.password);
    loginPage.loginButton.click();
    waitUntilElementsAreClickable();
    moreButton.click();
    waitUntilElementsAreClickable();
    settingsButton.click();
    waitUntilElementsAreClickable();
    settingsImageFieldSettingButton.click();
    waitUntilElementsAreClickable();
    browser.isElementPresent(settingsImageFieldIADeletedToggleChecked).then(present => expect(present).toBeTruthy());
  });

});

function waitUntilElementsAreClickable() {
  browser.wait(ExpectedConditions.stalenessOf($('.click-block-active')));
  browser.sleep(1000);
}

function waitUntilStorageReady() {
  browser.sleep(1000);
}
