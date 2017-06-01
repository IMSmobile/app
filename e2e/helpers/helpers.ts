import { browser, ElementFinder, $, ExpectedConditions } from 'protractor';

export class Helpers {

  static DEFAULT_WAIT_TIMEOUT = 20000;

  static waitUntilElementIsReady(element: ElementFinder) {
    browser.wait(ExpectedConditions.elementToBeClickable(element), Helpers.DEFAULT_WAIT_TIMEOUT);
    browser.wait(ExpectedConditions.stalenessOf($('.click-block-active')), Helpers.DEFAULT_WAIT_TIMEOUT);
    browser.wait(ExpectedConditions.stalenessOf($('.loading-wrapper')), Helpers.DEFAULT_WAIT_TIMEOUT);
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
