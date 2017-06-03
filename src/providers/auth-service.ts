import { SettingService } from './setting-service';
import { Filter } from './../models/filter';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { ImsService } from './ims-service';
import { Observable } from 'rxjs/Observable';
import { Credential } from '../models/credential';
import { Info } from '../models/info';

@Injectable()
export class AuthService {

  DEFAULT_LOGIN_TIMEOUT: number = 5000;
  currentCredential: Credential;
  archive: string;
  filterId: number;


  constructor(public http: Http, public imsService: ImsService, public settingService: SettingService) {
  }

  login(credentials): Observable<Info> {
    return this.imsService.getInfo(credentials).map(info => this.setCurrentCredential(info, credentials)).timeout(this.DEFAULT_LOGIN_TIMEOUT);
  }

  logout() {
    this.currentCredential = null;
  }

  setCurrentCredential(info: Info, credentials: Credential): Info {
    this.currentCredential = credentials;
    return info;
  }

  setArchive(filter: Filter) {
    this.settingService.setFilter(this.currentCredential.server, this.currentCredential.username, filter);
    this.archive = filter.archiveName;
    this.filterId = Number(filter.id);
  }
}
