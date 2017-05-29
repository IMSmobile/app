import { SettingService } from './setting-service';
import { Filter } from './../models/filter';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ImsService } from './ims-service';
import { Observable } from 'rxjs/Observable';
import { Credential } from '../models/credential';
import { Info } from '../models/info';

@Injectable()
export class AuthService {

  currentCredential: Credential;
  archive: string;
  filterId: number;

  constructor(public http: Http, public imsService: ImsService, public settingService: SettingService) {
    this.settingService.getFilter().subscribe(filter => { if (filter) { this.archive = filter.archiveName; this.filterId = Number(filter.id); }});
  }

  login(credentials): Observable<Info> {
    return this.imsService.getInfo(credentials).map(info => this.setCurrentCredential(info, credentials));
  }

  logout() {
    this.currentCredential = null;
  }

  setCurrentCredential(info: Info, credentials: Credential): Info {
    this.currentCredential = credentials;
    return info;
  }

  setArchive(filter: Filter) {
    this.settingService.setFilter(filter);
    this.archive = filter.archiveName;
    this.filterId = Number(filter.id);
  }
}
