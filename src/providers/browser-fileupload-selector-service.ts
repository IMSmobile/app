import { Image } from './../models/image';
import { Injectable } from '@angular/core';

@Injectable()
export class BrowserFileuploadSelectorService {

  getImageFromFileList(event: any): Image|undefined {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      event.target.value = null;
      return new Image(file.name, window.URL.createObjectURL(file), file);
    }
  }
}
