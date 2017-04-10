import { Credential } from './../model/credential';
import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Info } from '../model/info';
import { ImsHeaders } from '../model/imsHeaders';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class ImsService {

  constructor(public http: Http) {

  }

  get(credential: Credential, url: string): Observable<any> {
    let headers = new ImsHeaders(credential);
    return this.http.get(url, { headers: headers }).map(res => res.json());
  }

  getImsRelative(credential: Credential, page: string): Observable<any> {
    return this.get(credential, credential.server + page);
  }

  getInfo(credential: Credential): Observable<Info> {
    return this.getImsRelative(credential, '/rest/info');
  }
}
