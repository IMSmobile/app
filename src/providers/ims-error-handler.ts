import { ImsError } from './../models/errors/ims-error';
import { IonicErrorHandler } from 'ionic-angular';
import { AlertService } from './alert-service';
import { Injectable } from '@angular/core';

@Injectable()
export class ImsErrorHandler extends IonicErrorHandler {

  constructor(public alertService: AlertService) {
    super();
  }

  handleError(err: any): void {
    super.handleError(err);
    let prod = !window['IonicDevServer'];
    if (prod) {
      if (err instanceof ImsError) {
        this.alertService.showError(err.displayedErrorMessage);
      } else {
        this.alertService.showError(err.message);
      }
    }
  }
}
