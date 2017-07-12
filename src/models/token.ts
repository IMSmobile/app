export class Token {
  public readonly token: string;
  public readonly licenseExpirationDate: string;

  constructor(token: string, licenseExpirationDate: string) {
    this.token = token;
    this.licenseExpirationDate = licenseExpirationDate;
  }
}
