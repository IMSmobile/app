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

  constructor(public http: Http, public imsService: ImsService) {
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
}
