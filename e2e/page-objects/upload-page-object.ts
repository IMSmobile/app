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
    integerfeldFieldInput: ElementFinder = element(by.css('input[ng-reflect-name=INTEGERFELD]'));
    uploadFieldErrorDivINTEGERFELD: ElementFinder = element(by.id('uploadFieldErrorDivINTEGERFELD'));
    uploadFieldErrorDivBILDNAME: ElementFinder = element(by.id('uploadFieldErrorDivBILDNAME'));



    loadPage() {
        this.entriesPage.loadPage();
        this.entriesPage.pushEntriesCameraButtonOnEntry34617();
    }

    writeToTextField(textField: ElementFinder, text: string) {
        textField.clear();
        textField.sendKeys(text);
        browser.waitForAngular();
    }

    clickIntoTextField(textField: ElementFinder) {
        textField.click();
        browser.waitForAngular();
    }


    clickUploadImageButton() {
        this.uploadImageButton.click();
    }
}
