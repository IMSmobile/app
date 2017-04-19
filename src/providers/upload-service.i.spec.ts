import { TestBed, inject, async } from '@angular/core/testing';
import { Http, HttpModule } from '@angular/http';
import { ImsService } from './ims-service';
import { UploadService } from './upload-service';
import { Credential } from '../model/credential';
import { TokenService } from './token-service';
import { ImageEntry } from '../model/imageEntry';
import { Image } from '../model/image';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';



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
      providers: [File, UploadService, TokenService, ImsService, Transfer],
      imports: [HttpModule]
    }).compileComponents();
  }));

  // TODO make integrationt test work again
  it('Ensure image is stored as entry', async(inject([File, UploadService, Http], (file: File, uploadService: UploadService, httpModule: HttpModule) => {
    let credential = new Credential('https://sinv-56028.edu.hsr.ch', 'admin', 'admin', 'Rest Floating Client Read Write');
    let imageEntry = new ImageEntry().set('IDFall', '23691').set('BILDNAME', 'IMS Mobile App');
    file.writeFile(file.dataDirectory, 'a.jpg', getImage(), {}).then(() => {
      let image = new Image('image.png', file.dataDirectory + '/a.jpg');
      uploadService.uploadImage(credential, 40, imageEntry, image).subscribe(
        res => expect(res).toBeDefined(),
        err => fail(err));
    }).catch(err => fail(err));
  })));

  function getImage(): Blob {
    let base64 =
      'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB1klEQVR42n2TzytEURTHv3e8N1joRhZG' +
      'zJsoCjsLhcw0jClKWbHwY2GnLGUlIfIP2IjyY2djZTHSMJNQSilFNkz24z0/Ms2MrnvfvMu8mcfZvPvu' +
      'Pfdzz/mecwgKLNYKb0cFEgXbRvwV2s2HuWazCbzKA5LvNecDXayBjv9NL7tEpSNgbYzQ5kZmAlSXgsGG' +
      'XmS+MjhKxDHgC+quyaPKQtoPYMQPOh5U9H6tBxF+Icy/aolqAqLP5wjWd5r/Ip3YXVILrF4ZRYAxDhCO' +
      'J/yCwiMI+/xgjOEzmzIhAio04GeGayIXjQ0wGoAuQ5cmIjh8jNo0GF78QwNhpyvV1O9tdxSSR6PLl51F' +
      'nIK3uQ4JJQME4sCxCIRxQbMwPNSjqaobsfskm9l4Ky6jvCzWEnDKU1ayQPe5BbN64vYJ2vwO7CIeLIi3' +
      'ciYAoby0M4oNYBrXgdgAbC/MhGCRhyhCZwrcEz1Ib3KKO7f+2I4iFvoVmIxHigGiZHhPIb0bL1bQApFS' +
      '9U/AC0ulSXrrhMotka/lQy0Ic08FDeIiAmDvA2HX01W05TopS2j2/H4T6FBVbj4YgV5+AecyLk+Ctvms' +
      'QWK8WZZ+Hdf7QGu7fobMuZHyq1DoJLvUqQrfM966EU/qYGwAAAAASUVORK5CYII=';

    var binary = fixBinary(atob(base64));
    return new Blob([binary], { type: 'image/png' });
  }

  function fixBinary(bin: string) {
    var length = bin.length;
    var buf = new ArrayBuffer(length);
    var arr = new Uint8Array(buf);
    for (var i = 0; i < length; i++) {
      arr[i] = bin.charCodeAt(i);
    }
    return buf;
  }

});

