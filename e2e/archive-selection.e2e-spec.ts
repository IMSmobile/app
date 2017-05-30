import { SettingArchivePageObject } from './page-objects/setting-archive-page-object';
import { browser, element, by, ElementFinder, ExpectedConditions, protractor, $ } from 'protractor';
import { SettingsPageOjbect } from './page-objects/settings-page-object';
import { SettingImageFieldsPageOjbect } from './page-objects/setting-image-field-page-object';
import { LoginPageOjbect } from './page-objects/login-page-object';
import { EntriesPageObject } from './page-objects/entries-page-object';
import { UploadPageObject } from './page-objects/upload-page-object';

describe('Archive Selection E2E Test', () => {

  let originalTimeout;
  let settingsArchivePage = new SettingArchivePageObject();
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


  afterEach(function () {
    browser.manage().deleteAllCookies();
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
    browser.executeScript('window.indexedDB.deleteDatabase("imsClientDB")');
  });

  it('Should show error when user has no rest client rest filter', () => {
    loginPage.loginWithUserWithNoAccess();
    settingsArchivePage.logoutWhenNoArchive();
    loginPage.getPasswordInputText().then(text => expect(text).toEqual(''));
  });

});

function waitUntilStorageReady() {
  browser.sleep(1000);
}
