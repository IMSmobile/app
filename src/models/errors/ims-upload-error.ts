import { ImsError } from './ims-error';
export class ImsUploadError extends ImsError {

  constructor(err: any) {
    super('Beim Speichern der Bilder ist ein Fehler aufgetreten.', err);
    Object.setPrototypeOf(this, ImsUploadError.prototype);
  }
}
