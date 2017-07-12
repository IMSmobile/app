import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SettingService } from '../../providers/setting-service';
import { AuthService } from './../../providers/auth-service';
import { LoginPage } from './../login/login';
import { SettingArchivePage } from './../setting-archive/setting-archive';
import { SettingEntriesFieldsPage } from './../setting-entries-fields/setting-entries-fields';
import { SettingImageFieldsPage } from './../setting-image-fields/setting-image-fields';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  public isShowRestUrlField: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public settingService: SettingService, public authService: AuthService) {
    this.settingService.isShowRestUrlField().subscribe(val => this.isShowRestUrlField = val);
  }

  public notify(): void {
    this.settingService.setShowRestUrlField(this.isShowRestUrlField);
  }

  public loadImageFieldSettings(): void {
    this.navCtrl.push(SettingImageFieldsPage);
  }

  public loadEntriesListFieldSettings(): void {
    this.navCtrl.push(SettingEntriesFieldsPage);
  }

  public loadArchiveSettings(): void {
    this.navCtrl.push(SettingArchivePage);
  }

  public logout(): void {
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);
  }

}
