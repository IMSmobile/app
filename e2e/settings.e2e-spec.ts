import { browser, element, by, ElementFinder, ExpectedConditions, protractor, $ } from 'protractor';
import { SettingsPageOjbect } from './page-objects/settings-page-object';
import { SettingImageFieldsPageOjbect } from './page-objects/setting-image-field-page-object';
import { LoginPageOjbect } from './page-objects/login-page-object';
import { EntriesPageOjbect } from './page-objects/entries-page-object';

describe('Settings E2E Test', () => {

  let originalTimeout;
  let settingsPage = new SettingsPageOjbect();
  let loginPage = new LoginPageOjbect();
  let entriesPage = new EntriesPageOjbect();
  let settingImageFieldsPage = new SettingImageFieldsPageOjbect();
  let settingsShowRestUrlFieldToggle: ElementFinder = element(by.id('settingsShowRestUrlFieldToggle'));
  let settingsImageFieldBOOLEANNOToggle: ElementFinder = element(by.id('settingsImageFieldBOOLEANNOToggle'));

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
    settingsPage.loadPage();
    settingsShowRestUrlFieldToggle.click();
    waitUntilStorageReady();
    loginPage.loadPage();
    loginPage.isServerInputPresent().then(displayed => expect(displayed).toBeFalsy());
  });

  it('Should persist image field settings', () => {
    settingImageFieldsPage.loadPage();
    settingsImageFieldBOOLEANNOToggle.getAttribute('class').then(classes => expect(classes).not.toContain('toggle-checked'));
    settingsImageFieldBOOLEANNOToggle.click();
    waitUntilStorageReady();
    settingImageFieldsPage.reloadPage();
    settingsImageFieldBOOLEANNOToggle.getAttribute('class').then(classes => expect(classes).toContain('toggle-checked'));
  });

  it('Should filter image field settings', () => {
    settingImageFieldsPage.loadPage();
    settingImageFieldsPage.filterFields('K');
    settingImageFieldsPage.verifyFieldsDisplayed(3);
    settingImageFieldsPage.filterFields('Key');
    settingImageFieldsPage.verifyFieldsDisplayed(2);
  });
});

function waitUntilStorageReady() {
  browser.sleep(1000);
}
