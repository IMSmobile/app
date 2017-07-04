import { LoginPageObject } from './login-page-object';
import { element, by, ElementFinder, ExpectedConditions } from 'protractor';
import 'rxjs/add/observable/fromPromise';
import { Helpers } from '../helpers/helpers';

export class SettingArchivePageObject {
  loginPage: LoginPageObject = new LoginPageObject();
  loadArchiveButtonworkflow_db1_42: ElementFinder = element(by.id('loadArchiveButtonworkflow_db1_42'));
  loadArchiveButtonims_med_test_43: ElementFinder = element(by.id('loadArchiveButtonims_med_test_43'));
  archiveSelectionLogoutButton: ElementFinder = element(by.id('archiveSelectionLogoutButton'));


  loadPage(): void {
    this.loginPage.login();
  }

  logoutWhenNoArchive(): void {
    Helpers.waitUntilElementIsReady(this.archiveSelectionLogoutButton);
    expect(ExpectedConditions.visibilityOf(this.archiveSelectionLogoutButton));
    this.archiveSelectionLogoutButton.click();
  }

  selectPoliceArchiveWithFilter42(): void {
    Helpers.waitUntilElementIsReady(this.loadArchiveButtonworkflow_db1_42);
    this.loadArchiveButtonworkflow_db1_42.click();
  }

  selectMedicineArchiveWithFilter43(): void {
    Helpers.waitUntilElementIsReady(this.loadArchiveButtonims_med_test_43);
    this.loadArchiveButtonims_med_test_43.click();
  }
}
