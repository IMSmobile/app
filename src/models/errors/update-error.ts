import { ImsError } from './ims-error';
export class UpdateError extends ImsError {

  constructor(message: string) {
    super('Fehler beim Aktualisieren der Applikation.', message);
    Object.setPrototypeOf(this, UpdateError.prototype);
  }
}
