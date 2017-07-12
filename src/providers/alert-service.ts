import { Injectable } from '@angular/core';
import { Alert, AlertController } from 'ionic-angular';

@Injectable()
export class AlertService {

  public readonly errorTitle: string = 'Fehler';
  public readonly errorButtonText: string = 'Schliessen';

  constructor(public alertCtrl: AlertController) { }

  public showError(message: string): void {
    const alert: Alert = this.alertCtrl.create({
      title: this.errorTitle,
      subTitle: message,
      buttons: [this.errorButtonText]
    });
    alert.present();
  }

}
