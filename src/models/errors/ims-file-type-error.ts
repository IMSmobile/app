import { ImsError } from './ims-error';
export class ImsFileTypeError extends ImsError {

  constructor(fileType: string) {
    super('Ungültiger Dateityp', 'Invalid File type: ' + fileType);
    Object.setPrototypeOf(this, ImsFileTypeError.prototype);
  }
}
