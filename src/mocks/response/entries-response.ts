import { Response, ResponseOptions } from '@angular/http';
import { EntriesPoint } from '../../models/entries-point';

export class EntriesResponse extends Response {

  constructor(entriesPoint: EntriesPoint) {
    super(new ResponseOptions({ body: entriesPoint }));
  }
}
