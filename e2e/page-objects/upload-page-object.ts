import { browser, by, element, ElementFinder, ExpectedConditions, promise, protractor } from 'protractor';
import 'rxjs/add/observable/fromPromise';
import { Helpers } from './../helpers/helpers';
import { EntriesPageObject } from './entries-page-object';

export class UploadPageObject {
  public readonly entriesPage: EntriesPageObject = new EntriesPageObject();
  public readonly bildNameFieldInput: ElementFinder = element(by.css('input[ng-reflect-name=BILDNAME]'));
  public readonly uploadImageButton: ElementFinder = element(by.id('uploadImageButton'));
  public readonly contentDiv: ElementFinder = element(by.id('content'));
  public readonly memofeldFieldInput: ElementFinder = element(by.css('input[ng-reflect-name=MEMOFELD]'));
  public readonly textfeldFieldInput: ElementFinder = element(by.css('input[ng-reflect-name=TEXTFELD]'));
  public readonly integerfeldFieldInput: ElementFinder = element(by.css('input[ng-reflect-name=INTEGERFELD]'));
  public readonly floatfeldFieldInput: ElementFinder = element(by.css('input[ng-reflect-name=FLOATFELD]'));
  public readonly booleanFieldToggle: ElementFinder = element(by.css('ion-toggle[ng-reflect-name=BOOLEANNO]'));
  public readonly dateTimeInput: ElementFinder = element(by.css('ion-datetime[ng-reflect-name=DATETIMEFELD]'));
  public readonly dateInput: ElementFinder = element(by.css('ion-datetime[ng-reflect-name=DATEFELD]'));
  public readonly timeInput: ElementFinder = element(by.css('ion-datetime[ng-reflect-name=TIMEFELD]'));
  public readonly ionDateTimeDoneButton: ElementFinder = element(by.css('ion-picker-cmp .picker-toolbar-button:not(.picker-toolbar-cancel) button'));
  public readonly uploadFieldErrorDivBILDNAME: ElementFinder = element(by.id('uploadFieldErrorDivBILDNAME'));
  public readonly uploadFieldErrorDivINTEGERFELD: ElementFinder = element(by.id('uploadFieldErrorDivINTEGERFELD'));
  public readonly uploadFieldErrorDivFLOATFELD: ElementFinder = element(by.id('uploadFieldErrorDivFLOATFELD'));
  public readonly getGalleryPictureButton: ElementFinder = element(by.id('getGalleryPictureButton'));
  public readonly bildNameMandatoryMarker: ElementFinder = element(by.id('mandatoryBILDNAME'));
  public readonly integerfeldMandatoryMarker: ElementFinder = element(by.id('mandatoryINTEGERFELD'));
  public readonly fileUpload: ElementFinder = element(by.id('fileUpload'));

  public loadPage(): void {
    this.entriesPage.loadPage();
    this.entriesPage.pushEntriesGalleryButtonOnEntry34617();
  }

  public reloadPage(): void {
    this.entriesPage.reloadPage();
    this.entriesPage.pushEntriesGalleryButtonOnEntry34617();
  }
  public writeToTextField(textField: ElementFinder, text: string): void {
    Helpers.waitUntilElementIsReady(textField);
    textField.clear();
    textField.sendKeys(text);
    browser.waitForAngular();
  }

  public toggleBooleanField(): void {
    Helpers.waitUntilElementIsReady(this.booleanFieldToggle);
    this.booleanFieldToggle.click();
    browser.waitForAngular();
  }

  public selectNewPictureFromGallery(): void {
    Helpers.waitUntilElementIsReady(this.getGalleryPictureButton);
    this.getGalleryPictureButton.click();
    Helpers.chooseJPEGImageInFileDialog(this.fileUpload);
  }

  public clickIntoBildNameTextField(): void {
    this.clickIntoTextField(this.bildNameFieldInput);
  }

  public clickIntoIntegerTextField(): void {
    this.clickIntoTextField(this.integerfeldFieldInput);
  }

  public createDragEnterEvent(): void {
    this.contentDiv.getAttribute('id').then(entriesItemId => Helpers.sendDragEnterEventToElement(entriesItemId));
  }

  public createDragLeaveEvent(): void {
    this.contentDiv.getAttribute('id').then(entriesItemId => Helpers.sendDragLeaveEventToElement(entriesItemId));
  }

  public sendDropEvent(): void {
    this.removeEventlistenerFromFilePicker();
    this.selectNewPictureFromGallery();
    this.createDropEvent();
  }

  public sendEnterKey(textField: ElementFinder): void {
    Helpers.waitUntilElementIsReady(textField);
    textField.sendKeys(protractor.Key.ENTER);
    browser.waitForAngular();
  }

  public pickDefaultFromDateTimePicker(dateTimeField: ElementFinder): void {
    Helpers.waitUntilElementIsReady(dateTimeField);
    dateTimeField.click();
    Helpers.waitUntilElementIsReady(this.ionDateTimeDoneButton);
    this.ionDateTimeDoneButton.click();
  }

  public verifyBildNameErrorDivVisible(): void {
    this.verifyErrorDivVisible(this.uploadFieldErrorDivBILDNAME);
  }

  public verifyIntegerErrorDivVisible(): void {
    this.verifyErrorDivVisible(this.uploadFieldErrorDivINTEGERFELD);
  }

  public verifyFloatErrorDivVisible(): void {
    this.verifyErrorDivVisible(this.uploadFieldErrorDivFLOATFELD);
  }

  public verifyBildNameErrorDivInvisible(): void {
    this.verifyErrorDivInvisible(this.uploadFieldErrorDivBILDNAME);
  }

  public verifyIntegerErrorDivInvisible(): void {
    this.verifyErrorDivInvisible(this.uploadFieldErrorDivINTEGERFELD);
  }

  public verifyFloatErrorDivInvisible(): void {
    this.verifyErrorDivInvisible(this.uploadFieldErrorDivFLOATFELD);
  }

  public verifyBildNameMarkedAsMandatoryField(): void {
    browser.wait(ExpectedConditions.visibilityOf(this.bildNameMandatoryMarker), Helpers.DEFAULT_WAIT_TIMEOUT);
  }

  public verifyIntegerNotMarkedAsMandatoryField(): void {
    browser.wait(ExpectedConditions.invisibilityOf(this.integerfeldMandatoryMarker), Helpers.DEFAULT_WAIT_TIMEOUT);
  }

  public verifyPageLoaded(): void {
    browser.wait(ExpectedConditions.visibilityOf(this.uploadImageButton), Helpers.DEFAULT_WAIT_TIMEOUT);
  }

  public verifyDragoverlayVisible(): void {
    browser.wait(ExpectedConditions.visibilityOf(element(by.className('drag-overlay'))), Helpers.DEFAULT_WAIT_TIMEOUT);
  }

  public verifyDragoverlayInvisible(): void {
    browser.wait(ExpectedConditions.invisibilityOf(element(by.className('drag-overlay'))), Helpers.DEFAULT_WAIT_TIMEOUT);
  }

  public clickUploadImageButton(): void {
    Helpers.waitUntilElementIsReady(this.uploadImageButton);
    this.uploadImageButton.click();
  }

  public verifyToastMessage(): void {
    browser.wait(ExpectedConditions.visibilityOf(element(by.className('toast-message'))), Helpers.DEFAULT_WAIT_TIMEOUT);
  }

  public verifyDateTimeDisplayValue(): void {
    expect(this.getDateDisplayText(this.dateTimeInput)).toMatch(/[0-9]{2}.[0-9]{2}.[0-9]{4} [0-9]{2}:[0-9]{2}:[0-9]{2}/);
  }

  public verifyDateDisplayValue(): void {
    expect(this.getDateDisplayText(this.dateTimeInput)).toMatch(/[0-9]{2}.[0-9]{2}.[0-9]{4}/);
  }

  public verifyTimeDisplayValue(): void {
    expect(this.getDateDisplayText(this.dateTimeInput)).toMatch(/[0-9]{2}:[0-9]{2}:[0-9]{2}/);
  }

  private clickIntoTextField(textField: ElementFinder): void {
    Helpers.waitUntilElementIsReady(textField);
    textField.click();
    browser.waitForAngular();
  }

  private removeEventlistenerFromFilePicker(): void {
    this.fileUpload.getAttribute('id').then(fileUploadId => Helpers.removeEventlistenerFromElement(fileUploadId));
  }

  private createDropEvent(): void {
    this.fileUpload.getAttribute('id').then(
      sourceFileInputId => this.contentDiv.getAttribute('id').then(
        targetId => Helpers.sendDragDropEventToElement(sourceFileInputId, targetId)
      ));
  }

  private verifyErrorDivVisible(errorDiv: ElementFinder): void {
    browser.wait(ExpectedConditions.visibilityOf(errorDiv), Helpers.DEFAULT_WAIT_TIMEOUT);
  }

  private verifyErrorDivInvisible(errorDiv: ElementFinder): void {
    browser.wait(ExpectedConditions.invisibilityOf(errorDiv), Helpers.DEFAULT_WAIT_TIMEOUT);
  }

  private getDateDisplayText(dateInput: ElementFinder): promise.Promise<string> {
    return dateInput.element(by.css('.datetime-text')).getText();
  }
}
