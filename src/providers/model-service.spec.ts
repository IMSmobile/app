import { ModelService } from './model-service';
import { TestBed, inject, async } from '@angular/core/testing';
import { Http, HttpModule, BaseRequestOptions } from '@angular/http';
import { ImsService } from './ims-service';
import { MockImsBackend } from '../mocks/mock-ims-backend';

describe('Provider: ModelService', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [],

      providers: [
        ModelService,
        ImsService,
        MockImsBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (mockBackend, options) => {
            return new Http(mockBackend, options);
          },
          deps: [MockImsBackend, BaseRequestOptions]
        }
      ],
      imports: [HttpModule]
    }).compileComponents();
  }));

  it('Should get image table metadata fields', inject([ModelService, MockImsBackend], (modelService: ModelService, mockImsBackend: MockImsBackend) => {
    modelService.getMetadataFieldsOfImageTable(mockImsBackend.credential, mockImsBackend.modelArchiveName).subscribe(
      metadataTableFields => expect(metadataTableFields).toEqual(mockImsBackend.modelFields),
      err => fail(err)
    );
  }));

  it('Should get link to image table metadata fields', inject([ModelService, MockImsBackend], (modelService: ModelService, mockImsBackend: MockImsBackend) => {
    modelService.getModelImageTableUrl(mockImsBackend.credential, mockImsBackend.modelArchiveName).subscribe(
      url => expect(url).toEqual(mockImsBackend.modelImageTableFieldsUrl),
      err => fail(err)
    );
  }));

  it('Should get model tables', inject([ModelService, MockImsBackend], (modelService: ModelService, mockImsBackend: MockImsBackend) => {
    modelService.getModelTables(mockImsBackend.credential, mockImsBackend.modelArchiveName).subscribe(
      modelTables => expect(modelTables).toEqual(mockImsBackend.modelTables),
      err => fail(err)
    );
  }));

  it('Should get link to model tables', inject([ModelService, MockImsBackend], (modelService: ModelService, mockImsBackend: MockImsBackend) => {
    modelService.getModelArchiveUrl(mockImsBackend.credential, mockImsBackend.modelArchiveName).subscribe(
      url => expect(url).toEqual(mockImsBackend.modelTablesUrl),
      err => fail(err)
    );
  }));

});
