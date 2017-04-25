import { SettingsPage } from './../settings/settings';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html'
})
export class PopoverPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController ) { }


  loadSettings() {
    this.navCtrl.push(SettingsPage);
    this.viewCtrl.dismiss();
  }
}
