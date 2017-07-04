import { Helpers } from './helpers/helpers';
import { browser, element, by, ExpectedConditions } from 'protractor';
import { SettingImageFieldsPageObject } from './page-objects/setting-image-field-page-object';
import { LoginPageObject } from './page-objects/login-page-object';
import { UploadPageObject } from './page-objects/upload-page-object';

describe('Upload E2E Test', () => {

  let originalTimeout;
  let loginPage = new LoginPageObject();
  let uploadPage = new UploadPageObject();
  let settingImageFieldsPageObject = new SettingImageFieldsPageObject();

  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  beforeEach(() => {
    loginPage.loadPage();
  });

  afterEach(function () {
    browser.manage().deleteAllCookies();
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
    browser.executeScript('window.indexedDB.deleteDatabase("imsClientDB")');
  });

  it('Should allow retaking image from gallery in upload page', () => {
    uploadPage.loadPage();
    uploadPage.selectNewPictureFromGallery();
    uploadPage.writeToTextField(uploadPage.bildNameFieldInput, 'e2e Test');
    uploadPage.clickUploadImageButton();
    uploadPage.verifyToastMessage();
  });

  it('Should upload image taken from gallery', () => {
    settingImageFieldsPageObject.loadPage();
    Helpers.toggleFieldSettings(settingImageFieldsPageObject.settingsImageFieldBOOLEANNOToggle);

    uploadPage.reloadPage();
    uploadPage.writeToTextField(uploadPage.bildNameFieldInput, 'e2e Test');
    uploadPage.toggleBooleanField();
    uploadPage.clickUploadImageButton();
    uploadPage.verifyToastMessage();
  });

  it('Should upload image with sending enter key', () => {
    uploadPage.loadPage();
    uploadPage.writeToTextField(uploadPage.bildNameFieldInput, 'e2e with enter Test');
    uploadPage.sendEnterKey(uploadPage.bildNameFieldInput);
    browser.wait(ExpectedConditions.visibilityOf(element(by.className('toast-message'))), Helpers.DEFAULT_WAIT_TIMEOUT);
  });

  it('Should add fields and testing invalid inputs', () => {
    settingImageFieldsPageObject.loadPage();
    Helpers.toggleFieldSettings(settingImageFieldsPageObject.settingsImageFieldINTEGERFELDToggle);
    Helpers.toggleFieldSettings(settingImageFieldsPageObject.settingsImageFieldFLOATFELDToggle);
    uploadPage.reloadPage();

    uploadPage.clickUploadImageButton();
    uploadPage.verifyBildNameErrorDivVisible();

    uploadPage.writeToTextField(uploadPage.integerfeldFieldInput, '3.14');
    uploadPage.clickIntoBildNameTextField();
    uploadPage.verifyIntegerErrorDivVisible();

    uploadPage.writeToTextField(uploadPage.integerfeldFieldInput, '1337');
    uploadPage.clickIntoBildNameTextField();
    uploadPage.verifyIntegerErrorDivInvisible();

    uploadPage.writeToTextField(uploadPage.integerfeldFieldInput, '12a');
    uploadPage.clickIntoBildNameTextField();
    uploadPage.verifyIntegerErrorDivVisible();

    uploadPage.writeToTextField(uploadPage.floatfeldFieldInput, '0a1242');
    uploadPage.clickIntoBildNameTextField();
    uploadPage.verifyFloatErrorDivVisible();

    uploadPage.writeToTextField(uploadPage.bildNameFieldInput, 'FieldValidation');
    uploadPage.writeToTextField(uploadPage.integerfeldFieldInput, '1337');
    uploadPage.writeToTextField(uploadPage.floatfeldFieldInput, '123.456');
    uploadPage.verifyBildNameErrorDivInvisible();
    uploadPage.verifyIntegerErrorDivInvisible();
    uploadPage.verifyFloatErrorDivInvisible();
  });

  it('Should show mandatory markers only on mandatory fields', () => {
    settingImageFieldsPageObject.loadPage();
    Helpers.toggleFieldSettings(settingImageFieldsPageObject.settingsImageFieldINTEGERFELDToggle);
    uploadPage.reloadPage();
    uploadPage.verifyBildNameMarkedAsMandatoryField();
    uploadPage.verifyIntegerNotMarkedAsMandatoryField();
  });

  it('Should change style, accept dropped file and upload', () => {
    uploadPage.loadPage();
    uploadPage.createDragEnterEvent();
    uploadPage.verifyDragoverlayVisible();
    uploadPage.createDragLeaveEvent();
    uploadPage.verifyDragoverlayInvisible();
    uploadPage.sendDropEvent();
    uploadPage.writeToTextField(uploadPage.bildNameFieldInput, 'e2e drag upload Test');
    uploadPage.clickUploadImageButton();
    uploadPage.verifyToastMessage();
  });
});
