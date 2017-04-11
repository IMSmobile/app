import { Credential } from './../model/credential';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Info } from '../model/info';
import { ImsHeaders } from '../model/imsHeaders';
import { EntryPoint } from '../model/entry-point';
import { LicensePoint } from '../model/license-point';

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

  getEntryPoint(credential: Credential): Observable<EntryPoint> {
    return this.http.post(credential.server + '/rest', { headers: new ImsHeaders(credential) }).map(r => {
      return new EntryPoint(r.json().links);
    });
  }

  getLicensePoint(credential: Credential): Observable<LicensePoint> {
    return this.getEntryPoint(credential).flatMap(entryPoint => {
      return this.http.get(entryPoint.getLinkHref('license')).map(response => {
        let data = response.json();
        return new LicensePoint(data.segments, data.sessions);
      }
      );
    });
  }

  getTokensUrl(credential: Credential): Observable<string> {
    return this.getLicensePoint(credential).map(licensePoint => licensePoint.sessions.dataHref);
  }
}
