import { FileUploadOptions, FileUploadResult } from '@ionic-native/transfer';

export class FileUploadResultMock {
  public bytesSent: number;
  public responseCode: number;
  public response: string;
  public headers: {
    [s: string]: any;
  };
}

export class TransferObjectMock {
  public upload(fileUrl: string, url: string, options?: FileUploadOptions, trustAllHosts?: boolean): Promise<FileUploadResult> {
    return new Promise((resolve, reject) => {
      resolve(new FileUploadResultMock());
    });
  }
}

export class TransferMock {
  public create(): TransferObjectMock {
    return new TransferObjectMock();
  }
}
