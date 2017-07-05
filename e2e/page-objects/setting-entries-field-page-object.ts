import { by, element, ElementArrayFinder, ElementFinder } from 'protractor';
import { SettingsPageObject } from './settings-page-object';

export class SettingEntriesFieldsPageObject {
  settingsPage = new SettingsPageObject();
  settingsEntriesFieldSearchbar: ElementFinder = element(by.css('input.searchbar-input'));
  settingsEntriesFieldDisplayedFields: ElementArrayFinder = element.all(by.className('fieldItem'));
  settingsEntriesFieldMEMOFELDToggle: ElementFinder = element(by.id('settingsImageFieldMEMOFELDToggle'));
  settingsEntriesFieldTEXTFELDToggle: ElementFinder = element(by.id('settingsImageFieldTEXTFELDToggle'));

  loadPage() {
    this.settingsPage.loadPage();
    this.settingsPage.pushToSettingEntriesFieldsPage();
  }

}
