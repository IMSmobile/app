import { Image } from './../models/image';
import { CameraService } from './camera-service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class PictureRequesterService {

  constructor(public cameraService: CameraService) { }

  requestPicture(): Observable<Image> {
    return this.cameraService.getGalleryPicture();
  }
}
