import { Injectable } from '@angular/core';
import { Http, Response, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';
import { Credential } from '../model/credential';
import { ImageEntry } from '../model/imageEntry';
import { Image } from '../model/image';
import { Observable } from 'rxjs/Observable';
import { TokenService } from './token-service';
import { ImsHeaders } from '../model/imsHeaders';
import { Token } from '../model/token';

@Injectable()
export class UploadService {

  constructor(public http: Http, public tokenService: TokenService) {
  }

  uploadImage(credential: Credential, imageEntry: ImageEntry, image: Image): Observable<Response> {
    return this.tokenService.getToken(credential).flatMap(token => {
      return this.createContainerLocation(credential, token).flatMap(adress => {
        return this.postToContainer(credential, adress, token, image).flatMap(respone => {
          return this.createImageEntry(credential, adress, token, imageEntry);
        });
      });
    });
  }

  createContainerLocation(credential: Credential, token: Token): Observable<string> {
    let uploadUrl = credential.server + '/rest/entries/40/Bild/uploads'; // TODO: get image table from model
    return this.http.post(uploadUrl, null, { headers: new ImsHeaders(credential, token) }).map(response => response.headers.get('location'));
  }

  postToContainer(credential: Credential, url: string, token: Token, image: Image): Observable<Response> {
    let headers = new ImsHeaders(credential, token);
    headers.set('Content-Type', 'application/octet-stream');
    headers.append('Content-Disposition', 'attachment; filename=' + image.name);
    return this.http.post(url, image.data, { headers: headers });
  }

  createImageEntry(credential: Credential, url: string, token: Token, imageEntry: ImageEntry) {
    return this.http.post(url, imageEntry.json(), { headers: new ImsHeaders(credential, token) });
  }

  getImage(): Observable<Blob> { // TODO: move to test
    return this.http.get('https://sinv-56028.edu.hsr.ch/assets/images/logo.png', { responseType: ResponseContentType.Blob }).map(res => res.blob());
  }

}
