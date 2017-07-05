import { async, inject, TestBed } from '@angular/core/testing';
import { Camera } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular';
import { AlertMock } from './../mocks/mocks';
import { CameraError } from './../models/errors/camera-error';
import { Image } from './../models/image';
import { AlertService } from './alert-service';
import { CameraService } from './camera-service';

describe('Provider: CameraService', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [],

      providers: [
        CameraService,
        AlertService,
        Camera,
        { provide: AlertController, useClass: AlertMock },
      ],
      imports: []
    }).compileComponents();
  }));

  it('returns observable from camera with response on success', inject([CameraService, Camera, AlertService], (cameraService: CameraService, camera: Camera, alertService: AlertService) => {
    const imageSrc = '/my/picture.jpg';
    spyOn(camera, 'getPicture').and.returnValue(Promise.resolve(imageSrc));
    cameraService.takePicture().subscribe(res => expect(res).toEqual(new Image('CameraPhoto.jpeg', imageSrc)), err => expect(err).toBeNull());
  }));

  it('returns observable from camera with error on failure', inject([CameraService, Camera, AlertService], (cameraService: CameraService, camera: Camera, alertService: AlertService) => {
    const error = 'oops';
    spyOn(camera, 'getPicture').and.returnValue(Promise.reject(error));
    cameraService.takePicture().subscribe(res => expect(res).toBeNull(), err => expect(err).toEqual(error));
  }));

  it('requests picture from camera with the correct options', inject([CameraService, Camera], (cameraService: CameraService, camera: Camera) => {
    spyOn(camera, 'getPicture').and.callThrough();
    cameraService.takePicture();
    expect(camera.getPicture).toHaveBeenCalledWith(cameraService.pictureOptions);
  }));

  it('requests picture from gallery with the correct options', inject([CameraService, Camera], (cameraService: CameraService, camera: Camera) => {
    spyOn(camera, 'getPicture').and.callThrough();
    cameraService.getGalleryPicture();
    expect(camera.getPicture).toHaveBeenCalledWith(cameraService.galleryOptions);
  }));

  it('does not throw error on ignored error', inject([CameraService], (cameraService: CameraService) => {
    spyOn(cameraService, 'handleError').and.callThrough();
    cameraService.handleError(cameraService.ignoredErrors[0]);
    expect(cameraService.handleError).toHaveBeenCalledTimes(1);
  }));

  it('throws error on unexpected error message', inject([CameraService], (cameraService: CameraService) => {
    const errorMessage = 'oops!';
    expect(() => cameraService.handleError(errorMessage)).toThrowError(CameraError);
  }));

  it('throws error on unexpected error code', inject([CameraService], (cameraService: CameraService) => {
    const errorCode = 666;
    expect(() => cameraService.handleError(errorCode)).toThrowError(CameraError);
  }));

});
