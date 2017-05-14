import { browser, element, by, ElementFinder, $, promise, ExpectedConditions } from 'protractor';
import 'rxjs/add/observable/fromPromise';
import { Observable } from 'rxjs/Observable';
import { LoginPageOjbect } from './login-page-object';

export class EntriesPageOjbect {
    moreButton: ElementFinder = element(by.id('barButtonMore'));
    settingsButton: ElementFinder = element(by.id('morePopoverSettingsButton'));
    loginPage = new LoginPageOjbect();

    loadPage() {
        this.loginPage.login();
        this.waitUntilElementsAreClickable();
    }

    reloadPage() {
        this.loginPage.loadPage();
        this.waitUntilElementsAreClickable();
        this.loginPage.loginWithPasswordOnly();
        this.waitUntilElementsAreClickable();
    }

    pushToSettingsPage() {
        this.moreButton.click();
        this.waitUntilElementsAreClickable();
        this.settingsButton.click();
        this.waitUntilElementsAreClickable();
    }

    waitUntilElementsAreClickable() {
        browser.wait(ExpectedConditions.stalenessOf($('.click-block-active')));
        browser.sleep(1000);
    }
}
