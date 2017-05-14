import { browser, element, by, ElementFinder, $, promise } from 'protractor';
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


    login() {
        this.serverInput.sendKeys(this.server);
        this.userInput.sendKeys(this.user);
        this.passwordInput.sendKeys(this.password);
        this.loginButton.click();
        browser.waitForAngular();
    }

    loginWithPasswordOnly() {
        this.passwordInput.sendKeys(this.password);
        this.loginButton.click();
    }



    loadPage() {
        browser.get('');
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
