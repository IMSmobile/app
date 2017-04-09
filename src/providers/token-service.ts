import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { Credential } from '../model/credential';
import { ImsHeaders } from '../model/imsHeaders';
import { Token } from '../model/token';

@Injectable()
export class TokenService {

  constructor(public http: Http) {

  }

  private token: Token = null;
  getToken(credential: Credential): Observable<Token> {
    if (this.token != null && new Date() < new Date(this.token.licenseExpirationDate)) {
      return Observable.of(this.token);
    } else {
      return this.getTokenForSegment(credential).flatMap(l => this.getTokenFromUrl(credential, l)).map(loadedToken => {
        this.token = loadedToken;
        return loadedToken;
      });
    }
  }

  getTokenForSegment(credential: Credential): Observable<string> {
    let segment = { "name": credential.segmentName };
    return this.http.post(credential.server + "/rest/license/tokens", segment, { headers: new ImsHeaders(credential) }).map(r => r.headers.get("location"));
  }

  getTokenFromUrl(credential: Credential, location: string): Observable<Token> {
    return this.http.get(location, { headers: new ImsHeaders(credential) }).map(r => r.json());
  }



}
