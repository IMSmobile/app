import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Entries } from '../models/entries';
import { ImsHeaders } from '../models/ims-headers';
import { QueryFragment } from './../models/query-fragment';
import { AuthService } from './auth-service';
import { ImsService } from './ims-service';
import { QueryBuilderService } from './query-builder-service';
import { TokenService } from './token-service';

@Injectable()
export class EntriesService {

  constructor(public http: Http, public tokenService: TokenService, public imsService: ImsService, public queryBuilderService: QueryBuilderService, public authService: AuthService) { }

  public getParentImageEntries(filterId: number, queryFragments: QueryFragment[]): Observable<Entries> {
    return this.tokenService.getToken().flatMap(token =>
      this.imsService.getParentImageEntriesLink(filterId, token).flatMap(entriesLink =>
        this.getEntries(entriesLink + this.queryBuilderService.generate(queryFragments))));
  }

  public getEntries(entriesLink: string): Observable<Entries> {
    return this.tokenService.getToken().flatMap(token =>
      this.http.get(entriesLink, { headers: new ImsHeaders(this.authService.currentCredential, token) }).map(response => response.json()));
  }
}
