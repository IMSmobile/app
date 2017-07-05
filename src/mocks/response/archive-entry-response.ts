import { Response, ResponseOptions } from '@angular/http';
import { ArchiveEntry } from '../../models/archive-entry';

export class ArchiveEntryResponse extends Response {

  constructor(archiveEntry: ArchiveEntry) {
    super(new ResponseOptions({ body: archiveEntry }));
  }
}
