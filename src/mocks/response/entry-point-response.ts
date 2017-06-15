import { Response, ResponseOptions } from '@angular/http';
import { EntryPoint } from '../../models/entry-point';
import { Link } from '../../models/link';

export class EntryPointResponse extends Response {

    constructor(links: Link[]) {
        super(new ResponseOptions({ body: new EntryPoint(links) }));
    }
}
