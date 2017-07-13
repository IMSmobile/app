import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';
import { Credential } from '../models/credential';
import { ImsHeaders } from '../models/ims-headers';
import { Token } from '../models/token';
import { ImsService } from './ims-service';

@Injectable()
export class TokenService {

  private token: Token = null;
  constructor(public http: Http, public imsService: ImsService) {

  }

  public getToken(credential: Credential): Observable<Token> {
    if (this.token !== null && new Date() < new Date(this.token.licenseExpirationDate)) {
      return Observable.of(this.token);
    } else {
      return this.loadTokenFromServer(credential).map(t => this.cacheToken(t));
    }
  }

  public getTokenForSegment(credential: Credential): Observable<string> {
    return this.imsService.getTokensUrl(credential).flatMap(tokensUrl => {
      const segment = { name: credential.segmentName };
      return this.http.post(tokensUrl, segment, { headers: new ImsHeaders(credential) }).map(r => r.headers.get('location'));
    });
  }

  public getTokenFromUrl(credential: Credential, location: string): Observable<Token> {
    return this.http.get(location, { headers: new ImsHeaders(credential) }).map(r => r.json());
  }

  private loadTokenFromServer(credential: Credential): Observable<Token> {
    return this.getTokenForSegment(credential).flatMap(l => this.getTokenFromUrl(credential, l));
  }

  private cacheToken(token: Token): Token {
    this.token = token;
    return token;
  }

}
