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
  let settingsPage = new SettingsPageOjbect();
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

  it('Should select archive from selection, which should be stored as standard', () => {
    loginPage.login();
    settingsArchivePage.selectMedicineArchiveWithFilter43();
    loginPage.login();
    browser.wait(ExpectedConditions.visibilityOf(entriesPage.medicineEntriesItem), 10000);
  });

  it('Should be able to change archive via settings', () => {
    entriesPage.loadPage();
    browser.wait(ExpectedConditions.visibilityOf(entriesPage.entriesItem), 3 * 1000);
    entriesPage.pushToSettingsPage();
    settingsPage.pushToSettingArchivePage();
    settingsArchivePage.selectMedicineArchiveWithFilter43();
    browser.wait(ExpectedConditions.visibilityOf(entriesPage.medicineEntriesItem), 3 * 1000);
    loginPage.login();
    waitUntilBrowserReady();
    browser.wait(ExpectedConditions.visibilityOf(entriesPage.medicineEntriesItem), 3 * 1000);
  });

  it('Should keep archiv specfic fields settings when reselecting archive', () => {
    settingImageFieldsPage.loadPage();
    settingImageFieldsPage.toggleFieldSettings(settingImageFieldsPage.settingsImageFieldMEMOFELDToggle);
    settingImageFieldsPage.verifyToggleActive(settingImageFieldsPage.settingsImageFieldMEMOFELDToggle);
    entriesPage.reloadPage();
    entriesPage.pushToSettingsPage();
    settingsPage.pushToSettingArchivePage();
    settingsArchivePage.selectMedicineArchiveWithFilter43();
    settingImageFieldsPage.reloadPage();
    settingImageFieldsPage.verifyToggleAbsent(settingImageFieldsPage.settingsImageFieldMEMOFELDToggle);
    entriesPage.reloadPage();
    entriesPage.pushToSettingsPage();
    settingsPage.pushToSettingArchivePage();
    settingsArchivePage.selectPoliceArchiveWithFilter42();
    settingImageFieldsPage.reloadPage();
    settingImageFieldsPage.verifyToggleActive(settingImageFieldsPage.settingsImageFieldMEMOFELDToggle);
  });
});

function waitUntilBrowserReady() {
  browser.sleep(1000);
}
