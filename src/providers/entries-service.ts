import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Credential } from '../models/credential';
import { Entries } from '../models/entries';
import { ImsHeaders } from '../models/ims-headers';
import { QueryFragment } from './../models/query-fragment';
import { ImsService } from './ims-service';
import { QueryBuilderService } from './query-builder-service';
import { TokenService } from './token-service';

@Injectable()
export class EntriesService {

  constructor(public http: Http, public tokenService: TokenService, public imsService: ImsService, public queryBuilderService: QueryBuilderService) {
  }

  getParentImageEntries(credential: Credential, filterId: number, queryFragments: QueryFragment[]): Observable<Entries> {
    return this.tokenService.getToken(credential).flatMap(token =>
      this.imsService.getParentImageEntriesLink(credential, filterId, token).flatMap(entriesLink =>
        this.getEntries(credential, entriesLink + this.queryBuilderService.generate(queryFragments))));
  }

  getEntries(credential: Credential, entriesLink: string): Observable<Entries> {
    return this.tokenService.getToken(credential).flatMap(token =>
      this.http.get(entriesLink, { headers: new ImsHeaders(credential, token) }).map(response => response.json()));
  }
}
