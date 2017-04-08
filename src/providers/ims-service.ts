import { Credential } from './../model/credential';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Info } from '../model/info';
import { Token } from '../model/token';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class ImsService {

  constructor(public http: Http) {

  }

  get(credential: Credential, url: string): Observable<any> {
    let headers = this.getHeaders(credential);
    return this.http.get(url, { headers: headers }).map(res => res.json());
  }

  getImsRelative(credential: Credential, page: string): Observable<any> {
    return this.get(credential, credential.server + page);
  }

  post(credential: Credential, url: string, postData: Object): Observable<Response> {
    let headers = this.getHeaders(credential);
    return this.http.post(url, postData, { headers: headers });
  }

  postImsRelative(credential: Credential, page: string, postData: Object): Observable<Response> {
    return this.post(credential, credential.server + page, postData);
  }

  postWithToken(credential: Credential, url: string, token: Token): Observable<Response> {
    let headers = this.getHeadersWithToken(credential, token);
    return this.http.post(url, null, { headers: headers });
  }

  postToContainer(credential: Credential, url: string, token: Token, filename:string, data:Blob): Observable<Response> {
    let headers = this.getHeadersForContainer(credential, token);
    return this.http.post(url, data, { headers: headers });
  }

  getHeaders(credential: Credential): Headers {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Allow-Control-Allow-Origin', '*');
    headers.append("Authorization", "Basic " + btoa(credential.username + ":" + credential.password));
    return headers;
  }

  getHeadersWithToken(credential: Credential, token: Token): Headers {
    let headers = this.getHeaders(credential);
    headers.append("ims-rest-token" , token.token);
    return headers;
  }

  getHeadersForContainer(credential: Credential, token: Token): Headers {
    let headers = this.getHeadersWithToken(credential, token);
    headers.set('Content-Type', 'application/octet-stream');
    headers.append("Content-Disposition" , "attachment; filename=meow.jpg");
    return headers;
  }

  getInfo(credential: Credential): Observable<Info> {
    return this.getImsRelative(credential, "/rest/info");
  }

  getTokenUrl(credential: Credential): Observable<Response> {
    let segment = '{"name": "Rest Floating Client Read Write"}';
    return this.postImsRelative(credential, "/rest/license/tokens", segment);
  }

  getTokenFromUrl(credential: Credential, tokenUrl: string): Observable<Token> {
    return this.get(credential, tokenUrl);
  }

  getToken(credential: Credential): Observable<Token> {
    return this.getTokenUrl(credential).flatMap(r => this.getTokenFromUrl(credential, r.headers.get("location")));
  }

  getPicture(): Observable<Blob>{
    return this.http.get("https://sinv-56028.edu.hsr.ch/assets/images/logo.png", {responseType: ResponseContentType.Blob}).map(res => res.blob());
  }

  createContainerLocation(credential: Credential): Observable<string> {
    return this.getToken(credential).flatMap(token => {
      let uploadUrl = credential.server + "/rest/entries/40/Bild/uploads";
      return this.postWithToken(credential, uploadUrl, token).map(response => response.headers.get("location"));
    });
  }

  postImageToContainer(credential:Credential): Observable<Response>{
    return this.getToken(credential).flatMap(token => {
       return this.createContainerLocation(credential).flatMap(adress => {
         return this.getPicture().flatMap(image => {
           console.log("Image:" + image + " size:" + image.size);
           return this.postToContainer(credential, adress, token, null, image)
         })
       })
    })
  }
}
