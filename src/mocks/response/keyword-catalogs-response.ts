import { Response, ResponseOptions } from '@angular/http';
import { KeywordCatalog } from './../../models/keyword-catalog';

export class KeywordCatalogsResponse extends Response {

  constructor(keywordCatalog: KeywordCatalog) {
    super(new ResponseOptions({ body: keywordCatalog }));
  }
}
