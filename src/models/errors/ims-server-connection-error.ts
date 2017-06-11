import { ImsError } from './ims-error';
export class ImsServerConnectionError extends ImsError {

  constructor(server: string, err: any) {
    super('Verbindung zum IMS Rest Server ' + server + ' nicht möglich.', err);
    Object.setPrototypeOf(this, ImsServerConnectionError.prototype);
  }
}
