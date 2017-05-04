import { TestBed, inject, async, ComponentFixture } from '@angular/core/testing';
import { HomePage } from './home';
import { SettingsPage } from '../settings/settings';
import { LoginPage } from '../login/login';
import { App, Config, Form, IonicModule, Keyboard, DomController, LoadingController, NavController, Platform, NavParams, AlertController, ToastController, PopoverController, Events } from 'ionic-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../providers/auth-service';
import { ImsService } from '../../providers/ims-service';
import { ConfigMock, PlatformMock, NavParamsMock, ToastMock, AppMock, AlertMock, LoadingMock, PopoverControllerMock } from '../../mocks/mocks';
import { Http, HttpModule, BaseRequestOptions } from '@angular/http';
import { MockImsBackend } from '../../mocks/mock-ims-backend';
import { Camera } from '@ionic-native/camera';
import { UploadService } from '../../providers/upload-service';
import { TokenService } from '../../providers/token-service';
import { MockUploadService } from '../../mocks/providers/mock-upload-service';

describe('Page: Home', () => {

  let fixture: ComponentFixture<HomePage> = null;
  let page: HomePage = null;

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [HomePage],

      providers: [
        App, DomController, Form, Keyboard, NavController, LoadingController, Events, AlertController, AuthService, ImsService, TokenService, MockUploadService, MockImsBackend, BaseRequestOptions, Camera,
        { provide: App, useClass: AppMock },
        { provide: AlertController, useClass: AlertMock },
        { provide: Config, useClass: ConfigMock },
        { provide: Platform, useClass: PlatformMock },
        { provide: NavParams, useClass: NavParamsMock },
        { provide: ToastController, useClass: ToastMock },
        { provide: LoadingController, useClass: LoadingMock },
        { provide: UploadService, useClass: MockUploadService },
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
      fixture = TestBed.createComponent(HomePage);
      page = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  afterEach(() => {
    fixture.destroy();
  });

  it('Show and Hide Loading while uploading', () => {
    spyOn(page, 'showLoading').and.callThrough();
    spyOn(page, 'hideLoading').and.callThrough();
    page.uploadPicture();
    expect(page.showLoading).toHaveBeenCalledTimes(1);
    expect(page.hideLoading).toHaveBeenCalledTimes(1);
  });

  it('Show Toast after successfull upload', inject([ToastController], (toastController: ToastController) => {
    spyOn(toastController, 'create').and.callThrough();
    page.uploadPicture();
    expect(toastController.create).toHaveBeenCalled();
  }));

  it('Show Error after failed upload', inject([AlertController, MockUploadService], (alertController: AlertController, mockUploadService: MockUploadService) => {
    spyOn(alertController, 'create').and.callThrough();
    spyOn(page, 'showAlert').and.callThrough();
    mockUploadService.mockError('Fail');
    page.uploadService = mockUploadService;
    page.uploadPicture();
    expect(alertController.create).toHaveBeenCalledTimes(1);
    expect(page.showAlert).toHaveBeenCalledTimes(1);
  }));

  it('Presents Popover', inject([PopoverController], (popoverController: PopoverController) => {
    spyOn(popoverController, 'create').and.callThrough();
    page.presentPopover(null);
    expect(popoverController.create).toHaveBeenCalled();
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
