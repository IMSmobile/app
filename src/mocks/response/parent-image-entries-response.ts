import { Entries } from '../../models/entries';
import { Response, ResponseOptions } from '@angular/http';

export class ParentImageEntriesResponse extends Response {

  constructor(entries: Entries) {
    super(new ResponseOptions({ body: entries }));
  }
}
