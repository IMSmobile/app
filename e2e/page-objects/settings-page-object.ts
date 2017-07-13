import { by, element, ElementFinder } from 'protractor';
import 'rxjs/add/observable/fromPromise';
import { Helpers } from './../helpers/helpers';
import { EntriesPageObject } from './entries-page-object';

export class SettingsPageObject {
  entriesPage: EntriesPageObject = new EntriesPageObject();
  settingsImageFieldSettingButton: ElementFinder = element(by.id('settingsImageFieldSettingButton'));
  settingsEntriesFieldSettingButton: ElementFinder = element(by.id('settingsEntriesListFieldSettingButton'));
  settingsArchiveButton: ElementFinder = element(by.id('settingsArchiveButton'));
  settingsLogoutButton: ElementFinder = element(by.id('settingsLogoutButton'));

  loadPage(): void {
    this.entriesPage.loadPage();
    this.entriesPage.pushToSettingsPage();
  }

  reloadPage(): void {
    this.entriesPage.reloadPage();
    this.entriesPage.pushToSettingsPage();
  }

  pushToSettingImageFieldsPage(): void {
    Helpers.waitUntilElementIsReady(this.settingsImageFieldSettingButton);
    this.settingsImageFieldSettingButton.click();
  }

  pushToSettingEntriesFieldsPage(): void {
    Helpers.waitUntilElementIsReady(this.settingsEntriesFieldSettingButton);
    this.settingsEntriesFieldSettingButton.click();
  }

  pushToSettingArchivePage(): void {
    Helpers.waitUntilElementIsReady(this.settingsArchiveButton);
    this.settingsArchiveButton.click();
  }

  logout(): void {
    Helpers.waitUntilElementIsReady(this.settingsLogoutButton);
    this.settingsLogoutButton.click();
  }

}
