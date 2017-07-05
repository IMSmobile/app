import { Headers, Http, Response } from '@angular/http';
import { FileUploadOptions, FileUploadResult } from '@ionic-native/transfer';
import 'rxjs/add/operator/toPromise';
import { FileUploadResultMock } from './transfer-mock';

export class TransferBlobObjectMock {
  http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  upload(fileUrl: string, url: string, options?: FileUploadOptions, trustAllHosts?: boolean): Promise<FileUploadResult> {
    const headers = new Headers(options.headers);
    return this.http.post(url, this.getImage(), { headers: headers }).map(r => this.toFileUploadResult(r)).toPromise();
  }

  getImage(): Blob {
    const base64 =
      'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB1klEQVR42n2TzytEURTHv3e8N1joRhZG' +
      'zJsoCjsLhcw0jClKWbHwY2GnLGUlIfIP2IjyY2djZTHSMJNQSilFNkz24z0/Ms2MrnvfvMu8mcfZvPvu' +
      'Pfdzz/mecwgKLNYKb0cFEgXbRvwV2s2HuWazCbzKA5LvNecDXayBjv9NL7tEpSNgbYzQ5kZmAlSXgsGG' +
      'XmS+MjhKxDHgC+quyaPKQtoPYMQPOh5U9H6tBxF+Icy/aolqAqLP5wjWd5r/Ip3YXVILrF4ZRYAxDhCO' +
      'J/yCwiMI+/xgjOEzmzIhAio04GeGayIXjQ0wGoAuQ5cmIjh8jNo0GF78QwNhpyvV1O9tdxSSR6PLl51F' +
      'nIK3uQ4JJQME4sCxCIRxQbMwPNSjqaobsfskm9l4Ky6jvCzWEnDKU1ayQPe5BbN64vYJ2vwO7CIeLIi3' +
      'ciYAoby0M4oNYBrXgdgAbC/MhGCRhyhCZwrcEz1Ib3KKO7f+2I4iFvoVmIxHigGiZHhPIb0bL1bQApFS' +
      '9U/AC0ulSXrrhMotka/lQy0Ic08FDeIiAmDvA2HX01W05TopS2j2/H4T6FBVbj4YgV5+AecyLk+Ctvms' +
      'QWK8WZZ+Hdf7QGu7fobMuZHyq1DoJLvUqQrfM966EU/qYGwAAAAASUVORK5CYII=';

    const binary = this.fixBinary(atob(base64));
    return new Blob([binary], { type: 'image/png' });
  }

  fixBinary(bin: string) {
    const length = bin.length;
    const buf = new ArrayBuffer(length);
    const arr = new Uint8Array(buf);
    for (let i = 0; i < length; i++) {
      arr[i] = bin.charCodeAt(i);
    }
    return buf;
  }

  toFileUploadResult(response: Response): FileUploadResult {
    const result = new FileUploadResultMock();
    result.headers = response.headers;
    result.responseCode = response.status;
    return result;
  }

}

export class TransferBlobMock {
  http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  create() {
    return new TransferBlobObjectMock(this.http);
  }

}
