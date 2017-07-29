import { Injectable } from '@angular/core';
import { Deploy } from '@ionic/cloud-angular';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UpdateService {

  constructor(public deploy: Deploy) { }

  public updateIfAvailable(): Observable<void> {
    return Observable.fromPromise(this.deploy.check()).flatMap(snapshotAvailable => this.downloadApplyAndReloadIfAvailable(snapshotAvailable));
  }

  private downloadApplyAndReloadIfAvailable(snapshotAvailable: boolean): Observable<void> {
    if (snapshotAvailable) {
      return Observable.fromPromise(this.deploy.download()).flatMap(() =>
        Observable.fromPromise(this.deploy.extract()).do(() => this.deploy.load()));
    } else {
      return Observable.of(undefined);
    }
  }
}
