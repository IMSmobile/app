import { Image } from './../models/image';
import { CameraError } from './../models/errors/camera-error';
import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class CameraService {

  cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true
  };

  pictureOptions: CameraOptions = Object.assign({
    sourceType: this.camera.PictureSourceType.CAMERA
  }, this.cameraOptions);
  galleryOptions: CameraOptions = Object.assign({
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  }, this.cameraOptions);

  ignoredErrors: (string | number)[] = [
    'Selection cancelled.',    // Android
    'Camera cancelled.',       // Android
    20,                        // Android: permission not granted
    'no image selected',       // iOS: cancelled
    'has no access to camera'  // iOS: permission not granted
  ];

  constructor(public camera: Camera) { }

  public takePicture(): Observable<Image> {
    return Observable.fromPromise(this.camera.getPicture(this.pictureOptions)).map(imageSrc => new Image('CameraPhoto.jpeg', imageSrc));
  }

  public getGalleryPicture(): Observable<Image> {
    return Observable.fromPromise(this.camera.getPicture(this.galleryOptions)).map(imageSrc => new Image('GalleryPhoto.jpeg', imageSrc));
  }

  public handleError(error: (string | number)) {
    if (this.ignoredErrors.indexOf(error) === -1) {
      throw new CameraError(error);
    }
  }
}
