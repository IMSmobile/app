import { Headers, Response, ResponseOptions } from '@angular/http';

export class LocationResponse extends Response {

  constructor(location: string) {
    super(new ResponseOptions({ headers: new Headers({ 'location': location }) }));
  }
}
