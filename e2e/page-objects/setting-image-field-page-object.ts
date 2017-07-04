import { Helpers } from './../helpers/helpers';
import { browser, element, by, ElementFinder, ExpectedConditions, ElementArrayFinder } from 'protractor';
import 'rxjs/add/observable/fromPromise';
import { SettingsPageObject } from './settings-page-object';

export class SettingImageFieldsPageObject {
  settingsPage = new SettingsPageObject();
  settingsImageFieldSearchbar: ElementFinder = element(by.css('input.searchbar-input'));
  settingsImageFieldDisplayedFields: ElementArrayFinder = element.all(by.className('fieldItem'));
  settingsShowRestUrlFieldToggle: ElementFinder = element(by.id('settingsShowRestUrlFieldToggle'));
  settingsImageFieldBOOLEANNOToggle: ElementFinder = element(by.id('settingsImageFieldBOOLEANNOToggle'));
  settingsImageFieldMEMOFELDToggle: ElementFinder = element(by.id('settingsImageFieldMEMOFELDToggle'));
  settingsImageFieldTEXTFELDToggle: ElementFinder = element(by.id('settingsImageFieldTEXTFELDToggle'));
  settingsImageFieldINTEGERFELDToggle: ElementFinder = element(by.id('settingsImageFieldINTEGERFELDToggle'));
  settingsImageFieldFLOATFELDToggle: ElementFinder = element(by.id('settingsImageFieldFLOATFELDToggle'));

  loadPage() {
    this.settingsPage.loadPage();
    this.settingsPage.pushToSettingImageFieldsPage();
  }

  reloadPage() {
    this.settingsPage.reloadPage();
    this.settingsPage.pushToSettingImageFieldsPage();
  }

  filterFields(filter: string) {
    Helpers.waitUntilElementIsReady(this.settingsImageFieldSearchbar);
    this.settingsImageFieldSearchbar.clear();
    this.settingsImageFieldSearchbar.sendKeys(filter);
    Helpers.waitUntilElementIsReady(this.settingsImageFieldSearchbar);
  }

  verifyFieldsDisplayed(count: number) {
    this.settingsImageFieldDisplayedFields.count().then(actualCount => expect(actualCount).toBe(count));
  }

  verifyToggleActive(toggleField: ElementFinder) {
    Helpers.waitUntilElementIsReady(toggleField);
    toggleField.getAttribute('class').then(classes => expect(classes).toContain('toggle-checked'));
  }

  verifyToggleAbsent(toggleField: ElementFinder) {
    browser.wait(ExpectedConditions.stalenessOf(toggleField), Helpers.DEFAULT_WAIT_TIMEOUT);
  }

  verifyToggleInactive(toggleField: ElementFinder) {
    Helpers.waitUntilElementIsReady(toggleField);
    toggleField.getAttribute('class').then(classes => expect(classes).not.toContain('toggle-checked'));
  }



}

