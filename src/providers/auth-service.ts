import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { Observable } from 'rxjs/Observable';
import { Credential } from '../models/credential';
import { Filter } from './../models/filter';
import { ImsHeaders } from './../models/ims-headers';
import { SettingService } from './setting-service';

@Injectable()
export class AuthService {

  public currentCredential: Credential;
  public archive: string;
  public filterId: number;
  private readonly restPath: string = '/rest';
  private DEFAULT_LOGIN_TIMEOUT: number = 5000;

  constructor(public http: Http, public settingService: SettingService) { }

  public login(credentials: Credential): Observable<Response> {
    return this.http.get(credentials.server + this.restPath, { headers: new ImsHeaders(credentials) }).do(response => this.setCurrentCredential(credentials)).timeout(this.DEFAULT_LOGIN_TIMEOUT);
  }

  public logout(): void {
    this.currentCredential = undefined;
  }

  public setCurrentCredential(credentials: Credential): void {
    this.currentCredential = credentials;
  }

  public setArchive(filter: Filter): void {
    this.settingService.setFilter(this.currentCredential.server, this.currentCredential.username, filter);
    this.archive = filter.archiveName;
    this.filterId = Number(filter.id);
  }
}
