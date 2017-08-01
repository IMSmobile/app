import * as Path from 'path';
import { $, browser, ElementFinder, ExpectedConditions } from 'protractor';

export class Helpers {

  public static DEFAULT_WAIT_TIMEOUT: number = 20000;
  public static DEFAULT_SLEEP_TIME: number = 1000;
  public static JASMINE_TIMEOUT_INTERVAL: number = 100000;

  public static waitUntilElementIsReady(element: ElementFinder): void {
    browser.wait(ExpectedConditions.elementToBeClickable(element), Helpers.DEFAULT_WAIT_TIMEOUT);
    browser.wait(ExpectedConditions.stalenessOf($('.click-block-active')), Helpers.DEFAULT_WAIT_TIMEOUT);
    this.waitUntilLoaderFinished();
    browser.waitForAngular();
  }

  public static waitUntilLoaderFinished(): void {
    browser.wait(ExpectedConditions.stalenessOf($('.loading-wrapper')), Helpers.DEFAULT_WAIT_TIMEOUT);
  }

  public static waitUntilStorageReady(): void {
    browser.sleep(this.DEFAULT_SLEEP_TIME);
    browser.sleep(this.DEFAULT_SLEEP_TIME);
  }

  public static toggleFieldSettings(toggleField: ElementFinder): void {
    this.waitUntilElementIsReady(toggleField);
    toggleField.click();
    this.waitUntilStorageReady();
  }

  public static chooseJPEGImagesInFileDialog(fileInput: ElementFinder): void {
    const fileToUpload1 = '../assets/mario.jpg';
    const fileToUpload2 = '../assets/luigi.jpg';
    const absolutePath1 = Path.resolve(__dirname, fileToUpload1);
    const absolutePath2 = Path.resolve(__dirname, fileToUpload2);
    fileInput.sendKeys(absolutePath1 + "\n" + absolutePath2);
  }

  public static removeEventlistenerFromElement(id: string): void {
    browser.executeScript(`let changeElement = document.getElementById("${id}");
      let cloneElement = changeElement.cloneNode();
      changeElement.parentNode.replaceChild(cloneElement, changeElement);`);
  }

  public static sendDragEnterEventToElement(id: string): void {
    browser.executeScript(`let dragEnterEvent = new DragEvent("dragenter");
      Object.defineProperty(dragEnterEvent.constructor.prototype, "dataTransfer", { value: {} });
      document.getElementById("${id}").dispatchEvent(dragEnterEvent)`);
  }

  public static sendDragLeaveEventToElement(id: string): void {
    browser.executeScript(`let dragLeaveEvent = new DragEvent("dragleave");
      document.getElementById("${id}").dispatchEvent(dragLeaveEvent)`);
  }

  public static sendDragDropEventToElement(sourceFileInputId: string, targetId: string): void {
    browser.executeScript(`let dropEvent = new DragEvent("drop");
      Object.defineProperty(dropEvent.constructor.prototype, "dataTransfer", { value: {} });
      dropEvent.dataTransfer.files = document.getElementById("${sourceFileInputId}").files;
      document.getElementById("${targetId}").dispatchEvent(dropEvent)`);
  }
}
