import { browser, element, by, ElementFinder, protractor, $ } from 'protractor';

let loginButton: ElementFinder = element.all(by.className('button-login')).first();
let moreButton: ElementFinder = element(by.id('barButtonMore'));
let serverInput: ElementFinder = element(by.css('input[formControlName=server]'));
let userInput: ElementFinder = element(by.css('input[formControlName=user]'));
let passwordInput: ElementFinder = element(by.css('input[formControlName=password]'));
let logoutButton: ElementFinder = element(by.id('popoverLogoutButton'));

let EC = protractor.ExpectedConditions;

describe('Logout E2E Test', () => {

  var originalTimeout;

  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });


  beforeEach(() => {
    browser.get('');
  });

  afterEach(function () {
    browser.manage().deleteAllCookies();
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
    browser.executeScript('window.indexedDB.deleteDatabase("imsClientDB")');
  });

  it('Should return to empty Loginscreen on Logoutbutton', () => {
    login();
    waitUntilElementsAreClickable();
    moreButton.click();
    waitUntilElementsAreClickable();
    logoutButton.click();
    waitUntilPageReady();
    serverInput.getAttribute('value').then(text => expect(text).toEqual(''));
    userInput.getAttribute('value').then(text => expect(text).toEqual(''));
    passwordInput.getAttribute('value').then(text => expect(text).toEqual(''));
  });
});

function login() {
  serverInput.sendKeys('https://sinv-56028.edu.hsr.ch');
  userInput.sendKeys('admin');
  passwordInput.sendKeys('admin');
  loginButton.click();
  browser.waitForAngular();
}

function waitUntilElementsAreClickable() {
  browser.wait(EC.stalenessOf($('.click-block-active')));
  browser.sleep(500);
}

function waitUntilPageReady() {
  browser.sleep(1000);
}
