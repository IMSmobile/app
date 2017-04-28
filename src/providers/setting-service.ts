import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/fromPromise';
import { Observable } from 'rxjs/Observable';




@Injectable()
export class SettingService {

  restUrlKey: string = 'server';
  usernameKey: string = 'user';
  isShowRestUrlFieldKey: string = 'isShowRestUrlField';
  isShowRestUrlFieldDefault: boolean = true;

  constructor(public storage: Storage) {
  }

  setRestUrl(restUrl: string) {
    this.storeSetting(this.restUrlKey, restUrl);
  }

  setUsername(username: string) {
    this.storeSetting(this.usernameKey, username);
  }

  setShowRestUrlField(isShowRestUrlField: boolean) {
    this.storeSetting(this.isShowRestUrlFieldKey, isShowRestUrlField);
  }

  getRestUrl(): Observable<string> {
    return this.readKey(this.restUrlKey);
  }

  getUsername(): Observable<string> {
    return this.readKey(this.usernameKey);
  }

  isShowRestUrlField(): Observable<boolean> {
    return this.readKey(this.isShowRestUrlFieldKey).map(val => val == null ? this.isShowRestUrlFieldDefault : val);
  }

  clearLoginData(): Observable <any> {
    return this.clearSetting(this.restUrlKey).flatMap(() => this.clearSetting(this.usernameKey).flatMap(() => this.clearSetting(this.isShowRestUrlFieldKey)));
  }

  private readKey(key: string): Observable<any> {
    return Observable.fromPromise(this.storage.ready()).flatMap(() => Observable.fromPromise(this.storage.get(key)));
  }

  private storeSetting(key: string, value: any): void {
    this.storage.ready().then(() => {
      this.storage.set(key, value);
    });
  }

  private clearSetting(key: string): Observable<any> {
    return Observable.fromPromise(this.storage.ready()).flatMap(() => Observable.fromPromise(this.storage.remove(key)));
  }
}
