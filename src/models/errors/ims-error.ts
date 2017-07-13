export class ImsError extends Error {

  public readonly displayedErrorMessage: string;

  constructor(displayedErrorMessage: string, err: any) {
    super(err);
    this.displayedErrorMessage = displayedErrorMessage;
    Object.setPrototypeOf(this, ImsError.prototype);
  }
}
