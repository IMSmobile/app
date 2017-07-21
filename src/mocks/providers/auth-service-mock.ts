import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Credential } from '../../models/credential';
import { Filter } from './../../models/filter';
import { ImsHeaders } from './../../models/ims-headers';
import { ImsBackendMock } from './../ims-backend-mock';

export class AuthServiceMock {

  public currentCredential: Credential;
  public archive: string;
  public filterId: number;
  private readonly restPath: string = '/rest';

  constructor(public http: Http, public imsBackendMock: ImsBackendMock) {
    this.currentCredential = imsBackendMock.credential;
  }

  public login(credentials: Credential): Observable<Response> {
    return this.http.get(credentials.server + this.restPath, { headers: new ImsHeaders(credentials) }).do(response => this.setCurrentCredential(credentials));
  }

  public logout(): void {
    this.currentCredential = undefined;
  }

  public setCurrentCredential(credentials: Credential): void {
    this.currentCredential = credentials;
  }

  public setArchive(filter: Filter): void {
    this.archive = filter.archiveName;
    this.filterId = Number(filter.id);
  }
}
