import { TestBed, inject, async, ComponentFixture } from '@angular/core/testing';
import { LoginPage } from './login';
import { App, Config, Form, IonicModule, Keyboard, DomController, LoadingController, NavController, Platform, NavParams, AlertController, ToastController } from 'ionic-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule, BaseRequestOptions } from '@angular/http';
import { MockImsBackend } from '../../mocks/mock-ims-backend';
import { AuthService } from '../../providers/auth-service';
import { ImsService } from '../../providers/ims-service';
import { SettingService } from '../../providers/setting-service';
import { MockSettingService } from '../../mocks/providers/mock-setting-service';

import { ConfigMock, PlatformMock, NavParamsMock, ToastMock, AppMock, AlertMock, LoadingMock, StorageMock } from '../../mocks/mocks';
import { EntriesPage } from '../entries/entries';
import { Storage } from '@ionic/storage';


describe('Page: Login', () => {

  let fixture: ComponentFixture<LoginPage> = null;
  let page: LoginPage = null;

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [LoginPage],

      providers: [
        App, DomController, Form, Keyboard, NavController, LoadingController, AlertController, AuthService, ImsService, MockImsBackend, BaseRequestOptions,
        {
          provide: Http,
          useFactory: (MockImsBackend, options) => {
            return new Http(MockImsBackend, options);
          },
          deps: [MockImsBackend, BaseRequestOptions]
        },
        { provide: App, useClass: AppMock },
        { provide: AlertController, useClass: AlertMock },
        { provide: Config, useClass: ConfigMock },
        { provide: Platform, useClass: PlatformMock },
        { provide: NavParams, useClass: NavParamsMock },
        { provide: ToastController, useClass: ToastMock },
        { provide: LoadingController, useClass: LoadingMock },
        { provide: Storage, useClass: StorageMock },
        { provide: SettingService, useClass: MockSettingService }
      ],
      imports: [HttpModule, FormsModule, IonicModule, ReactiveFormsModule]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(LoginPage);
      page = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  afterEach(() => {
    fixture.destroy();
  });

  it('Should popup toast message with warning message', inject([ToastController], (toastController: ToastController) => {
    spyOn(toastController, 'create').and.callThrough();
    page.login();
    expect(toastController.create).toHaveBeenCalled();
  }));

  it('Show and Hide Loading in case of error', () => {
    spyOn(page, 'showLoading').and.callThrough();
    spyOn(page, 'hideLoading').and.callThrough();
    page.loginForm.controls['server'].setValue('wrong');
    page.loginForm.controls['user'].setValue('wrong');
    page.loginForm.controls['password'].setValue('wrong');
    page.login();
    expect(page.showLoading).toHaveBeenCalledTimes(1);
    expect(page.hideLoading).toHaveBeenCalledTimes(1);
  });

  it('Show and Hide Loading in case of success', inject([MockImsBackend], (mockImsBackend: MockImsBackend) => {
    spyOn(page, 'showLoading').and.callThrough();
    spyOn(page, 'hideLoading').and.callThrough();
    let credential = mockImsBackend.credential;
    page.loginForm.controls['server'].setValue(credential.server);
    page.loginForm.controls['user'].setValue(credential.username);
    page.loginForm.controls['password'].setValue(credential.password);
    page.login();
    expect(page.showLoading).toHaveBeenCalledTimes(1);
    expect(page.hideLoading).toHaveBeenCalledTimes(1);
  }));

  it('Load EntriesPage after successfull login', inject([NavController, MockImsBackend], (nav: NavController, mockImsBackend: MockImsBackend) => {
    spyOn(nav, 'setRoot').and.callThrough();
    let credential = mockImsBackend.credential;
    page.loginForm.controls['server'].setValue(credential.server);
    page.loginForm.controls['user'].setValue(credential.username);
    page.loginForm.controls['password'].setValue(credential.password);
    expect(page.loginForm.valid).toBeTruthy();
    page.login();
    expect(nav.setRoot).toHaveBeenCalledWith(EntriesPage);
  }));

  it('Fill login form from Setting Service', inject([SettingService], (mockSettingService: MockSettingService) => {
    mockSettingService.setShowRestUrlField(false);
    page.ionViewDidLoad();
    expect(page.isShowRestUrlField).toEqual(mockSettingService.showRestUrlField);
    expect(page.loginForm.controls['server'].value).toEqual(mockSettingService.restUrl);
    expect(page.loginForm.controls['user'].value).toEqual(mockSettingService.username);
  }));
});
