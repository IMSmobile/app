import * as Path from 'path';
import { $, browser, ElementFinder, ExpectedConditions } from 'protractor';

export class Helpers {

  static DEFAULT_WAIT_TIMEOUT: number = 20000;
  static waitUntilElementIsReady(element: ElementFinder): void {
    browser.wait(ExpectedConditions.elementToBeClickable(element), Helpers.DEFAULT_WAIT_TIMEOUT);
    browser.wait(ExpectedConditions.stalenessOf($('.click-block-active')), Helpers.DEFAULT_WAIT_TIMEOUT);
    this.waitUntilLoaderFinished();
    browser.waitForAngular();
  }

  static waitUntilLoaderFinished(): void {
    browser.wait(ExpectedConditions.stalenessOf($('.loading-wrapper')), Helpers.DEFAULT_WAIT_TIMEOUT);
  }

  static waitUntilStorageReady(): void {
    browser.sleep(2000);
  }

  static toggleFieldSettings(toggleField: ElementFinder): void {
    this.waitUntilElementIsReady(toggleField);
    toggleField.click();
    this.waitUntilStorageReady();
  }

  static chooseJPEGImageInFileDialog(fileInput: ElementFinder): void {
    const fileToUpload = '../assets/mario.jpg';
    const absolutePath = Path.resolve(__dirname, fileToUpload);
    fileInput.sendKeys(absolutePath);
  }

  static removeEventlistenerFromElement(id: string): void {
    browser.executeScript(`let changeElement = document.getElementById("${id}");
      let cloneElement = changeElement.cloneNode();
      changeElement.parentNode.replaceChild(cloneElement, changeElement);`);
  }

  static sendDragEnterEventToElement(id: string): void {
    browser.executeScript(`let dragEnterEvent = new DragEvent("dragenter");
      Object.defineProperty(dragEnterEvent.constructor.prototype, "dataTransfer", { value: {} });
      document.getElementById("${id}").dispatchEvent(dragEnterEvent)`);
  }

  static sendDragLeaveEventToElement(id: string): void {
    browser.executeScript(`let dragLeaveEvent = new DragEvent("dragleave");
      document.getElementById("${id}").dispatchEvent(dragLeaveEvent)`);
  }

  static sendDragDropEventToElement(sourceFileInputId: string, targetId: string): void {
    browser.executeScript(`let dropEvent = new DragEvent("drop");
      Object.defineProperty(dropEvent.constructor.prototype, "dataTransfer", { value: {} });
      dropEvent.dataTransfer.files = document.getElementById("${sourceFileInputId}").files;
      document.getElementById("${targetId}").dispatchEvent(dropEvent)`);
  }
}
