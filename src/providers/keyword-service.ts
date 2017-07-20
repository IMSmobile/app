import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Credential } from './../models/credential';
import { KeywordCatalogue } from './../models/keyword-catalogue';
import { MetadataField } from './../models/metadata-field';
import { ImsService } from './ims-service';

@Injectable()
export class KeywordService {

  constructor(public imsService: ImsService) { }

  public getKeywordCatalogue(credential: Credential, field: MetadataField): Observable<KeywordCatalogue> {
    return this.imsService.get(credential, field.catalogHref).map(response => response.json());
  }

}
