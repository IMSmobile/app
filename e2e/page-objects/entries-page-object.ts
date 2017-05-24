import { browser, element, by, ElementFinder, $, promise, ExpectedConditions } from 'protractor';
import 'rxjs/add/observable/fromPromise';
import { Observable } from 'rxjs/Observable';
import { LoginPageOjbect } from './login-page-object';

export class EntriesPageObject {
    moreButton: ElementFinder = element(by.id('barButtonMore'));
    settingsButton: ElementFinder = element(by.id('morePopoverSettingsButton'));
    entriesCameraButton: ElementFinder = element(by.id('entriesCameraButton34617'));
    loginPage = new LoginPageOjbect();

    loadPage() {
        this.loginPage.login();
        this.waitUntilElementsAreClickable();
    }

    pushToSettingsPage() {
        this.moreButton.click();
        this.waitUntilElementsAreClickable();
        this.settingsButton.click();
        this.waitUntilElementsAreClickable();
    }

    pushEntriesCameraButtonOnEntry34617() {
        this.entriesCameraButton.click();
        this.waitUntilElementsAreClickable();
    }

    waitUntilElementsAreClickable() {
        browser.wait(ExpectedConditions.stalenessOf($('.click-block-active')));
        browser.sleep(1000);
    }
}
