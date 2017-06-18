import { ImsFileUploadHeaders } from './../models/ims-file-upload-headers';
import { Injectable } from '@angular/core';
import { TransferObject, FileUploadOptions, Transfer } from '@ionic-native/transfer';
import { Observable } from 'rxjs/Observable';
import { Image } from './../models/image';
import { Token } from './../models/token';
import { Credential } from './../models/credential';

@Injectable()
export class ContainerUploadService {

  constructor(public transfer: Transfer) {
  }

  postToContainer(credential: Credential, url: string, token: Token, image: Image): Observable<any> {
    const fileTransfer: TransferObject = this.transfer.create();
    let options: FileUploadOptions = {
      fileName: image.name,
      headers: new ImsFileUploadHeaders(credential, token, image.name)
    };
    return Observable.fromPromise(fileTransfer.upload(image.fileURI, url, options));
  }
}
