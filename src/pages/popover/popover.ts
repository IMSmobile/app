import { LoginPage } from './../login/login';
import { SettingsPage } from './../settings/settings';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { SettingService } from './../../providers/setting-service';

@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html'
})
export class PopoverPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public settingService: SettingService) { }


  loadSettings() {
    this.navCtrl.push(SettingsPage);
    this.viewCtrl.dismiss();
  }

  logoutUser() {
    this.settingService.clearLoginData().subscribe();
    this.viewCtrl.dismiss();
    this.navCtrl.setRoot(LoginPage);

  }
}
