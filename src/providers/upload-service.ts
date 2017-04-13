import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Credential } from '../model/credential';
import { ImageEntry } from '../model/imageEntry';
import { Image } from '../model/image';
import { Observable } from 'rxjs/Observable';
import { TokenService } from './token-service';
import { ImsHeaders } from '../model/imsHeaders';
import { Token } from '../model/token';
import { ArchiveEntry } from '../model/archiveEntry';

@Injectable()
export class UploadService {

  constructor(public http: Http, public tokenService: TokenService) {
  }

  uploadImage(credential: Credential, filterId: number, imageEntry: ImageEntry, image: Image): Observable<Response> {
    return this.tokenService.getToken(credential).flatMap(token => {
      return this.createContainerLocation(credential, filterId, token).flatMap(adress => {
        return this.postToContainer(credential, adress, token, image).flatMap(response => {
          return this.createImageEntry(credential, adress, token, imageEntry);
        });
      });
    });
  }

  createContainerLocation(credential: Credential, filterId: number, token: Token): Observable<string> {
    return this.getArchiveEntry(credential, filterId, token).flatMap(entry => {
      return this.http.post(entry.getUploadsLink(), null, { headers: new ImsHeaders(credential, token) }).map(response => response.headers.get('location'));
    });
  }

  getArchiveEntry(credential: Credential, filterId: number, token: Token): Observable<ArchiveEntry> {
    return this.http.get(credential.server + '/rest/entries/' + filterId, { headers: new ImsHeaders(credential, token) }).map(response => {
      let data = response.json();
      return new ArchiveEntry(data.archiveName, data.tables);
    });
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
}