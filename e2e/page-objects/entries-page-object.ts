import { browser, by, element, ElementArrayFinder, ElementFinder, ExpectedConditions } from 'protractor';
import { Helpers } from './../helpers/helpers';
import { LoginPageObject } from './login-page-object';
import { SettingArchivePageObject } from './setting-archive-page-object';

export class EntriesPageObject {
  public readonly settingsButton: ElementFinder = element(by.id('settingsButton'));
  public readonly entriesItem: ElementFinder = element(by.id('entriesItem34617'));
  public readonly medicineEntriesItem: ElementFinder = element(by.id('entriesItem75'));
  public readonly entriesTitle: ElementFinder = this.entriesItem.element(by.tagName('h1'));
  public readonly entriesFields: ElementArrayFinder = this.entriesItem.all(by.css('.entries-fields'));
  public readonly entriesFirstMetaDataField: ElementFinder = this.entriesFields.get(0);
  public readonly entriesSecondMetaDataField: ElementFinder = this.entriesFields.get(1);
  // tslint:disable-next-line:no-magic-numbers
  public readonly entriesThirdMetaDataField: ElementFinder = this.entriesFields.get(2);
  public readonly entriesGalleryButton: ElementFinder = this.entriesItem.element(by.css('.galleryButton'));
  public readonly entriesFileUpload: ElementFinder = this.entriesItem.element(by.css('.fileUpload'));

  public readonly settingArchivePageObject: SettingArchivePageObject = new SettingArchivePageObject();
  public readonly loginPage: LoginPageObject = new LoginPageObject();

  public loadPage(): void {
    this.settingArchivePageObject.loadPage();
    this.settingArchivePageObject.selectPoliceArchiveWithFilter42();
    this.waitEntriesPageLoaded();
  }

  public reloadPage(): void {
    this.loginPage.login();
    this.waitEntriesPageLoaded();
  }

  public pushToSettingsPage(): void {
    Helpers.waitUntilElementIsReady(this.settingsButton);
    this.settingsButton.click();
  }

  public pushEntriesGalleryButtonOnEntry34617(): void {
    Helpers.waitUntilElementIsReady(this.entriesGalleryButton);
    this.entriesGalleryButton.click();
    Helpers.chooseJPEGImagesInFileDialog(this.entriesFileUpload);
  }

  public verifyEntriesTitleVisible(): void {
    browser.wait(ExpectedConditions.visibilityOf(this.entriesTitle), Helpers.DEFAULT_WAIT_TIMEOUT);
  }

  public verifyNoFieldsVisible(): void {
    browser.wait(ExpectedConditions.and(
      ExpectedConditions.invisibilityOf(this.entriesFirstMetaDataField),
      ExpectedConditions.invisibilityOf(this.entriesSecondMetaDataField),
      ExpectedConditions.invisibilityOf(this.entriesThirdMetaDataField)
    ), Helpers.DEFAULT_WAIT_TIMEOUT);
  }

  public verifyOnlyFirstFieldVisible(): void {
    browser.wait(ExpectedConditions.and(
      ExpectedConditions.invisibilityOf(this.entriesSecondMetaDataField),
      ExpectedConditions.invisibilityOf(this.entriesThirdMetaDataField)
    ), Helpers.DEFAULT_WAIT_TIMEOUT);
  }

  public verifyOnlyFirstTwoFieldsVisible(): void {
    browser.wait(ExpectedConditions.invisibilityOf(this.entriesThirdMetaDataField), Helpers.DEFAULT_WAIT_TIMEOUT);
  }

  public verifyFirstFieldName(text: string): void {
    this.verifyFieldName(text, this.entriesFirstMetaDataField);
  }

  public verifySecondFieldName(text: string): void {
    this.verifyFieldName(text, this.entriesSecondMetaDataField);
  }

  public verifyDragoverlayVisible(): void {
    browser.wait(ExpectedConditions.visibilityOf(element(by.className('drag'))), Helpers.DEFAULT_WAIT_TIMEOUT);
  }

  public verifyDragoverlayInvisible(): void {
    browser.wait(ExpectedConditions.invisibilityOf(element(by.className('drag'))), Helpers.DEFAULT_WAIT_TIMEOUT);
  }

  public sendDropEvent(): void {
    this.removeEventlistenerFromFilePicker();
    this.pushEntriesGalleryButtonOnEntry34617();
    this.createDropEvent();
  }

  public createDragEnterEvent(): void {
    this.entriesItem.getAttribute('id').then(entriesItemId => Helpers.sendDragEnterEventToElement(entriesItemId));
  }

  public createDragLeaveEvent(): void {
    this.entriesItem.getAttribute('id').then(entriesItemId => Helpers.sendDragLeaveEventToElement(entriesItemId));
  }

  private verifyFieldName(expectedFieldname: string, field: ElementFinder): void {
    browser.wait(ExpectedConditions.visibilityOf(field), Helpers.DEFAULT_WAIT_TIMEOUT);
    field.getAttribute('fieldname').then(actualFieldname => expect(actualFieldname).toEqual(expectedFieldname));
  }

  private removeEventlistenerFromFilePicker(): void {
    this.entriesFileUpload.getAttribute('id').then(fileUploadId => Helpers.removeEventlistenerFromElement(fileUploadId));
  }

  private createDropEvent(): void {
    this.entriesFileUpload.getAttribute('id').then(
      uploadId => this.entriesItem.getAttribute('id').then(
        entriesId => Helpers.sendDragDropEventToElement(uploadId, entriesId)
      ));
  }

  private waitEntriesPageLoaded(): void {
    this.waitIonViewDidLoad();
    this.waitIonViewDidEnter();
  }

  private waitIonViewDidLoad(): void {
    browser.sleep(Helpers.DEFAULT_SLEEP_TIME);
    Helpers.waitUntilLoaderFinished();
  }

  private waitIonViewDidEnter(): void {
    browser.sleep(Helpers.DEFAULT_SLEEP_TIME);
    Helpers.waitUntilLoaderFinished();
  }
}
