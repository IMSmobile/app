import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { Observable } from 'rxjs/Observable';
import { Credential } from '../models/credential';
import { Info } from '../models/info';
import { Filter } from './../models/filter';
import { ImsService } from './ims-service';
import { SettingService } from './setting-service';

@Injectable()
export class AuthService {

  public currentCredential: Credential;
  public archive: string;
  public filterId: number;
  private DEFAULT_LOGIN_TIMEOUT: number = 5000;

  constructor(public http: Http, public imsService: ImsService, public settingService: SettingService) { }

  public login(credentials: Credential): Observable<Info> {
    return this.imsService.getInfo(credentials).map(info => this.setCurrentCredential(info, credentials)).timeout(this.DEFAULT_LOGIN_TIMEOUT);
  }

  public logout(): void {
    this.currentCredential = undefined;
  }

  public setCurrentCredential(info: Info, credentials: Credential): Info {
    this.currentCredential = credentials;
    return info;
  }

  public setArchive(filter: Filter): void {
    this.settingService.setFilter(this.currentCredential.server, this.currentCredential.username, filter);
    this.archive = filter.archiveName;
    this.filterId = Number(filter.id);
  }
}
