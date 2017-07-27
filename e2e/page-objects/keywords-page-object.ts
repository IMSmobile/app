import { by, element, ElementArrayFinder, ElementFinder } from 'protractor';
import { Helpers } from '../helpers/helpers';
import { UploadPageObject } from './upload-page-object';

export class KeywordsPageObject {
  public readonly uploadPage: UploadPageObject = new UploadPageObject();
  public readonly keywordButtons: ElementArrayFinder = element.all(by.css('page-keywords:not([hidden]) ion-content ion-list button'));
  public readonly firstButton: ElementFinder = this.keywordButtons.first();

  public loadPage(): void {
    this.uploadPage.loadPage();
    this.uploadPage.clickIntoKeywordDualTextField();
  }

  public reloadPage(): void {
    this.uploadPage.reloadPage();
    this.uploadPage.clickIntoKeywordDualTextField();
  }

  public selectFirstKeyword(): void {
    Helpers.waitUntilElementIsReady(this.firstButton);
    this.firstButton.click();
    Helpers.waitUntilElementIsReady(this.firstButton);
    this.firstButton.click();
    Helpers.waitUntilElementIsReady(this.firstButton);
    this.firstButton.click();
  }

}
