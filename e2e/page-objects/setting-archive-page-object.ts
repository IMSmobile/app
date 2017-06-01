import { LoginPageOjbect } from './login-page-object';
import { browser, element, by, ElementFinder, $, promise, ExpectedConditions } from 'protractor';
import 'rxjs/add/observable/fromPromise';
import { Observable } from 'rxjs/Observable';

export class SettingArchivePageObject {
  loginPage = new LoginPageOjbect();
  loadArchiveButtonworkflow_db1_42: ElementFinder = element(by.id('loadArchiveButtonworkflow_db1_42'));
  loadArchiveButtonims_med_test_43: ElementFinder = element(by.id('loadArchiveButtonims_med_test_43'));
  archiveSelectionLogoutButton: ElementFinder = element(by.id('archiveSelectionLogoutButton'));


  loadPage() {
    this.loginPage.login();
    this.waitUntilElementsAreClickable();
  }

  logoutWhenNoArchive() {
    this.waitUntilElementsAreClickable();
    expect(ExpectedConditions.visibilityOf(this.archiveSelectionLogoutButton));
    this.archiveSelectionLogoutButton.click();
    this.waitUntilElementsAreClickable();
  }

  selectPoliceArchiveWithFilter42() {
    this.loadArchiveButtonworkflow_db1_42.click();
    this.waitUntilElementsAreClickable();
  }

  selectMedicineArchiveWithFilter43() {
    this.loadArchiveButtonims_med_test_43.click();
    this.waitUntilElementsAreClickable();
  }

  waitUntilElementsAreClickable() {
    browser.wait(ExpectedConditions.stalenessOf($('.click-block-active')));
    browser.sleep(1500);
  }
}
