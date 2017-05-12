import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';


@Injectable()
export class LoadingService {

  loading: Loading;

  constructor(public loadingCtrl: LoadingController) { }

  subscribeWithLoading<T>(observable: Observable<T>, next: (value: T) => void, error: (error: any) => void) {
    this.showLoading();
    observable.subscribe(
      succ => {
        next(succ);
        this.hideLoading();
      },
      err => {
        error(err);
        this.hideLoading();
      });
  }

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
