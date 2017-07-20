import { Response } from '@angular/http';
import { ImsError } from './ims-error';
export class ImsAuthenticationError extends ImsError {

  constructor(response: Response) {
    super('Benutzername oder Passwort ist falsch.', response.text());
    Object.setPrototypeOf(this, ImsAuthenticationError.prototype);
  }
}
