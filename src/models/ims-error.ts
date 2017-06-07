export class ImsError extends Error {

  constructor(userFriendlyErrorMessage: string, err: any) {
    super(err);
    this.name = userFriendlyErrorMessage;
    Object.setPrototypeOf(this, ImsError.prototype);
  }
}
