import { QueryBuilderService } from './query-builder-service';
import { QueryFragment } from './../models/query-fragment';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ImsService } from './ims-service';
import { Observable } from 'rxjs/Observable';
import { TokenService } from './token-service';
import { Credential } from '../models/credential';
import { Entries } from '../models/entries';
import { ImsHeaders } from '../models/ims-headers';

@Injectable()
export class EntriesService {

  constructor(public http: Http, public tokenService: TokenService, public imsService: ImsService, public queryBuilderService: QueryBuilderService) {
  }

  getParentImageEntries(credential: Credential, filterId: number, queryFragments: QueryFragment[]): Observable<Entries> {
    return this.tokenService.getToken(credential).flatMap(token => {
      return this.imsService.getParentImageEntriesLink(credential, filterId, token).flatMap(entriesLink => {
        return this.getEntries(credential, entriesLink + this.queryBuilderService.generate(queryFragments));
      });
    });
  }

  getEntries(credential: Credential, entriesLink: string): Observable<Entries> {
    return this.tokenService.getToken(credential).flatMap(token => {
      return this.http.get(entriesLink, { headers: new ImsHeaders(credential, token) }).map(response => response.json());
    });
  }
}
