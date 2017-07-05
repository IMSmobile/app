import { Response, ResponseOptions } from '@angular/http';
import { Entries } from '../../models/entries';

export class ParentImageEntriesResponse extends Response {

  constructor(entries: Entries) {
    super(new ResponseOptions({ body: entries }));
  }
}
