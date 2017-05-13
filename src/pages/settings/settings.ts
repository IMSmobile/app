import { SettingImageFieldsPage } from './../setting-image-fields/setting-image-fields';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SettingService } from '../../providers/setting-service';


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  public isShowRestUrlField: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public settingService: SettingService) {
    this.settingService.isShowRestUrlField().subscribe(val => this.isShowRestUrlField = val);
  }

  public notify() {
    this.settingService.setShowRestUrlField(this.isShowRestUrlField);
  }

  loadImageFieldSettings() {
    this.navCtrl.push(SettingImageFieldsPage);
  }
}
