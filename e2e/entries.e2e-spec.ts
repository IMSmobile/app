import { browser } from 'protractor';
import { Helpers } from './helpers/helpers';
import { EntriesPageObject } from './page-objects/entries-page-object';
import { LoginPageObject } from './page-objects/login-page-object';
import { SettingEntriesFieldsPageObject } from './page-objects/setting-entries-field-page-object';
import { UploadPageObject } from './page-objects/upload-page-object';

describe('Entries E2E Test', () => {

  let originalTimeout;
  const loginPage = new LoginPageObject();
  const entriesPage = new EntriesPageObject();
  const uploadPage = new UploadPageObject();
  const settingEntriesFieldsPage = new SettingEntriesFieldsPageObject();

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
