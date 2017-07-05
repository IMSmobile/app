import { Injectable } from '@angular/core';
import { Loading, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoadingService {

  loading: Loading;
  concurrentLoadings: number = 0;

  constructor(public loadingCtrl: LoadingController) { }

  subscribeWithLoading<T>(observable: Observable<T>, next: (value: T) => void, error: (error: any) => void) {
    this.showLoading();
    observable.subscribe(
      succ => {
        next(succ);
      },
      err => {
        this.hideLoading();
        error(err);
      }, () => {
        this.hideLoading();
      });
  }

  showLoading() {
    if (this.concurrentLoadings === 0) {
      this.loading = this.loadingCtrl.create({
        content: 'Bitte warten...'
      });
      this.loading.present();
    }
    this.concurrentLoadings = this.concurrentLoadings + 1;
  }

  hideLoading() {
    if (this.concurrentLoadings === 1) {
      this.loading.dismiss();
    }
    this.concurrentLoadings = this.concurrentLoadings - 1;
  }
}
