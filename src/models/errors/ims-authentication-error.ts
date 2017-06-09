import { ImsError } from './ims-error';
export class ImsAuthenticationError extends ImsError {

  constructor(err: any) {
    super('Benutzername oder Passwort ist falsch.', err);
    Object.setPrototypeOf(this, ImsAuthenticationError.prototype);
  }
}
