import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';


@Injectable()
export class LoadingService {


  constructor(public loadingCtrl: LoadingController) { }

  subscribeWithLoading<T>(observable: Observable<T>, next: (value: T) => void, error: (error: any) => void) {
    let loading = this.showLoading();
    observable.subscribe(
      succ => {
        this.hideLoading(loading);
        next(succ);
      },
      err => {
        this.hideLoading(loading);
        error(err);
      });
  }

  showLoading() {
    let loading = this.loadingCtrl.create({
      content: 'Bitte warten...'
    });
    loading.present();
    return loading;
  }

  hideLoading(loading: Loading) {
    loading.dismiss();
  }
}
