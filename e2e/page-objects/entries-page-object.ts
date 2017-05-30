import { LoginPageOjbect } from './login-page-object';
import { SettingArchivePageObject } from './setting-archive-page-object';
import { SettingArchivePage } from './../../src/pages/setting-archive/setting-archive';
import { browser, element, by, ElementFinder, $, promise, ExpectedConditions, ElementArrayFinder } from 'protractor';
import 'rxjs/add/observable/fromPromise';
import { Observable } from 'rxjs/Observable';

export class EntriesPageObject {
  moreButton: ElementFinder = element(by.id('barButtonMore'));
  settingsButton: ElementFinder = element(by.id('morePopoverSettingsButton'));
  entriesItem: ElementFinder = element(by.id('entriesItem34617'));
  entriesTitle: ElementFinder = this.entriesItem.element(by.tagName('h1'));
  entriesFields: ElementArrayFinder = this.entriesItem.all(by.css('.entries-fields'));
  entriesFirstMetaDataField: ElementFinder = this.entriesFields.get(0);
  entriesSecondMetaDataField: ElementFinder = this.entriesFields.get(1);
  entriesThirdMetaDataField: ElementFinder = this.entriesFields.get(2);
  entriesCameraButton: ElementFinder = this.entriesItem.element(by.tagName('button'));
  settingArchivePageObject = new SettingArchivePageObject();
  loginPage = new LoginPageOjbect();

  loadPage() {
    this.settingArchivePageObject.loadPage();
    this.settingArchivePageObject.selectPoliceArchiveWithFilter42();
  }

  reloadPage() {
    this.loginPage.login();
    this.waitUntilElementsAreClickable();
  }

  pushToSettingsPage() {
    this.moreButton.click();
    this.waitUntilElementsAreClickable();
    this.settingsButton.click();
    this.waitUntilElementsAreClickable();
  }

  pushEntriesCameraButtonOnEntry34617() {
    this.entriesCameraButton.click();
    this.waitUntilElementsAreClickable();
  }

  waitUntilElementsAreClickable() {
    browser.wait(ExpectedConditions.stalenessOf($('.click-block-active')));
    browser.sleep(1000);
  }

  verifyEntriesTitleVisible() {
    browser.wait(ExpectedConditions.visibilityOf(this.entriesTitle), 3 * 1000);
  }

  verifyNoFieldsVisible() {
    browser.wait(ExpectedConditions.and(
      ExpectedConditions.invisibilityOf(this.entriesFirstMetaDataField),
      ExpectedConditions.invisibilityOf(this.entriesSecondMetaDataField),
      ExpectedConditions.invisibilityOf(this.entriesThirdMetaDataField)
    ), 3 * 1000);
  }

  verifyOnlyFirstFieldVisible() {
    browser.wait(ExpectedConditions.and(
      ExpectedConditions.invisibilityOf(this.entriesSecondMetaDataField),
      ExpectedConditions.invisibilityOf(this.entriesThirdMetaDataField)
    ), 3 * 1000);
  }

  verifyOnlyFirstTwoFieldsVisible() {
    browser.wait(ExpectedConditions.invisibilityOf(this.entriesThirdMetaDataField), 3 * 1000);
  }

  verifyFirstFieldStartsWith(text: string) {
    this.verifyFieldStartsWith(text, this.entriesFirstMetaDataField);
  }

  verifySecondFieldStartsWith(text: string) {
    this.verifyFieldStartsWith(text, this.entriesSecondMetaDataField);
  }

  verifyFieldStartsWith(text: string, field: ElementFinder) {
    browser.wait(ExpectedConditions.visibilityOf(field), 3 * 1000);
    expect(field.getText()).toMatch(new RegExp('^' + text));
  }
}
