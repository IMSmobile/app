import { ImsError } from './../models/ims-error';
import { IonicErrorHandler } from 'ionic-angular';
import { AlertService } from './alert-service';
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class ImsErrorHandler extends IonicErrorHandler {

  constructor(public alertService: AlertService) {
    super();
  }

  handleError(err: any): void {
    super.handleError(err);
    const win: any = window;
    let prod = !win['IonicDevServer'];
    if (prod) {
      if (err instanceof ImsError) {
        this.alertService.showError(err.message + JSON.stringify(err.err));
      } else {
        this.alertService.showError(err.message);
      }
    }
  }
}
