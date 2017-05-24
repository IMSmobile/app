import { browser, element, by, ElementFinder, ExpectedConditions, protractor, $ } from 'protractor';
import { SettingsPageOjbect } from './page-objects/settings-page-object';
import { SettingImageFieldsPageOjbect } from './page-objects/setting-image-field-page-object';
import { LoginPageOjbect } from './page-objects/login-page-object';
import { EntriesPageObject } from './page-objects/entries-page-object';
import { UploadPageObject } from './page-objects/upload-page-object';

describe('Settings E2E Test', () => {

  let originalTimeout;
  let settingsPage = new SettingsPageOjbect();
  let loginPage = new LoginPageOjbect();
  let entriesPage = new EntriesPageObject();
  let uploadPage = new UploadPageObject();
  let settingImageFieldsPage = new SettingImageFieldsPageOjbect();

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
    settingImageFieldsPage.toggleFieldSettings(settingImageFieldsPage.settingsShowRestUrlFieldToggle);
    loginPage.loadPage();
    loginPage.isServerInputPresent().then(displayed => expect(displayed).toBeFalsy());
  });

  it('Should persist image field settings', () => {
    settingImageFieldsPage.loadPage();
    settingImageFieldsPage.verifyToggleInactive(settingImageFieldsPage.settingsImageFieldBOOLEANNOToggle);
    settingImageFieldsPage.toggleFieldSettings(settingImageFieldsPage.settingsImageFieldBOOLEANNOToggle);
    settingImageFieldsPage.loadPage();
    settingImageFieldsPage.verifyToggleActive(settingImageFieldsPage.settingsImageFieldBOOLEANNOToggle);
  });

  it('Should show enabled field in upload page', () => {
    settingImageFieldsPage.loadPage();
    settingImageFieldsPage.verifyToggleInactive(settingImageFieldsPage.settingsImageFieldMEMOFELDToggle);
    settingImageFieldsPage.toggleFieldSettings(settingImageFieldsPage.settingsImageFieldMEMOFELDToggle);
    uploadPage.loadPage();
    browser.wait(ExpectedConditions.visibilityOf(uploadPage.memofeldFieldInput), 10  * 1000);
  });

  it('Should not show disabled field in upload page', () => {
    settingImageFieldsPage.loadPage();
    settingImageFieldsPage.verifyToggleInactive(settingImageFieldsPage.settingsImageFieldMEMOFELDToggle);
    settingImageFieldsPage.toggleFieldSettings(settingImageFieldsPage.settingsImageFieldMEMOFELDToggle);
    settingImageFieldsPage.verifyToggleActive(settingImageFieldsPage.settingsImageFieldMEMOFELDToggle);
    settingImageFieldsPage.toggleFieldSettings(settingImageFieldsPage.settingsImageFieldMEMOFELDToggle);
    uploadPage.loadPage();
    browser.wait(ExpectedConditions.invisibilityOf(uploadPage.memofeldFieldInput), 10  * 1000);
  });

  it('Should show enabled fields in upload page', () => {
    settingImageFieldsPage.loadPage();
    settingImageFieldsPage.verifyToggleInactive(settingImageFieldsPage.settingsImageFieldMEMOFELDToggle);
    settingImageFieldsPage.verifyToggleInactive(settingImageFieldsPage.settingsImageFieldTEXTFELDToggle);
    settingImageFieldsPage.toggleFieldSettings(settingImageFieldsPage.settingsImageFieldMEMOFELDToggle);
    settingImageFieldsPage.toggleFieldSettings(settingImageFieldsPage.settingsImageFieldTEXTFELDToggle);
    uploadPage.loadPage();
    browser.wait(ExpectedConditions.visibilityOf(uploadPage.memofeldFieldInput), 10  * 1000);
    browser.wait(ExpectedConditions.visibilityOf(uploadPage.textfeldFieldInput), 10  * 1000);
  });

  it('Should not show disabled field in upload page', () => {
    settingImageFieldsPage.loadPage();
    settingImageFieldsPage.verifyToggleInactive(settingImageFieldsPage.settingsImageFieldMEMOFELDToggle);
    settingImageFieldsPage.verifyToggleInactive(settingImageFieldsPage.settingsImageFieldTEXTFELDToggle);
    settingImageFieldsPage.toggleFieldSettings(settingImageFieldsPage.settingsImageFieldMEMOFELDToggle);
    settingImageFieldsPage.toggleFieldSettings(settingImageFieldsPage.settingsImageFieldTEXTFELDToggle);
    settingImageFieldsPage.verifyToggleActive(settingImageFieldsPage.settingsImageFieldMEMOFELDToggle);
    settingImageFieldsPage.verifyToggleActive(settingImageFieldsPage.settingsImageFieldTEXTFELDToggle);
    settingImageFieldsPage.toggleFieldSettings(settingImageFieldsPage.settingsImageFieldMEMOFELDToggle);
    settingImageFieldsPage.toggleFieldSettings(settingImageFieldsPage.settingsImageFieldTEXTFELDToggle);
    uploadPage.loadPage();
    browser.wait(ExpectedConditions.invisibilityOf(uploadPage.memofeldFieldInput), 10  * 1000);
    browser.wait(ExpectedConditions.invisibilityOf(uploadPage.textfeldFieldInput), 10  * 1000);
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
