import { EntriesPoint } from '../../models/entries-point';
import { Response, ResponseOptions } from '@angular/http';

export class EntriesResponse extends Response {

  constructor(entriesPoint: EntriesPoint) {
    super(new ResponseOptions({ body: entriesPoint }));
  }
}
