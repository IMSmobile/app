import { Response, ResponseOptions } from '@angular/http';
import { EntryPoint } from '../entry-point';
import { Link } from '../link';

export class EntryPointResponse extends Response {

    constructor(links: Link[]) {
        super(new ResponseOptions({ body: new EntryPoint(links) }));
    }
}

