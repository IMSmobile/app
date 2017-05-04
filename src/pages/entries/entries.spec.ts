import { QueryBuilderService } from './../../providers/query-builder-service';
import { TestBed, inject, async, ComponentFixture } from '@angular/core/testing';
import { EntriesPage } from './entries';
import { App, Config, Form, IonicModule, Keyboard, DomController, LoadingController, NavController, Platform, NavParams, PopoverController, GestureController, AlertController, Events } from 'ionic-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../providers/auth-service';
import { ImsService } from '../../providers/ims-service';
import { ConfigMock, PlatformMock, NavParamsMock, AppMock, LoadingMock, PopoverControllerMock, AlertMock, InfiniteScrollMock } from '../../mocks/mocks';
import { Http, HttpModule, BaseRequestOptions } from '@angular/http';
import { MockImsBackend } from '../../mocks/mock-ims-backend';
import { Camera } from '@ionic-native/camera';
import { TokenService } from '../../providers/token-service';
import { EntriesService } from '../../providers/entries-service';
import { CameraService } from '../../providers/camera-service';
import { LoadingService } from '../../providers/loading-service';
import { AlertService } from '../../providers/alert-service';
import { Info } from '../../models/info';
import { Observable } from 'rxjs/Observable';
import { HomePage } from '../home/home';
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
        AuthService, ImsService, TokenService, MockImsBackend, BaseRequestOptions, Camera, GestureController,
        CameraService, LoadingService, AlertService, QueryBuilderService, Events,
        { provide: App, useClass: AppMock },
        { provide: AlertController, useClass: AlertMock },
        { provide: Config, useClass: ConfigMock },
        { provide: Platform, useClass: PlatformMock },
        { provide: NavParams, useClass: NavParamsMock },
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

  it('Load entries when ion view did load', inject([EntriesService, MockImsBackend, AuthService], (entriesService: EntriesService, mockImsBackend: MockImsBackend, authService: AuthService) => {
    let testInfo: Info = { version: '9000' };
    authService.setCurrentCredential(testInfo, mockImsBackend.credential);
    page.sort = mockImsBackend.query;
    page.ionViewDidLoad();
    expect(page.entries).toEqual(mockImsBackend.parentImageEntries.entries);
    expect(page.nextPage).toEqual(mockImsBackend.parentImageEntriesNextPageUrl);
  }));

  it('Show and hide loading when successful', inject([MockImsBackend, AuthService, LoadingService], (mockImsBackend: MockImsBackend, authService: AuthService, loadingService: LoadingService) => {
    spyOn(loadingService, 'showLoading').and.callThrough();
    spyOn(loadingService, 'hideLoading').and.callThrough();
    let testInfo: Info = { version: '9000' };
    authService.setCurrentCredential(testInfo, mockImsBackend.credential);
    page.ionViewDidLoad();
    expect(loadingService.showLoading).toHaveBeenCalled();
    expect(loadingService.hideLoading).toHaveBeenCalled();
  }));

  it('Show and hide loading with alert on error', inject([MockImsBackend, AuthService, LoadingService, EntriesService, AlertService], (mockImsBackend: MockImsBackend, authService: AuthService, loadingService: LoadingService, entriesService: EntriesService, alertService: AlertService) => {
    let error = Observable.throw(new Error('oops'));
    spyOn(loadingService, 'showLoading').and.callThrough();
    spyOn(loadingService, 'hideLoading').and.callThrough();
    spyOn(alertService, 'showError').and.callThrough();
    spyOn(entriesService, 'getParentImageEntries').and.returnValue(error);
    page.ionViewDidLoad();
    expect(loadingService.showLoading).toHaveBeenCalled();
    expect(loadingService.hideLoading).toHaveBeenCalled();
    expect(alertService.showError).toHaveBeenCalled();
  }));

  it('Disables infinite scroll when there is no next page', () => {
    let infiniteScroll = new InfiniteScrollMock();
    spyOn(infiniteScroll, 'enable').and.callThrough();
    page.nextPage = null;
    page.infiniteEntries(infiniteScroll);
    expect(infiniteScroll.enable).toHaveBeenCalledWith(false);
  });

  it('Completes infinite scroll on new items', inject([MockImsBackend, EntriesService], (mockImsBackend: MockImsBackend, entriesService: EntriesService) => {
    let infiniteScroll = new InfiniteScrollMock();
    spyOn(infiniteScroll, 'complete').and.callThrough();
    spyOn(entriesService, 'getEntries').and.returnValue(Observable.of(mockImsBackend.parentImageEntriesNextPage));
    page.nextPage = mockImsBackend.parentImageEntriesNextPageUrl;
    page.infiniteEntries(infiniteScroll);
    expect(infiniteScroll.complete).toHaveBeenCalled();
  }));

  it('Completes infinite scroll and alerts on error', inject([MockImsBackend, EntriesService, AlertService], (mockImsBackend: MockImsBackend, entriesService: EntriesService, alertService: AlertService) => {
    let infiniteScroll = new InfiniteScrollMock();
    let error = Observable.throw(new Error('oops'));
    spyOn(infiniteScroll, 'complete').and.callThrough();
    spyOn(entriesService, 'getEntries').and.returnValue(error);
    spyOn(alertService, 'showError').and.callThrough();
    page.nextPage = mockImsBackend.parentImageEntriesNextPageUrl;
    page.infiniteEntries(infiniteScroll);
    expect(infiniteScroll.complete).toHaveBeenCalled();
    expect(alertService.showError).toHaveBeenCalled();
  }));

  it('Load next entries on infinite scroll', inject([MockImsBackend, EntriesService], (mockImsBackend: MockImsBackend, entriesService: EntriesService) => {
    spyOn(entriesService, 'getEntries').and.returnValue(Observable.of(mockImsBackend.parentImageEntriesNextPage));
    page.nextPage = mockImsBackend.parentImageEntriesNextPageUrl;
    page.entries = new Array(...mockImsBackend.parentImageEntries.entries);
    page.infiniteEntries(new InfiniteScrollMock());
    expect(page.entries).toEqual(mockImsBackend.parentImageEntries.entries.concat(mockImsBackend.parentImageEntriesNextPage.entries));
    expect(page.nextPage).toBe(mockImsBackend.parentImageEntriesNextNextPageUrl);
  }));

  it('Push to Home Page after taking picture', inject([CameraService, NavController], (cameraService: CameraService, navController: NavController) => {
    let parentImageEntryId: string = '123';
    let imageSource = '/my/picture.jpg';
    spyOn(cameraService, 'takePicture').and.returnValue(Observable.of(imageSource));
    spyOn(navController, 'push').and.callThrough();
    page.takePictureForEntry(parentImageEntryId);
    expect(cameraService.takePicture).toHaveBeenCalled();
    expect(navController.push).toHaveBeenCalledWith(
      HomePage,
      { 'imageSrc': imageSource, 'parentImageEntryId': parentImageEntryId }
    );
  }));

  it('Show alert when failing to take picture', inject([CameraService, NavController, AlertService], (cameraService: CameraService, navController: NavController, alertService: AlertService) => {
    let error = Observable.throw(new Error('oops'));
    spyOn(cameraService, 'takePicture').and.returnValue(error);
    spyOn(navController, 'push').and.callThrough();
    spyOn(alertService, 'showError').and.callThrough();
    page.takePictureForEntry('1');
    expect(cameraService.takePicture).toHaveBeenCalled();
    expect(navController.push).toHaveBeenCalledTimes(0);
    expect(alertService.showError).toHaveBeenCalled();
  }));

  it('Go to Settings Page and dismiss popover on load Settings', inject([NavController, PopoverController, Events], (nav: NavController, popoverController: PopoverController, events: Events) => {
    page.ionViewWillEnter();
    page.popover = popoverController.create({});
    spyOn(nav, 'push').and.callThrough();
    spyOn(page.popover, 'dismiss').and.callThrough();

    events.publish('nav:settings-page');

    expect(nav.push).toHaveBeenCalledWith(SettingsPage);
    expect(page.popover.dismiss).toHaveBeenCalled();

  }));


  it('Go to Login Page and dismiss popover on logout button', inject([NavController, PopoverController, Events], (nav: NavController, popoverController: PopoverController, events: Events) => {
    page.ionViewWillEnter();
    page.popover = popoverController.create({});
    spyOn(nav, 'setRoot').and.callThrough();
    spyOn(page.popover, 'dismiss').and.callThrough();

    events.publish('nav:login-page');

    expect(nav.setRoot).toHaveBeenCalledWith(LoginPage);
    expect(page.popover.dismiss).toHaveBeenCalled();
  }));


  it('Clear settings on logout button', inject([AuthService, PopoverController, Events], (authService: AuthService, popoverController: PopoverController, events: Events) => {
    page.ionViewWillEnter();
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

});
