import { Response, ResponseOptions } from '@angular/http';
import { Token } from '../../models/token';

export class TokenResponse extends Response {

  constructor(token: Token) {
    super(new ResponseOptions({ body: token }));
  }
}
