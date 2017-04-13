import { TestBed, inject, async } from '@angular/core/testing';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { EntryPointResponse } from './entry-point-response';
import { LicensePointResponse } from './license-point-response';
import { TokenLocationResponse } from './tokenLocationResponse';
import { TokenResponse } from './tokenResponse';
import { Token } from '../token';
import { Link } from '../link';
import { Credential } from '../credential';

export class MockImsBackend extends MockBackend {

    public baseUrl: string = 'http://restserver:9000';
    public segmentName: string = 'Ims Mobile Rest Segement';
    public credential: Credential = new Credential(this.baseUrl, 'admin', 'admin', this.segmentName);

    public entryPointUrl: string = this.baseUrl + '/rest';
    public licenseUrl: string = this.entryPointUrl + '/license'
    public infoUrl: string = this.entryPointUrl + '/info'
    public tokensUrl: string = this.licenseUrl + '/tokens'
    public tokenLoadingUrl: string = this.tokensUrl + 'ABCDE';
    public version: string = 'V17Q1';
    public versionResponse = { 'version': this.version };
    public tokenName: string = 'EDFC';
    public tokenExpirationDate: string = '2015-10-28T16:45:12Z';
    public token: Token = new Token(this.tokenName, this.tokenExpirationDate);



    constructor() {
        super();
        this.connections.subscribe((connection) => {
            if (connection.request.url.endsWith(this.entryPointUrl)) {
                connection.mockRespond(new EntryPointResponse([new Link('license', this.licenseUrl), new Link('info', this.infoUrl)]));
            } else if (connection.request.url.endsWith(this.licenseUrl)) {
                connection.mockRespond(new LicensePointResponse(null, new Link('tokens', this.tokensUrl)));
            } else if (connection.request.url.endsWith(this.tokensUrl) && connection.request.method === RequestMethod.Post) {
                connection.mockRespond(new TokenLocationResponse(this.tokenLoadingUrl));
            } else if (connection.request.url.endsWith(this.tokenLoadingUrl)) {
                connection.mockRespond(new TokenResponse(this.token));
            } else if (connection.request.url.endsWith(this.infoUrl)) {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: this.versionResponse
                })));
            } else {
                connection.mockError(new Error("No handling for: " + connection.request.url));
            }
        });
    }
    //)
}