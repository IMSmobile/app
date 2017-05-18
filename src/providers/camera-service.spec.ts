import { TestBed, inject, async } from '@angular/core/testing';
import { CameraService } from './camera-service';
import { AlertService } from './alert-service';
import { AlertController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { AlertMock } from './../mocks/mocks';

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
    let imageSource = '/my/picture.jpg';
    spyOn(camera, 'getPicture').and.returnValue(Promise.resolve(imageSource));
    cameraService.takePicture().subscribe(res => expect(res).toEqual(imageSource), err => expect(err).toBeNull());
  }));

  it('returns observable from camera with error on failure', inject([CameraService, Camera, AlertService], (cameraService: CameraService, camera: Camera, alertService: AlertService) => {
    let error = 'oops';
    spyOn(camera, 'getPicture').and.returnValue(Promise.reject(error));
    cameraService.takePicture().subscribe(res => expect(res).toBeNull(), err => expect(err).toEqual(error));
  }));

  it('does not show alert on ignored error', inject([CameraService, AlertService], (cameraService: CameraService, alertService: AlertService) => {
    spyOn(alertService, 'showError').and.callThrough();
    cameraService.showAlertOnError(cameraService.ignoredErrors[0]);
    expect(alertService.showError).toHaveBeenCalledTimes(0);
  }));

  it('shows alert on unexpected error message', inject([CameraService, AlertService], (cameraService: CameraService, alertService: AlertService) => {
    let errorMessage = 'oops!';
    spyOn(alertService, 'showError').and.callThrough();
    cameraService.showAlertOnError(errorMessage);
    expect(alertService.showError).toHaveBeenCalledWith(errorMessage);
  }));

  it('shows alert on unexpected error code', inject([CameraService, AlertService], (cameraService: CameraService, alertService: AlertService) => {
    let errorCode = 666;
    spyOn(alertService, 'showError').and.callThrough();
    cameraService.showAlertOnError(666);
    expect(alertService.showError).toHaveBeenCalledWith(cameraService.errorCodePreMessage + errorCode);
  }));

});
