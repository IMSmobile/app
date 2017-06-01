import { browser, element, by, ElementFinder, $, promise, ExpectedConditions } from 'protractor';
import 'rxjs/add/observable/fromPromise';
import { Observable } from 'rxjs/Observable';
import { EntriesPageObject } from './entries-page-object';

export class SettingsPageOjbect {
    entriesPage = new EntriesPageObject();
    settingsImageFieldSettingButton: ElementFinder = element(by.id('settingsImageFieldSettingButton'));
    settingsEntriesFieldSettingButton: ElementFinder = element(by.id('settingsEntriesListFieldSettingButton'));
    settingsArchiveButton: ElementFinder = element(by.id('settingsArchiveButton'));


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

    pushToSettingEntriesFieldsPage() {
        this.settingsEntriesFieldSettingButton.click();
        this.waitUntilElementsAreClickable();
    }

    pushToSettingArchivePage() {
        this.settingsArchiveButton.click();
        this.waitUntilElementsAreClickable();
    }

    waitUntilElementsAreClickable() {
        browser.wait(ExpectedConditions.stalenessOf($('.click-block-active')));
        browser.sleep(2000);
    }
}
