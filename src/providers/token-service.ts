import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';
import { Credential } from '../model/credential';
import { Token } from '../model/token';

@Injectable()
export class TokenService {

  constructor(public http: Http) {

  }
  getToken(credential: Credential): Observable<Token> {
    return this.getTokenForSegment(credential).flatMap(l => this.getTokenFromUrl(credential, l));
  }

  getTokenForSegment(credential: Credential): Observable<string> {
    let segment = { "name": credential.segmentName };
    return this.http.post(credential.server + "/rest/license/tokens", segment, { headers: this.getHeaders(credential) }).map(r => r.headers.get("location"));
  }

  getTokenFromUrl(credential: Credential, location: string): Observable<Token> {
    return this.http.get(location, { headers: this.getHeaders(credential) }).map(r => r.json());
  }

  getHeaders(credential: Credential): Headers {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Allow-Control-Allow-Origin', '*');
    headers.append("Authorization", "Basic " + btoa(credential.username + ":" + credential.password));
    return headers;
  }

}
