import { Headers, Http, Response } from '@angular/http';
import { FileUploadOptions, FileUploadResult } from '@ionic-native/transfer';
import 'rxjs/add/operator/toPromise';
import { FileUploadResultMock } from './transfer-mock';

export class TransferBlobObjectMock {
  public http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  public upload(fileUrl: string, url: string, options?: FileUploadOptions, trustAllHosts?: boolean): Promise<FileUploadResult> {
    const headers = new Headers(options.headers);
    return this.http.post(url, this.getImage(), { headers: headers }).map(r => this.toFileUploadResult(r)).toPromise();
  }

  private getImage(): Blob {
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

  private fixBinary(bin: string): ArrayBuffer {
    const length = bin.length;
    const buf = new ArrayBuffer(length);
    const arr = new Uint8Array(buf);
    for (let i = 0; i < length; i++) {
      arr[i] = bin.charCodeAt(i);
    }
    return buf;
  }

  private toFileUploadResult(response: Response): FileUploadResult {
    const result = new FileUploadResultMock();
    result.headers = response.headers;
    result.responseCode = response.status;
    return result;
  }

}

export class TransferBlobMock {
  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  private create(): TransferBlobObjectMock {
    return new TransferBlobObjectMock(this.http);
  }

}
