import { ImsFileUploadHeaders } from './../models/ims-file-upload-headers';
import { Image } from './../models/image';
import { ContainerUploadService } from './container-upload-service';
import { ImsBackendMock } from '../mocks/ims-backend-mock';
import { TestBed, inject, async } from '@angular/core/testing';
import { Transfer, FileUploadOptions } from '@ionic-native/transfer';
import { TransferMock } from '../mocks/providers/transfer-mock';

describe('Provider: ContainerUploadService', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        ContainerUploadService,
        ImsBackendMock,
        { provide: Transfer, useClass: TransferMock },
      ],
      imports: []
    }).compileComponents();
  }));

  it('Should post to a container', inject([ContainerUploadService, Transfer, ImsBackendMock], (containerUploadService: ContainerUploadService, transfer: Transfer, imsBackendMock: ImsBackendMock) => {
    let image = new Image('a.jpg', '/dev/0');
    let fileTransfer = transfer.create();
    let url = imsBackendMock.baseUrl + '/uploadurl';
    spyOn(transfer, 'create').and.returnValue(fileTransfer);
    spyOn(fileTransfer, 'upload').and.callThrough();
    let options: FileUploadOptions = {
      fileName: image.name,
      headers: new ImsFileUploadHeaders(imsBackendMock.credential, imsBackendMock.token, image.name)
    };
    containerUploadService.postToContainer(imsBackendMock.credential, url, imsBackendMock.token, image).subscribe();
    expect(fileTransfer.upload).toHaveBeenCalledWith(image.fileURI, url, options);
  }));
});
