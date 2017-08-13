/* tslint:disable:max-file-line-count */
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { Camera } from '@ionic-native/camera';
import { Transfer } from '@ionic-native/transfer';
import { Storage } from '@ionic/storage';
import { AlertController, App, Config, DomController, Events, Form, GestureController, IonicModule, Keyboard, LoadingController, NavController, NavParams, Platform, PopoverController, ToastController } from 'ionic-angular';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { AlertMock, AppMock, ConfigMock, LoadingMock, NavParamsMock, PlatformMock, PopoverControllerMock, StorageMock, ToastMock } from '../../mocks/mocks';
import { AlertService } from '../../providers/alert-service';
import { CameraService } from '../../providers/camera-service';
import { ImsService } from '../../providers/ims-service';
import { LoadingService } from '../../providers/loading-service';
import { SettingService } from '../../providers/setting-service';
import { TokenService } from '../../providers/token-service';
import { UploadService } from '../../providers/upload-service';
import { DragEventMock } from './../../mocks/drag-event-mock';
import { ImsBackendMock } from './../../mocks/ims-backend-mock';
import { Entry } from './../../models/entry';
import { ImsLoadingError } from './../../models/errors/ims-loading-error';
import { ImsUploadError } from './../../models/errors/ims-upload-error';
import { Image } from './../../models/image';
import { Keyword } from './../../models/keyword';
import { MetadataField } from './../../models/metadata-field';
import { AuthService } from './../../providers/auth-service';
import { BrowserFileuploadSelectorService } from './../../providers/browser-fileupload-selector-service';
import { ContainerUploadService } from './../../providers/container-upload-service';
import { DragEventCounterService } from './../../providers/drag-event-counter-service';
import { DragEventService } from './../../providers/drag-event-service';
import { FieldValidatorService } from './../../providers/field-validator-service';
import { KeywordService } from './../../providers/keyword-service';
import { ModelService } from './../../providers/model-service';
import { DoubleValidator } from './../../validators/double-validator';
import { KeywordsPage } from './../keywords/keywords';
import { UploadPage } from './upload';

describe('Page: Upload', () => {

  let fixture: ComponentFixture<UploadPage>;
  let page: UploadPage;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadPage],
      providers: [
        App, DomController, Form, Keyboard, NavController, LoadingController, AlertController, ImsService, AuthService,
        TokenService, UploadService, ImsBackendMock, BaseRequestOptions, CameraService, Camera, LoadingService, AlertService, Transfer, ModelService, GestureController, SettingService,
        FieldValidatorService, ContainerUploadService, BrowserFileuploadSelectorService, DragEventService, DragEventCounterService, Events, KeywordService,
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
    });

    fixture = TestBed.createComponent(UploadPage);
    page = fixture.componentInstance;
    page.images = [];
    fixture.detectChanges();
  });

  beforeEach(inject([AuthService, ImsBackendMock], (authService: AuthService, imsBackendMock: ImsBackendMock) => {
    authService.setCurrentCredential(imsBackendMock.credential);
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
    spyOn(uploadService, 'uploadImages').and.returnValue(Observable.throw('oops'));
    expect(() => page.uploadPicture()).toThrowError(ImsUploadError);
  }));

  it('set imageSrc after taking picture', inject([CameraService, LoadingService], (cameraService: CameraService, loadingService: LoadingService) => {
    const image = new Image('picture.jpg', '/my/picture.jpg');
    spyOn(loadingService, 'subscribeWithLoading').and.callThrough();
    spyOn(cameraService, 'takePicture').and.returnValue(Observable.of(image));
    page.takePicture();
    expect(loadingService.subscribeWithLoading).toHaveBeenCalled();
    expect(cameraService.takePicture).toHaveBeenCalled();
    expect(page.images).toEqual([image]);
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
    expect(page.images).toEqual([image]);
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
    page.images = [oldImage];
    const event = { target: { files: [newFile] } };
    page.fileSelected(event);
    expect(page.images).toEqual([newImage]);
  });

  it('Do nothing when no file available in input file dialog', () => {
    const oldImages = [new Image('oldvalue', 'oldvalue.jpg')];
    page.images = oldImages;
    const event = { target: { files: [] } };
    page.fileSelected(event);
    expect(page.images).toEqual(oldImages);
  });

  it('Show and hide loading when loading parent image reference field', inject([ImsBackendMock, AuthService, LoadingService, SettingService], (imsBackendMock: ImsBackendMock, authService: AuthService, loadingService: LoadingService, settingService: SettingService) => {
    spyOn(loadingService, 'subscribeWithLoading').and.callThrough();
    authService.setArchive(imsBackendMock.policeFilter);
    page.loadParentImageReferenceField();
    expect(page.parentImageReferenceField).toEqual(imsBackendMock.modelFieldParentreferenceName);
    expect(loadingService.subscribeWithLoading).toHaveBeenCalled();
  }));

  it('Show and hide loading when loading configured metadata fields', inject([ImsBackendMock, AuthService, LoadingService, SettingService], (imsBackendMock: ImsBackendMock, authService: AuthService, loadingService: LoadingService, settingService: SettingService) => {
    spyOn(loadingService, 'subscribeWithLoading').and.callThrough();
    spyOn(settingService, 'getFieldState').and.returnValue(Observable.of(true));
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
    spyOn(settingService, 'getFieldState').and.returnValue(Observable.of(false));
    authService.setArchive(imsBackendMock.policeFilter);
    page.ionViewDidLoad();
    expect(page.fields).not.toContain(imsBackendMock.modelFieldParentreference);
  }));

  it('Additional not mandatory fields', inject([ImsBackendMock, AuthService, SettingService, Storage], (imsBackendMock: ImsBackendMock, authService: AuthService, settingService: SettingService, storage: Storage) => {
    spyOn(settingService, 'getFieldState').and.returnValue(Observable.of(true));
    authService.setArchive(imsBackendMock.policeFilter);
    page.ionViewDidLoad();
    expect(page.fields).toContain(imsBackendMock.modelFieldOptionalString);
  }));

  it('Do not add additional not mandatory fields when not configured', inject([ImsBackendMock, AuthService, SettingService, Storage], (imsBackendMock: ImsBackendMock, authService: AuthService, settingService: SettingService, storage: Storage) => {
    spyOn(settingService, 'getFieldState').and.returnValue(Observable.of(false));
    authService.setArchive(imsBackendMock.policeFilter);
    page.ionViewDidLoad();
    expect(page.fields).not.toContain(imsBackendMock.modelFieldOptionalString);
  }));

  it('should upload non empty fields metadata fields', inject([UploadService, ImsBackendMock, AuthService], (uploadService: UploadService, imsBackendMock: ImsBackendMock, authService: AuthService) => {
    spyOn(uploadService, 'uploadImages').and.returnValue(Observable.of(new Response(new ResponseOptions())));
    authService.setArchive(imsBackendMock.policeFilter);
    page.fields.push(imsBackendMock.modelFieldOptionalString);
    const formData = {};
    formData[imsBackendMock.modelFieldOptionalString.name] = ['value'];
    page.fieldsForm = page.formBuilder.group(formData);
    page.parentImageReferenceField = imsBackendMock.modelFieldParentreferenceName;
    page.images = [new Image('picture.jpg', '/my/picture.jpg')];
    page.uploadPicture();
    let entry = new Entry();
    entry = entry.set(imsBackendMock.modelFieldParentreferenceName, 'default');
    entry = entry.set(imsBackendMock.modelFieldOptionalString.name, 'value');
    expect(uploadService.uploadImages).toHaveBeenCalledWith(Number(imsBackendMock.policeFilter.id), entry, page.images);
  }));

  it('should not upload empty fields metadata fields', inject([UploadService, ImsBackendMock, AuthService], (uploadService: UploadService, imsBackendMock: ImsBackendMock, authService: AuthService) => {
    spyOn(uploadService, 'uploadImages').and.returnValue(Observable.of(new Response(new ResponseOptions())));
    authService.setArchive(imsBackendMock.policeFilter);
    page.fields.push(imsBackendMock.modelFieldOptionalString);
    const formData = {};
    formData[imsBackendMock.modelFieldOptionalString.name] = [''];
    page.fieldsForm = page.formBuilder.group(formData);
    page.parentImageReferenceField = imsBackendMock.modelFieldParentreferenceName;
    page.images = [new Image('picture.jpg', '/my/picture.jpg')];
    page.uploadPicture();
    let entry = new Entry();
    entry = entry.set(imsBackendMock.modelFieldParentreferenceName, 'default');
    expect(uploadService.uploadImages).toHaveBeenCalledWith(Number(imsBackendMock.policeFilter.id), entry, page.images);
  }));

  it('should initialize parent image reference field', inject([ImsBackendMock, AuthService, LoadingService], (imsBackendMock: ImsBackendMock, authService: AuthService, loadingService: LoadingService) => {
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
    const droppedImages = [new Image('picture.jpg', '/my/picture.jpg')];
    spyOn(browserFileuploadSelectorService, 'getImagesFromFileDrop').and.returnValue(droppedImages);
    page.receiveDrop(event);
    expect(page.images).toEqual(droppedImages);
  }));

  it('Should keep image after receiving drop without image', inject([BrowserFileuploadSelectorService], (browserFileuploadSelectorService: BrowserFileuploadSelectorService) => {
    const event: DragEvent = new DragEventMock('drop');
    const oldImages = [new Image('picture.jpg', '/my/picture.jpg')];
    page.images = oldImages;
    spyOn(browserFileuploadSelectorService, 'getImagesFromFileDrop').and.returnValue([]);
    page.receiveDrop(event);
    expect(page.images).toEqual(oldImages);
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

  it('Fill field with keyword', () => {
    const fieldLength: number = 15;
    const testKeyword: Keyword = new Keyword('TestKeyword');
    page.fields = [new MetadataField('keywordField', 'TEXT', false, false, true, true, fieldLength, 'ExampleKeywordCatalog')];
    page.initFormData();
    page.fillFormWithKeyword(page.fields[0], testKeyword);
    expect(page.fieldsForm.controls.keywordField.value).toEqual(testKeyword.keyword);
  });

  it('Show no keywordsuggestion, if no keyword catalog link is available', inject([KeywordService], (keywordService: KeywordService) => {
    const fieldLength: number = 15;
    page.fields = [new MetadataField('noKeywordField', 'TEXT', false, false, true, true, fieldLength)];
    spyOn(keywordService, 'getKeywordCatalog').and.callThrough();
    page.initFormData();
    page.showSuggestionIfAvailable(page.fields[0]);
    expect(keywordService.getKeywordCatalog).toHaveBeenCalledTimes(0);
  }));

  it('Throw error when keyword catalog is not found', inject([KeywordService], (keywordService: KeywordService) => {
    const fieldLength: number = 15;
    page.fields = [new MetadataField('KeywordField', 'TEXT', false, false, true, true, fieldLength, 'ExampleKeywordCatalog')];
    spyOn(keywordService, 'getKeywordCatalog').and.returnValue(Observable.throw('oops'));
    page.initFormData();
    expect(() => page.showSuggestionIfAvailable(page.fields[0])).toThrowError(ImsLoadingError);
  }));

  it('Show keywordsuggestion, if keyword catalog is available', inject([KeywordService, ImsBackendMock, NavController], (keywordService: KeywordService, imsBackendMock: ImsBackendMock, navCtrl: NavController) => {
    page.fields = [imsBackendMock.modelFieldOptionalString];
    spyOn(keywordService, 'getKeywordCatalog').and.callThrough();
    spyOn(navCtrl, 'push').and.callThrough();
    page.initFormData();
    page.showSuggestionIfAvailable(page.fields[0]);
    expect(keywordService.getKeywordCatalog).toHaveBeenCalledTimes(1);
    expect(navCtrl.push).toHaveBeenCalledWith(KeywordsPage, { field: imsBackendMock.modelFieldOptionalString, keywords: imsBackendMock.keywordCatalog.keywords, uploadrootpage: page.navCtrl.getActive()});
  }));

  it('Subscribes to keywordSelection event on page load', inject([AuthService, ImsBackendMock, Events], (authService: AuthService, imsBackendMock: ImsBackendMock, events: Events) => {
    spyOn(events, 'subscribe').and.callThrough();
    authService.setArchive(imsBackendMock.policeFilter);
    page.ionViewDidLoad();
    expect(events.subscribe).toHaveBeenCalledWith(page.keywordSelectionTopic, jasmine.any(Function));
  }));

  it('Unsubscribes from keywordSelection event on page unload', inject([Events], (events: Events) => {
    spyOn(events, 'unsubscribe').and.callThrough();
    page.ionViewWillUnload();
    expect(events.unsubscribe).toHaveBeenCalledWith(page.keywordSelectionTopic);
  }));

});
