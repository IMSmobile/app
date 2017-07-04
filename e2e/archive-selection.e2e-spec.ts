import { Helpers } from './helpers/helpers';
import { SettingArchivePageObject } from './page-objects/setting-archive-page-object';
import { browser, ExpectedConditions } from 'protractor';
import { SettingsPageObject } from './page-objects/settings-page-object';
import { SettingImageFieldsPageObject } from './page-objects/setting-image-field-page-object';
import { LoginPageObject } from './page-objects/login-page-object';
import { EntriesPageObject } from './page-objects/entries-page-object';

describe('Archive Selection E2E Test', () => {

  let originalTimeout;
  let settingsArchivePage = new SettingArchivePageObject();
  let loginPage = new LoginPageObject();
  let entriesPage = new EntriesPageObject();
  let settingsPage = new SettingsPageObject();
  let settingImageFieldsPage = new SettingImageFieldsPageObject();

  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
  });

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });


  afterEach(() => {
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
    browser.wait(ExpectedConditions.visibilityOf(entriesPage.medicineEntriesItem), Helpers.DEFAULT_WAIT_TIMEOUT);
  });

  it('Should be able to change archive via settings', () => {
    entriesPage.loadPage();
    browser.wait(ExpectedConditions.visibilityOf(entriesPage.entriesItem), Helpers.DEFAULT_WAIT_TIMEOUT);
    entriesPage.pushToSettingsPage();
    settingsPage.pushToSettingArchivePage();
    settingsArchivePage.selectMedicineArchiveWithFilter43();
    browser.wait(ExpectedConditions.visibilityOf(entriesPage.medicineEntriesItem), Helpers.DEFAULT_WAIT_TIMEOUT);
    loginPage.login();
    browser.wait(ExpectedConditions.visibilityOf(entriesPage.medicineEntriesItem), Helpers.DEFAULT_WAIT_TIMEOUT);
  });

  it('Should keep archiv specfic fields settings when reselecting archive', () => {
    settingImageFieldsPage.loadPage();
    Helpers.toggleFieldSettings(settingImageFieldsPage.settingsImageFieldMEMOFELDToggle);
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
