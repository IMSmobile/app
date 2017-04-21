import { FileUploadOptions, FileUploadResult } from '@ionic-native/transfer';

export class MockTransfer {
  create() {
    return new MockTransferObject();
  }
}

export class MockTransferObject  {
  upload(fileUrl: string, url: string, options?: FileUploadOptions, trustAllHosts?: boolean): Promise<FileUploadResult> {
    return new Promise((resolve, reject) => {
      resolve(new MockFileUploadResult());
    });
  }
}

class MockFileUploadResult {
  bytesSent: number;
  responseCode: number;
  response: string;
  headers: {
    [s: string]: any;
  };
}
