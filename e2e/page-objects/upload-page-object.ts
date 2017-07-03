import { Helpers } from './../helpers/helpers';
import { browser, element, by, ElementFinder, $, promise, ExpectedConditions, protractor } from 'protractor';
import 'rxjs/add/observable/fromPromise';
import { Observable } from 'rxjs/Observable';
import { LoginPageObject } from './login-page-object';
import { EntriesPageObject } from './entries-page-object';

export class UploadPageObject {
  entriesPage = new EntriesPageObject();
  bildNameFieldInput: ElementFinder = element(by.css('input[ng-reflect-name=BILDNAME]'));
  uploadImageButton: ElementFinder = element(by.id('uploadImageButton'));
  contentDiv: ElementFinder = element(by.id('content'));
  memofeldFieldInput: ElementFinder = element(by.css('input[ng-reflect-name=MEMOFELD]'));
  textfeldFieldInput: ElementFinder = element(by.css('input[ng-reflect-name=TEXTFELD]'));
  integerfeldFieldInput: ElementFinder = element(by.css('input[ng-reflect-name=INTEGERFELD]'));
  floatfeldFieldInput: ElementFinder = element(by.css('input[ng-reflect-name=FLOATFELD]'));
  booleanFieldToggle: ElementFinder = element(by.css('ion-toggle[ng-reflect-name=BOOLEANNO]'));
  dateTimeInput: ElementFinder = element(by.css('ion-datetime[ng-reflect-name=DATETIMEFELD]'));
  dateInput: ElementFinder = element(by.css('ion-datetime[ng-reflect-name=DATEFELD]'));
  timeInput: ElementFinder = element(by.css('ion-datetime[ng-reflect-name=TIMEFELD]'));
  ionDateTimeDoneButton: ElementFinder = element(by.css('ion-picker-cmp .picker-toolbar-button:not(.picker-toolbar-cancel) button'));
  uploadFieldErrorDivBILDNAME: ElementFinder = element(by.id('uploadFieldErrorDivBILDNAME'));
  uploadFieldErrorDivINTEGERFELD: ElementFinder = element(by.id('uploadFieldErrorDivINTEGERFELD'));
  uploadFieldErrorDivFLOATFELD: ElementFinder = element(by.id('uploadFieldErrorDivFLOATFELD'));
  getGalleryPictureButton: ElementFinder = element(by.id('getGalleryPictureButton'));
  bildNameMandatoryMarker: ElementFinder = element(by.id('mandatoryBILDNAME'));
  integerfeldMandatoryMarker: ElementFinder = element(by.id('mandatoryINTEGERFELD'));
  fileUpload: ElementFinder = element(by.id('fileUpload'));

  loadPage() {
    this.entriesPage.loadPage();
    this.entriesPage.pushEntriesGalleryButtonOnEntry34617();
  }

  reloadPage() {
    this.entriesPage.reloadPage();
    this.entriesPage.pushEntriesGalleryButtonOnEntry34617();
  }
  writeToTextField(textField: ElementFinder, text: string) {
    Helpers.waitUntilElementIsReady(textField);
    textField.clear();
    textField.sendKeys(text);
    browser.waitForAngular();
  }

  toggleBooleanField() {
    Helpers.waitUntilElementIsReady(this.booleanFieldToggle);
    this.booleanFieldToggle.click();
    browser.waitForAngular();
  }

  selectNewPictureFromGallery() {
    Helpers.waitUntilElementIsReady(this.getGalleryPictureButton);
    this.getGalleryPictureButton.click();
    Helpers.chooseJPEGImageInFileDialog(this.fileUpload);
  }

  clickIntoBildNameTextField() {
    this.clickIntoTextField(this.bildNameFieldInput);
  }

  clickIntoIntegerTextField() {
    this.clickIntoTextField(this.integerfeldFieldInput);
  }

  clickIntoTextField(textField: ElementFinder) {
    Helpers.waitUntilElementIsReady(textField);
    textField.click();
    browser.waitForAngular();
  }

  createDragEnterEvent() {
    this.contentDiv.getAttribute('id').then(entriesItemId => Helpers.sendDragEnterEventToElement(entriesItemId));
  }

  createDragLeaveEvent() {
    this.contentDiv.getAttribute('id').then(entriesItemId => Helpers.sendDragLeaveEventToElement(entriesItemId));
  }

  sendDropEvent() {
    this.removeEventlistenerFromFilePicker();
    this.selectNewPictureFromGallery();
    this.createDropEvent();
  }

  removeEventlistenerFromFilePicker() {
    this.fileUpload.getAttribute('id').then(fileUploadId => Helpers.removeEventlistenerFromElement(fileUploadId));
  }

  createDropEvent() {
    this.fileUpload.getAttribute('id').then(
      sourceFileInputId => this.contentDiv.getAttribute('id').then(
        targetId => Helpers.sendDragDropEventToElement(sourceFileInputId, targetId)
      ));
  }

  sendEnterKey(textField: ElementFinder) {
    Helpers.waitUntilElementIsReady(textField);
    textField.sendKeys(protractor.Key.ENTER);
    browser.waitForAngular();
  }

  pickDefaultFromDateTimePicker(dateTimeField: ElementFinder) {
    Helpers.waitUntilElementIsReady(dateTimeField);
    dateTimeField.click();
    Helpers.waitUntilElementIsReady(this.ionDateTimeDoneButton);
    this.ionDateTimeDoneButton.click();
  }

  verifyBildNameErrorDivVisible() {
    this.verifyErrorDivVisible(this.uploadFieldErrorDivBILDNAME);
  }

  verifyIntegerErrorDivVisible() {
    this.verifyErrorDivVisible(this.uploadFieldErrorDivINTEGERFELD);
  }

  verifyFloatErrorDivVisible() {
    this.verifyErrorDivVisible(this.uploadFieldErrorDivFLOATFELD);
  }

  verifyErrorDivVisible(errorDiv: ElementFinder) {
    browser.wait(ExpectedConditions.visibilityOf(errorDiv), Helpers.DEFAULT_WAIT_TIMEOUT);
  }

  verifyBildNameErrorDivInvisible() {
    this.verifyErrorDivInvisible(this.uploadFieldErrorDivBILDNAME);
  }

  verifyIntegerErrorDivInvisible() {
    this.verifyErrorDivInvisible(this.uploadFieldErrorDivINTEGERFELD);
  }

  verifyFloatErrorDivInvisible() {
    this.verifyErrorDivInvisible(this.uploadFieldErrorDivFLOATFELD);
  }

  verifyErrorDivInvisible(errorDiv: ElementFinder) {
    browser.wait(ExpectedConditions.invisibilityOf(errorDiv), Helpers.DEFAULT_WAIT_TIMEOUT);
  }

  verifyBildNameMarkedAsMandatoryField() {
    browser.wait(ExpectedConditions.visibilityOf(this.bildNameMandatoryMarker), Helpers.DEFAULT_WAIT_TIMEOUT);
  }

  verifyIntegerNotMarkedAsMandatoryField() {
    browser.wait(ExpectedConditions.invisibilityOf(this.integerfeldMandatoryMarker), Helpers.DEFAULT_WAIT_TIMEOUT);
  }

  verifyPageLoaded() {
    browser.wait(ExpectedConditions.visibilityOf(this.uploadImageButton), Helpers.DEFAULT_WAIT_TIMEOUT);
  }

  verifyDragoverlayVisible() {
    browser.wait(ExpectedConditions.visibilityOf(element(by.className('drag-overlay'))), Helpers.DEFAULT_WAIT_TIMEOUT);
  }

  verifyDragoverlayInvisible() {
    browser.wait(ExpectedConditions.invisibilityOf(element(by.className('drag-overlay'))), Helpers.DEFAULT_WAIT_TIMEOUT);
  }

  clickUploadImageButton() {
    Helpers.waitUntilElementIsReady(this.uploadImageButton);
    this.uploadImageButton.click();
  }

  verifyToastMessage() {
    browser.wait(ExpectedConditions.visibilityOf(element(by.className('toast-message'))), Helpers.DEFAULT_WAIT_TIMEOUT);
  }
}
