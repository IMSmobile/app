export class ImsError extends Error {
  err: any;

  constructor(message: string, err: any) {
    super(message);
    this.message = message;
    this.err = err;
    Object.setPrototypeOf(this, ImsError.prototype);
  }
}
