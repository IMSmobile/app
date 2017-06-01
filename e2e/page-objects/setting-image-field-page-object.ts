import { browser, element, by, ElementFinder, $, promise, ExpectedConditions, ElementArrayFinder } from 'protractor';
import 'rxjs/add/observable/fromPromise';
import { Observable } from 'rxjs/Observable';
import { SettingsPageOjbect } from './settings-page-object';

export class SettingImageFieldsPageOjbect {
    settingsPage = new SettingsPageOjbect();
    settingsImageFieldSearchbar: ElementFinder = element(by.css('input.searchbar-input'));
    settingsImageFieldDisplayedFields: ElementArrayFinder = element.all(by.className('fieldItem'));
    settingsShowRestUrlFieldToggle: ElementFinder = element(by.id('settingsShowRestUrlFieldToggle'));
    settingsImageFieldBOOLEANNOToggle: ElementFinder = element(by.id('settingsImageFieldBOOLEANNOToggle'));
    settingsImageFieldMEMOFELDToggle: ElementFinder = element(by.id('settingsImageFieldMEMOFELDToggle'));
    settingsImageFieldTEXTFELDToggle: ElementFinder = element(by.id('settingsImageFieldTEXTFELDToggle'));
    settingsImageFieldINTEGERFELDToggle: ElementFinder = element(by.id('settingsImageFieldINTEGERFELDToggle'));
    settingsImageFieldFLOATFELDToggle: ElementFinder = element(by.id('settingsImageFieldFLOATFELDToggle'));

    loadPage() {
        this.settingsPage.loadPage();
        this.settingsPage.pushToSettingImageFieldsPage();
    }

    reloadPage() {
        this.settingsPage.reloadPage();
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
        browser.sleep(2000);
    }

    toggleFieldSettings(toggleField: ElementFinder) {
        toggleField.click();
        this.waitUntilStorageReady();
    }
    verifyToggleActive(toggleField: ElementFinder) {
        toggleField.getAttribute('class').then(classes => expect(classes).toContain('toggle-checked'));
    }

    verifyToggleAbsent(toggleField: ElementFinder) {
        expect(ExpectedConditions.stalenessOf(toggleField)).toBeTruthy();
    }

    verifyToggleInactive(toggleField: ElementFinder) {
        toggleField.getAttribute('class').then(classes => expect(classes).not.toContain('toggle-checked'));
    }

    waitUntilStorageReady() {
        browser.sleep(2000);
    }

}

