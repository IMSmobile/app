import { Credential } from '../../models/credential';
import { Observable } from 'rxjs/Observable';
import { Info } from '../../models/info';

export class MockAuthService {

  mockInfo: Info = { version: '9000'};
  currentCredential: Credential;

  login(credentials): Observable<Info> {
    this.setCurrentCredential = credentials;
    return Observable.of(this.mockInfo);
  }

  logout() {
    this.currentCredential = null;
  }

  setCurrentCredential(info: Info, credentials: Credential): Info {
    this.currentCredential = credentials;
    return info;
  }

}
