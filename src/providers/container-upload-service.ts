import { Injectable } from '@angular/core';
import { FileUploadOptions, Transfer, TransferObject } from '@ionic-native/transfer';
import { Observable } from 'rxjs/Observable';
import { Credential } from './../models/credential';
import { Image } from './../models/image';
import { ImsFileUploadHeaders } from './../models/ims-file-upload-headers';
import { Token } from './../models/token';

@Injectable()
export class ContainerUploadService {

  constructor(public transfer: Transfer) {
  }

  postToContainer(credential: Credential, url: string, token: Token, image: Image): Observable<any> {
    const fileTransfer: TransferObject = this.transfer.create();
    const options: FileUploadOptions = {
      fileName: image.name,
      headers: new ImsFileUploadHeaders(credential, token, image.name)
    };
    return Observable.fromPromise(fileTransfer.upload(image.fileURI, url, options));
  }
}
