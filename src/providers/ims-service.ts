import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Credential } from '../model/credential';
import { Info } from '../model/info';
import 'rxjs/add/operator/map';


@Injectable()
export class ImsService {

  constructor(public http: Http) {
    
  }

  get(credential: Credential, page: string): Observable<any> {
    let headers = this.getHeaders(credential);
    return this.http.get(credential.server + page, { headers: headers }).map(res => res.json());
  }

  getHeaders(credential: Credential): Headers {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Allow-Control-Allow-Origin', '*');
    headers.append("Authorization", "Basic " + btoa(credential.username + ":" + credential.password));
    return headers;
  }

  getInfo(credential: Credential): Observable<Info> {
    return this.get(credential, "/rest/info");
  }

}
