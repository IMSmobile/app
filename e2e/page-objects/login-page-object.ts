import { browser, by, element, ElementFinder, ExpectedConditions, promise } from 'protractor';
import { Helpers } from './../helpers/helpers';

export class LoginPageObject {
  public readonly server: string = 'https://sinv-56028.edu.hsr.ch';
  public readonly user: string = 'admin';
  public readonly password: string = 'admin';

  public readonly loginButton: ElementFinder = element.all(by.className('button-login')).first();
  public readonly serverInput: ElementFinder = element(by.css('input[formControlName=server]'));
  public readonly userInput: ElementFinder = element(by.css('input[formControlName=user]'));
  public readonly passwordInput: ElementFinder = element(by.css('input[formControlName=password]'));
  public readonly toastMessage: ElementFinder = element(by.className('toast-message'));
  public readonly errorDialog: ElementFinder = element(by.className('alert-wrapper'));

  public login(): void {
    this.loginWithCredentials(this.user, this.password);
  }

  public loginWithUserWithNoAccess(): void {
    this.loginWithCredentials('felizia', 'graypaper');
  }

  public loginWithCredentials(user: string, password: string): void {
    this.loadPage();
    this.serverInput.clear();
    this.serverInput.sendKeys(this.server);
    this.userInput.clear();
    this.userInput.sendKeys(user);
    this.passwordInput.sendKeys(password);
    this.clickLoginButton();
    browser.waitForAngular();
  }

  public loadPage(): void {
    browser.get('');
  }

  public verifyToastErrorMessage(): void {
    expect(this.toastMessage.isDisplayed()).toBeTruthy();
    browser.wait(ExpectedConditions.visibilityOf(this.toastMessage), Helpers.DEFAULT_WAIT_TIMEOUT);
  }

  public verifyErrorDialog(): void {
    browser.wait(ExpectedConditions.visibilityOf(this.errorDialog), Helpers.DEFAULT_WAIT_TIMEOUT);
  }

  public clickLoginButton(): void {
    this.loginButton.click();
  }

  public getServerInputText(): promise.Promise<string> {
    Helpers.waitUntilElementIsReady(this.serverInput);
    return this.serverInput.getAttribute('value');
  }

  public getUserInputText(): promise.Promise<string> {
    Helpers.waitUntilElementIsReady(this.userInput);
    return this.userInput.getAttribute('value');
  }

  public getPasswordInputText(): promise.Promise<string> {
    Helpers.waitUntilElementIsReady(this.passwordInput);
    return this.passwordInput.getAttribute('value');
  }

  public isServerInputPresent(): promise.Promise<boolean> {
    return browser.isElementPresent(this.serverInput);
  }
}
