import { Filter } from './../models/filter';
import { MetadataTableFields } from './../models/metadata-table-fields';
import { MetadataField } from './../models/metadata-field';
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
  filterKeyPrefix: string = 'filter';
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

  setFilter(server: string, user: string, filter: Filter) {
    this.storeSetting(this.getFilterKey(server, user), filter);
  }

  getFilterKey(server: string, user: string): string {
    return [this.filterKeyPrefix, server, user].join(this.fieldPathSeparator);
  }

  getActiveFields(archiveName: string, tableFields: MetadataTableFields): Observable<MetadataField[]> {
    return Observable.forkJoin(tableFields.fields.map(field => this.getFieldState(archiveName, tableFields.name, field.name).map(active => {
      field.active = active;
      return field;
    }))).map(this.mapActiveFields);
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

  getFilter(server: string, user: string): Observable<Filter> {
    return this.readKey(this.getFilterKey(server, user));
  }

  isShowRestUrlField(): Observable<boolean> {
    return this.readKey(this.isShowRestUrlFieldKey).map(val => val == null ? this.isShowRestUrlFieldDefault : val);
  }

  isPictureFromCameraEnabled(): boolean {
    return true;
  }

  private mapActiveFields(fields: MetadataField[]): MetadataField[] {
    return fields.filter(field => field.active);
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
