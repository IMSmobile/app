
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Info } from '../models/info';
import { Credential } from './../models/credential';
import { ImsHeaders } from '../models/imsHeaders';
import { EntryPoint } from '../models/entry-point';
import { LicensePoint } from '../models/license-point';
import { EntriesPoint } from '../models/entries-point';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class ImsService {

  constructor(public http: Http) {

  }

  getTokensUrl(credential: Credential): Observable<string> {
    return this.getLicensePoint(credential).map(licensePoint => licensePoint.sessions.dataHref);
  }

  getEntriesFilterUrl(credential: Credential, filterId: number): Observable<string> {
    return this.getEntriesTable(credential).map(entriesPoint => entriesPoint.getLinkHref(filterId));
  }

  getInfo(credential: Credential): Observable<Info> {
    return this.getEntryPointLink(credential, 'info').flatMap(infoUrl => {
      return this.get(credential, infoUrl).map(response => {
        return response.json();
      });
    });
  }

  getEntriesTable(credential: Credential): Observable<EntriesPoint> {
    return this.getEntryPointLink(credential, 'entries').flatMap(entriesUrl => {
      return this.get(credential, entriesUrl).map(response => {
        let data = response.json();
        return new EntriesPoint(data.filters);
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
