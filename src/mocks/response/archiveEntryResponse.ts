import { ArchiveEntry } from '../../model/archiveEntry';
import { Response, ResponseOptions} from '@angular/http';

export class ArchiveEntryResponse extends Response {

    constructor(archiveEntry: ArchiveEntry) {
        super(new ResponseOptions({ body: archiveEntry }));
    }
}
