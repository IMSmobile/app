import { Http, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Image } from './../models/image';
import { Token } from './../models/token';
import { Credential } from './../models/credential';
import { ImsFileUploadHeaders } from '../models/ims-file-upload-headers';

@Injectable()
export class BrowserContainerUploadService {

 constructor(public http: Http) {
  }

 postToContainer(credential: Credential, url: string, token: Token, image: Image): Observable<any> {
    let options = new RequestOptions({ headers: new ImsFileUploadHeaders(credential, token, image.file.name) });
    return this.http.post(url, image.file, options);
  }
}
