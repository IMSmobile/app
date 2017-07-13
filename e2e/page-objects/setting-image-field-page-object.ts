import { browser, by, element, ElementArrayFinder, ElementFinder, ExpectedConditions } from 'protractor';
import 'rxjs/add/observable/fromPromise';
import { Helpers } from './../helpers/helpers';
import { SettingsPageObject } from './settings-page-object';

export class SettingImageFieldsPageObject {
  public readonly settingsPage: SettingsPageObject = new SettingsPageObject();
  public readonly settingsImageFieldSearchbar: ElementFinder = element(by.css('input.searchbar-input'));
  public readonly settingsImageFieldDisplayedFields: ElementArrayFinder = element.all(by.className('fieldItem'));
  public readonly settingsShowRestUrlFieldToggle: ElementFinder = element(by.id('settingsShowRestUrlFieldToggle'));
  public readonly settingsImageFieldBOOLEANNOToggle: ElementFinder = element(by.id('settingsImageFieldBOOLEANNOToggle'));
  public readonly settingsImageFieldMEMOFELDToggle: ElementFinder = element(by.id('settingsImageFieldMEMOFELDToggle'));
  public readonly settingsImageFieldTEXTFELDToggle: ElementFinder = element(by.id('settingsImageFieldTEXTFELDToggle'));
  public readonly settingsImageFieldINTEGERFELDToggle: ElementFinder = element(by.id('settingsImageFieldINTEGERFELDToggle'));
  public readonly settingsImageFieldFLOATFELDToggle: ElementFinder = element(by.id('settingsImageFieldFLOATFELDToggle'));
  public readonly settingsImageFieldDATETIMEFELDToggle: ElementFinder = element(by.id('settingsImageFieldDATETIMEFELDToggle'));
  public readonly settingsImageFieldDATEFELDToggle: ElementFinder = element(by.id('settingsImageFieldDATEFELDToggle'));
  public readonly settingsImageFieldTIMEFELDToggle: ElementFinder = element(by.id('settingsImageFieldTIMEFELDToggle'));

  public loadPage(): void {
    this.settingsPage.loadPage();
    this.settingsPage.pushToSettingImageFieldsPage();
  }

  public reloadPage(): void {
    this.settingsPage.reloadPage();
    this.settingsPage.pushToSettingImageFieldsPage();
  }

  public filterFields(filter: string): void {
    Helpers.waitUntilElementIsReady(this.settingsImageFieldSearchbar);
    this.settingsImageFieldSearchbar.clear();
    this.settingsImageFieldSearchbar.sendKeys(filter);
    Helpers.waitUntilElementIsReady(this.settingsImageFieldSearchbar);
  }

  public verifyFieldsDisplayed(count: number): void {
    this.settingsImageFieldDisplayedFields.count().then(actualCount => expect(actualCount).toBe(count));
  }

  public verifyToggleActive(toggleField: ElementFinder): void {
    Helpers.waitUntilElementIsReady(toggleField);
    toggleField.getAttribute('class').then(classes => expect(classes).toContain('toggle-checked'));
  }

  public verifyToggleAbsent(toggleField: ElementFinder): void {
    browser.wait(ExpectedConditions.stalenessOf(toggleField), Helpers.DEFAULT_WAIT_TIMEOUT);
  }

  public verifyToggleInactive(toggleField: ElementFinder): void {
    Helpers.waitUntilElementIsReady(toggleField);
    toggleField.getAttribute('class').then(classes => expect(classes).not.toContain('toggle-checked'));
  }

}
