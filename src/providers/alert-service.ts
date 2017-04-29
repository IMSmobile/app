import { Injectable } from '@angular/core';
import { AlertController, Alert } from 'ionic-angular';

@Injectable()
export class AlertService {

  errorTitle: string = 'Failed';
  errorButtonText: string = 'Dismiss';

  constructor(public alertCtrl: AlertController) { }

  showError(message: string) {
    let alert: Alert = this.alertCtrl.create({
      title: this.errorTitle,
      subTitle: message,
      buttons: [this.errorButtonText]
    });
    alert.present();
  }

}
