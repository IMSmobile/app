import { Observable } from 'rxjs/Observable';
import { Credential } from '../../models/credential';
import { Info } from '../../models/info';

export class AuthServiceMock {

  infoMock: Info = { version: '9000' };
  currentCredential: Credential;

  login(credentials: Credential): Observable<Info> {
    this.currentCredential = credentials;
    return Observable.of(this.infoMock);
  }

  logout(): void {
    this.currentCredential = null;
  }

  setCurrentCredential(info: Info, credentials: Credential): Info {
    this.currentCredential = credentials;
    return info;
  }

}
