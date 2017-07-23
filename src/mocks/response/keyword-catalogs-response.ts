import { Response, ResponseOptions } from '@angular/http';
import { KeywordCatalogue } from './../../models/keyword-catalogue';

export class KeywordCatalogsResponse extends Response {

  constructor(keywordCatalogue: KeywordCatalogue) {
    super(new ResponseOptions({ body: keywordCatalogue }));
  }
}
