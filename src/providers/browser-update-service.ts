import { Observable } from 'rxjs/Observable';
export class BrowserUpdateService {

  public updateIfAvailable(): Observable<void> {
    return Observable.of(undefined);
  }
}
