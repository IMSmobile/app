import { ImsError } from './ims-error';
export class CameraError extends ImsError {

  constructor(message: string) {
    super('Kamerafehler', message);
    Object.setPrototypeOf(this, CameraError.prototype);
  }
}
