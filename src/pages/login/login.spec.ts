import { TestBed, inject, async, ComponentFixture } from '@angular/core/testing';
import { LoginPage } from './login';
import { App, Config, Form, IonicModule, Keyboard, DomController, LoadingController, NavController, Platform, NavParams, AlertController, ToastController } from 'ionic-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule, BaseRequestOptions } from '@angular/http';
import { ImsBackendMock } from '../../mocks/ims-backend-mock';
import { AuthService } from '../../providers/auth-service';
import { ImsService } from '../../providers/ims-service';
import { SettingService } from '../../providers/setting-service';
import { SettingServiceMock } from '../../mocks/providers/setting-service-mock';

import { ConfigMock, PlatformMock, NavParamsMock, ToastMock, AppMock, AlertMock, LoadingMock, StorageMock } from '../../mocks/mocks';
import { LoadingService } from '../../providers/loading-service';
import { EntriesPage } from '../entries/entries';
import { Storage } from '@ionic/storage';
import { AlertService } from '../../providers/alert-service';

describe('Page: Login', () => {

  let fixture: ComponentFixture<LoginPage> = null;
  let page: LoginPage = null;

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [LoginPage],

      providers: [
        App, DomController, Form, Keyboard, NavController, LoadingController, AuthService, ImsService, ImsBackendMock, BaseRequestOptions, LoadingService, AlertService,
        {
          provide: Http,
          useFactory: (ImsBackendMock, options) => {
            return new Http(ImsBackendMock, options);
          },
          deps: [ImsBackendMock, BaseRequestOptions]
        },
        { provide: App, useClass: AppMock },
        { provide: AlertController, useClass: AlertMock },
        { provide: Config, useClass: ConfigMock },
        { provide: Platform, useClass: PlatformMock },
        { provide: NavParams, useClass: NavParamsMock },
        { provide: ToastController, useClass: ToastMock },
        { provide: LoadingController, useClass: LoadingMock },
        { provide: Storage, useClass: StorageMock },
        { provide: SettingService, useClass: SettingServiceMock }
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

  it('Show and Hide loading with alert on error', inject([LoadingService, AlertService], (loadingService: LoadingService, alertService: AlertService) => {
    spyOn(loadingService, 'showLoading').and.callThrough();
    spyOn(loadingService, 'hideLoading').and.callThrough();
    spyOn(alertService, 'showError').and.callThrough();
    page.loginForm.controls['server'].setValue('wrong');
    page.loginForm.controls['user'].setValue('wrong');
    page.loginForm.controls['password'].setValue('wrong');
    page.login();
    expect(loadingService.showLoading).toHaveBeenCalledTimes(1);
    expect(loadingService.hideLoading).toHaveBeenCalledTimes(1);
    expect(alertService.showError).toHaveBeenCalled();
  }));

  it('Show and Hide Loading in case of success', inject([LoadingService, ImsBackendMock], (loadingService: LoadingService, imsBackendMock: ImsBackendMock) => {
    spyOn(loadingService, 'showLoading').and.callThrough();
    spyOn(loadingService, 'hideLoading').and.callThrough();
    let credential = imsBackendMock.credential;
    page.loginForm.controls['server'].setValue(credential.server);
    page.loginForm.controls['user'].setValue(credential.username);
    page.loginForm.controls['password'].setValue(credential.password);
    page.login();
    expect(loadingService.showLoading).toHaveBeenCalledTimes(1);
    expect(loadingService.hideLoading).toHaveBeenCalledTimes(1);
  }));

  it('Load EntriesPage after successfull login', inject([NavController, ImsBackendMock], (nav: NavController, imsBackendMock: ImsBackendMock) => {
    spyOn(nav, 'setRoot').and.callThrough();
    let credential = imsBackendMock.credential;
    page.loginForm.controls['server'].setValue(credential.server);
    page.loginForm.controls['user'].setValue(credential.username);
    page.loginForm.controls['password'].setValue(credential.password);
    expect(page.loginForm.valid).toBeTruthy();
    page.login();
    expect(nav.setRoot).toHaveBeenCalledWith(EntriesPage);
  }));

  it('Fill login form from Setting Service', inject([SettingService], (settingServiceMock: SettingServiceMock) => {
    settingServiceMock.setShowRestUrlField(false);
    page.ionViewDidLoad();
    expect(page.isShowRestUrlField).toEqual(settingServiceMock.showRestUrlField);
    expect(page.loginForm.controls['server'].value).toEqual(settingServiceMock.restUrl);
    expect(page.loginForm.controls['user'].value).toEqual(settingServiceMock.username);
  }));
});
