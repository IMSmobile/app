import { Injectable } from '@angular/core';
import { ImsFileTypeError } from './../models/errors/ims-file-type-error';
import { Image } from './../models/image';

@Injectable()
export class BrowserFileuploadSelectorService {

  public readonly allowedFileTypes: [string] = ['image/jpeg', 'image/png'];

  // tslint:disable-next-line:no-any
  public getImagesFromFilePicker(event: any): Image[] {
    const images = this.getImagesFromFileList(event.target.files);
    if (images.length > 0) {
      event.target.value = '';
    }
    return images;
  }

  // tslint:disable-next-line:no-any
  public getImagesFromFileDrop(event: any): Image[] {
    return this.getImagesFromFileList(event.dataTransfer.files);
  }

  public getImagesFromFileList(fileList: FileList): Image[] {
    const images: Image[] = [];
    Array.from(fileList).forEach(file => {
      if (this.allowedFileTypes.indexOf(file.type) !== -1) {
        images.push(new Image(file.name, window.URL.createObjectURL(file), file));
      } else {
        throw new ImsFileTypeError(file.type);
      }
    });
    return images;
  }

}
