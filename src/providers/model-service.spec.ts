import { ModelService } from './model-service';
import { TestBed, inject, async } from '@angular/core/testing';
import { Http, HttpModule, BaseRequestOptions } from '@angular/http';
import { ImsService } from './ims-service';
import { ImsBackendMock } from '../mocks/ims-backend-mock';

describe('Provider: ModelService', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [],

      providers: [
        ModelService,
        ImsService,
        ImsBackendMock,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (mockBackend, options) => {
            return new Http(mockBackend, options);
          },
          deps: [ImsBackendMock, BaseRequestOptions]
        }
      ],
      imports: [HttpModule]
    }).compileComponents();
  }));

it('Should get image table metadata fields', inject([ModelService, ImsBackendMock], (modelService: ModelService, imsBackendMock: ImsBackendMock) => {
    modelService.getMetadataFieldsOfImageTable(imsBackendMock.credential, imsBackendMock.modelArchiveName).subscribe(
      metadataTableFields => expect(metadataTableFields).toEqual(imsBackendMock.modelFields),
      err => fail(err)
    );
  }));

  it('Should get link to image table metadata fields', inject([ModelService, ImsBackendMock], (modelService: ModelService, imsBackendMock: ImsBackendMock) => {
    modelService.getModelImageTableUrl(imsBackendMock.credential, imsBackendMock.modelArchiveName).subscribe(
      url => expect(url).toEqual(imsBackendMock.modelImageTableFieldsUrl),
      err => fail(err)
    );
  }));

  it('Should get model tables', inject([ModelService, ImsBackendMock], (modelService: ModelService, imsBackendMock: ImsBackendMock) => {
    modelService.getModelTables(imsBackendMock.credential, imsBackendMock.modelArchiveName).subscribe(
      modelTables => expect(modelTables).toEqual(imsBackendMock.modelTables),
      err => fail(err)
    );
  }));

  it('Should get link to model tables', inject([ModelService, ImsBackendMock], (modelService: ModelService, imsBackendMock: ImsBackendMock) => {
    modelService.getModelArchiveUrl(imsBackendMock.credential, imsBackendMock.modelArchiveName).subscribe(
      url => expect(url).toEqual(imsBackendMock.modelTablesUrl),
      err => fail(err)
    );
  }));

});
