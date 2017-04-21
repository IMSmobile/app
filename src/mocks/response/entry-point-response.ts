import { Response, ResponseOptions } from '@angular/http';
import { EntryPoint } from '../../model/entry-point';
import { Link } from '../../model/link';

export class EntryPointResponse extends Response {

    constructor(links: Link[]) {
        super(new ResponseOptions({ body: new EntryPoint(links) }));
    }
}

