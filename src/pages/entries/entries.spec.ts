import { BrowserFileuploadSelectorService } from './../../providers/browser-fileupload-selector-service';
import { Image } from './../../models/image';
import { CameraError } from './../../models/errors/camera-error';
import { ImsLoadingError } from './../../models/errors/ims-loading-error';
import { Storage } from '@ionic/storage';
import { StorageMock } from './../../mocks/mocks';
import { SettingService } from './../../providers/setting-service';
import { ModelService } from './../../providers/model-service';
import { QueryBuilderService } from './../../providers/query-builder-service';
import { TestBed, inject, async, ComponentFixture } from '@angular/core/testing';
import { EntriesPage } from './entries';
import { App, Config, Form, IonicModule, Keyboard, DomController, LoadingController, NavController, Platform, NavParams, PopoverController, GestureController, AlertController, Events } from 'ionic-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../providers/auth-service';
import { ImsService } from '../../providers/ims-service';
import { ConfigMock, PlatformMock, NavParamsMock, AppMock, LoadingMock, PopoverControllerMock, AlertMock, InfiniteScrollMock } from '../../mocks/mocks';
import { Http, HttpModule, BaseRequestOptions } from '@angular/http';
import { ImsBackendMock } from '../../mocks/ims-backend-mock';
import { Camera } from '@ionic-native/camera';
import { TokenService } from '../../providers/token-service';
import { EntriesService } from '../../providers/entries-service';
import { CameraService } from '../../providers/camera-service';
import { LoadingService } from '../../providers/loading-service';
import { AlertService } from '../../providers/alert-service';
import { Info } from '../../models/info';
import { Observable } from 'rxjs/Observable';
import { UploadPage } from '../upload/upload';
import 'rxjs/add/observable/throw';
import { SettingsPage } from '../settings/settings';
import { LoginPage } from '../login/login';


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
          useFactory: (imsBackendMock, options) => {
            return new Http(imsBackendMock, options);
          },
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

  it('Presents Popover', inject([PopoverController], (popoverController: PopoverController) => {
    spyOn(popoverController, 'create').and.callThrough();
    page.presentPopover(null);
    expect(popoverController.create).toHaveBeenCalled();
  }));

  it('Load entries when ion view did load', inject([EntriesService, ImsBackendMock, AuthService], (entriesService: EntriesService, imsBackendMock: ImsBackendMock, authService: AuthService) => {
    let testInfo: Info = { version: '9000' };
    authService.setCurrentCredential(testInfo, imsBackendMock.credential);
    authService.setArchive(imsBackendMock.policeFilter);
    page.sort = imsBackendMock.query;
    page.ionViewDidLoad();
    expect(page.entries).toEqual(imsBackendMock.parentImageEntries.entries);
    expect(page.nextPage).toEqual(imsBackendMock.parentImageEntriesNextPageUrl);
  }));

  it('Set parent image reference field', inject([ImsBackendMock, AuthService, LoadingService], (imsBackendMock: ImsBackendMock, authService: AuthService, loadingService: LoadingService) => {
    spyOn(loadingService, 'subscribeWithLoading').and.callThrough();
    let testInfo: Info = { version: '9000' };
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
    let testInfo: Info = { version: '9000' };
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
    let testInfo: Info = { version: '9000' };
    authService.setCurrentCredential(testInfo, imsBackendMock.credential);
    authService.setArchive(imsBackendMock.policeFilter);
    page.loadSelectedFieldsAndTitle();
    expect(page.titleField).toEqual(imsBackendMock.parentImageModelFieldIdentifierName);
  }));

  it('Has fields when set in setting service', inject([ImsBackendMock, AuthService, SettingService], (imsBackendMock: ImsBackendMock, authService: AuthService, settingService: SettingService) => {
    spyOn(settingService, 'getFieldState').and.returnValue(Observable.of(true));
    let testInfo: Info = { version: '9000' };
    authService.setCurrentCredential(testInfo, imsBackendMock.credential);
    authService.setArchive(imsBackendMock.policeFilter);
    page.loadSelectedFieldsAndTitle();
    expect(page.fields).toContain(imsBackendMock.parentImageModelFieldOptionalString);
    expect(page.fields).toContain(imsBackendMock.parentImageModelFieldParentreference);
  }));

  it('Does not have any fields when nothing is set', inject([ImsBackendMock, AuthService, SettingService], (imsBackendMock: ImsBackendMock, authService: AuthService, settingService: SettingService) => {
    spyOn(settingService, 'getFieldState').and.returnValue(Observable.of(false));
    let testInfo: Info = { version: '9000' };
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
    let infiniteScroll = new InfiniteScrollMock();
    spyOn(infiniteScroll, 'enable').and.callThrough();
    page.nextPage = null;
    page.infiniteEntries(infiniteScroll);
    expect(infiniteScroll.enable).toHaveBeenCalledWith(false);
  });

  it('Completes infinite scroll on new items', inject([ImsBackendMock, EntriesService], (imsBackendMock: ImsBackendMock, entriesService: EntriesService) => {
    let infiniteScroll = new InfiniteScrollMock();
    spyOn(infiniteScroll, 'complete').and.callThrough();
    spyOn(entriesService, 'getEntries').and.returnValue(Observable.of(imsBackendMock.parentImageEntriesNextPage));
    page.nextPage = imsBackendMock.parentImageEntriesNextPageUrl;
    page.infiniteEntries(infiniteScroll);
    expect(infiniteScroll.complete).toHaveBeenCalled();
  }));

  it('Completes infinite scroll and alerts on error', inject([ImsBackendMock, EntriesService], (imsBackendMock: ImsBackendMock, entriesService: EntriesService) => {
    let infiniteScroll = new InfiniteScrollMock();
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
    page.infiniteEntries(new InfiniteScrollMock());
    expect(page.entries).toEqual(imsBackendMock.parentImageEntries.entries.concat(imsBackendMock.parentImageEntriesNextPage.entries));
    expect(page.nextPage).toBe(imsBackendMock.parentImageEntriesNextNextPageUrl);
  }));

  it('Push to Upload Page after taking picture', inject([CameraService, NavController, LoadingService], (cameraService: CameraService, navController: NavController, loadingService: LoadingService) => {
    let parentImageEntryId: string = '123';
    let entryTitle: string = 'Test Entry';
    let image = new Image('picture.jpg', '/my/picture.jpg');
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
      { 'image': image, 'parentImageEntryId': parentImageEntryId, 'entryTitle': entryTitle }
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
    let parentImageEntryId: string = '123';
    let entryTitle: string = 'Test Entry';
    let image = new Image('picture.jpg', '/my/picture.jpg');
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
      { 'image': image, 'parentImageEntryId': parentImageEntryId, 'entryTitle': entryTitle }
    );
  }));

  it('On browser open file dialog on  after click get picture from gallery', inject([Platform], (platform: Platform) => {

    let parentImageEntryId: string = '123';
    let entryTitle: string = 'Test Entry';
    let element = document.createElement('div');
    element.setAttribute('id', 'fileUpload' + parentImageEntryId);
    document.body.appendChild(element);
    spyOn(platform, 'is').and.returnValue(true);
    spyOn(element, 'click').and.returnValue(null);
    page.getGalleryPictureForEntry(parentImageEntryId, entryTitle);
    expect(element.click).toHaveBeenCalledTimes(1);
  }));

  it('Throws error when failing to get picture from gallery', inject([CameraService, NavController], (cameraService: CameraService, navController: NavController) => {
    let error = Observable.throw(new Error('oops'));
    spyOn(cameraService, 'getGalleryPicture').and.returnValue(error);
    spyOn(navController, 'push').and.callThrough();
    spyOn(cameraService, 'handleError').and.callThrough();
    expect(() => page.getGalleryPictureForEntry('1', 'test')).toThrowError(CameraError);
    expect(cameraService.getGalleryPicture).toHaveBeenCalled();
    expect(navController.push).toHaveBeenCalledTimes(0);
    expect(cameraService.handleError).toHaveBeenCalled();
  }));

  it('Go to Settings Page and dismiss popover on load Settings', inject([NavController, PopoverController, Events], (nav: NavController, popoverController: PopoverController, events: Events) => {
    page.subscribeToEvents();
    page.popover = popoverController.create({});
    spyOn(nav, 'push').and.callThrough();
    spyOn(page.popover, 'dismiss').and.callThrough();

    events.publish('nav:settings-page');

    expect(nav.push).toHaveBeenCalledWith(SettingsPage);
    expect(page.popover.dismiss).toHaveBeenCalled();
  }));

  it('Go to Login Page and dismiss popover on logout button', inject([NavController, PopoverController, Events], (nav: NavController, popoverController: PopoverController, events: Events) => {
    page.subscribeToEvents();
    page.popover = popoverController.create({});
    spyOn(nav, 'setRoot').and.callThrough();
    spyOn(page.popover, 'dismiss').and.callThrough();

    events.publish('nav:login-page');

    expect(nav.setRoot).toHaveBeenCalledWith(LoginPage);
    expect(page.popover.dismiss).toHaveBeenCalled();
  }));

  it('Clear settings on logout button', inject([AuthService, PopoverController, Events], (authService: AuthService, popoverController: PopoverController, events: Events) => {
    page.subscribeToEvents();
    page.popover = popoverController.create({});
    spyOn(authService, 'logout').and.callThrough();

    events.publish('nav:login-page');

    expect(authService.logout).toHaveBeenCalled();
  }));

  it('Event unsubscribed due to android issue on leaving of page', inject([Events], (events: Events) => {
    spyOn(page.events, 'unsubscribe').and.callThrough();
    page.ionViewWillLeave();
    expect(page.events.unsubscribe).toHaveBeenCalledWith('nav:login-page');
    expect(page.events.unsubscribe).toHaveBeenCalledWith('nav:settings-page');
  }));

  it('Do nothing when no file available in input file dialog', () => {
    spyOn(page, 'pushToUploadPageWithPicture').and.callThrough();
    let event = { target: { files: [] } };
    page.fileSelected(event, null, null);
    expect(page.pushToUploadPageWithPicture).toHaveBeenCalledTimes(0);
  });

  it('Push to upload page when file in input file dialog selected', () => {
    let fileName = 'file.jpg';
    let fileURI = '/dev/0/';
    let file: File = new File([new Blob()], fileName);
    let event = { target: { files: [file]} };
    let parentImageEntryId = '1';
    let entryTitle = 'title';
    spyOn(page, 'pushToUploadPageWithPicture').and.callThrough();
    spyOn(window.URL, 'createObjectURL').and.returnValue(fileURI);
    page.fileSelected(event, parentImageEntryId, entryTitle);
    let image = new Image(fileName, fileURI, file);
    expect(page.pushToUploadPageWithPicture).toHaveBeenCalledWith(image, parentImageEntryId, entryTitle);
  });
});
