import { TestBed, inject, async } from '@angular/core/testing';
import { Http, HttpModule } from '@angular/http';
import { ImsService } from './ims-service';
import { UploadService } from './upload-service';
import { Credential } from '../models/credential';
import { TokenService } from './token-service';
import { Entry } from '../models/entry';
import { Image } from '../models/image';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { MockTransferBlob } from '../mocks/providers/mock-transfer-blob';




describe('Provider: UploadService Integration Test', () => {

  var originalTimeout;

  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        File, UploadService, TokenService, ImsService,
        {
          provide: Transfer,
          useFactory: (http) => {
            return new MockTransferBlob(http);
          },
          deps: [Http]
        },
      ],
      imports: [HttpModule]
    }).compileComponents();
  }));

  it('Ensure image is stored as entry', async(inject([UploadService], (uploadService: UploadService) => {
    let credential = new Credential('https://sinv-56028.edu.hsr.ch', 'admin', 'admin', 'Rest Floating Client Read Write');
    let image = new Image('image.png', 'does not matter as we use blob from mock service.jpg');
    let imageEntry = new Entry().set('IDFall', '23691').set('BILDNAME', 'Imagic IMS Mobile Client');
    uploadService.uploadImage(credential, 40, imageEntry, image).subscribe(
      res => expect(res).toBeDefined(),
      err => fail(err));
  })));


});

