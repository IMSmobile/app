import { Injectable } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';


@Injectable()
export class LoadingService {

  loading: Loading;

  constructor(public loadingCtrl: LoadingController) {}

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  hideLoading() {
    this.loading.dismiss();
  }
}
