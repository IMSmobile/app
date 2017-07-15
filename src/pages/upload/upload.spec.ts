/* tslint:disable:max-file-line-count */
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { Camera } from '@ionic-native/camera';
import { Transfer } from '@ionic-native/transfer';
import { Storage } from '@ionic/storage';
import { AlertController, App, Config, DomController, Form, GestureController, IonicModule, Keyboard, LoadingController, NavController, NavParams, Platform, PopoverController, ToastController } from 'ionic-angular';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { ImsBackendMock } from '../../mocks/ims-backend-mock';
import { AlertMock, AppMock, ConfigMock, LoadingMock, NavParamsMock, PlatformMock, PopoverControllerMock, StorageMock, ToastMock } from '../../mocks/mocks';
import { AlertService } from '../../providers/alert-service';
import { AuthService } from '../../providers/auth-service';
import { CameraService } from '../../providers/camera-service';
import { ImsService } from '../../providers/ims-service';
import { LoadingService } from '../../providers/loading-service';
import { SettingService } from '../../providers/setting-service';
import { TokenService } from '../../providers/token-service';
import { UploadService } from '../../providers/upload-service';
import { DragEventMock } from './../../mocks/drag-event-mock';
import { Credential } from './../../models/credential';
import { Entry } from './../../models/entry';
import { ImsLoadingError } from './../../models/errors/ims-loading-error';
import { ImsUploadError } from './../../models/errors/ims-upload-error';
import { Image } from './../../models/image';
import { Info } from './../../models/info';
import { MetadataField } from './../../models/metadata-field';
import { BrowserFileuploadSelectorService } from './../../providers/browser-fileupload-selector-service';
import { ContainerUploadService } from './../../providers/container-upload-service';
import { DragEventCounterService } from './../../providers/drag-event-counter-service';
import { DragEventService } from './../../providers/drag-event-service';
import { FieldValidatorService } from './../../providers/field-validator-service';
import { ModelService } from './../../providers/model-service';
import { DoubleValidator } from './../../validators/double-validator';
import { UploadPage } from './upload';

describe('Page: Upload', () => {

  let fixture: ComponentFixture<UploadPage>;
  let page: UploadPage;

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [UploadPage],

      providers: [
        App, DomController, Form, Keyboard, NavController, LoadingController, AlertController, AuthService, ImsService,
        TokenService, UploadService, ImsBackendMock, BaseRequestOptions, CameraService, Camera, LoadingService, AlertService, Transfer, ModelService, GestureController, SettingService,
        FieldValidatorService, ContainerUploadService, BrowserFileuploadSelectorService, DragEventService, DragEventCounterService,
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
          useFactory: (imsBackendMock, options) =>
            new Http(imsBackendMock, options),
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

  it('Show Error after failed upload', inject([UploadService], (uploadService: UploadService) => {
    spyOn(uploadService, 'uploadImage').and.returnValue(Observable.throw('oops'));
    expect(() => page.uploadPicture()).toThrowError(ImsUploadError);
  }));

  it('set imageSrc after taking picture', inject([CameraService, LoadingService], (cameraService: CameraService, loadingService: LoadingService) => {
    const image = new Image('picture.jpg', '/my/picture.jpg');
    spyOn(loadingService, 'subscribeWithLoading').and.callThrough();
    spyOn(cameraService, 'takePicture').and.returnValue(Observable.of(image));
    page.takePicture();
    expect(loadingService.subscribeWithLoading).toHaveBeenCalled();
    expect(cameraService.takePicture).toHaveBeenCalled();
    expect(page.image).toBe(image);
  }));

  it('calls camera error handler when failing to take picture', inject([CameraService], (cameraService: CameraService) => {
    spyOn(cameraService, 'takePicture').and.returnValue(Observable.throw('oops'));
    spyOn(cameraService, 'handleError').and.returnValue(undefined);
    page.takePicture();
    expect(cameraService.takePicture).toHaveBeenCalled();
    expect(cameraService.handleError).toHaveBeenCalled();
  }));

  it('set image after getting image from gallery', inject([CameraService], (cameraService: CameraService) => {
    const image = new Image('picture.jpg', '/my/picture.jpg');
    spyOn(cameraService, 'getGalleryPicture').and.returnValue(Observable.of(image));
    page.getGalleryPicture();
    expect(cameraService.getGalleryPicture).toHaveBeenCalled();
    expect(page.image).toBe(image);
  }));

  it('On browser open file dialog on  after click get picture from gallery', inject([Platform], (platform: Platform) => {
    const element = document.getElementById('fileUpload');
    spyOn(platform, 'is').and.returnValue(true);
    spyOn(element, 'click').and.returnValue(undefined);
    page.getGalleryPicture();
    expect(element.click).toHaveBeenCalledTimes(1);
  }));

  it('calls camera error handler when failing to get image from gallery', inject([CameraService], (cameraService: CameraService) => {
    spyOn(cameraService, 'getGalleryPicture').and.returnValue(Observable.throw('oops'));
    spyOn(cameraService, 'handleError').and.returnValue(undefined);
    page.getGalleryPicture();
    expect(cameraService.getGalleryPicture).toHaveBeenCalled();
    expect(cameraService.handleError).toHaveBeenCalled();
  }));

  it('Update imagename when new file in fileinput is selected', () => {
    const fileName = 'newFile.jpg';
    const fileURI = '/dev/0/';
    const oldImage = new Image('oldvalue', 'oldvalue.jpg');
    const newFile: File = new File([new Blob()], fileName, { type: 'image/jpeg' });
    const newImage = new Image(fileName, fileURI, newFile);
    spyOn(window.URL, 'createObjectURL').and.returnValue(fileURI);
    page.image = oldImage;
    const event = { target: { files: [newFile] } };
    page.fileSelected(event);
    expect(page.image).toEqual(newImage);
  });

  it('Do nothing when no file available in input file dialog', () => {
    const oldImage = new Image('oldvalue', 'oldvalue.jpg');
    page.image = oldImage;
    const event = { target: { files: [] } };
    page.fileSelected(event);
    expect(page.image).toEqual(oldImage);
  });

  it('Show and hide loading when loading parent image reference field', inject([ImsBackendMock, AuthService, LoadingService, SettingService], (imsBackendMock: ImsBackendMock, authService: AuthService, loadingService: LoadingService, settingService: SettingService) => {
    spyOn(loadingService, 'subscribeWithLoading').and.callThrough();
    const testInfo: Info = { version: '9000' };
    authService.setCurrentCredential(testInfo, imsBackendMock.credential);
    authService.setArchive(imsBackendMock.policeFilter);
    page.loadParentImageReferenceField();
    expect(page.parentImageReferenceField).toEqual(imsBackendMock.modelFieldParentreferenceName);
    expect(loadingService.subscribeWithLoading).toHaveBeenCalled();
  }));

  it('Show and hide loading when loading configured metadata fields', inject([ImsBackendMock, AuthService, LoadingService, SettingService], (imsBackendMock: ImsBackendMock, authService: AuthService, loadingService: LoadingService, settingService: SettingService) => {
    spyOn(loadingService, 'subscribeWithLoading').and.callThrough();
    spyOn(settingService, 'getFieldState').and.returnValue(Observable.of(true));
    const testInfo: Info = { version: '9000' };
    authService.setCurrentCredential(testInfo, imsBackendMock.credential);
    authService.setArchive(imsBackendMock.policeFilter);
    page.loadUploadFields();
    expect(page.fields.length).toBeGreaterThan(0);
    expect(loadingService.subscribeWithLoading).toHaveBeenCalled();
  }));

  it('Show and hide loading with error thrown when failed to load parent image reference field', inject([ImsBackendMock, AuthService, LoadingService, ModelService, SettingService], (imsBackendMock: ImsBackendMock, authService: AuthService, loadingService: LoadingService, modelService: ModelService, settingService: SettingService) => {
    spyOn(loadingService, 'subscribeWithLoading').and.callThrough();
    spyOn(modelService, 'getMetadataFieldsOfImageTable').and.returnValue(Observable.throw('oops'));
    expect(() => page.loadParentImageReferenceField()).toThrowError(ImsLoadingError);
    expect(loadingService.subscribeWithLoading).toHaveBeenCalled();
  }));

  it('Show and hide loading with error thrown when failed to load metadata fields', inject([ImsBackendMock, AuthService, LoadingService, ModelService, SettingService], (imsBackendMock: ImsBackendMock, authService: AuthService, loadingService: LoadingService, modelService: ModelService, settingService: SettingService) => {
    spyOn(loadingService, 'subscribeWithLoading').and.callThrough();
    spyOn(modelService, 'getMetadataFieldsOfImageTable').and.returnValue(Observable.throw('oops'));
    spyOn(settingService, 'getFieldState').and.returnValue(Observable.of(true));
    expect(() => page.loadUploadFields()).toThrowError(ImsLoadingError);
    expect(loadingService.subscribeWithLoading).toHaveBeenCalled();
  }));

  it('Show and hide loading with error thrown when failing to load saved metadata fields', inject([ImsBackendMock, AuthService, LoadingService, ModelService, SettingService], (imsBackendMock: ImsBackendMock, authService: AuthService, loadingService: LoadingService, modelService: ModelService, settingService: SettingService) => {
    spyOn(loadingService, 'subscribeWithLoading').and.callThrough();
    spyOn(modelService, 'getMetadataFieldsOfImageTable').and.returnValue(Observable.of(true));
    spyOn(settingService, 'getFieldState').and.returnValue(Observable.throw('oops'));
    expect(() => page.loadUploadFields()).toThrowError(ImsLoadingError);
    expect(loadingService.subscribeWithLoading).toHaveBeenCalled();
  }));

  it('Check if parent reference is not included', inject([ImsBackendMock, AuthService, SettingService], (imsBackendMock: ImsBackendMock, authService: AuthService, settingService: SettingService) => {
    const testInfo: Info = { version: '9000' };
    spyOn(settingService, 'getFieldState').and.returnValue(Observable.of(false));
    authService.setCurrentCredential(testInfo, imsBackendMock.credential);
    authService.setArchive(imsBackendMock.policeFilter);
    page.ionViewDidLoad();
    expect(page.fields).not.toContain(imsBackendMock.modelFieldParentreference);
  }));

  it('Additional not mandatory fields', inject([ImsBackendMock, AuthService, SettingService, Storage], (imsBackendMock: ImsBackendMock, authService: AuthService, settingService: SettingService, storage: Storage) => {
    spyOn(settingService, 'getFieldState').and.returnValue(Observable.of(true));
    const testInfo: Info = { version: '9000' };
    authService.setCurrentCredential(testInfo, imsBackendMock.credential);
    authService.setArchive(imsBackendMock.policeFilter);
    page.ionViewDidLoad();
    expect(page.fields).toContain(imsBackendMock.modelFieldOptionalString);
  }));

  it('Do not add additional not mandatory fields when not configured', inject([ImsBackendMock, AuthService, SettingService, Storage], (imsBackendMock: ImsBackendMock, authService: AuthService, settingService: SettingService, storage: Storage) => {
    spyOn(settingService, 'getFieldState').and.returnValue(Observable.of(false));
    const testInfo: Info = { version: '9000' };
    authService.setCurrentCredential(testInfo, imsBackendMock.credential);
    authService.setArchive(imsBackendMock.policeFilter);
    page.ionViewDidLoad();
    expect(page.fields).not.toContain(imsBackendMock.modelFieldOptionalString);
  }));

  it('should upload non empty fields metadata fields', inject([UploadService, ImsBackendMock, AuthService], (uploadService: UploadService, imsBackendMock: ImsBackendMock, authService: AuthService) => {
    spyOn(uploadService, 'uploadImage').and.returnValue(Observable.of(new Response(new ResponseOptions())));
    const testInfo: Info = { version: '9000' };
    const testCredentials: Credential = new Credential('https://test', 'testuser', 'testpass', 'testsegment');
    authService.setCurrentCredential(testInfo, testCredentials);
    authService.setArchive(imsBackendMock.policeFilter);
    page.fields.push(imsBackendMock.modelFieldOptionalString);
    const formData = {};
    formData[imsBackendMock.modelFieldOptionalString.name] = ['value'];
    page.fieldsForm = page.formBuilder.group(formData);
    page.parentImageReferenceField = imsBackendMock.modelFieldParentreferenceName;
    page.image = new Image('picture.jpg', '/my/picture.jpg');
    page.uploadPicture();
    let entry = new Entry();
    entry = entry.set(imsBackendMock.modelFieldParentreferenceName, 'default');
    entry = entry.set(imsBackendMock.modelFieldOptionalString.name, 'value');
    expect(uploadService.uploadImage).toHaveBeenCalledWith(testCredentials, Number(imsBackendMock.policeFilter.id), entry, page.image);
  }));

  it('should not upload empty fields metadata fields', inject([UploadService, ImsBackendMock, AuthService], (uploadService: UploadService, imsBackendMock: ImsBackendMock, authService: AuthService) => {
    spyOn(uploadService, 'uploadImage').and.returnValue(Observable.of(new Response(new ResponseOptions())));
    const testInfo: Info = { version: '9000' };
    const testCredentials: Credential = new Credential('https://test', 'testuser', 'testpass', 'testsegment');
    authService.setCurrentCredential(testInfo, testCredentials);
    authService.setArchive(imsBackendMock.policeFilter);
    page.fields.push(imsBackendMock.modelFieldOptionalString);
    const formData = {};
    formData[imsBackendMock.modelFieldOptionalString.name] = [''];
    page.fieldsForm = page.formBuilder.group(formData);
    page.parentImageReferenceField = imsBackendMock.modelFieldParentreferenceName;
    page.image = new Image('picture.jpg', '/my/picture.jpg');
    page.uploadPicture();
    let entry = new Entry();
    entry = entry.set(imsBackendMock.modelFieldParentreferenceName, 'default');
    expect(uploadService.uploadImage).toHaveBeenCalledWith(testCredentials, Number(imsBackendMock.policeFilter.id), entry, page.image);
  }));

  it('should initialize parent image reference field', inject([ImsBackendMock, AuthService, LoadingService], (imsBackendMock: ImsBackendMock, authService: AuthService, loadingService: LoadingService) => {
    const testInfo: Info = { version: '9000' };
    authService.setCurrentCredential(testInfo, imsBackendMock.credential);
    authService.setArchive(imsBackendMock.policeFilter);
    page.loadParentImageReferenceField();
    expect(page.parentImageReferenceField).toEqual(imsBackendMock.modelFieldParentreferenceName);
  }));

  it('should call field validator service in case of an error', inject([FieldValidatorService], (fieldValidatorService: FieldValidatorService) => {
    spyOn(fieldValidatorService, 'getErrorMessage').and.callThrough();
    const control = new FormControl('12a', DoubleValidator.isValid);
    page.getErrorMessage(control);
    expect(fieldValidatorService.getErrorMessage).toHaveBeenCalledWith(control);
  }));

  it('Should update image after receiving dropped image', inject([BrowserFileuploadSelectorService], (browserFileuploadSelectorService: BrowserFileuploadSelectorService) => {
    const event: DragEvent = new DragEventMock('drop');
    const droppedImage = new Image('picture.jpg', '/my/picture.jpg');
    spyOn(browserFileuploadSelectorService, 'getImageFromFileDrop').and.returnValue(droppedImage);
    page.receiveDrop(event);
    expect(page.image).toEqual(droppedImage);
  }));

  it('Should keep image after receiving drop without image', inject([BrowserFileuploadSelectorService], (browserFileuploadSelectorService: BrowserFileuploadSelectorService) => {
    const event: DragEvent = new DragEventMock('drop');
    const oldImage = new Image('picture.jpg', '/my/picture.jpg');
    page.image = oldImage;
    spyOn(browserFileuploadSelectorService, 'getImageFromFileDrop').and.returnValue(undefined);
    page.receiveDrop(event);
    expect(page.image).toEqual(oldImage);
  }));

  it('Should deactivate dragOverlay after dragenter and dragleave event', inject([DragEventService], (dragEventService: DragEventService) => {
    const element = document.createElement('div');
    element.id = 'a1';
    const eventEnter = new DragEventMock('dragenter', element);
    const eventLeave = new DragEventMock('dragleave', element);
    page.handleDragEvent(eventEnter);
    page.handleDragEvent(eventEnter);
    expect(page.showDragOverlay).toBeTruthy();
    page.handleDragEvent(eventLeave);
    page.handleDragEvent(eventLeave);
    expect(page.showDragOverlay).toBeFalsy();
  }));

  it('Should activate dragOverlay on dragenter event', inject([DragEventService], (dragEventService: DragEventService) => {
    const event = new DragEventMock('dragenter');
    page.handleDragEvent(event);
    expect(page.showDragOverlay).toBeTruthy();
  }));

  it('Initialize BOOLEAN field type as false', () => {
    const fieldLength: number = 10;
    page.fields = [new MetadataField('booleanField', 'BOOLEAN', false, false, true, true, fieldLength)];
    page.initFormData();
    expect(page.fieldsForm.controls.booleanField.value).toEqual('false');
  });

  it('Initialize Text field type as empty string', () => {
    const fieldLength: number = 10;
    page.fields = [new MetadataField('textField', 'TEXT', false, false, true, true, fieldLength)];
    page.initFormData();
    expect(page.fieldsForm.controls.textField.value).toEqual('');
  });
});
