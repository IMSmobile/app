import { TestBed, inject, async } from '@angular/core/testing';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ImsService } from './ims-service';
import { Credential } from '../model/credential';

describe('Provider: ImsService', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [],

      providers: [
        ImsService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (mockBackend, options) => {
            return new Http(mockBackend, options);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ],
      imports: [HttpModule]
    }).compileComponents();
  }));

  it('Ims Version', inject([ImsService, MockBackend], (imsService: ImsService, mockBackend) => {
    const mockResponse = '{"version":"V17Q1"}';
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: mockResponse
      })));
    });
    imsService.getInfo(new Credential("", "", "")).subscribe(info => expect(info.version).toEqual("V17Q1"));
  }));

});