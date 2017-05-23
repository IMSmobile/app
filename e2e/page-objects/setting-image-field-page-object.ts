import { browser, element, by, ElementFinder, $, promise, ExpectedConditions, ElementArrayFinder } from 'protractor';
import 'rxjs/add/observable/fromPromise';
import { Observable } from 'rxjs/Observable';
import { SettingsPageOjbect } from './settings-page-object';

export class SettingImageFieldsPageOjbect {
    settingsPage = new SettingsPageOjbect();
    settingsImageFieldSearchbar: ElementFinder = element(by.css('input.searchbar-input'));
    settingsImageFieldDisplayedFields: ElementArrayFinder = element.all(by.className('fieldItem'));

    loadPage() {
        this.settingsPage.loadPage();
        this.settingsPage.pushToSettingImageFieldsPage();
    }

    filterFields(filter: string) {
        this.settingsImageFieldSearchbar.clear();
        this.settingsImageFieldSearchbar.sendKeys(filter);
        this.waitUntilElementsAreClickable();
    }

    verifyFieldsDisplayed(count: number) {
        this.settingsImageFieldDisplayedFields.count().then(actualCount => expect(actualCount).toBe(count));
    }

    waitUntilElementsAreClickable() {
        browser.wait(ExpectedConditions.stalenessOf($('.click-block-active')));
        browser.sleep(1000);
    }
}

