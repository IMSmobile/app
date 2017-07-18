import { Response } from '@angular/http';

export class ErrorResponse extends Response implements Error {
  public name: string;
  public message: string;
}
