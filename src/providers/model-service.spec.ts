import { inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { ImsBackendMock } from '../mocks/ims-backend-mock';
import { PlatformMock, StorageMock } from './../mocks/mocks';
import { AuthService } from './auth-service';
import { ImsService } from './ims-service';
import { ModelService } from './model-service';
import { SettingService } from './setting-service';

describe('Provider: ModelService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        ModelService,
        ImsService,
        ImsBackendMock,
        BaseRequestOptions,
        AuthService,
        SettingService,
        { provide: Storage, useClass: StorageMock },
        { provide: Platform, useClass: PlatformMock },
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

  beforeEach(inject([AuthService, ImsBackendMock], (authService: AuthService, imsBackendMock: ImsBackendMock) => {
    authService.setCurrentCredential(imsBackendMock.credential);
  }));

  it('Should get image table metadata fields', inject([ModelService, ImsBackendMock], (modelService: ModelService, imsBackendMock: ImsBackendMock) => {
    modelService.getMetadataFieldsOfImageTable(imsBackendMock.modelArchiveName).subscribe(
      metadataTableFields => expect(metadataTableFields).toEqual(imsBackendMock.modelFields),
      fail);
  }));

  it('Should get parent image table metadata fields', inject([ModelService, ImsBackendMock], (modelService: ModelService, imsBackendMock: ImsBackendMock) => {
    modelService.getMetadataFieldsOfParentImageTable(imsBackendMock.modelArchiveName).subscribe(
      metadataTableFields => expect(metadataTableFields).toEqual(imsBackendMock.parentImageModelFields),
      fail);
  }));

  it('Should get link to image table metadata fields', inject([ModelService, ImsBackendMock], (modelService: ModelService, imsBackendMock: ImsBackendMock) => {
    modelService.getModelImageTableUrl(imsBackendMock.modelArchiveName).subscribe(
      url => expect(url).toEqual(imsBackendMock.modelImageTableFieldsUrl),
      fail);
  }));

  it('Should get link to parent image table metadata fields', inject([ModelService, ImsBackendMock], (modelService: ModelService, imsBackendMock: ImsBackendMock) => {
    modelService.getModelParentImageTableUrl(imsBackendMock.modelArchiveName).subscribe(
      url => expect(url).toEqual(imsBackendMock.modelTableFieldsUrl),
      fail);
  }));

  it('Should get model tables', inject([ModelService, ImsBackendMock], (modelService: ModelService, imsBackendMock: ImsBackendMock) => {
    modelService.getModelTables(imsBackendMock.modelArchiveName).subscribe(
      modelTables => expect(modelTables).toEqual(imsBackendMock.modelTables),
      fail);
  }));

  it('Should get link to model tables', inject([ModelService, ImsBackendMock], (modelService: ModelService, imsBackendMock: ImsBackendMock) => {
    modelService.getModelArchiveUrl(imsBackendMock.modelArchiveName).subscribe(
      url => expect(url).toEqual(imsBackendMock.modelTablesUrl),
      fail);
  }));

});
