import { Response, ResponseOptions } from '@angular/http';
import { LicensePoint } from '../../model/license-point';
import { Link } from '../../model/link';

export class LicensePointResponse extends Response {

    constructor(segments: Link, sessions: Link) {
        super(new ResponseOptions({ body: new LicensePoint(segments, sessions)}));
    }
}

