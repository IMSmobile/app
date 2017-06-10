import { CameraError } from './../models/errors/camera-error';
import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class CameraService {

  pictureOptions: CameraOptions = {
    quality: 100,
    sourceType: this.camera.PictureSourceType.CAMERA,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true
  };

  galleryOptions: CameraOptions = {
    quality: 100,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true
  };

  ignoredErrors: (string|number)[] = [
    'Selection cancelled.',    // Android
    'Camera cancelled.',       // Android
    20,                        // Android: permission not granted
    'no image selected',       // iOS: cancelled
    'has no access to camera'  // iOS: permission not granted
  ];

  constructor(public camera: Camera) { }

  public takePicture(): Observable<any> {
    return Observable.fromPromise(this.camera.getPicture(this.pictureOptions));
  }

  public getGalleryPicture(): Observable<any> {
    return Observable.fromPromise(this.camera.getPicture(this.galleryOptions));
  }

  public handleError(error: (string|number)) {
    if (this.ignoredErrors.indexOf(error) === -1) {
      throw new CameraError(error);
    }
  }
}
