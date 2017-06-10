import { ImsError } from './ims-error';
export class ImsLoadingError extends ImsError {

  constructor(wantedToLoad: string, err: any) {
    super('Fehler beim Laden der ' + wantedToLoad, err);
    Object.setPrototypeOf(this, ImsLoadingError.prototype);
  }
}
