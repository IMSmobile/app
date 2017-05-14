import { browser, element, by, ElementFinder, $, promise, ExpectedConditions } from 'protractor';
import 'rxjs/add/observable/fromPromise';
import { Observable } from 'rxjs/Observable';
import { EntriesPageOjbect } from './entries-page-object';

export class SettingsPageOjbect {
    entriesPage = new EntriesPageOjbect();
    settingsImageFieldSettingButton: ElementFinder = element(by.id('settingsImageFieldSettingButton'));


    loadPage() {
        this.entriesPage.loadPage();
        this.entriesPage.pushToSettingsPage();
    }

    reloadPage() {
        this.entriesPage.reloadPage();
        this.entriesPage.pushToSettingsPage();
    }

    pushToSettingImageFieldsPage() {
        this.settingsImageFieldSettingButton.click();
        this.waitUntilElementsAreClickable();
    }

    waitUntilElementsAreClickable() {
        browser.wait(ExpectedConditions.stalenessOf($('.click-block-active')));
        browser.sleep(1000);
    }
}
