import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { Entry } from '../models/entry';
import { Image } from '../models/image';
import { ImsHeaders } from '../models/ims-headers';
import { Token } from '../models/token';
import { AuthService } from './auth-service';
import { ContainerUploadService } from './container-upload-service';
import { ImsService } from './ims-service';
import { TokenService } from './token-service';

@Injectable()
export class UploadService {

  constructor(public http: Http, public tokenService: TokenService, public imsService: ImsService, public containerUploadService: ContainerUploadService, public authService: AuthService) { }

  public uploadImages(filterId: number, imageEntry: Entry, images: Image[]): Observable<Response> {
    let observables: Observable<Response> = new EmptyObservable();
    for (const image of images) {
      observables = Observable.concat(observables, this.uploadImage(this.authService.filterId, imageEntry, image));
    }
    return observables;
  }

  public uploadImage(filterId: number, imageEntry: Entry, image: Image): Observable<Response> {
    return this.tokenService.getToken().flatMap(token =>
      this.createContainerLocation(filterId, token).flatMap(adress =>
        this.containerUploadService.postToContainer(adress, token, image).flatMap(response =>
          this.createImageEntry(adress, token, imageEntry))));
  }

  public createContainerLocation(filterId: number, token: Token): Observable<string> {
    return this.imsService.getUploadsLink(filterId, token).flatMap(url =>
      this.http.post(url, undefined, { headers: new ImsHeaders(this.authService.currentCredential, token) }).map(response => response.headers.get('location')));
  }

  public createImageEntry(url: string, token: Token, imageEntry: Entry): Observable<Response> {
    return this.http.post(url, imageEntry.json(), { headers: new ImsHeaders(this.authService.currentCredential, token) });
  }
}
