import { Helpers } from './../helpers/helpers';
import { LoginPageObject } from './login-page-object';
import { SettingArchivePageObject } from './setting-archive-page-object';
import { SettingArchivePage } from './../../src/pages/setting-archive/setting-archive';
import { browser, element, by, ElementFinder, $, promise, ExpectedConditions, ElementArrayFinder } from 'protractor';
import 'rxjs/add/observable/fromPromise';
import { Observable } from 'rxjs/Observable';

export class EntriesPageObject {
  settingsButton: ElementFinder = element(by.id('settingsButton'));
  entriesItem: ElementFinder = element(by.id('entriesItem34617'));
  medicineEntriesItem: ElementFinder = element(by.id('entriesItem75'));
  entriesTitle: ElementFinder = this.entriesItem.element(by.tagName('h1'));
  entriesFields: ElementArrayFinder = this.entriesItem.all(by.css('.entries-fields'));
  entriesFirstMetaDataField: ElementFinder = this.entriesFields.get(0);
  entriesSecondMetaDataField: ElementFinder = this.entriesFields.get(1);
  entriesThirdMetaDataField: ElementFinder = this.entriesFields.get(2);
  entriesCameraButton: ElementFinder = this.entriesItem.element(by.css('.cameraButton'));
  entriesGalleryButton: ElementFinder = this.entriesItem.element(by.css('.galleryButton'));
  entriesFileUpload: ElementFinder = this.entriesItem.element(by.css('.fileUpload'));

  settingArchivePageObject = new SettingArchivePageObject();
  loginPage = new LoginPageObject();

  loadPage() {
    this.settingArchivePageObject.loadPage();
    this.settingArchivePageObject.selectPoliceArchiveWithFilter42();
    this.waitEntriesPageLoaded();
  }

  reloadPage() {
    this.loginPage.login();
    this.waitEntriesPageLoaded();
  }

  pushToSettingsPage() {
    Helpers.waitUntilElementIsReady(this.settingsButton);
    this.settingsButton.click();
  }

  pushEntriesCameraButtonOnEntry34617() {
    Helpers.waitUntilElementIsReady(this.entriesCameraButton);
    this.entriesCameraButton.click();
  }

  pushEntriesGalleryButtonOnEntry34617() {
    Helpers.waitUntilElementIsReady(this.entriesGalleryButton);
    this.entriesGalleryButton.click();
    Helpers.chooseJPEGImageInFileDialog(this.entriesFileUpload);
  }

  verifyEntriesTitleVisible() {
    browser.wait(ExpectedConditions.visibilityOf(this.entriesTitle), Helpers.DEFAULT_WAIT_TIMEOUT);
  }

  verifyNoFieldsVisible() {
    browser.wait(ExpectedConditions.and(
      ExpectedConditions.invisibilityOf(this.entriesFirstMetaDataField),
      ExpectedConditions.invisibilityOf(this.entriesSecondMetaDataField),
      ExpectedConditions.invisibilityOf(this.entriesThirdMetaDataField)
    ), Helpers.DEFAULT_WAIT_TIMEOUT);
  }

  verifyOnlyFirstFieldVisible() {
    browser.wait(ExpectedConditions.and(
      ExpectedConditions.invisibilityOf(this.entriesSecondMetaDataField),
      ExpectedConditions.invisibilityOf(this.entriesThirdMetaDataField)
    ), Helpers.DEFAULT_WAIT_TIMEOUT);
  }

  verifyOnlyFirstTwoFieldsVisible() {
    browser.wait(ExpectedConditions.invisibilityOf(this.entriesThirdMetaDataField), Helpers.DEFAULT_WAIT_TIMEOUT);
  }

  verifyFirstFieldStartsWith(text: string) {
    this.verifyFieldStartsWith(text, this.entriesFirstMetaDataField);
  }

  verifySecondFieldStartsWith(text: string) {
    this.verifyFieldStartsWith(text, this.entriesSecondMetaDataField);
  }

  verifyFieldStartsWith(text: string, field: ElementFinder) {
    browser.wait(ExpectedConditions.visibilityOf(field), Helpers.DEFAULT_WAIT_TIMEOUT);
    expect(field.getText()).toMatch(new RegExp('^' + text));
  }

  verifyDragoverlayVisible() {
    browser.wait(ExpectedConditions.visibilityOf(element(by.className('drag'))), Helpers.DEFAULT_WAIT_TIMEOUT);
  }

  verifyDragoverlayInvisible() {
    browser.wait(ExpectedConditions.invisibilityOf(element(by.className('drag'))), Helpers.DEFAULT_WAIT_TIMEOUT);
  }

  sendDropEvent() {
    this.removeEventlistenerFromFilePicker();
    this.pushEntriesGalleryButtonOnEntry34617();
    this.createDropEvent();
  }

  removeEventlistenerFromFilePicker() {
    this.entriesFileUpload.getAttribute('id').then(id => {
      browser.executeScript('let changeElement = document.getElementById("' + id + '");'
        + 'let cloneElement = changeElement.cloneNode();'
        + 'changeElement.parentNode.replaceChild(cloneElement, changeElement);');
    });
  }

  createDragEnterEvent() {
    this.entriesItem.getAttribute('id').then(entriesId => {
      browser.executeScript('let dragEnterEvent = new DragEvent("dragenter");'
        + 'Object.defineProperty(dragEnterEvent.constructor.prototype, "dataTransfer", { value: {} });'
        + 'document.getElementById("' + entriesId + '").dispatchEvent(dragEnterEvent)');
    });
  }

  createDragLeaveEvent() {
    this.entriesItem.getAttribute('id').then(entriesId => {
      browser.executeScript('let dragLeaveEvent = new DragEvent("dragleave");'
        + 'document.getElementById("' + entriesId + '").dispatchEvent(dragLeaveEvent)');
    });
  }

  createDropEvent() {
    this.entriesFileUpload.getAttribute('id').then(uploadId => {
      this.entriesItem.getAttribute('id').then(entriesId => {
        browser.executeScript('let dropEvent = new DragEvent("drop");'
          + 'Object.defineProperty(dropEvent.constructor.prototype, "dataTransfer", { value: {} });'
          + 'dropEvent.dataTransfer.files = document.getElementById("' + uploadId + '").files;'
          + 'document.getElementById("' + entriesId + '").dispatchEvent(dropEvent)');
      });
    });
  }

  waitEntriesPageLoaded() {
    this.waitIonViewDidLoad();
    this.waitIonViewDidEnter();
  }

  waitIonViewDidLoad() {
    browser.sleep(1000);
    Helpers.waitUntilLoaderFinished();
  }

  waitIonViewDidEnter() {
    browser.sleep(1000);
    Helpers.waitUntilLoaderFinished();
  }
}
