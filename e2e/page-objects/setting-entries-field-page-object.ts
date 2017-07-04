import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';
import { SettingsPageObject } from './settings-page-object';

export class SettingEntriesFieldsPageObject {
  settingsPage:SettingsPageObject = new SettingsPageObject();
  settingsEntriesFieldSearchbar: ElementFinder = element(by.css('input.searchbar-input'));
  settingsEntriesFieldDisplayedFields: ElementArrayFinder = element.all(by.className('fieldItem'));
  settingsEntriesFieldMEMOFELDToggle: ElementFinder = element(by.id('settingsImageFieldMEMOFELDToggle'));
  settingsEntriesFieldTEXTFELDToggle: ElementFinder = element(by.id('settingsImageFieldTEXTFELDToggle'));

  loadPage(): void {
    this.settingsPage.loadPage();
    this.settingsPage.pushToSettingEntriesFieldsPage();
  }

}
