import { Injectable } from '@angular/core';
import { IonicErrorHandler } from 'ionic-angular';
import { ImsError } from './../models/errors/ims-error';
import { AlertService } from './alert-service';

@Injectable()
export class ImsErrorHandler extends IonicErrorHandler {

  constructor(public alertService: AlertService) {
    super();
  }

  handleError(err: any): void {
    super.handleError(err);
    const prod = !window['IonicDevServer'];
    if (prod) {
      if (err instanceof ImsError) {
        this.alertService.showError(err.displayedErrorMessage);
      } else {
        this.alertService.showError(err.message);
      }
    }
  }
}
