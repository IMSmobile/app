import { Observable } from 'rxjs/Observable';
import { Credential } from '../../models/credential';
import { Info } from '../../models/info';

export class AuthServiceMock {

  public infoMock: Info = { version: '9000' };
  public currentCredential: Credential;

  public login(credentials: Credential): Observable<Info> {
    this.currentCredential = credentials;
    return Observable.of(this.infoMock);
  }

  public logout(): void {
    this.currentCredential = undefined;
  }

  public setCurrentCredential(info: Info, credentials: Credential): Info {
    this.currentCredential = credentials;
    return info;
  }

}
