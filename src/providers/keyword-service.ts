import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { KeywordCatalog } from './../models/keyword-catalog';
import { MetadataField } from './../models/metadata-field';
import { ImsService } from './ims-service';

@Injectable()
export class KeywordService {

  constructor(public imsService: ImsService) { }

  public getKeywordCatalog(field: MetadataField): Observable<KeywordCatalog> {
    return this.imsService.get(field.catalogHref).map(response => response.json());
  }

}
