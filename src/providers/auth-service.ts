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

  DEFAULT_LOGIN_TIMEOUT: number = 5000;
  currentCredential: Credential;
  archive: string;
  filterId: number;

  constructor(public http: Http, public imsService: ImsService, public settingService: SettingService) {
  }

  login(credentials: Credential): Observable<Info> {
    return this.imsService.getInfo(credentials).map(info => this.setCurrentCredential(info, credentials)).timeout(this.DEFAULT_LOGIN_TIMEOUT);
  }

  logout(): void {
    this.currentCredential = null;
  }

  setCurrentCredential(info: Info, credentials: Credential): Info {
    this.currentCredential = credentials;
    return info;
  }

  setArchive(filter: Filter): void {
    this.settingService.setFilter(this.currentCredential.server, this.currentCredential.username, filter);
    this.archive = filter.archiveName;
    this.filterId = Number(filter.id);
  }
}
