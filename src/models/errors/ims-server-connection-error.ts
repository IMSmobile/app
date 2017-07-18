import { Response } from '@angular/http';
import { ImsError } from './ims-error';
export class ImsServerConnectionError extends ImsError {

  constructor(server: string, response: Response) {
    super(`Verbindung zum IMS Rest Server ${server} nicht möglich.`, response.text());
    Object.setPrototypeOf(this, ImsServerConnectionError.prototype);
  }
}
