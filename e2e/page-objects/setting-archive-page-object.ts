import { by, element, ElementFinder, ExpectedConditions } from 'protractor';
import 'rxjs/add/observable/fromPromise';
import { Helpers } from '../helpers/helpers';
import { LoginPageObject } from './login-page-object';

export class SettingArchivePageObject {
  public readonly loginPage: LoginPageObject = new LoginPageObject();
  public readonly loadArchiveButtonWorkflowDb1Filter42: ElementFinder = element(by.id('loadArchiveButtonworkflow_db1_42'));
  public readonly loadArchiveButtonImsMedTestFilter43: ElementFinder = element(by.id('loadArchiveButtonims_med_test_43'));
  public readonly archiveSelectionLogoutButton: ElementFinder = element(by.id('archiveSelectionLogoutButton'));

  public loadPage(): void {
    this.loginPage.login();
  }

  public logoutWhenNoArchive(): void {
    Helpers.waitUntilElementIsReady(this.archiveSelectionLogoutButton);
    expect(ExpectedConditions.visibilityOf(this.archiveSelectionLogoutButton));
    this.archiveSelectionLogoutButton.click();
  }

  public selectPoliceArchiveWithFilter42(): void {
    Helpers.waitUntilElementIsReady(this.loadArchiveButtonWorkflowDb1Filter42);
    this.loadArchiveButtonWorkflowDb1Filter42.click();
  }

  public selectMedicineArchiveWithFilter43(): void {
    Helpers.waitUntilElementIsReady(this.loadArchiveButtonImsMedTestFilter43);
    this.loadArchiveButtonImsMedTestFilter43.click();
  }
}
