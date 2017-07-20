import { Injectable } from '@angular/core';
import { ImsFileTypeError } from './../models/errors/ims-file-type-error';
import { Image } from './../models/image';

@Injectable()
export class BrowserFileuploadSelectorService {

  public readonly allowedFileTypes: [string] = [ 'image/jpeg', 'image/png' ];

  // tslint:disable-next-line:no-any
  public getImageFromFilePicker(event: any): Image | undefined {
    const image = this.getImageFromFileList(event.target.files);
    if (image !== undefined) {
      event.target.value = '';
    }
    return image;
  }

  // tslint:disable-next-line:no-any
  public getImageFromFileDrop(event: any): Image | undefined {
    return this.getImageFromFileList(event.dataTransfer.files);
  }

  public getImageFromFileList(fileList: FileList): Image | undefined {
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
