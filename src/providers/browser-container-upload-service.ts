import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ImsFileUploadHeaders } from '../models/ims-file-upload-headers';
import { Credential } from './../models/credential';
import { Image } from './../models/image';
import { Token } from './../models/token';

@Injectable()
export class BrowserContainerUploadService {

 constructor(public http: Http) { }

 public postToContainer(credential: Credential, url: string, token: Token, image: Image): Observable<any> {
    const options = new RequestOptions({ headers: new ImsFileUploadHeaders(credential, token, image.file.name) });
    return this.http.post(url, image.file, options);
  }
}
