import { Observable } from 'rxjs/Observable';

export class SettingServiceMock {

  restUrl: string = 'https://test';
  username: string = 'testuser';
  showRestUrlField: boolean = true;

  setRestUrl(restUrl: string) {
    this.restUrl = restUrl;
  }

  setUsername(username: string) {
    this.username = username;
  }

  setShowRestUrlField(isShowRestUrlField: boolean) {
    this.showRestUrlField = isShowRestUrlField;
  }

  getRestUrl(): Observable<string> {
    return Observable.of(this.restUrl);
  }

  getUsername(): Observable<string> {
    return Observable.of(this.username);
  }

  isShowRestUrlField(): Observable<boolean> {
    return Observable.of(this.showRestUrlField);
  }

}
