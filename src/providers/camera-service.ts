import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import 'rxjs/add/observable/fromPromise';
import { Observable } from 'rxjs/Observable';
import { CameraError } from './../models/errors/camera-error';
import { Image } from './../models/image';

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

  androidGalleryCancelled: string = 'Selection cancelled.';
  androidCameraCancelled: string = 'Camera cancelled.';
  androidPermissionNotGranted: number = 20;
  iosGalleryOrCameraCancelled: string = 'no image selected';
  iosPermissionNotGranted: string = 'has no access to camera';
  ignoredErrors: (string | number)[] = [
    this.androidGalleryCancelled,
    this.androidCameraCancelled,
    this.androidPermissionNotGranted,
    this.iosGalleryOrCameraCancelled,
    this.iosPermissionNotGranted
  ];

  constructor(public camera: Camera) { }

  public takePicture(): Observable<Image> {
    return Observable.fromPromise(this.camera.getPicture(this.pictureOptions)).map(imageSrc => new Image('CameraPhoto.jpeg', imageSrc));
  }

  public getGalleryPicture(): Observable<Image> {
    return Observable.fromPromise(this.camera.getPicture(this.galleryOptions)).map(imageSrc => new Image('GalleryPhoto.jpeg', imageSrc));
  }

  public handleError(error: (string | number)): void {
    if (this.ignoredErrors.indexOf(error) === -1) {
      throw new CameraError(error);
    }
  }
}
