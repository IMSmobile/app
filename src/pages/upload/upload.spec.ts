import { Entry } from './../../models/entry';
import { Image } from './../../models/image';
import { Credential } from './../../models/credential';
import { ModelService } from './../../providers/model-service';
import { Info } from './../../models/info';
import { TestBed, inject, async, ComponentFixture } from '@angular/core/testing';
import { UploadPage } from './upload';
import { App, Config, Form, IonicModule, Keyboard, DomController, LoadingController, NavController, Platform, NavParams, AlertController, ToastController, PopoverController, GestureController } from 'ionic-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../providers/auth-service';
import { ImsService } from '../../providers/ims-service';
import { ConfigMock, PlatformMock, NavParamsMock, ToastMock, AppMock, AlertMock, LoadingMock, PopoverControllerMock, StorageMock } from '../../mocks/mocks';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { MockImsBackend } from '../../mocks/mock-ims-backend';
import { UploadService } from '../../providers/upload-service';
import { TokenService } from '../../providers/token-service';
import { CameraService } from '../../providers/camera-service';
import { LoadingService } from '../../providers/loading-service';
import { Camera } from '@ionic-native/camera';
import { AlertService } from '../../providers/alert-service';
import { Observable } from 'rxjs/Observable';
import { Transfer } from '@ionic-native/transfer';
import { SettingService } from '../../providers/setting-service';
import 'rxjs/add/observable/throw';


describe('Page: Upload', () => {

  let fixture: ComponentFixture<UploadPage> = null;
  let page: UploadPage = null;

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [UploadPage],

      providers: [
        App, DomController, Form, Keyboard, NavController, LoadingController, AlertController, AuthService, ImsService,
        TokenService, UploadService, MockImsBackend, BaseRequestOptions, CameraService, Camera, LoadingService, AlertService, Transfer, ModelService, GestureController, SettingService,
        { provide: App, useClass: AppMock },
        { provide: AlertController, useClass: AlertMock },
        { provide: Config, useClass: ConfigMock },
        { provide: Platform, useClass: PlatformMock },
        { provide: NavParams, useClass: NavParamsMock },
        { provide: ToastController, useClass: ToastMock },
        { provide: LoadingController, useClass: LoadingMock },
        { provide: PopoverController, useClass: PopoverControllerMock },
        { provide: Storage, useClass: StorageMock },
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

  it('Show and hide loading when successful', inject([MockImsBackend, AuthService, LoadingService, SettingService], (mockImsBackend: MockImsBackend, authService: AuthService, loadingService: LoadingService, settingService: SettingService) => {
    spyOn(loadingService, 'showLoading').and.callThrough();
    spyOn(loadingService, 'hideLoading').and.callThrough();
    spyOn(settingService, 'getFieldState').and.returnValue(Observable.of(true));
    let testInfo: Info = { version: '9000' };
    authService.setCurrentCredential(testInfo, mockImsBackend.credential);
    page.ionViewDidLoad();
    expect(page.fields.length).toBeGreaterThan(0);
    expect(loadingService.showLoading).toHaveBeenCalled();
    expect(loadingService.hideLoading).toHaveBeenCalled();
  }));

  it('Show and hide loading with alert on error', inject([MockImsBackend, AuthService, LoadingService, ModelService, AlertService, SettingService], (mockImsBackend: MockImsBackend, authService: AuthService, loadingService: LoadingService, modelService: ModelService, alertService: AlertService, settingService: SettingService) => {
    let error = Observable.throw(new Error('oops'));
    spyOn(loadingService, 'showLoading').and.callThrough();
    spyOn(loadingService, 'hideLoading').and.callThrough();
    spyOn(alertService, 'showError').and.callThrough();
    spyOn(modelService, 'getMetadataFieldsOfImageTable').and.returnValue(error);
    spyOn(settingService, 'getFieldState').and.returnValue(Observable.of(true));
    page.ionViewDidLoad();
    expect(loadingService.showLoading).toHaveBeenCalled();
    expect(loadingService.hideLoading).toHaveBeenCalled();
    expect(alertService.showError).toHaveBeenCalled();
  }));


  it('Check if parent reference is not included', inject([MockImsBackend, AuthService, SettingService], (mockImsBackend: MockImsBackend, authService: AuthService, settingService: SettingService) => {
    let testInfo: Info = { version: '9000' };
    spyOn(settingService, 'getFieldState').and.returnValue(Observable.of(false));
    authService.setCurrentCredential(testInfo, mockImsBackend.credential);
    page.ionViewDidLoad();
    expect(page.fields).not.toContain(mockImsBackend.modelFieldParentreference);
  }));

  it('Additional not mandatory fields', inject([MockImsBackend, AuthService, SettingService, Storage], (mockImsBackend: MockImsBackend, authService: AuthService, settingService: SettingService, storage: Storage) => {
    spyOn(settingService, 'getFieldState').and.returnValue(Observable.of(true));
    let testInfo: Info = { version: '9000' };
    authService.setCurrentCredential(testInfo, mockImsBackend.credential);
    page.ionViewDidLoad();
    expect(page.fields).toContain(mockImsBackend.modelFieldOptionalString);
  }));

  it('Do not add additional not mandatory fields when not configured', inject([MockImsBackend, AuthService, SettingService, Storage], (mockImsBackend: MockImsBackend, authService: AuthService, settingService: SettingService, storage: Storage) => {
    spyOn(settingService, 'getFieldState').and.returnValue(Observable.of(false));
    let testInfo: Info = { version: '9000' };
    authService.setCurrentCredential(testInfo, mockImsBackend.credential);
    page.ionViewDidLoad();
    expect(page.fields).not.toContain(mockImsBackend.modelFieldOptionalString);
  }));

  it('should upload non empty fields metadata fields', inject([UploadService, MockImsBackend], (uploadService: UploadService, mockImsBackend: MockImsBackend) => {
    spyOn(uploadService, 'uploadImage').and.returnValue(Observable.of(new Response(new ResponseOptions())));
    page.fields.push(mockImsBackend.modelFieldOptionalString);
    let formData = {};
    formData[mockImsBackend.modelFieldOptionalString.name] = ['value'];
    page.fieldsForm = page.formBuilder.group(formData);
    page.uploadPicture();
    let entry = new Entry();
    entry = entry.set('IDFall', 'default');
    entry = entry.set(mockImsBackend.modelFieldOptionalString.name, 'value');
    expect(uploadService.uploadImage).toHaveBeenCalledWith(undefined, 40, entry, jasmine.any(Image));
  }));

  it('should not upload empty fields metadata fields', inject([UploadService, MockImsBackend], (uploadService: UploadService, mockImsBackend: MockImsBackend) => {
    spyOn(uploadService, 'uploadImage').and.returnValue(Observable.of(new Response(new ResponseOptions())));
    page.fields.push(mockImsBackend.modelFieldOptionalString);
    let formData = {};
    formData[mockImsBackend.modelFieldOptionalString.name] = [''];
    page.fieldsForm = page.formBuilder.group(formData);
    page.uploadPicture();
    let entry = new Entry();
    entry = entry.set('IDFall', 'default');
    expect(uploadService.uploadImage).toHaveBeenCalledWith(undefined, 40, entry, jasmine.any(Image));
  }));

});
