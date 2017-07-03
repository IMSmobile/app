import { UploadPageObject } from './page-objects/upload-page-object';
import { Helpers } from './helpers/helpers';
import { browser } from 'protractor';
import { SettingEntriesFieldsPageObject } from './page-objects/setting-entries-field-page-object';
import { LoginPageObject } from './page-objects/login-page-object';
import { EntriesPageObject } from './page-objects/entries-page-object';

describe('Entries E2E Test', () => {

  let originalTimeout;
  let loginPage = new LoginPageObject();
  let entriesPage = new EntriesPageObject();
  let uploadPage = new UploadPageObject();
  let settingEntriesFieldsPage = new SettingEntriesFieldsPageObject();

  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  beforeEach(() => {
    loginPage = new LoginPageObject();
    loginPage.loadPage();
  });

  afterEach(function () {
    browser.manage().deleteAllCookies();
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
    browser.executeScript('window.indexedDB.deleteDatabase("imsClientDB")');
  });

  it('Should show title of entry 34617', () => {
    entriesPage.loadPage();
    entriesPage.verifyEntriesTitleVisible();
  });

  it('Should show only the title of entries', () => {
    entriesPage.loadPage();
    entriesPage.verifyNoFieldsVisible();
  });

  it('Should show only the one selected field', () => {
    settingEntriesFieldsPage.loadPage();
    Helpers.toggleFieldSettings(settingEntriesFieldsPage.settingsEntriesFieldMEMOFELDToggle);
    entriesPage.reloadPage();
    entriesPage.verifyFirstFieldStartsWith('MEMOFELD');
    entriesPage.verifyOnlyFirstFieldVisible();
  });

  it('Should show only the two selected fields', () => {
    settingEntriesFieldsPage.loadPage();
    Helpers.toggleFieldSettings(settingEntriesFieldsPage.settingsEntriesFieldMEMOFELDToggle);
    Helpers.toggleFieldSettings(settingEntriesFieldsPage.settingsEntriesFieldTEXTFELDToggle);
    entriesPage.reloadPage();
    entriesPage.verifyFirstFieldStartsWith('MEMOFELD');
    entriesPage.verifySecondFieldStartsWith('TEXTFELD');
    entriesPage.verifyOnlyFirstTwoFieldsVisible();
  });

  it('Should change style, accept dropped file and go to uploadpage', () => {
    entriesPage.loadPage();
    entriesPage.createDragEnterEvent();
    entriesPage.verifyDragoverlayVisible();
    entriesPage.createDragLeaveEvent();
    entriesPage.verifyDragoverlayInvisible();
    entriesPage.sendDropEvent();
    uploadPage.verifyPageLoaded();
  });
});

