import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ImsFileUploadHeaders } from '../models/ims-file-upload-headers';
import { Image } from './../models/image';
import { Token } from './../models/token';
import { AuthService } from './auth-service';

@Injectable()
export class BrowserContainerUploadService {

 constructor(public http: Http, public authService: AuthService) { }

 // tslint:disable-next-line:no-any
 public postToContainer(url: string, token: Token, image: Image): Observable<any> {
    const options = new RequestOptions({ headers: new ImsFileUploadHeaders(this.authService.currentCredential, token, image.file.name) });
    return this.http.post(url, image.file, options);
  }
}
