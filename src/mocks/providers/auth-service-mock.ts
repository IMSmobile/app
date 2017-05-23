import { Credential } from '../../models/credential';
import { Observable } from 'rxjs/Observable';
import { Info } from '../../models/info';

export class AuthServiceMock {

  infoMock: Info = { version: '9000'};
  currentCredential: Credential;

  login(credentials): Observable<Info> {
    this.setCurrentCredential = credentials;
    return Observable.of(this.infoMock);
  }

  logout() {
    this.currentCredential = null;
  }

  setCurrentCredential(info: Info, credentials: Credential): Info {
    this.currentCredential = credentials;
    return info;
  }

}
