import { inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule } from '@angular/http';
import { ImsBackendMock } from '../mocks/ims-backend-mock';
import { ImsService } from './ims-service';
import { KeywordService } from './keyword-service';

describe('Provider: ModelService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        ImsService,
        ImsBackendMock,
        BaseRequestOptions,
        KeywordService,
        {
          provide: Http,
          useFactory: (imsBackendMock, options) =>
            new Http(imsBackendMock, options),
          deps: [ImsBackendMock, BaseRequestOptions]
        }
      ],
      imports: [HttpModule]
    });
  });

  it('Should get keyword catalog', inject([KeywordService, ImsBackendMock], (keywordService: KeywordService, imsBackendMock: ImsBackendMock) => {
    keywordService.getKeywordCatalog(imsBackendMock.credential, imsBackendMock.modelFieldOptionalString).subscribe(
      keywordCatalog => expect(keywordCatalog).toEqual(imsBackendMock.keywordCatalog),
      fail);
  }));

});
