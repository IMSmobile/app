import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Filter } from './../models/filter';
import { MetadataField } from './../models/metadata-field';
import { MetadataTableFields } from './../models/metadata-table-fields';

@Injectable()
export class SettingService {

  public readonly isShowRestUrlFieldDefault: boolean = true;
  private restUrlKey: string = 'server';
  private usernameKey: string = 'user';
  private filterKeyPrefix: string = 'filter';
  private isShowRestUrlFieldKey: string = 'isShowRestUrlField';
  private fieldPathSeparator: string = '.';

  constructor(public storage: Storage, public platform: Platform) { }

  public setRestUrl(restUrl: string): void {
    this.storeSetting(this.restUrlKey, restUrl);
  }

  public setUsername(username: string): void {
    this.storeSetting(this.usernameKey, username);
  }

  public setFilter(server: string, user: string, filter: Filter): void {
    this.storeSetting(this.getFilterKey(server, user), filter);
  }

  public getFilterKey(server: string, user: string): string {
    return [this.filterKeyPrefix, server, user].join(this.fieldPathSeparator);
  }

  public getActiveFields(archiveName: string, tableFields: MetadataTableFields): Observable<MetadataField[]> {
    return Observable.forkJoin(tableFields.fields.map(field => this.getFieldState(archiveName, tableFields.name, field.name).map(active => {
      field.active = active;
      return field;
    }))).map(this.mapActiveFields);
  }

  public getFieldState(archive: string, table: string, field: string): Observable<boolean> {
    return this.readKey(this.getFieldKey(archive, table, field));
  }

  public setFieldState(archive: string, table: string, field: string, isActive: boolean): void {
    this.storeSetting(this.getFieldKey(archive, table, field), isActive);
  }

  public getFieldKey(archive: string, table: string, field: string): string {
    return [archive, table, field].join(this.fieldPathSeparator);
  }

  public setShowRestUrlField(isShowRestUrlField: boolean): void {
    this.storeSetting(this.isShowRestUrlFieldKey, isShowRestUrlField);
  }

  public getRestUrl(): Observable<string> {
    return this.readKey(this.restUrlKey);
  }

  public getUsername(): Observable<string> {
    return this.readKey(this.usernameKey);
  }

  public getFilter(server: string, user: string): Observable<Filter> {
    return this.readKey(this.getFilterKey(server, user));
  }

  public isShowRestUrlField(): Observable<boolean> {
    return this.readKey(this.isShowRestUrlFieldKey).map(val => val === undefined ? this.isShowRestUrlFieldDefault : val);
  }

  public isPictureFromCameraEnabled(): boolean {
    return !this.platform.is('core');
  }

  private mapActiveFields(fields: MetadataField[]): MetadataField[] {
    return fields.filter(field => field.active);
  }

  // tslint:disable-next-line:no-any
  private readKey(key: string): Observable<any> {
    // tslint:disable-next-line:no-null-keyword
    return Observable.fromPromise(this.storage.ready()).flatMap(() => Observable.fromPromise(this.storage.get(key)).map(val => val === null ? undefined : val));
  }

  // tslint:disable-next-line:no-any
  private storeSetting(key: string, value: any): void {
    this.storage.ready().then(() => {
      this.storage.set(key, value);
    });
  }
}
