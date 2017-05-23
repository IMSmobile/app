import { FileUploadOptions, FileUploadResult } from '@ionic-native/transfer';

export class TransferMock {
  create() {
    return new TransferObjectMock();
  }
}

export class TransferObjectMock  {
  upload(fileUrl: string, url: string, options?: FileUploadOptions, trustAllHosts?: boolean): Promise<FileUploadResult> {
    return new Promise((resolve, reject) => {
      resolve(new FileUploadResultMock());
    });
  }
}

export class FileUploadResultMock {
  bytesSent: number;
  responseCode: number;
  response: string;
  headers: {
    [s: string]: any;
  };
}
