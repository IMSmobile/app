export class Credential {
  public readonly server: string;
  public readonly username: string;
  public readonly password: string;
  public readonly segmentName: string;

  constructor(server: string, username: string, password: string, segmentName: string = 'Rest Floating Client Read Write') {
    this.server = server;
    this.username = username;
    this.password = password;
    this.segmentName = segmentName;
  }
}
