import { FileUploadOptions, FileUploadResult } from '@ionic-native/transfer';
import { Http, Headers, Response } from '@angular/http';
import { FileUploadResultMock } from './transfer-mock';
import 'rxjs/add/operator/toPromise';



export class TransferBlobMock {
  http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  create() {
    return new TransferBlobObjectMock(this.http);
  }

}

export class TransferBlobObjectMock {
  http: Http;

  constructor(http: Http) {
    this.http = http;
  }


  upload(fileUrl: string, url: string, options?: FileUploadOptions, trustAllHosts?: boolean): Promise<FileUploadResult> {
    let headers = new Headers(options.headers);
    return this.http.post(url, getImage(), { headers: headers }).map(r => this.toFileUploadResult(r)).toPromise();
  }

  toFileUploadResult(response: Response): FileUploadResult {
    let result = new FileUploadResultMock();
    result.headers = response.headers;
    result.responseCode = response.status;
    return result;
  }

}

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
