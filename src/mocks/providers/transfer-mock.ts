import { FileUploadOptions, FileUploadResult } from '@ionic-native/transfer';

export class FileUploadResultMock {
  bytesSent: number;
  responseCode: number;
  response: string;
  headers: {
    [s: string]: any;
  };
}

export class TransferObjectMock {
  upload(fileUrl: string, url: string, options?: FileUploadOptions, trustAllHosts?: boolean): Promise<FileUploadResult> {
    return new Promise((resolve, reject) => {
      resolve(new FileUploadResultMock());
    });
  }
}

export class TransferMock {
  create(): TransferObjectMock {
    return new TransferObjectMock();
  }
}
