import { browser, ExpectedConditions} from 'protractor';
import { Helpers } from './helpers/helpers';
import { LoginPageObject } from './page-objects/login-page-object';
import { SettingImageFieldsPageObject } from './page-objects/setting-image-field-page-object';
import { SettingsPageObject } from './page-objects/settings-page-object';
import { UploadPageObject } from './page-objects/upload-page-object';

describe('Settings E2E Test', () => {

  let originalTimeout;
  const settingsPage = new SettingsPageObject();
  const loginPage = new LoginPageObject();
  const uploadPage = new UploadPageObject();
  const settingImageFieldsPage = new SettingImageFieldsPageObject();

  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = Helpers.JASMINE_TIMEOUT_INTERVAL;
  });

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  beforeEach(() => {
    loginPage.loadPage();
  });

  afterEach(() => {
    browser.manage().deleteAllCookies();
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
    browser.executeScript('window.indexedDB.deleteDatabase("imsClientDB")');
  });

  it('Should store user and server into settings', () => {
    loginPage.login();
    Helpers.waitUntilStorageReady();
    loginPage.loadPage();
    loginPage.getServerInputText().then(text => expect(text).toEqual(loginPage.server));
    loginPage.getUserInputText().then(text => expect(text).toEqual(loginPage.user));
    loginPage.getPasswordInputText().then(text => expect(text).toEqual(''));
  });

  it('Should disable server field through disabling in settingspage', () => {
    settingsPage.loadPage();
    Helpers.toggleFieldSettings(settingImageFieldsPage.settingsShowRestUrlFieldToggle);
    loginPage.loadPage();
    loginPage.isServerInputPresent().then(displayed => expect(displayed).toBeFalsy());
  });

  it('Should persist image field settings', () => {
    settingImageFieldsPage.loadPage();
    settingImageFieldsPage.verifyToggleInactive(settingImageFieldsPage.settingsImageFieldBOOLEANNOToggle);
    Helpers.toggleFieldSettings(settingImageFieldsPage.settingsImageFieldBOOLEANNOToggle);
    settingImageFieldsPage.reloadPage();
    settingImageFieldsPage.verifyToggleActive(settingImageFieldsPage.settingsImageFieldBOOLEANNOToggle);
  });

  it('Should show enabled field in upload page', () => {
    settingImageFieldsPage.loadPage();
    settingImageFieldsPage.verifyToggleInactive(settingImageFieldsPage.settingsImageFieldMEMOFELDToggle);
    Helpers.toggleFieldSettings(settingImageFieldsPage.settingsImageFieldMEMOFELDToggle);
    uploadPage.reloadPage();
    browser.wait(ExpectedConditions.visibilityOf(uploadPage.memofeldFieldInput), Helpers.DEFAULT_WAIT_TIMEOUT);
  });

  it('Should not show disabled field in upload page', () => {
    settingImageFieldsPage.loadPage();
    settingImageFieldsPage.verifyToggleInactive(settingImageFieldsPage.settingsImageFieldMEMOFELDToggle);
    Helpers.toggleFieldSettings(settingImageFieldsPage.settingsImageFieldMEMOFELDToggle);
    settingImageFieldsPage.verifyToggleActive(settingImageFieldsPage.settingsImageFieldMEMOFELDToggle);
    Helpers.toggleFieldSettings(settingImageFieldsPage.settingsImageFieldMEMOFELDToggle);
    uploadPage.reloadPage();
    browser.wait(ExpectedConditions.invisibilityOf(uploadPage.memofeldFieldInput), Helpers.DEFAULT_WAIT_TIMEOUT);
  });

  it('Should show enabled fields in upload page', () => {
    settingImageFieldsPage.loadPage();
    settingImageFieldsPage.verifyToggleInactive(settingImageFieldsPage.settingsImageFieldMEMOFELDToggle);
    settingImageFieldsPage.verifyToggleInactive(settingImageFieldsPage.settingsImageFieldTEXTFELDToggle);
    Helpers.toggleFieldSettings(settingImageFieldsPage.settingsImageFieldMEMOFELDToggle);
    Helpers.toggleFieldSettings(settingImageFieldsPage.settingsImageFieldTEXTFELDToggle);
    uploadPage.reloadPage();
    browser.wait(ExpectedConditions.visibilityOf(uploadPage.memofeldFieldInput), Helpers.DEFAULT_WAIT_TIMEOUT);
    browser.wait(ExpectedConditions.visibilityOf(uploadPage.textfeldFieldInput), Helpers.DEFAULT_WAIT_TIMEOUT);
  });

  it('Should not show disabled field in upload page', () => {
    settingImageFieldsPage.loadPage();
    settingImageFieldsPage.verifyToggleInactive(settingImageFieldsPage.settingsImageFieldMEMOFELDToggle);
    settingImageFieldsPage.verifyToggleInactive(settingImageFieldsPage.settingsImageFieldTEXTFELDToggle);
    Helpers.toggleFieldSettings(settingImageFieldsPage.settingsImageFieldMEMOFELDToggle);
    Helpers.toggleFieldSettings(settingImageFieldsPage.settingsImageFieldTEXTFELDToggle);
    settingImageFieldsPage.verifyToggleActive(settingImageFieldsPage.settingsImageFieldMEMOFELDToggle);
    settingImageFieldsPage.verifyToggleActive(settingImageFieldsPage.settingsImageFieldTEXTFELDToggle);
    Helpers.toggleFieldSettings(settingImageFieldsPage.settingsImageFieldMEMOFELDToggle);
    Helpers.toggleFieldSettings(settingImageFieldsPage.settingsImageFieldTEXTFELDToggle);
    uploadPage.reloadPage();
    browser.wait(ExpectedConditions.invisibilityOf(uploadPage.memofeldFieldInput), Helpers.DEFAULT_WAIT_TIMEOUT);
    browser.wait(ExpectedConditions.invisibilityOf(uploadPage.textfeldFieldInput), Helpers.DEFAULT_WAIT_TIMEOUT);
  });

  it('Should filter image field settings', () => {
    const testFilters = [{filterText: 'K', expectedFields: 3}, {filterText: 'Key', expectedFields: 2}];
    settingImageFieldsPage.loadPage();
    testFilters.map((testFilter) => {
      settingImageFieldsPage.filterFields(testFilter.filterText);
      settingImageFieldsPage.verifyFieldsDisplayed(testFilter.expectedFields);
    });
  });
});
