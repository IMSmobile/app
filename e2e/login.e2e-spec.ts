import { LoginPageObject } from './page-objects/login-page-object';

let loginPage = new LoginPageObject();

describe('Login E2E Test', () => {

  let originalTimeout;

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

  it('Toast Message appears with failed login attempt', () => {
    loginPage.clickLoginButton();
    loginPage.verifyToastErrorMessage();
  });

  it('Error Dialog appears with failed login attempt', () => {
    loginPage.loginWithCredentials('admin', 'WRONG_PASSWORD');
    loginPage.verifyErrorDialog();
  });


});
