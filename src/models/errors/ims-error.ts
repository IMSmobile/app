export class ImsError extends Error {

  public readonly displayedErrorMessage: string;

  constructor(displayedErrorMessage: string, message: string) {
    super(message);
    this.displayedErrorMessage = displayedErrorMessage;
    Object.setPrototypeOf(this, ImsError.prototype);
  }
}
