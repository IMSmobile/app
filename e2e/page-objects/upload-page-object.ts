import { browser, element, by, ElementFinder, $, promise, ExpectedConditions } from 'protractor';
import 'rxjs/add/observable/fromPromise';
import { Observable } from 'rxjs/Observable';
import { LoginPageOjbect } from './login-page-object';
import { EntriesPageObject } from './entries-page-object';

export class UploadPageObject {
    entriesPage = new EntriesPageObject();
    bildNameFieldInput: ElementFinder = element(by.css('input[ng-reflect-name=BILDNAME]'));
    uploadImageButton: ElementFinder = element(by.id('uploadImageButton'));
    memofeldFieldInput: ElementFinder = element(by.css('input[ng-reflect-name=MEMOFELD]'));
    textfeldFieldInput: ElementFinder = element(by.css('input[ng-reflect-name=TEXTFELD]'));

    loadPage() {
        this.entriesPage.loadPage();
        this.entriesPage.pushEntriesCameraButtonOnEntry34617();
    }

    setBildname(text: string) {
        this.bildNameFieldInput.sendKeys(text);
        browser.waitForAngular();
    }

    clickUploadImageButton() {
        this.uploadImageButton.click();
    }
}
