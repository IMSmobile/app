import { Injectable } from '@angular/core';
import { AlertController, Alert } from 'ionic-angular';

@Injectable()
export class AlertService {

  errorTitle: string = 'Fehler';
  errorButtonText: string = 'Schliessen';

  constructor(public alertCtrl: AlertController) { }

  showError(message: string): void {
    let alert: Alert = this.alertCtrl.create({
      title: this.errorTitle,
      subTitle: message,
      buttons: [this.errorButtonText]
    });
    alert.present();
  }

}
