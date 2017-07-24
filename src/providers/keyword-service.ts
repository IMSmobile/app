import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Credential } from './../models/credential';
import { KeywordCatalog } from './../models/keyword-catalog';
import { MetadataField } from './../models/metadata-field';
import { ImsService } from './ims-service';

@Injectable()
export class KeywordService {

  constructor(public imsService: ImsService) { }

  public getKeywordCatalog(credential: Credential, field: MetadataField): Observable<KeywordCatalog> {
    return this.imsService.get(credential, field.catalogHref).map(response => response.json());
  }

}
