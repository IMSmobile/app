import { by, element, ElementArrayFinder, ElementFinder } from 'protractor';
import { SettingsPageObject } from './settings-page-object';

export class SettingEntriesFieldsPageObject {
  public readonly settingsPage: SettingsPageObject = new SettingsPageObject();
  public readonly settingsEntriesFieldSearchbar: ElementFinder = element(by.css('input.searchbar-input'));
  public readonly settingsEntriesFieldDisplayedFields: ElementArrayFinder = element.all(by.className('fieldItem'));
  public readonly settingsEntriesFieldMEMOFELDToggle: ElementFinder = element(by.id('settingsImageFieldMEMOFELDToggle'));
  public readonly settingsEntriesFieldTEXTFELDToggle: ElementFinder = element(by.id('settingsImageFieldTEXTFELDToggle'));

  public loadPage(): void {
    this.settingsPage.loadPage();
    this.settingsPage.pushToSettingEntriesFieldsPage();
  }

}
