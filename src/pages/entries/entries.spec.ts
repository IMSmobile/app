import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseRequestOptions, Http, HttpModule } from '@angular/http';
import { Camera } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import { AlertController, App, Config, DomController, Events, Form, GestureController, InfiniteScroll, IonicModule, Keyboard, LoadingController, NavController, NavParams, Platform, PopoverController } from 'ionic-angular';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { ImsBackendMock } from '../../mocks/ims-backend-mock';
import { AlertMock, AppMock, ConfigMock, InfiniteScrollMock, LoadingMock, NavParamsMock, PlatformMock, PopoverControllerMock } from '../../mocks/mocks';
import { Info } from '../../models/info';
import { AlertService } from '../../providers/alert-service';
import { AuthService } from '../../providers/auth-service';
import { CameraService } from '../../providers/camera-service';
import { EntriesService } from '../../providers/entries-service';
import { ImsService } from '../../providers/ims-service';
import { LoadingService } from '../../providers/loading-service';
import { TokenService } from '../../providers/token-service';
import { SettingsPage } from '../settings/settings';
import { UploadPage } from '../upload/upload';
import { DragEventMock } from './../../mocks/drag-event-mock';
import { StorageMock } from './../../mocks/mocks';
import { CameraError } from './../../models/errors/camera-error';
import { ImsLoadingError } from './../../models/errors/ims-loading-error';
import { Image } from './../../models/image';
import { BrowserFileuploadSelectorService } from './../../providers/browser-fileupload-selector-service';
import { DragEventService } from './../../providers/drag-event-service';
import { ModelService } from './../../providers/model-service';
import { QueryBuilderService } from './../../providers/query-builder-service';
import { SettingService } from './../../providers/setting-service';
import { EntriesPage } from './entries';

describe('Page: Entries', () => {

  let fixture: ComponentFixture<EntriesPage> = null;
  let page: EntriesPage = null;

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [EntriesPage],

      providers: [
        App, DomController, Form, Keyboard, NavController, EntriesService, LoadingController,
        AuthService, ImsService, TokenService, ImsBackendMock, BaseRequestOptions, Camera, GestureController,
        ModelService, SettingService,
        CameraService, LoadingService, AlertService, QueryBuilderService, Events, BrowserFileuploadSelectorService,
        { provide: App, useClass: AppMock },
        { provide: AlertController, useClass: AlertMock },
        { provide: Config, useClass: ConfigMock },
        { provide: Platform, useClass: PlatformMock },
        { provide: NavParams, useClass: NavParamsMock },
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
      fixture = TestBed.createComponent(EntriesPage);
      page = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  afterEach(() => {
    fixture.destroy();
  });

  it('Load entries when ion view did load', inject([EntriesService, ImsBackendMock, AuthService], (entriesService: EntriesService, imsBackendMock: ImsBackendMock, authService: AuthService) => {
    const testInfo: Info = { version: '9000' };
    authService.setCurrentCredential(testInfo, imsBackendMock.credential);
    authService.setArchive(imsBackendMock.policeFilter);
    page.sort = imsBackendMock.query;
    page.ionViewDidLoad();
    expect(page.entries).toEqual(imsBackendMock.parentImageEntries.entries);
    expect(page.nextPage).toEqual(imsBackendMock.parentImageEntriesNextPageUrl);
  }));

  it('Set parent image reference field', inject([ImsBackendMock, AuthService, LoadingService], (imsBackendMock: ImsBackendMock, authService: AuthService, loadingService: LoadingService) => {
    spyOn(loadingService, 'subscribeWithLoading').and.callThrough();
    const testInfo: Info = { version: '9000' };
    authService.setCurrentCredential(testInfo, imsBackendMock.credential);
    authService.setArchive(imsBackendMock.policeFilter);
    page.loadParentImageReferenceField();
    expect(page.parentImageReferenceField).toEqual(imsBackendMock.modelFieldParentreferenceName);
    expect(loadingService.subscribeWithLoading).toHaveBeenCalled();
  }));

  it('Throw error when failing load parent image reference field', inject([ImsBackendMock, AuthService, LoadingService, ModelService], (imsBackendMock: ImsBackendMock, authService: AuthService, loadingService: LoadingService, modelService: ModelService) => {
    spyOn(loadingService, 'subscribeWithLoading').and.callThrough();
    spyOn(modelService, 'getMetadataFieldsOfImageTable').and.returnValue(Observable.throw('oops'));
    expect(() => page.loadParentImageReferenceField()).toThrowError(ImsLoadingError);
    expect(loadingService.subscribeWithLoading).toHaveBeenCalled();
  }));

  it('Show and hide loading when successful when loading initial entries', inject([ImsBackendMock, AuthService, LoadingService], (imsBackendMock: ImsBackendMock, authService: AuthService, loadingService: LoadingService) => {
    spyOn(loadingService, 'subscribeWithLoading').and.callThrough();
    const testInfo: Info = { version: '9000' };
    authService.setCurrentCredential(testInfo, imsBackendMock.credential);
    authService.setArchive(imsBackendMock.policeFilter);
    page.sort = imsBackendMock.query;
    page.loadInitialParentImageEntries();
    expect(loadingService.subscribeWithLoading).toHaveBeenCalled();
  }));

  it('Show and hide loading indicator and throw error when failing to loading initial entries', inject([ImsBackendMock, AuthService, LoadingService, EntriesService], (imsBackendMock: ImsBackendMock, authService: AuthService, loadingService: LoadingService, entriesService: EntriesService) => {
    spyOn(loadingService, 'subscribeWithLoading').and.callThrough();
    spyOn(entriesService, 'getParentImageEntries').and.returnValue(Observable.throw('oops'));
    expect(() => page.loadInitialParentImageEntries()).toThrowError(ImsLoadingError);
    expect(loadingService.subscribeWithLoading).toHaveBeenCalled();
  }));

  it('Sets title field to identifier field', inject([ImsBackendMock, AuthService], (imsBackendMock: ImsBackendMock, authService: AuthService) => {
    const testInfo: Info = { version: '9000' };
    authService.setCurrentCredential(testInfo, imsBackendMock.credential);
    authService.setArchive(imsBackendMock.policeFilter);
    page.loadSelectedFieldsAndTitle();
    expect(page.titleField).toEqual(imsBackendMock.parentImageModelFieldIdentifierName);
  }));

  it('Has fields when set in setting service', inject([ImsBackendMock, AuthService, SettingService], (imsBackendMock: ImsBackendMock, authService: AuthService, settingService: SettingService) => {
    spyOn(settingService, 'getFieldState').and.returnValue(Observable.of(true));
    const testInfo: Info = { version: '9000' };
    authService.setCurrentCredential(testInfo, imsBackendMock.credential);
    authService.setArchive(imsBackendMock.policeFilter);
    page.loadSelectedFieldsAndTitle();
    expect(page.fields).toContain(imsBackendMock.parentImageModelFieldOptionalString);
    expect(page.fields).toContain(imsBackendMock.parentImageModelFieldParentreference);
  }));

  it('Does not have any fields when nothing is set', inject([ImsBackendMock, AuthService, SettingService], (imsBackendMock: ImsBackendMock, authService: AuthService, settingService: SettingService) => {
    spyOn(settingService, 'getFieldState').and.returnValue(Observable.of(false));
    const testInfo: Info = { version: '9000' };
    authService.setCurrentCredential(testInfo, imsBackendMock.credential);
    authService.setArchive(imsBackendMock.policeFilter);
    page.loadSelectedFieldsAndTitle();
    expect(page.fields.length).toBe(0);
  }));

  it('Throws error when failing to get metadata fields', inject([ModelService], (modelService: ModelService) => {
    spyOn(modelService, 'getMetadataFieldsOfParentImageTable').and.returnValue(Observable.throw('oops'));
    expect(() => page.loadSelectedFieldsAndTitle()).toThrowError(ImsLoadingError);
    expect(page.fields).toBeUndefined();
  }));

  it('Throws error when failing to load configured fields', inject([SettingService, ModelService, ImsBackendMock], (settingService: SettingService, modelService: ModelService, imsBackendMock: ImsBackendMock) => {
    spyOn(modelService, 'getMetadataFieldsOfParentImageTable').and.returnValue(Observable.of(imsBackendMock.parentImageModelFields));
    spyOn(settingService, 'getActiveFields').and.returnValue(Observable.throw('oops'));
    expect(() => page.loadSelectedFieldsAndTitle()).toThrowError(ImsLoadingError);
    expect(page.fields).toBeUndefined();
  }));

  it('Disables infinite scroll when there is no next page', () => {
    const infiniteScroll = new InfiniteScrollMock() as InfiniteScroll;
    spyOn(infiniteScroll, 'enable').and.callThrough();
    page.nextPage = null;
    page.infiniteEntries(infiniteScroll);
    expect(infiniteScroll.enable).toHaveBeenCalledWith(false);
  });

  it('Completes infinite scroll on new items', inject([ImsBackendMock, EntriesService], (imsBackendMock: ImsBackendMock, entriesService: EntriesService) => {
    const infiniteScroll = new InfiniteScrollMock() as InfiniteScroll;
    spyOn(infiniteScroll, 'complete').and.callThrough();
    spyOn(entriesService, 'getEntries').and.returnValue(Observable.of(imsBackendMock.parentImageEntriesNextPage));
    page.nextPage = imsBackendMock.parentImageEntriesNextPageUrl;
    page.infiniteEntries(infiniteScroll);
    expect(infiniteScroll.complete).toHaveBeenCalled();
  }));

  it('Completes infinite scroll and alerts on error', inject([ImsBackendMock, EntriesService], (imsBackendMock: ImsBackendMock, entriesService: EntriesService) => {
    const infiniteScroll = new InfiniteScrollMock() as InfiniteScroll;
    spyOn(infiniteScroll, 'complete').and.callThrough();
    spyOn(entriesService, 'getEntries').and.returnValue(Observable.throw('oops'));
    page.nextPage = imsBackendMock.parentImageEntriesNextPageUrl;
    expect(() => page.infiniteEntries(infiniteScroll)).toThrowError(ImsLoadingError);
    expect(infiniteScroll.complete).toHaveBeenCalled();
  }));

  it('Load next entries on infinite scroll', inject([ImsBackendMock, EntriesService], (imsBackendMock: ImsBackendMock, entriesService: EntriesService) => {
    spyOn(entriesService, 'getEntries').and.returnValue(Observable.of(imsBackendMock.parentImageEntriesNextPage));
    page.nextPage = imsBackendMock.parentImageEntriesNextPageUrl;
    page.entries = new Array(...imsBackendMock.parentImageEntries.entries);
    page.infiniteEntries(new InfiniteScrollMock() as InfiniteScroll);
    expect(page.entries).toEqual(imsBackendMock.parentImageEntries.entries.concat(imsBackendMock.parentImageEntriesNextPage.entries));
    expect(page.nextPage).toBe(imsBackendMock.parentImageEntriesNextNextPageUrl);
  }));

  it('Push to Upload Page after taking picture', inject([CameraService, NavController, LoadingService], (cameraService: CameraService, navController: NavController, loadingService: LoadingService) => {
    const parentImageEntryId: string = '123';
    const entryTitle: string = 'Test Entry';
    const image = new Image('picture.jpg', '/my/picture.jpg');
    spyOn(cameraService, 'takePicture').and.returnValue(Observable.of(image));
    spyOn(cameraService, 'handleError').and.callThrough();
    spyOn(loadingService, 'subscribeWithLoading').and.callThrough();
    spyOn(navController, 'push').and.callThrough();
    page.takePictureForEntry(parentImageEntryId, entryTitle);
    expect(cameraService.takePicture).toHaveBeenCalled();
    expect(loadingService.subscribeWithLoading).toHaveBeenCalled();
    expect(cameraService.handleError).toHaveBeenCalledTimes(0);
    expect(navController.push).toHaveBeenCalledWith(
      UploadPage,
      { image: image, parentImageEntryId: parentImageEntryId, entryTitle: entryTitle }
    );
  }));

  it('Throws error when failing to take picture', inject([CameraService, NavController], (cameraService: CameraService, navController: NavController) => {
    spyOn(cameraService, 'takePicture').and.returnValue(Observable.throw('oops'));
    spyOn(navController, 'push').and.callThrough();
    spyOn(cameraService, 'handleError').and.callThrough();
    expect(() => page.takePictureForEntry('1', 'test')).toThrowError(CameraError);
    expect(cameraService.takePicture).toHaveBeenCalled();
    expect(navController.push).toHaveBeenCalledTimes(0);
    expect(cameraService.handleError).toHaveBeenCalled();
  }));

  it('Push to Upload Page after getting picture from gallery', inject([CameraService, NavController, LoadingService], (cameraService: CameraService, navController: NavController, loadingService: LoadingService) => {
    const parentImageEntryId: string = '123';
    const entryTitle: string = 'Test Entry';
    const image = new Image('picture.jpg', '/my/picture.jpg');
    spyOn(cameraService, 'getGalleryPicture').and.returnValue(Observable.of(image));
    spyOn(cameraService, 'handleError').and.callThrough();
    spyOn(loadingService, 'subscribeWithLoading').and.callThrough();
    spyOn(navController, 'push').and.callThrough();
    page.getGalleryPictureForEntry(parentImageEntryId, entryTitle);
    expect(cameraService.getGalleryPicture).toHaveBeenCalled();
    expect(loadingService.subscribeWithLoading).toHaveBeenCalled();
    expect(cameraService.handleError).toHaveBeenCalledTimes(0);
    expect(navController.push).toHaveBeenCalledWith(
      UploadPage,
      { image: image, parentImageEntryId: parentImageEntryId, entryTitle: entryTitle }
    );
  }));

  it('On browser open file dialog on  after click get picture from gallery', inject([Platform], (platform: Platform) => {

    const parentImageEntryId: string = '123';
    const entryTitle: string = 'Test Entry';
    const element = document.createElement('div');
    element.setAttribute('id', 'fileUpload' + parentImageEntryId);
    document.body.appendChild(element);
    spyOn(platform, 'is').and.returnValue(true);
    spyOn(element, 'click').and.returnValue(null);
    page.getGalleryPictureForEntry(parentImageEntryId, entryTitle);
    expect(element.click).toHaveBeenCalledTimes(1);
  }));

  it('Throws error when failing to get picture from gallery', inject([CameraService, NavController], (cameraService: CameraService, navController: NavController) => {
    const error = Observable.throw(new Error('oops'));
    spyOn(cameraService, 'getGalleryPicture').and.returnValue(error);
    spyOn(navController, 'push').and.callThrough();
    spyOn(cameraService, 'handleError').and.callThrough();
    expect(() => page.getGalleryPictureForEntry('1', 'test')).toThrowError(CameraError);
    expect(cameraService.getGalleryPicture).toHaveBeenCalled();
    expect(navController.push).toHaveBeenCalledTimes(0);
    expect(cameraService.handleError).toHaveBeenCalled();
  }));

  it('Go to Settings Page', inject([NavController], (navController: NavController) => {
    spyOn(navController, 'push').and.callThrough();
    page.loadSettings();
    expect(navController.push).toHaveBeenCalledWith(SettingsPage);
  }));

  it('Do nothing when no file available in input file dialog', () => {
    spyOn(page, 'pushToUploadPageWithPicture').and.callThrough();
    const event = { target: { files: [] } };
    page.fileSelected(event, null, null);
    expect(page.pushToUploadPageWithPicture).toHaveBeenCalledTimes(0);
  });

  it('Push to upload page when file in input file dialog selected', () => {
    const fileName = 'file.jpg';
    const fileURI = '/dev/0/';
    const file: File = new File([new Blob()], fileName, { type: 'image/jpeg' });
    const event = { target: { files: [file] } };
    const parentImageEntryId = '1';
    const entryTitle = 'title';
    spyOn(page, 'pushToUploadPageWithPicture').and.callThrough();
    spyOn(window.URL, 'createObjectURL').and.returnValue(fileURI);
    page.fileSelected(event, parentImageEntryId, entryTitle);
    const image = new Image(fileName, fileURI, file);
    expect(page.pushToUploadPageWithPicture).toHaveBeenCalledWith(image, parentImageEntryId, entryTitle);
  });

  it('should add drag class on element with first dragenter event', () => {
    page.dragEventService = new DragEventService();
    const event = new DragEventMock('dragenter');
    page.handleDragEvent(event);
    const element = event.currentTarget as Element;
    expect(element.classList.contains('drag')).toBeTruthy();
  });

  it('should remove drag class on last dragleave event', () => {
    page.dragEventService = new DragEventService();
    const element = document.createElement('div');
    element.id = 'a1';
    const eventEnter = new DragEventMock('dragenter', element);
    const eventLeave = new DragEventMock('dragleave', element);
    page.handleDragEvent(eventEnter);
    page.handleDragEvent(eventEnter);
    expect(element.classList.contains('drag')).toBeTruthy();
    page.handleDragEvent(eventLeave);
    page.handleDragEvent(eventLeave);
    expect(element.classList.contains('drag')).toBeFalsy();
  });

  it('Should go to uploadpage after receiving dropped image', inject([BrowserFileuploadSelectorService], (browserFileuploadSelectorService: BrowserFileuploadSelectorService) => {
    const event = new DragEventMock('drop');
    const droppedImage = new Image('picture.jpg', '/my/picture.jpg');
    const parentImageEntryId = '1';
    const entryTitle = 'title';
    spyOn(browserFileuploadSelectorService, 'getImageFromFileDrop').and.returnValue(droppedImage);
    spyOn(page, 'pushToUploadPageWithPicture').and.callThrough();
    page.receiveDrop(event, parentImageEntryId, entryTitle);
    expect(page.pushToUploadPageWithPicture).toHaveBeenCalledWith(droppedImage, parentImageEntryId, entryTitle);
  }));

  it('Should not go to uploadpage after receiving no dropped image', inject([BrowserFileuploadSelectorService], (browserFileuploadSelectorService: BrowserFileuploadSelectorService) => {
    const event: DragEvent = new DragEventMock('drop');
    const parentImageEntryId = '1';
    const entryTitle = 'title';
    spyOn(browserFileuploadSelectorService, 'getImageFromFileDrop').and.returnValue(undefined);
    spyOn(page, 'pushToUploadPageWithPicture').and.callThrough();
    page.receiveDrop(event, parentImageEntryId, entryTitle);
    expect(page.pushToUploadPageWithPicture).toHaveBeenCalledTimes(0);
  }));

});
