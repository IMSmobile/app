import { Helpers } from './../helpers/helpers';
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
        this.waitUntilPopoverClosed();
    }

    reloadPage() {
        this.entriesPage.reloadPage();
        this.entriesPage.pushToSettingsPage();
        this.waitUntilPopoverClosed();
    }

    pushToSettingImageFieldsPage() {
        Helpers.waitUntilElementIsReady(this.settingsImageFieldSettingButton);
        this.settingsImageFieldSettingButton.click();
    }

    pushToSettingEntriesFieldsPage() {
        Helpers.waitUntilElementIsReady(this.settingsEntriesFieldSettingButton);
        this.settingsEntriesFieldSettingButton.click();
    }

    pushToSettingArchivePage() {
        Helpers.waitUntilElementIsReady(this.settingsArchiveButton);
        this.settingsArchiveButton.click();
    }

    waitUntilPopoverClosed() {
        browser.wait(ExpectedConditions.stalenessOf($('.popover-wrapper')));
    }
}
