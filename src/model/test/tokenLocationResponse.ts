import { Response, ResponseOptions, Headers } from '@angular/http';

export class TokenLocationResponse extends Response {

    constructor(location: string) {
        super(new ResponseOptions({headers: new Headers({ 'location': location })}));
    }
}
