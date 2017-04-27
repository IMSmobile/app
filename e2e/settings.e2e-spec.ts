import { LoginPage } from './../src/pages/login/login';
import { browser, element, by, ElementFinder, ExpectedConditions, protractor, $ } from 'protractor';

let loginButton: ElementFinder = element.all(by.className('button-login')).first();
let serverInput: ElementFinder = element(by.css('input[formControlName=server]'));
let userInput: ElementFinder = element(by.css('input[formControlName=user]'));
let passwordInput: ElementFinder = element(by.css('input[formControlName=password]'));
let moreButton: ElementFinder = element(by.id('barButtonMore'));
let settingsButton: ElementFinder = element(by.id('popoverSettingsButton'));
let settingsShowRestUrlFieldToggle: ElementFinder = element(by.id('settingsShowRestUrlFieldToggle'));
let EC = protractor.ExpectedConditions;
describe('Settings E2E Test', () => {

  var originalTimeout;

  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  beforeEach(() => {
    loadLoginPage();
  });

  afterEach(function () {
    browser.manage().deleteAllCookies();
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
    browser.executeScript('window.indexedDB.deleteDatabase("imsClientDB")');
  });


  it('Should store user and server into settings', () => {
    login();
    waitUntilStorageReady();
    loadLoginPage();
    serverInput.getAttribute('value').then(text => expect(text).toEqual('https://sinv-56028.edu.hsr.ch'));
    userInput.getAttribute('value').then(text => expect(text).toEqual('admin'));
    passwordInput.getAttribute('value').then(text => expect(text).toEqual(''));
  });

  it('Should disable server field through disabling in settingspage', () => {
    login();
    waitUntilElementsAreClickable();
    moreButton.click();
    waitUntilElementsAreClickable();
    settingsButton.click();
    waitUntilElementsAreClickable();
    settingsShowRestUrlFieldToggle.click();
    waitUntilStorageReady();
    loadLoginPage();
    browser.isElementPresent(serverInput).then(displayed => expect(displayed).toBeFalsy());
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
}

function waitUntilStorageReady() {
  browser.sleep(1000);
}

function loadLoginPage() {
  browser.get('');
}
