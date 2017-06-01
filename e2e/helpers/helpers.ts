import { browser, ElementFinder, $, ExpectedConditions } from 'protractor';

export class Helpers {

  static waitUntilElementIsReady(element: ElementFinder) {
    browser.wait(ExpectedConditions.elementToBeClickable(element), 10000);
    browser.wait(ExpectedConditions.stalenessOf($('.click-block-active')), 10000);
    browser.wait(ExpectedConditions.stalenessOf($('.loading-wrapper')), 10000);
    browser.waitForAngular();
  }

  static waitUntilStorageReady() {
    browser.sleep(2000);
  }

  static toggleFieldSettings(toggleField: ElementFinder) {
    this.waitUntilElementIsReady(toggleField);
    toggleField.click();
    this.waitUntilStorageReady();
  }

}
