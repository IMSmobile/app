import { browser, element, by, ElementFinder, $, promise, ExpectedConditions } from 'protractor';
import 'rxjs/add/observable/fromPromise';
import { Observable } from 'rxjs/Observable';

export class LoginPageOjbect {
    server: string = 'https://sinv-56028.edu.hsr.ch';
    user: string = 'admin';
    password: string = 'admin';

    loginButton: ElementFinder = element.all(by.className('button-login')).first();
    serverInput: ElementFinder = element(by.css('input[formControlName=server]'));
    userInput: ElementFinder = element(by.css('input[formControlName=user]'));
    passwordInput: ElementFinder = element(by.css('input[formControlName=password]'));
    toastMessage: ElementFinder = element(by.className('toast-message'));

    login() {
        this.loginWithCredentials(this.user, this.password);
    }

    loginWithUserWithNoAccess() {
        this.loginWithCredentials('felizia', 'graypaper');
    }

    loginWithCredentials(user: string, password: string) {
        this.loadPage();
        this.serverInput.clear();
        this.serverInput.sendKeys(this.server);
        this.userInput.clear();
        this.userInput.sendKeys(user);
        this.passwordInput.sendKeys(password);
        this.clickLoginButton();
        browser.waitForAngular();
    }

    loadPage() {
        browser.get('');
    }

    verifyToastErrorMessage() {
        expect(this.toastMessage.isDisplayed()).toBeTruthy();
        browser.wait(ExpectedConditions.visibilityOf(this.toastMessage), 10000);
    }

    clickLoginButton() {
        this.loginButton.click();
    }

    getServerInputText(): promise.Promise<string> {
        return this.serverInput.getAttribute('value');
    }

    getUserInputText(): promise.Promise<string> {
        return this.userInput.getAttribute('value');
    }

    getPasswordInputText(): promise.Promise<string> {
        return this.passwordInput.getAttribute('value');
    }

    isServerInputPresent(): promise.Promise<boolean> {
        return browser.isElementPresent(this.serverInput);
    }
}
