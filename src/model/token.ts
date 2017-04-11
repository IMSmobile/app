export class Token {
  token: string;
  licenseExpirationDate: string;

  constructor(token: string, licenseExpirationDate: string) {
    this.token = token;
    this.licenseExpirationDate = licenseExpirationDate;
  }
}
