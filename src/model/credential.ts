export class Credential {
  server : string;
  username: string;
  password: string;
 
  constructor(server: string, username: string, password: string) {
    this.server = server;
    this.username = username;
    this.password = password;
  }
}