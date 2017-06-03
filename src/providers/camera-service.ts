import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertService } from './alert-service';
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
  errorCodePreMessage: string = 'Error ';

  constructor(public camera: Camera, public AlertService: AlertService) { }

  public takePicture(): Observable<any> {
    return Observable.fromPromise(this.camera.getPicture(this.pictureOptions));
  }

  public getGalleryImage(): Observable<any> {
    return Observable.fromPromise(this.camera.getPicture(this.galleryOptions));
  }

  public showAlertOnError(error: (string|number)) {
    if (this.ignoredErrors.indexOf(error) === -1) {
      if (typeof error === 'number') {
        error = this.errorCodePreMessage + error;
      }
      this.AlertService.showError(error);
    }
  }
}
