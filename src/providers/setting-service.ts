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
  fieldPathSeparator = '.';

  constructor(public storage: Storage) {
  }

  setRestUrl(restUrl: string) {
    this.storeSetting(this.restUrlKey, restUrl);
  }

  setUsername(username: string) {
    this.storeSetting(this.usernameKey, username);
  }

  getFieldState(archive: string, table: string, field: string): Observable<boolean> {
    return this.readKey(this.getFieldKey(archive, table, field));
  }

  setFieldState(archive: string, table: string, field: string, isActive: boolean) {
    this.storeSetting(this.getFieldKey(archive, table, field), isActive);
  }

  getFieldKey(archive: string, table: string, field: string) {
    return [archive, table, field].join(this.fieldPathSeparator);
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

  private readKey(key: string): Observable<any> {
    return Observable.fromPromise(this.storage.ready()).flatMap(() => Observable.fromPromise(this.storage.get(key)));
  }

  private storeSetting(key: string, value: any): void {
    this.storage.ready().then(() => {
      this.storage.set(key, value);
    });
  }
}
