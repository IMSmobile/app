import { ImsError } from './ims-error';
export class ImsUploadError extends ImsError {

  constructor(message: string) {
    super('Beim Speichern der Bilder ist ein Fehler aufgetreten.', message);
    Object.setPrototypeOf(this, ImsUploadError.prototype);
  }
}
