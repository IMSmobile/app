import { ImsError } from './ims-error';
export class ImsLoadingError extends ImsError {

  constructor(wantedToLoad: string, message: string) {
    super('Fehler beim Laden der ' + wantedToLoad, message);
    Object.setPrototypeOf(this, ImsLoadingError.prototype);
  }
}
