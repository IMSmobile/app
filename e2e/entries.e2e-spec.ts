import { Helpers } from './helpers/helpers';
import { browser } from 'protractor';
import { SettingEntriesFieldsPageOjbect } from './page-objects/setting-entries-field-page-object';
import { LoginPageOjbect } from './page-objects/login-page-object';
import { EntriesPageObject } from './page-objects/entries-page-object';

describe('Entries E2E Test', () => {

  let originalTimeout;
  let loginPage = new LoginPageOjbect();
  let entriesPage = new EntriesPageObject();
  let settingEntriesFieldsPage = new SettingEntriesFieldsPageOjbect();

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

});

