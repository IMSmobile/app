import { browser, element, by, ElementFinder, $, promise, ExpectedConditions } from 'protractor';
import 'rxjs/add/observable/fromPromise';
import { Observable } from 'rxjs/Observable';
import { SettingsPageOjbect } from './settings-page-object';

export class SettingImageFieldsPageOjbect {
    settingsPage = new SettingsPageOjbect();

    loadPage() {
        this.settingsPage.loadPage();
        this.settingsPage.pushToSettingImageFieldsPage();
    }

    reloadPage() {
        this.settingsPage.reloadPage();
        this.settingsPage.pushToSettingImageFieldsPage();
    }
}

