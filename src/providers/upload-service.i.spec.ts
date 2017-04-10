import { TestBed, inject, async } from '@angular/core/testing';
import { Http, HttpModule } from '@angular/http';
import { UploadService } from './upload-service';
import { Credential } from '../model/credential';
import { TokenService } from './token-service';
import { ImageEntry } from '../model/imageEntry';
import { Image } from '../model/image';



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
      providers: [UploadService, TokenService],
      imports: [HttpModule]
    }).compileComponents();
  }));

  it('Ensure image is stored as entry', async(inject([UploadService, Http], (uploadService: UploadService, httpModule: HttpModule) => {
    let credential = new Credential('https://sinv-56028.edu.hsr.ch', 'admin', 'admin', 'Rest Floating Client Read Write');
    let imageEntry = new ImageEntry().set('IDFall', '23691').set('BILDNAME', 'IMS Mobile App');
    uploadService.getImage().subscribe(blob => {
      uploadService.uploadImage(credential, imageEntry, new Image('image.jpg', blob)).subscribe(
        res => console.log(res),
        err => fail(err));
    });
  })));
});
