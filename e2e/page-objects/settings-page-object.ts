import { by, element, ElementFinder } from 'protractor';
import { Helpers } from './../helpers/helpers';
import { EntriesPageObject } from './entries-page-object';

export class SettingsPageObject {
  public readonly entriesPage: EntriesPageObject = new EntriesPageObject();
  public readonly settingsImageFieldSettingButton: ElementFinder = element(by.id('settingsImageFieldSettingButton'));
  public readonly settingsEntriesFieldSettingButton: ElementFinder = element(by.id('settingsEntriesListFieldSettingButton'));
  public readonly settingsArchiveButton: ElementFinder = element(by.id('settingsArchiveButton'));
  public readonly settingsLogoutButton: ElementFinder = element(by.id('settingsLogoutButton'));

  public loadPage(): void {
    this.entriesPage.loadPage();
    this.entriesPage.pushToSettingsPage();
  }

  public reloadPage(): void {
    this.entriesPage.reloadPage();
    this.entriesPage.pushToSettingsPage();
  }

  public pushToSettingImageFieldsPage(): void {
    Helpers.waitUntilElementIsReady(this.settingsImageFieldSettingButton);
    this.settingsImageFieldSettingButton.click();
  }

  public pushToSettingEntriesFieldsPage(): void {
    Helpers.waitUntilElementIsReady(this.settingsEntriesFieldSettingButton);
    this.settingsEntriesFieldSettingButton.click();
  }

  public pushToSettingArchivePage(): void {
    Helpers.waitUntilElementIsReady(this.settingsArchiveButton);
    this.settingsArchiveButton.click();
  }

  public logout(): void {
    Helpers.waitUntilElementIsReady(this.settingsLogoutButton);
    this.settingsLogoutButton.click();
  }

}
