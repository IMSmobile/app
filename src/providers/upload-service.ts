import { ImsService } from './ims-service';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import { Credential } from '../models/credential';
import { Entry } from '../models/entry';
import { Image } from '../models/image';
import { ImsHeaders } from '../models/ims-headers';
import { Token } from '../models/token';
import { Observable } from 'rxjs/Observable';
import { TokenService } from './token-service';
import { Transfer, FileUploadOptions, TransferObject, FileUploadResult } from '@ionic-native/transfer';

@Injectable()
export class UploadService {

  constructor(public transfer: Transfer, public http: Http, public tokenService: TokenService, public imsService: ImsService) {
  }

  uploadImage(credential: Credential, filterId: number, imageEntry: Entry, image: Image): Observable<Response> {
    return this.tokenService.getToken(credential).flatMap(token => {
      return this.createContainerLocation(credential, filterId, token).flatMap(adress => {
        return this.postToContainer(credential, adress, token, image).flatMap(response => {
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

  postToContainer(credential: Credential, url: string, token: Token, image: Image): Observable<FileUploadResult> {
    const fileTransfer: TransferObject = this.transfer.create();

    let headers = new ImsHeaders(credential, token);
    headers.set('Content-Type', 'application/octet-stream');
    headers.append('Content-Disposition', 'attachment; filename=' + image.name);

    let options: FileUploadOptions = {
      fileName: image.name,
      headers: headers
    };

    return Observable.fromPromise(fileTransfer.upload(image.fileURI, url, options));
  }

  createImageEntry(credential: Credential, url: string, token: Token, imageEntry: Entry) {
    return this.http.post(url, imageEntry.json(), { headers: new ImsHeaders(credential, token) });
  }
}
