import { Injectable } from '@angular/core';
import { Alert, AlertController } from 'ionic-angular';

@Injectable()
export class AlertService {

  errorTitle: string = 'Fehler';
  errorButtonText: string = 'Schliessen';

  constructor(public alertCtrl: AlertController) { }

  showError(message: string): void {
    const alert: Alert = this.alertCtrl.create({
      title: this.errorTitle,
      subTitle: message,
      buttons: [this.errorButtonText]
    });
    alert.present();
  }

}
