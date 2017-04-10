export class Credential {
  server: string;
  username: string;
  password: string;
  segmentName: string;

  constructor(server: string, username: string, password: string, segmentName: string = null) {
    this.server = server;
    this.username = username;
    this.password = password;
    this.segmentName = segmentName;
  }
}
