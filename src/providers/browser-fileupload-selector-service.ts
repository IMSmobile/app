import { Image } from './../models/image';
import { Injectable } from '@angular/core';

@Injectable()
export class BrowserFileuploadSelectorService {

  getImageFromFilePicker(event: any): Image | undefined {
    let image = this.getImageFromFileList(event.target.files);
    if (image) {
      event.target.value = null;
    }
    return image;
  }

  getImageFromFileDrop(event: any): Image | undefined {
    return this.getImageFromFileList(event.dataTransfer.files);
  }

  getImageFromFileList(fileList: FileList): Image | undefined {
    if (fileList.length > 0) {
      let file: File = fileList[0];
      return new Image(file.name, window.URL.createObjectURL(file), file);
    }
  }
}
