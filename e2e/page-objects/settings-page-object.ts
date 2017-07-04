import { Helpers } from './../helpers/helpers';
import { element, by, ElementFinder } from 'protractor';
import 'rxjs/add/observable/fromPromise';
import { EntriesPageObject } from './entries-page-object';

export class SettingsPageObject {
  entriesPage = new EntriesPageObject();
  settingsImageFieldSettingButton: ElementFinder = element(by.id('settingsImageFieldSettingButton'));
  settingsEntriesFieldSettingButton: ElementFinder = element(by.id('settingsEntriesListFieldSettingButton'));
  settingsArchiveButton: ElementFinder = element(by.id('settingsArchiveButton'));
  settingsLogoutButton: ElementFinder = element(by.id('settingsLogoutButton'));


  loadPage() {
    this.entriesPage.loadPage();
    this.entriesPage.pushToSettingsPage();
  }

  reloadPage() {
    this.entriesPage.reloadPage();
    this.entriesPage.pushToSettingsPage();
  }

  pushToSettingImageFieldsPage() {
    Helpers.waitUntilElementIsReady(this.settingsImageFieldSettingButton);
    this.settingsImageFieldSettingButton.click();
  }

  pushToSettingEntriesFieldsPage() {
    Helpers.waitUntilElementIsReady(this.settingsEntriesFieldSettingButton);
    this.settingsEntriesFieldSettingButton.click();
  }

  pushToSettingArchivePage() {
    Helpers.waitUntilElementIsReady(this.settingsArchiveButton);
    this.settingsArchiveButton.click();
  }

  logout() {
    Helpers.waitUntilElementIsReady(this.settingsLogoutButton);
    this.settingsLogoutButton.click();
  }

}
