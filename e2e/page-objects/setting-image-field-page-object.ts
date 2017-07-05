import { browser, by, element, ElementArrayFinder, ElementFinder, ExpectedConditions } from 'protractor';
import 'rxjs/add/observable/fromPromise';
import { Helpers } from './../helpers/helpers';
import { SettingsPageObject } from './settings-page-object';

export class SettingImageFieldsPageObject {
  settingsPage: SettingsPageObject = new SettingsPageObject();
  settingsImageFieldSearchbar: ElementFinder = element(by.css('input.searchbar-input'));
  settingsImageFieldDisplayedFields: ElementArrayFinder = element.all(by.className('fieldItem'));
  settingsShowRestUrlFieldToggle: ElementFinder = element(by.id('settingsShowRestUrlFieldToggle'));
  settingsImageFieldBOOLEANNOToggle: ElementFinder = element(by.id('settingsImageFieldBOOLEANNOToggle'));
  settingsImageFieldMEMOFELDToggle: ElementFinder = element(by.id('settingsImageFieldMEMOFELDToggle'));
  settingsImageFieldTEXTFELDToggle: ElementFinder = element(by.id('settingsImageFieldTEXTFELDToggle'));
  settingsImageFieldINTEGERFELDToggle: ElementFinder = element(by.id('settingsImageFieldINTEGERFELDToggle'));
  settingsImageFieldFLOATFELDToggle: ElementFinder = element(by.id('settingsImageFieldFLOATFELDToggle'));

  loadPage(): void {
    this.settingsPage.loadPage();
    this.settingsPage.pushToSettingImageFieldsPage();
  }

  reloadPage(): void {
    this.settingsPage.reloadPage();
    this.settingsPage.pushToSettingImageFieldsPage();
  }

  filterFields(filter: string): void {
    Helpers.waitUntilElementIsReady(this.settingsImageFieldSearchbar);
    this.settingsImageFieldSearchbar.clear();
    this.settingsImageFieldSearchbar.sendKeys(filter);
    Helpers.waitUntilElementIsReady(this.settingsImageFieldSearchbar);
  }

  verifyFieldsDisplayed(count: number): void {
    this.settingsImageFieldDisplayedFields.count().then(actualCount => expect(actualCount).toBe(count));
  }

  verifyToggleActive(toggleField: ElementFinder): void {
    Helpers.waitUntilElementIsReady(toggleField);
    toggleField.getAttribute('class').then(classes => expect(classes).toContain('toggle-checked'));
  }

  verifyToggleAbsent(toggleField: ElementFinder): void {
    browser.wait(ExpectedConditions.stalenessOf(toggleField), Helpers.DEFAULT_WAIT_TIMEOUT);
  }

  verifyToggleInactive(toggleField: ElementFinder): void {
    Helpers.waitUntilElementIsReady(toggleField);
    toggleField.getAttribute('class').then(classes => expect(classes).not.toContain('toggle-checked'));
  }

}
