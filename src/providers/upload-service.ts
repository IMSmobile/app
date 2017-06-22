import { ContainerUploadService } from './container-upload-service';
import { ImsService } from './ims-service';
import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import { Credential } from '../models/credential';
import { Entry } from '../models/entry';
import { Image } from '../models/image';
import { ImsHeaders } from '../models/ims-headers';
import { Token } from '../models/token';
import { Observable } from 'rxjs/Observable';
import { TokenService } from './token-service';

@Injectable()
export class UploadService {

  constructor(public http: Http, public tokenService: TokenService, public imsService: ImsService, public  containerUploadService: ContainerUploadService) {
  }

  uploadImage(credential: Credential, filterId: number, imageEntry: Entry, image: Image): Observable<Response> {
    return this.tokenService.getToken(credential).flatMap(token => {
      return this.createContainerLocation(credential, filterId, token).flatMap(adress => {
        return this.containerUploadService.postToContainer(credential, adress, token, image).flatMap(response => {
          return this.createImageEntry(credential, adress, token, imageEntry);
        });
      });
    });
  }

  createContainerLocation(credential: Credential, filterId: number, token: Token): Observable<string> {
    return this.imsService.getUploadsLink(credential, filterId, token).flatMap(url => {
      return this.http.post(url, null, { headers: new ImsHeaders(credential, token) }).map(response => response.headers.get('location'));
    });
  }

  createImageEntry(credential: Credential, url: string, token: Token, imageEntry: Entry) {
    return this.http.post(url, imageEntry.json(), { headers: new ImsHeaders(credential, token) });
  }
}
