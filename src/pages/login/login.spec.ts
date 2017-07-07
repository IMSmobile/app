import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseRequestOptions, Http, HttpModule } from '@angular/http';
import { Storage } from '@ionic/storage';
import { AlertController, App, Config, DomController, Form, IonicModule, Keyboard, LoadingController, NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { ImsBackendMock } from '../../mocks/ims-backend-mock';
import { AlertMock, AppMock, ConfigMock, LoadingMock, NavParamsMock, PlatformMock, StorageMock, ToastMock } from '../../mocks/mocks';
import { AlertService } from '../../providers/alert-service';
import { AuthService } from '../../providers/auth-service';
import { ImsService } from '../../providers/ims-service';
import { LoadingService } from '../../providers/loading-service';
import { SettingService } from '../../providers/setting-service';
import { EntriesPage } from '../entries/entries';
import { ImsAuthenticationError } from './../../models/errors/ims-authentication-error';
import { ImsLoadingError } from './../../models/errors/ims-loading-error';
import { ImsServerConnectionError } from './../../models/errors/ims-server-connection-error';
import { Info } from './../../models/info';
import { SettingArchivePage } from './../setting-archive/setting-archive';
import { LoginPage } from './login';

describe('Page: Login', () => {

  let fixture: ComponentFixture<LoginPage> = null;
  let page: LoginPage = null;

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [LoginPage],

      providers: [
        App, DomController, Form, Keyboard, NavController, LoadingController, AuthService, ImsService, ImsBackendMock, BaseRequestOptions, LoadingService, AlertService, SettingService,
        {
          provide: Http,
          useFactory: (imsBackendMock, options) => {
            return new Http(imsBackendMock, options);
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

  it('Show and Hide loading with error thrown on wrong server', inject([LoadingService], (loadingService: LoadingService) => {
    spyOn(loadingService, 'showLoading').and.callThrough();
    spyOn(loadingService, 'hideLoading').and.callThrough();
    page.loginForm.controls['server'].setValue('wrong');
    page.loginForm.controls['user'].setValue('wrong');
    page.loginForm.controls['password'].setValue('wrong');
    expect(() => page.login()).toThrowError(ImsServerConnectionError);
    expect(loadingService.showLoading).toHaveBeenCalledTimes(1);
    expect(loadingService.hideLoading).toHaveBeenCalledTimes(1);
  }));

  it('Show and Hide loading with error thrown on wrong username', inject([LoadingService, ImsBackendMock], (loadingService: LoadingService, imsBackendMock: ImsBackendMock) => {
    spyOn(loadingService, 'showLoading').and.callThrough();
    spyOn(loadingService, 'hideLoading').and.callThrough();
    page.loginForm.controls['server'].setValue(imsBackendMock.credential.server);
    page.loginForm.controls['user'].setValue('wrong');
    page.loginForm.controls['password'].setValue('wrong');
    expect(() => page.login()).toThrowError(ImsAuthenticationError);
    expect(loadingService.showLoading).toHaveBeenCalledTimes(1);
    expect(loadingService.hideLoading).toHaveBeenCalledTimes(1);
  }));

  it('Show and Hide Loading in case of success', inject([LoadingService, ImsBackendMock], (loadingService: LoadingService, imsBackendMock: ImsBackendMock) => {
    spyOn(loadingService, 'showLoading').and.callThrough();
    spyOn(loadingService, 'hideLoading').and.callThrough();
    const credential = imsBackendMock.credential;
    page.loginForm.controls['server'].setValue(credential.server);
    page.loginForm.controls['user'].setValue(credential.username);
    page.loginForm.controls['password'].setValue(credential.password);
    page.login();
    expect(loadingService.showLoading).toHaveBeenCalledTimes(1);
    expect(loadingService.hideLoading).toHaveBeenCalledTimes(1);
  }));

  it('Load SettingArchivePage after successfull login without stored filter', inject([NavController, ImsBackendMock, SettingService], (nav: NavController, imsBackendMock: ImsBackendMock, settingService: SettingService) => {
    spyOn(nav, 'setRoot').and.callThrough();
    spyOn(settingService, 'getFilter').and.returnValue(Observable.of(null));
    const credential = imsBackendMock.credential;
    page.loginForm.controls['server'].setValue(credential.server);
    page.loginForm.controls['user'].setValue(credential.username);
    page.loginForm.controls['password'].setValue(credential.password);
    expect(page.loginForm.valid).toBeTruthy();
    page.loginSuccessful();
    expect(nav.setRoot).toHaveBeenCalledWith(SettingArchivePage);
  }));

  it('Load EntriesPage after successfull login with a stored filter', inject([NavController, ImsBackendMock, AuthService, SettingService], (nav: NavController, imsBackendMock: ImsBackendMock, authService: AuthService, settingService: SettingService) => {
    spyOn(nav, 'setRoot').and.callThrough();
    spyOn(settingService, 'getFilter').and.returnValue(Observable.of(imsBackendMock.policeFilter));
    const credential = imsBackendMock.credential;
    const testInfo: Info = { version: '9000' };
    authService.setCurrentCredential(testInfo, credential);
    page.loginForm.controls['server'].setValue(credential.server);
    page.loginForm.controls['user'].setValue(credential.username);
    page.loginForm.controls['password'].setValue(credential.password);
    expect(page.loginForm.valid).toBeTruthy();
    page.loginSuccessful();
    expect(nav.setRoot).toHaveBeenCalledWith(EntriesPage);
  }));

  it('Fill login form from Setting Service', inject([SettingService], (settingService: SettingService) => {
    const testShowRestUrlField = false;
    const testRestUrl = 'testUrl';
    const testUsername = 'testUser';
    spyOn(settingService, 'isShowRestUrlField').and.returnValue(Observable.of(testShowRestUrlField));
    spyOn(settingService, 'getRestUrl').and.returnValue(Observable.of(testRestUrl));
    spyOn(settingService, 'getUsername').and.returnValue(Observable.of(testUsername));
    page.ionViewDidLoad();
    expect(page.isShowRestUrlField).toEqual(testShowRestUrlField);
    expect(page.loginForm.controls['server'].value).toEqual(testRestUrl);
    expect(page.loginForm.controls['user'].value).toEqual(testUsername);
  }));

  it('Sets archive in auth settings', inject([ImsBackendMock, AuthService], (imsBackendMock: ImsBackendMock, authService: AuthService) => {
    spyOn(authService, 'setArchive').and.returnValue(null);
    page.navigateAfterLogin(imsBackendMock.policeFilter);
    expect(authService.setArchive).toHaveBeenCalledWith(imsBackendMock.policeFilter);
  }));

  it('Stores user and url', inject([ImsBackendMock, AuthService, SettingService], (imsBackendMock: ImsBackendMock, authService: AuthService, settingService: SettingService) => {
    spyOn(settingService, 'setRestUrl').and.callThrough();
    spyOn(settingService, 'setUsername').and.callThrough();
    const credential = imsBackendMock.credential;
    const testInfo: Info = { version: '9000' };
    authService.setCurrentCredential(testInfo, credential);
    page.loginForm.controls['server'].setValue(credential.server);
    page.loginForm.controls['user'].setValue(credential.username);
    page.loginForm.controls['password'].setValue(credential.password);
    expect(page.loginForm.valid).toBeTruthy();
    page.loginSuccessful();
    expect(settingService.setRestUrl).toHaveBeenCalledWith(credential.server);
    expect(settingService.setUsername).toHaveBeenCalledWith(credential.username);
  }));

  it('Loads filter from settings and continues if successfull', inject([ImsBackendMock, SettingService], (imsBackendMock: ImsBackendMock, settingService: SettingService) => {
    spyOn(settingService, 'getFilter').and.returnValue(Observable.of(imsBackendMock.policeFilter));
    spyOn(page, 'navigateAfterLogin').and.returnValue(null);
    const credential = imsBackendMock.credential;
    page.loginForm.controls['server'].setValue(credential.server);
    page.loginForm.controls['user'].setValue(credential.username);
    page.loginForm.controls['password'].setValue(credential.password);
    expect(page.loginForm.valid).toBeTruthy();
    page.loginSuccessful();
    expect(settingService.getFilter).toHaveBeenCalledWith(credential.server, credential.username);
    expect(page.navigateAfterLogin).toHaveBeenCalledTimes(1);
  }));

  it('Shows error when failing to load filter', inject([ImsBackendMock, SettingService], (imsBackendMock: ImsBackendMock, settingService: SettingService) => {
    spyOn(settingService, 'getFilter').and.returnValue(Observable.throw('oops'));
    const credential = imsBackendMock.credential;
    page.loginForm.controls['server'].setValue(credential.server);
    page.loginForm.controls['user'].setValue(credential.username);
    page.loginForm.controls['password'].setValue(credential.password);
    expect(page.loginForm.valid).toBeTruthy();
    expect(() => page.loginSuccessful()).toThrowError(ImsLoadingError);
  }));

});
