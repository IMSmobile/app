import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';
import { ImsHeaders } from '../models/ims-headers';
import { Token } from '../models/token';
import { AuthService } from './auth-service';
import { ImsService } from './ims-service';

@Injectable()
export class TokenService {

  private token: Token;

  constructor(public http: Http, public imsService: ImsService, public authService: AuthService) { }

  public getToken(): Observable<Token> {
    if (this.token !== undefined && new Date() < new Date(this.token.licenseExpirationDate)) {
      return Observable.of(this.token);
    } else {
      return this.loadTokenFromServer().map(t => this.cacheToken(t));
    }
  }

  public getTokenForSegment(name: string): Observable<string> {
    return this.imsService.getTokensUrl().flatMap(tokensUrl => {
      const segment = { name: name };
      return this.http.post(tokensUrl, segment, { headers: new ImsHeaders(this.authService.currentCredential) }).map(r => r.headers.get('location'));
    });
  }

  public getTokenFromUrl(location: string): Observable<Token> {
    return this.http.get(location, { headers: new ImsHeaders(this.authService.currentCredential) }).map(r => r.json());
  }

  private loadTokenFromServer(): Observable<Token> {
    return this.getTokenForSegment(this.authService.currentCredential.segmentName).flatMap(l => this.getTokenFromUrl(l));
  }

  private cacheToken(token: Token): Token {
    this.token = token;
    return token;
  }

}
