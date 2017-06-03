import { Credential } from './../../models/credential';
import { DoubleValidator } from './../../validators/double-validator';
import { FieldValidatorService } from './../../providers/field-validator-service';
import { Entry } from './../../models/entry';
import { Image } from './../../models/image';
import { ModelService } from './../../providers/model-service';
import { Info } from './../../models/info';
import { TestBed, inject, async, ComponentFixture } from '@angular/core/testing';
import { UploadPage } from './upload';
import { App, Config, Form, IonicModule, Keyboard, DomController, LoadingController, NavController, Platform, NavParams, AlertController, ToastController, PopoverController, GestureController } from 'ionic-angular';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AuthService } from '../../providers/auth-service';
import { ImsService } from '../../providers/ims-service';
import { ConfigMock, PlatformMock, NavParamsMock, ToastMock, AppMock, AlertMock, LoadingMock, PopoverControllerMock, StorageMock } from '../../mocks/mocks';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { ImsBackendMock } from '../../mocks/ims-backend-mock';
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
        TokenService, UploadService, ImsBackendMock, BaseRequestOptions, CameraService, Camera, LoadingService, AlertService, Transfer, ModelService, GestureController, SettingService,
        FieldValidatorService,
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
          useFactory: (ImsBackendMock, options) => {
            return new Http(ImsBackendMock, options);
          },
          deps: [ImsBackendMock, BaseRequestOptions]
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

  it('set imageSrc after taking picture', inject([CameraService, LoadingService], (cameraService: CameraService, loadingService: LoadingService) => {
    let imageSource = '/my/picture.jpg';
    spyOn(loadingService, 'subscribeWithLoading').and.callThrough();
    spyOn(cameraService, 'takePicture').and.returnValue(Observable.of(imageSource));
    page.takePicture();
    expect(loadingService.subscribeWithLoading).toHaveBeenCalled();
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

  it('set imageSrc after getting image from gallery', inject([CameraService], (cameraService: CameraService) => {
    let imageSource = '/my/picture.jpg';
    spyOn(cameraService, 'getGalleryPicture').and.returnValue(Observable.of(imageSource));
    page.getGalleryPicture();
    expect(cameraService.getGalleryPicture).toHaveBeenCalled();
    expect(page.imageSrc).toBe(imageSource);
  }));

  it('show error when failing to get image from gallery', inject([CameraService, AlertService], (cameraService: CameraService, alertService: AlertService) => {
    let error = Observable.throw(new Error('oops'));
    spyOn(cameraService, 'getGalleryPicture').and.returnValue(error);
    spyOn(alertService, 'showError').and.callThrough();
    page.getGalleryPicture();
    expect(cameraService.getGalleryPicture).toHaveBeenCalled();
    expect(alertService.showError).toHaveBeenCalled();
  }));

  it('Show and hide loading when successful', inject([ImsBackendMock, AuthService, LoadingService, SettingService], (imsBackendMock: ImsBackendMock, authService: AuthService, loadingService: LoadingService, settingService: SettingService) => {
    spyOn(loadingService, 'showLoading').and.callThrough();
    spyOn(loadingService, 'hideLoading').and.callThrough();
    spyOn(settingService, 'getFieldState').and.returnValue(Observable.of(true));
    let testInfo: Info = { version: '9000' };
    authService.setCurrentCredential(testInfo, imsBackendMock.credential);
    authService.setArchive(imsBackendMock.policeFilter);
    page.ionViewDidLoad();
    expect(page.fields.length).toBeGreaterThan(0);
    expect(loadingService.showLoading).toHaveBeenCalled();
    expect(loadingService.hideLoading).toHaveBeenCalled();
  }));

  it('Show and hide loading with alert on error', inject([ImsBackendMock, AuthService, LoadingService, ModelService, AlertService, SettingService], (imsBackendMock: ImsBackendMock, authService: AuthService, loadingService: LoadingService, modelService: ModelService, alertService: AlertService, settingService: SettingService) => {
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


  it('Check if parent reference is not included', inject([ImsBackendMock, AuthService, SettingService], (imsBackendMock: ImsBackendMock, authService: AuthService, settingService: SettingService) => {
    let testInfo: Info = { version: '9000' };
    spyOn(settingService, 'getFieldState').and.returnValue(Observable.of(false));
    authService.setCurrentCredential(testInfo, imsBackendMock.credential);
    authService.setArchive(imsBackendMock.policeFilter);
    page.ionViewDidLoad();
    expect(page.fields).not.toContain(imsBackendMock.modelFieldParentreference);
  }));

  it('Additional not mandatory fields', inject([ImsBackendMock, AuthService, SettingService, Storage], (imsBackendMock: ImsBackendMock, authService: AuthService, settingService: SettingService, storage: Storage) => {
    spyOn(settingService, 'getFieldState').and.returnValue(Observable.of(true));
    let testInfo: Info = { version: '9000' };
    authService.setCurrentCredential(testInfo, imsBackendMock.credential);
    authService.setArchive(imsBackendMock.policeFilter);
    page.ionViewDidLoad();
    expect(page.fields).toContain(imsBackendMock.modelFieldOptionalString);
  }));

  it('Do not add additional not mandatory fields when not configured', inject([ImsBackendMock, AuthService, SettingService, Storage], (imsBackendMock: ImsBackendMock, authService: AuthService, settingService: SettingService, storage: Storage) => {
    spyOn(settingService, 'getFieldState').and.returnValue(Observable.of(false));
    let testInfo: Info = { version: '9000' };
    authService.setCurrentCredential(testInfo, imsBackendMock.credential);
    authService.setArchive(imsBackendMock.policeFilter);
    page.ionViewDidLoad();
    expect(page.fields).not.toContain(imsBackendMock.modelFieldOptionalString);
  }));

  it('should upload non empty fields metadata fields', inject([UploadService, ImsBackendMock, AuthService], (uploadService: UploadService, imsBackendMock: ImsBackendMock, authService: AuthService) => {
    spyOn(uploadService, 'uploadImage').and.returnValue(Observable.of(new Response(new ResponseOptions())));
    let testInfo: Info = { version: '9000' };
    let testCredentials: Credential = new Credential('https://test', 'testuser', 'testpass', 'testsegment');
    authService.setCurrentCredential(testInfo, testCredentials);
    authService.setArchive(imsBackendMock.policeFilter);
    page.fields.push(imsBackendMock.modelFieldOptionalString);
    let formData = {};
    formData[imsBackendMock.modelFieldOptionalString.name] = ['value'];
    page.fieldsForm = page.formBuilder.group(formData);
    page.parentImageReferenceField = imsBackendMock.modelFieldParentreferenceName;
    page.uploadPicture();
    let entry = new Entry();
    entry = entry.set(imsBackendMock.modelFieldParentreferenceName, 'default');
    entry = entry.set(imsBackendMock.modelFieldOptionalString.name, 'value');
    expect(uploadService.uploadImage).toHaveBeenCalledWith(testCredentials, Number(imsBackendMock.policeFilter.id), entry, jasmine.any(Image));
  }));

  it('should not upload empty fields metadata fields', inject([UploadService, ImsBackendMock, AuthService], (uploadService: UploadService, imsBackendMock: ImsBackendMock, authService: AuthService) => {
    spyOn(uploadService, 'uploadImage').and.returnValue(Observable.of(new Response(new ResponseOptions())));
    let testInfo: Info = { version: '9000' };
    let testCredentials: Credential = new Credential('https://test', 'testuser', 'testpass', 'testsegment');
    authService.setCurrentCredential(testInfo, testCredentials);
    authService.setArchive(imsBackendMock.policeFilter);
    page.fields.push(imsBackendMock.modelFieldOptionalString);
    let formData = {};
    formData[imsBackendMock.modelFieldOptionalString.name] = [''];
    page.fieldsForm = page.formBuilder.group(formData);
    page.parentImageReferenceField = imsBackendMock.modelFieldParentreferenceName;
    page.uploadPicture();
    let entry = new Entry();
    entry = entry.set(imsBackendMock.modelFieldParentreferenceName, 'default');
    expect(uploadService.uploadImage).toHaveBeenCalledWith(testCredentials, Number(imsBackendMock.policeFilter.id), entry, jasmine.any(Image));
  }));

  it('should initialize parent image reference field', inject([ImsBackendMock, AuthService, LoadingService], (imsBackendMock: ImsBackendMock, authService: AuthService, loadingService: LoadingService) => {
    let testInfo: Info = { version: '9000' };
    authService.setCurrentCredential(testInfo, imsBackendMock.credential);
    authService.setArchive(imsBackendMock.policeFilter);
    page.loadParentImageReferenceField();
    expect(page.parentImageReferenceField).toEqual(imsBackendMock.modelFieldParentreferenceName);
  }));

  it('should call field validator service in case of an error', inject([FieldValidatorService], (fieldValidatorService: FieldValidatorService) => {
    spyOn(fieldValidatorService, 'getErrorMessage').and.callThrough();
    let control = new FormControl('12a', DoubleValidator.isValid);
    page.getErrorMessage(control);
    expect(fieldValidatorService.getErrorMessage).toHaveBeenCalledWith(control);
  }));

});
