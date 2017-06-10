import { ImsError } from './ims-error';
export class CameraError extends ImsError {

  constructor(err: any) {
    super('Kamerafehler', err);
    Object.setPrototypeOf(this, CameraError.prototype);
  }
}
