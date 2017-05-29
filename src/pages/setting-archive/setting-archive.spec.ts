import { SettingService } from './../../providers/setting-service';
import { EntriesPage } from './../entries/entries';
import { ImsService } from './../../providers/ims-service';
import { SettingArchivePage } from './setting-archive';
import { Info } from './../../models/info';
import { TestBed, inject, async, ComponentFixture } from '@angular/core/testing';
import { App, Config, Form, IonicModule, Keyboard, DomController, LoadingController, NavController, Platform, NavParams, AlertController, GestureController } from 'ionic-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../providers/auth-service';
import { ConfigMock, PlatformMock, NavParamsMock, AppMock, AlertMock, LoadingMock, StorageMock } from '../../mocks/mocks';
import { Http, HttpModule, BaseRequestOptions } from '@angular/http';
import { ImsBackendMock } from '../../mocks/ims-backend-mock';
import { UploadService } from '../../providers/upload-service';
import { LoadingService } from '../../providers/loading-service';
import { AlertService } from '../../providers/alert-service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';


describe('Page: Archive Settings', () => {

  let fixture: ComponentFixture<SettingArchivePage> = null;
  let page: SettingArchivePage = null;

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [SettingArchivePage],

      providers: [
        App, DomController, Form, Keyboard, NavController, LoadingController, AlertController, AuthService, ImsService,
        UploadService, ImsBackendMock, BaseRequestOptions, LoadingService, AlertService, GestureController, SettingService,
        { provide: App, useClass: AppMock },
        { provide: AlertController, useClass: AlertMock },
        { provide: Config, useClass: ConfigMock },
        { provide: Platform, useClass: PlatformMock },
        { provide: NavParams, useClass: NavParamsMock },
        { provide: LoadingController, useClass: LoadingMock },
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
      fixture = TestBed.createComponent(SettingArchivePage);
      page = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  afterEach(() => {
    fixture.destroy();
  });

  it('Should show app filters only', inject([AuthService, ImsBackendMock], (authService: AuthService, imsBackendMock: ImsBackendMock) => {
    let testInfo: Info = { version: '9000' };
    authService.setCurrentCredential(testInfo, imsBackendMock.credential);
    page.ionViewDidLoad();
    expect(page.filters).toContain(imsBackendMock.medicineFilter);
    expect(page.filters).toContain(imsBackendMock.policeFilter);
    expect(page.filters).not.toContain(imsBackendMock.notAppFilter);
  }));

  it('Show and Hide Loading while loading', inject([LoadingService, AuthService, ImsBackendMock], (loadingService: LoadingService, authService: AuthService, imsBackendMock: ImsBackendMock) => {
    let testInfo: Info = { version: '9000' };
    authService.setCurrentCredential(testInfo, imsBackendMock.credential);
    spyOn(loadingService, 'showLoading').and.callThrough();
    spyOn(loadingService, 'hideLoading').and.callThrough();
    page.ionViewDidLoad();
    expect(loadingService.showLoading).toHaveBeenCalledTimes(1);
    expect(loadingService.hideLoading).toHaveBeenCalledTimes(1);
  }));

  it('Show Error after failed upload', inject([AlertService, ImsService], (alertService: AlertService, imsService: ImsService) => {
    let error = Observable.throw(new Error('oops'));
    spyOn(alertService, 'showError').and.callThrough();
    spyOn(imsService, 'getEntriesTable').and.returnValue(error);
    page.ionViewDidLoad();
    expect(alertService.showError).toHaveBeenCalled();
  }));

  it('Should load EntriesPage after archive selection', inject([NavController, ImsBackendMock], (nav: NavController, imsBackendMock: ImsBackendMock) => {
    spyOn(nav, 'setRoot').and.callThrough();
    page.selectFilter(imsBackendMock.policeFilter);
    expect(nav.setRoot).toHaveBeenCalledWith(EntriesPage);
  }));

  it('Should select the archive EntriesPage after archive selection', inject([AuthService, ImsBackendMock], (authService: AuthService, imsBackendMock: ImsBackendMock) => {
    spyOn(authService, 'setArchive').and.callThrough();
    page.selectFilter(imsBackendMock.policeFilter);
    expect(authService.setArchive).toHaveBeenCalledWith(imsBackendMock.policeFilter);
  }));

});
