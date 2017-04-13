import { Credential } from './../model/credential';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
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

  getTokensUrl(credential: Credential): Observable<string> {
    return this.getLicensePoint(credential).map(licensePoint => licensePoint.sessions.dataHref);
  }

  getInfo(credential: Credential): Observable<Info> {
    return this.getEntryPointLink(credential, 'info').flatMap(infoUrl => {
      console.log(infoUrl);
      return this.get(credential, infoUrl).map(response => {
        console.log(response);
        console.log(response.json());
        return response.json();
      });
    });
  }
  
  getLicensePoint(credential: Credential): Observable<LicensePoint> {
    return this.getEntryPointLink(credential, 'license').flatMap(licenseUrl => {
      return this.get(credential, licenseUrl).map(response => {
        let data = response.json();
        return new LicensePoint(data.segments, data.sessions);
      });
    });
  }

  getEntryPointLink(credential: Credential, linkConstant: string): Observable<string> {
    return this.getEntryPoint(credential).map(entryPoint => entryPoint.getLinkHref(linkConstant));
  }

  getEntryPoint(credential: Credential): Observable<EntryPoint> {
    return this.get(credential, credential.server + '/rest').map(response => {
      return new EntryPoint(response.json().links);
    });
  }

  get(credential: Credential, url: string): Observable<Response> {
    let headers = new ImsHeaders(credential);
    return this.http.get(url, { headers: headers });
  }

}
