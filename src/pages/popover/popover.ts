import { SettingsPage } from './../settings/settings';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html'
})
export class PopoverPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public authService: AuthService ) { }

  loadSettings() {
    this.navCtrl.push(SettingsPage);
    this.viewCtrl.dismiss();
  }

  logoutUser() {
    this.authService.logout();
    this.viewCtrl.dismiss();
    this.navCtrl.setRoot(LoginPage);
  }
}
