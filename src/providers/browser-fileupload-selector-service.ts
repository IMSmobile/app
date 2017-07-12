import { Injectable } from '@angular/core';
import { ImsFileTypeError } from './../models/errors/ims-file-type-error';
import { Image } from './../models/image';

@Injectable()
export class BrowserFileuploadSelectorService {

  allowedFileTypes: [string] = [ 'image/jpeg', 'image/png' ];

  getImageFromFilePicker(event: any): Image | undefined {
    const image = this.getImageFromFileList(event.target.files);
    if (image !== undefined) {
      event.target.value = undefined;
    }
    return image;
  }

  getImageFromFileDrop(event: any): Image | undefined {
    return this.getImageFromFileList(event.dataTransfer.files);
  }

  getImageFromFileList(fileList: FileList): Image | undefined {
    if (fileList.length > 0) {
      const file: File = fileList[0];
      if (this.allowedFileTypes.indexOf(file.type) !== -1) {
        return new Image(file.name, window.URL.createObjectURL(file), file);
      } else {
        throw new ImsFileTypeError(file.type);
      }
    }
  }
}
