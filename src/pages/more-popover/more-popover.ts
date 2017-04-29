import { SettingsPage } from './../settings/settings';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'more-page-popover',
  templateUrl: 'more-popover.html'
})
export class MorePopoverPage {

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
