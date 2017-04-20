import { Transfer, TransferObject, FileUploadOptions, FileUploadResult } from '@ionic-native/transfer';

export class MockTransfer extends Transfer {
  create() {
    return new MockTransferObject();
  }
}

export class MockTransferObject extends TransferObject {
  upload(fileUrl: string, url: string, options?: FileUploadOptions, trustAllHosts?: boolean): Promise<FileUploadResult> {
    return new Promise((resolve, reject) => {
      resolve(new MockFileUploadResult());
    });
  }
}

class MockFileUploadResult implements FileUploadResult {
  bytesSent: number;
  responseCode: number;
  response: string;
  headers: {
    [s: string]: any;
  };
}
