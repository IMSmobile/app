import { Headers } from '@angular/http';
import { Credential } from './credential';

export class ImsHeaders extends Headers {

  constructor(credential: Credential) {
    super();
    this.append('Content-Type', 'application/json');
    this.append('Allow-Control-Allow-Origin', '*');
    this.append("Authorization", "Basic " + btoa(credential.username + ":" + credential.password));
  }
}