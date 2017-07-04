import { Helpers } from './../helpers/helpers';
import { browser, element, by, ElementFinder, ExpectedConditions, protractor } from 'protractor';
import 'rxjs/add/observable/fromPromise';
import { EntriesPageObject } from './entries-page-object';

export class UploadPageObject {
  entriesPage:EntriesPageObject = new EntriesPageObject();
  bildNameFieldInput: ElementFinder = element(by.css('input[ng-reflect-name=BILDNAME]'));
  uploadImageButton: ElementFinder = element(by.id('uploadImageButton'));
  contentDiv: ElementFinder = element(by.id('content'));
  memofeldFieldInput: ElementFinder = element(by.css('input[ng-reflect-name=MEMOFELD]'));
  textfeldFieldInput: ElementFinder = element(by.css('input[ng-reflect-name=TEXTFELD]'));
  integerfeldFieldInput: ElementFinder = element(by.css('input[ng-reflect-name=INTEGERFELD]'));
  floatfeldFieldInput: ElementFinder = element(by.css('input[ng-reflect-name=FLOATFELD]'));
  booleanFieldToggle: ElementFinder = element(by.css('ion-toggle[ng-reflect-name=BOOLEANNO]'));
  uploadFieldErrorDivBILDNAME: ElementFinder = element(by.id('uploadFieldErrorDivBILDNAME'));
  uploadFieldErrorDivINTEGERFELD: ElementFinder = element(by.id('uploadFieldErrorDivINTEGERFELD'));
  uploadFieldErrorDivFLOATFELD: ElementFinder = element(by.id('uploadFieldErrorDivFLOATFELD'));
  getGalleryPictureButton: ElementFinder = element(by.id('getGalleryPictureButton'));
  bildNameMandatoryMarker: ElementFinder = element(by.id('mandatoryBILDNAME'));
  integerfeldMandatoryMarker: ElementFinder = element(by.id('mandatoryINTEGERFELD'));
  fileUpload: ElementFinder = element(by.id('fileUpload'));

  loadPage(): void {
    this.entriesPage.loadPage();
    this.entriesPage.pushEntriesGalleryButtonOnEntry34617();
  }

  reloadPage(): void {
    this.entriesPage.reloadPage();
    this.entriesPage.pushEntriesGalleryButtonOnEntry34617();
  }
  writeToTextField(textField: ElementFinder, text: string): void {
    Helpers.waitUntilElementIsReady(textField);
    textField.clear();
    textField.sendKeys(text);
    browser.waitForAngular();
  }

  toggleBooleanField(): void {
    Helpers.waitUntilElementIsReady(this.booleanFieldToggle);
    this.booleanFieldToggle.click();
    browser.waitForAngular();
  }

  selectNewPictureFromGallery(): void {
    Helpers.waitUntilElementIsReady(this.getGalleryPictureButton);
    this.getGalleryPictureButton.click();
    Helpers.chooseJPEGImageInFileDialog(this.fileUpload);
  }

  clickIntoBildNameTextField(): void {
    this.clickIntoTextField(this.bildNameFieldInput);
  }

  clickIntoIntegerTextField(): void {
    this.clickIntoTextField(this.integerfeldFieldInput);
  }

  clickIntoTextField(textField: ElementFinder): void {
    Helpers.waitUntilElementIsReady(textField);
    textField.click();
    browser.waitForAngular();
  }

  createDragEnterEvent(): void {
    this.contentDiv.getAttribute('id').then(entriesItemId => Helpers.sendDragEnterEventToElement(entriesItemId));
  }

  createDragLeaveEvent(): void {
    this.contentDiv.getAttribute('id').then(entriesItemId => Helpers.sendDragLeaveEventToElement(entriesItemId));
  }

  sendDropEvent(): void {
    this.removeEventlistenerFromFilePicker();
    this.selectNewPictureFromGallery();
    this.createDropEvent();
  }

  removeEventlistenerFromFilePicker(): void {
    this.fileUpload.getAttribute('id').then(fileUploadId => Helpers.removeEventlistenerFromElement(fileUploadId));
  }

  createDropEvent(): void {
    this.fileUpload.getAttribute('id').then(
      sourceFileInputId => this.contentDiv.getAttribute('id').then(
        targetId => Helpers.sendDragDropEventToElement(sourceFileInputId, targetId)
      ));
  }

  sendEnterKey(textField: ElementFinder): void {
    Helpers.waitUntilElementIsReady(textField);
    textField.sendKeys(protractor.Key.ENTER);
    browser.waitForAngular();
  }

  verifyBildNameErrorDivVisible(): void {
    this.verifyErrorDivVisible(this.uploadFieldErrorDivBILDNAME);
  }

  verifyIntegerErrorDivVisible(): void {
    this.verifyErrorDivVisible(this.uploadFieldErrorDivINTEGERFELD);
  }

  verifyFloatErrorDivVisible(): void {
    this.verifyErrorDivVisible(this.uploadFieldErrorDivFLOATFELD);
  }

  verifyErrorDivVisible(errorDiv: ElementFinder): void {
    browser.wait(ExpectedConditions.visibilityOf(errorDiv), Helpers.DEFAULT_WAIT_TIMEOUT);
  }

  verifyBildNameErrorDivInvisible(): void {
    this.verifyErrorDivInvisible(this.uploadFieldErrorDivBILDNAME);
  }

  verifyIntegerErrorDivInvisible(): void {
    this.verifyErrorDivInvisible(this.uploadFieldErrorDivINTEGERFELD);
  }

  verifyFloatErrorDivInvisible(): void {
    this.verifyErrorDivInvisible(this.uploadFieldErrorDivFLOATFELD);
  }

  verifyErrorDivInvisible(errorDiv: ElementFinder): void {
    browser.wait(ExpectedConditions.invisibilityOf(errorDiv), Helpers.DEFAULT_WAIT_TIMEOUT);
  }

  verifyBildNameMarkedAsMandatoryField(): void {
    browser.wait(ExpectedConditions.visibilityOf(this.bildNameMandatoryMarker), Helpers.DEFAULT_WAIT_TIMEOUT);
  }

  verifyIntegerNotMarkedAsMandatoryField(): void {
    browser.wait(ExpectedConditions.invisibilityOf(this.integerfeldMandatoryMarker), Helpers.DEFAULT_WAIT_TIMEOUT);
  }

  verifyPageLoaded(): void {
    browser.wait(ExpectedConditions.visibilityOf(this.uploadImageButton), Helpers.DEFAULT_WAIT_TIMEOUT);
  }

  verifyDragoverlayVisible(): void {
    browser.wait(ExpectedConditions.visibilityOf(element(by.className('drag-overlay'))), Helpers.DEFAULT_WAIT_TIMEOUT);
  }

  verifyDragoverlayInvisible(): void {
    browser.wait(ExpectedConditions.invisibilityOf(element(by.className('drag-overlay'))), Helpers.DEFAULT_WAIT_TIMEOUT);
  }

  clickUploadImageButton(): void {
    Helpers.waitUntilElementIsReady(this.uploadImageButton);
    this.uploadImageButton.click();
  }

  verifyToastMessage(): void {
    browser.wait(ExpectedConditions.visibilityOf(element(by.className('toast-message'))), Helpers.DEFAULT_WAIT_TIMEOUT);
  }
}
