import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';
import { SettingsPageOjbect } from './settings-page-object';

export class SettingEntriesFieldsPageOjbect {
    settingsPage = new SettingsPageOjbect();
    settingsEntriesFieldSearchbar: ElementFinder = element(by.css('input.searchbar-input'));
    settingsEntriesFieldDisplayedFields: ElementArrayFinder = element.all(by.className('fieldItem'));
    settingsEntriesFieldMEMOFELDToggle: ElementFinder = element(by.id('settingsImageFieldMEMOFELDToggle'));
    settingsEntriesFieldTEXTFELDToggle: ElementFinder = element(by.id('settingsImageFieldTEXTFELDToggle'));

    loadPage() {
        this.settingsPage.loadPage();
        this.settingsPage.pushToSettingEntriesFieldsPage();
    }

}
