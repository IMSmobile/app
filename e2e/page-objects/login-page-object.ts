import { Helpers } from './../helpers/helpers';
import { browser, element, by, ElementFinder, promise, ExpectedConditions } from 'protractor';
import 'rxjs/add/observable/fromPromise';

export class LoginPageObject {
  server: string = 'https://sinv-56028.edu.hsr.ch';
  user: string = 'admin';
  password: string = 'admin';

  loginButton: ElementFinder = element.all(by.className('button-login')).first();
  serverInput: ElementFinder = element(by.css('input[formControlName=server]'));
  userInput: ElementFinder = element(by.css('input[formControlName=user]'));
  passwordInput: ElementFinder = element(by.css('input[formControlName=password]'));
  toastMessage: ElementFinder = element(by.className('toast-message'));
  errorDialog: ElementFinder = element(by.className('alert-wrapper'));

  login(): void {
    this.loginWithCredentials(this.user, this.password);
  }

  loginWithUserWithNoAccess(): void {
    this.loginWithCredentials('felizia', 'graypaper');
  }

  loginWithCredentials(user: string, password: string): void {
    this.loadPage();
    this.serverInput.clear();
    this.serverInput.sendKeys(this.server);
    this.userInput.clear();
    this.userInput.sendKeys(user);
    this.passwordInput.sendKeys(password);
    this.clickLoginButton();
    browser.waitForAngular();
  }

  loadPage(): void {
    browser.get('');
  }

  verifyToastErrorMessage(): void {
    expect(this.toastMessage.isDisplayed()).toBeTruthy();
    browser.wait(ExpectedConditions.visibilityOf(this.toastMessage), Helpers.DEFAULT_WAIT_TIMEOUT);
  }

  verifyErrorDialog(): void {
    browser.wait(ExpectedConditions.visibilityOf(this.errorDialog), Helpers.DEFAULT_WAIT_TIMEOUT);
  }

  clickLoginButton(): void {
    this.loginButton.click();
  }

  getServerInputText(): promise.Promise<string> {
    Helpers.waitUntilElementIsReady(this.serverInput);
    return this.serverInput.getAttribute('value');
  }

  getUserInputText(): promise.Promise<string> {
    Helpers.waitUntilElementIsReady(this.userInput);
    return this.userInput.getAttribute('value');
  }

  getPasswordInputText(): promise.Promise<string> {
    Helpers.waitUntilElementIsReady(this.passwordInput);
    return this.passwordInput.getAttribute('value');
  }

  isServerInputPresent(): promise.Promise<boolean> {
    return browser.isElementPresent(this.serverInput);
  }
}
