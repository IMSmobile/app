import { SettingImageFieldsPage } from './../src/pages/setting-image-fields/setting-image-fields';
import { browser, element, by, ElementFinder, ExpectedConditions, protractor, $ } from 'protractor';
import { SettingsPageOjbect } from './page-objects/settings-page-object';
import { SettingImageFieldsPageOjbect } from './page-objects/setting-image-field-page-object';
import { LoginPageOjbect } from './page-objects/login-page-object';
import { EntriesPageObject } from './page-objects/entries-page-object';
import { UploadPageObject } from './page-objects/upload-page-object';

describe('Upload E2E Test', () => {

  let originalTimeout;
  let settingsPage = new SettingsPageOjbect();
  let loginPage = new LoginPageOjbect();
  let entriesPage = new EntriesPageObject();
  let uploadPage = new UploadPageObject();
  let settingImageFieldsPageOjbect = new SettingImageFieldsPageOjbect();

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

  it('Should store user and server into settings', () => {
    uploadPage.loadPage();
    uploadPage.writeToTextField(uploadPage.bildNameFieldInput, 'e2e Test');
    uploadPage.clickUploadImageButton();
    browser.wait(ExpectedConditions.visibilityOf(element(by.className('loading-wrapper'))), 10 * 1000);
    browser.wait(ExpectedConditions.invisibilityOf(element(by.className('loading-wrapper'))), 10 * 1000);
    browser.wait(ExpectedConditions.visibilityOf(element(by.className('toast-message'))), 10 * 1000);
  });



  it('Should add fields and testing invalid inputs', () => {
    settingImageFieldsPageOjbect.loadPage();
    settingImageFieldsPageOjbect.settingsImageFieldINTEGERFELDToggle.click();
    settingImageFieldsPageOjbect.settingsImageFieldFLOATFELDToggle.click();
    uploadPage.reloadPage();

    uploadPage.clickIntoBildNameTextField();
    uploadPage.clickIntoIntegerTextField();
    uploadPage.verifyBildNameErrorDivVisible();

    uploadPage.writeToTextField(uploadPage.integerfeldFieldInput, '3.14');
    uploadPage.clickIntoBildNameTextField();
    uploadPage.verifyIntegerErrorDivVisible();

    uploadPage.writeToTextField(uploadPage.integerfeldFieldInput, '1337');
    uploadPage.clickIntoBildNameTextField();
    uploadPage.verifyIntegerErrorDivInvisible();

    uploadPage.writeToTextField(uploadPage.integerfeldFieldInput, '12a');
    uploadPage.clickIntoBildNameTextField();
    uploadPage.verifyIntegerErrorDivVisible();

    uploadPage.writeToTextField(uploadPage.floatfeldFieldInput, '0a1242');
    uploadPage.clickIntoBildNameTextField();
    uploadPage.verifyFloatErrorDivVisible();

    uploadPage.writeToTextField(uploadPage.bildNameFieldInput, 'FieldValidation');
    uploadPage.writeToTextField(uploadPage.integerfeldFieldInput, '1337');
    uploadPage.writeToTextField(uploadPage.floatfeldFieldInput, '123.456');
    uploadPage.verifyBildNameErrorDivInvisible();
    uploadPage.verifyIntegerErrorDivInvisible();
    uploadPage.verifyFloatErrorDivInvisible();
  });
});

function waitUntilStorageReady() {
  browser.sleep(2000);
}
