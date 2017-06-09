import { Response } from '@angular/http';

export class ErrorResponse extends Response implements Error {
  name: any;
  message: any;
}
