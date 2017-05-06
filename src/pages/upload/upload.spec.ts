import { TestBed, inject, async, ComponentFixture } from '@angular/core/testing';
import { UploadPage } from './upload';
import { App, Config, Form, IonicModule, Keyboard, DomController, LoadingController, NavController, Platform, NavParams, AlertController, ToastController, PopoverController } from 'ionic-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../providers/auth-service';
import { ImsService } from '../../providers/ims-service';
import { ConfigMock, PlatformMock, NavParamsMock, ToastMock, AppMock, AlertMock, LoadingMock, PopoverControllerMock } from '../../mocks/mocks';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockImsBackend } from '../../mocks/mock-ims-backend';
import { UploadService } from '../../providers/upload-service';
import { TokenService } from '../../providers/token-service';
import { CameraService } from '../../providers/camera-service';
import { LoadingService } from '../../providers/loading-service';
import { Camera } from '@ionic-native/camera';
import { AlertService } from '../../providers/alert-service';
import { Observable } from 'rxjs/Observable';
import { Transfer } from '@ionic-native/transfer';
import 'rxjs/add/observable/throw';


describe('Page: Upload', () => {

  let fixture: ComponentFixture<UploadPage> = null;
  let page: UploadPage = null;

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [UploadPage],

      providers: [
        App, DomController, Form, Keyboard, NavController, LoadingController, AlertController, AuthService, ImsService,
        TokenService, UploadService, MockImsBackend, BaseRequestOptions, CameraService, Camera, LoadingService, AlertService, Transfer,
        { provide: App, useClass: AppMock },
        { provide: AlertController, useClass: AlertMock },
        { provide: Config, useClass: ConfigMock },
        { provide: Platform, useClass: PlatformMock },
        { provide: NavParams, useClass: NavParamsMock },
        { provide: ToastController, useClass: ToastMock },
        { provide: LoadingController, useClass: LoadingMock },
        { provide: PopoverController, useClass: PopoverControllerMock },
        {
          provide: Http,
          useFactory: (MockImsBackend, options) => {
            return new Http(MockImsBackend, options);
          },
          deps: [MockImsBackend, BaseRequestOptions]
        },
      ],
      imports: [HttpModule, FormsModule, IonicModule, ReactiveFormsModule]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(UploadPage);
      page = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  afterEach(() => {
    fixture.destroy();
  });

  it('Show and Hide Loading while uploading', inject([LoadingService, UploadService], (loadingService: LoadingService, uploadService: UploadService) => {
    spyOn(loadingService, 'showLoading').and.callThrough();
    spyOn(loadingService, 'hideLoading').and.callThrough();
    spyOn(uploadService, 'uploadImage').and.returnValue(Observable.of(new Response(new ResponseOptions())));
    page.uploadPicture();
    expect(loadingService.showLoading).toHaveBeenCalledTimes(1);
    expect(loadingService.hideLoading).toHaveBeenCalledTimes(1);
  }));

  it('Show Toast after successfull upload', inject([ToastController, UploadService], (toastController: ToastController, uploadService: UploadService) => {
    spyOn(toastController, 'create').and.callThrough();
    spyOn(uploadService, 'uploadImage').and.returnValue(Observable.of(new Response(new ResponseOptions())));
    page.uploadPicture();
    expect(toastController.create).toHaveBeenCalled();
  }));

  it('Show Error after failed upload', inject([AlertService, UploadService], (alertService: AlertService, uploadService: UploadService) => {
    let error = Observable.throw(new Error('oops'));
    spyOn(alertService, 'showError').and.callThrough();
    spyOn(uploadService, 'uploadImage').and.returnValue(error);
    page.uploadPicture();
    expect(alertService.showError).toHaveBeenCalled();
  }));

  it('set imageSrc after taking picture', inject([CameraService], (cameraService: CameraService) => {
    let imageSource = '/my/picture.jpg';
    spyOn(cameraService, 'takePicture').and.returnValue(Observable.of(imageSource));
    page.takePicture();
    expect(cameraService.takePicture).toHaveBeenCalled();
    expect(page.imageSrc).toBe(imageSource);
  }));

  it('show error when failing to take picture', inject([CameraService, AlertService], (cameraService: CameraService, alertService: AlertService) => {
    let error = Observable.throw(new Error('oops'));
    spyOn(cameraService, 'takePicture').and.returnValue(error);
    spyOn(alertService, 'showError').and.callThrough();
    page.takePicture();
    expect(cameraService.takePicture).toHaveBeenCalled();
    expect(alertService.showError).toHaveBeenCalled();
  }));
});
