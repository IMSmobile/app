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
        this.hideLoading();
        next(succ);
      },
      err => {
        this.hideLoading();
        error(err);
      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Bitte warten...'
    });
    this.loading.present();
  }

  hideLoading() {
    this.loading.dismiss();
  }
}
