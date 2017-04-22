import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  public isShowRestUrlField: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    this.isShowRestUrlField = true;
  }

  ionViewDidLoad() {
    this.storage.ready().then(() => {
      this.storage.get('isShowRestUrlField').then(val => this.isShowRestUrlField = val);
    });
  }

  public notify() {
    this.storage.ready().then(() => {
      this.storage.set('isShowRestUrlField', this.isShowRestUrlField);
    });
  }

}
