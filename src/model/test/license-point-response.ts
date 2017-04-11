import { Response, ResponseOptions } from '@angular/http';
import { LicensePoint } from '../license-point';
import { Link } from '../link';

export class LicensePointResponse extends Response {

    constructor(segments: Link, sessions: Link) {
        super(new ResponseOptions({ body: new LicensePoint(segments, sessions)}));
    }
}

