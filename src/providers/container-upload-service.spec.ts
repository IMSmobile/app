import { async, inject, TestBed } from '@angular/core/testing';
import { FileUploadOptions, Transfer } from '@ionic-native/transfer';
import { ImsBackendMock } from '../mocks/ims-backend-mock';
import { TransferMock } from '../mocks/providers/transfer-mock';
import { Image } from './../models/image';
import { ImsFileUploadHeaders } from './../models/ims-file-upload-headers';
import { ContainerUploadService } from './container-upload-service';

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
    });
  }));

  it('Should post to a container', inject([ContainerUploadService, Transfer, ImsBackendMock], (containerUploadService: ContainerUploadService, transfer: Transfer, imsBackendMock: ImsBackendMock) => {
    const image = new Image('a.jpg', '/dev/0');
    const fileTransfer = transfer.create();
    const url = imsBackendMock.baseUrl + '/uploadurl';
    spyOn(transfer, 'create').and.returnValue(fileTransfer);
    spyOn(fileTransfer, 'upload').and.callThrough();
    const options: FileUploadOptions = {
      fileName: image.name,
      headers: new ImsFileUploadHeaders(imsBackendMock.credential, imsBackendMock.token, image.name)
    };
    containerUploadService.postToContainer(imsBackendMock.credential, url, imsBackendMock.token, image).subscribe();
    expect(fileTransfer.upload).toHaveBeenCalledWith(image.fileURI, url, options);
  }));
});
