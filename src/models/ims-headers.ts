import { Headers } from '@angular/http';
import { Credential } from './credential';
import { Token } from './token';

export class ImsHeaders extends Headers {

  constructor(credential: Credential, token?: Token) {
    super();
    this.append('Content-Type', 'application/json');
    this.append('Allow-Control-Allow-Origin', '*');
    this.append('Authorization', 'Basic ' + btoa(`${credential.username}:${credential.password}`));
    if (token !== undefined) {
      this.append('ims-rest-token', token.token);
    }
  }
}
