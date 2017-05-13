import { Observable } from 'rxjs/Observable';
import { Info } from './../../models/info';
import { AlertService } from './../../providers/alert-service';
import { ModelService } from './../../providers/model-service';
import { ImsService } from './../../providers/ims-service';
import { AuthService } from './../../providers/auth-service';
import { LoadingMock, AlertMock } from './../../mocks/mocks';
import { LoadingService } from './../../providers/loading-service';
import { MockImsBackend } from './../../mocks/mock-ims-backend';
import { Http, BaseRequestOptions } from '@angular/http';
import { TestBed, inject, async, ComponentFixture } from '@angular/core/testing';
import { SettingImageFieldsPage } from './setting-image-fields';
import { App, Config, Form, IonicModule, Keyboard, Haptic, GestureController, DomController, NavController, Platform, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingService } from '../../providers/setting-service';
import { ConfigMock, PlatformMock, NavParamsMock, AppMock, StorageMock } from '../../mocks/mocks';
import { Storage } from '@ionic/storage';
import 'rxjs/add/observable/of';



describe('Page: Image Settings Fields', () => {

  let fixture: ComponentFixture<SettingImageFieldsPage> = null;
  let page: SettingImageFieldsPage = null;

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [SettingImageFieldsPage],

      providers: [
        App, DomController, Form, Keyboard, NavController, SettingService, Haptic,
        GestureController, LoadingService, AuthService, MockImsBackend, BaseRequestOptions, ImsService, ModelService, AlertService,
        {
          provide: Http,
          useFactory: (MockImsBackend, options) => {
            return new Http(MockImsBackend, options);
          },
          deps: [MockImsBackend, BaseRequestOptions]
        },
        { provide: AlertController, useClass: AlertMock },
        { provide: App, useClass: AppMock },
        { provide: Config, useClass: ConfigMock },
        { provide: Platform, useClass: PlatformMock },
        { provide: LoadingController, useClass: LoadingMock },
        { provide: NavParams, useClass: NavParamsMock },
        { provide: Storage, useClass: StorageMock }
      ],
      imports: [FormsModule, IonicModule, ReactiveFormsModule]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(SettingImageFieldsPage);
      page = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  afterEach(() => {
    fixture.destroy();
  });

  it('Image Field Settings should be persisted', inject([SettingService], (settingService: SettingService) => {
    page.archiveName = 'archive';
    page.tableName = 'table';
    spyOn(settingService, 'setFieldState').and.callThrough();
    page.notify('field1', true);
    expect(settingService.setFieldState).toHaveBeenCalledWith(page.archiveName, page.tableName, 'field1', true);
  }));

  it('Fields have been intialized from archive and  settings store', inject([SettingService, MockImsBackend, AuthService], (settingService: SettingService, mockImsBackend: MockImsBackend, authService: AuthService) => {
    page.archiveName = mockImsBackend.modelArchiveName;
    page.tableName = mockImsBackend.modelImageTableName;
    let testInfo: Info = { version: '9000' };
    authService.setCurrentCredential(testInfo, mockImsBackend.credential);
    spyOn(settingService, 'getFieldState').and.returnValue(Observable.of(true));
    page.ionViewDidLoad();
    expect(settingService.getFieldState).toHaveBeenCalledWith(page.archiveName, page.tableName, mockImsBackend.modelFieldOptionalString.name);
    expect(page.fields.find(field => field.name === mockImsBackend.modelFieldOptionalString.name).active).toBeTruthy();
  }));

  it('Fields do not contain mandatory or identifier fields ', inject([SettingService, MockImsBackend, AuthService], (settingService: SettingService, mockImsBackend: MockImsBackend, authService: AuthService) => {
    page.archiveName = mockImsBackend.modelArchiveName;
    page.tableName = mockImsBackend.modelImageTableName;
    let testInfo: Info = { version: '9000' };
    authService.setCurrentCredential(testInfo, mockImsBackend.credential);
    spyOn(settingService, 'getFieldState').and.returnValue(Observable.of(true));
    page.ionViewDidLoad();
    expect(page.fields).not.toContain(mockImsBackend.modelFieldParentreference);
    expect(page.fields).not.toContain(mockImsBackend.modelFieldIdentifier);
  }));


  it('Loading called if successfull. And alert service not called', inject([AuthService, MockImsBackend, ModelService, LoadingService, AlertService], (authService: AuthService, mockImsBackend: MockImsBackend, modelService: ModelService, loadingService: LoadingService, alertService: AlertService) => {
    page.archiveName = mockImsBackend.modelArchiveName;
    page.tableName = mockImsBackend.modelImageTableName;
    let testInfo: Info = { version: '9000' };
    authService.setCurrentCredential(testInfo, mockImsBackend.credential);
    spyOn(loadingService, 'showLoading').and.callThrough();
    spyOn(loadingService, 'hideLoading').and.callThrough();
    spyOn(alertService, 'showError').and.callThrough();
    page.ionViewDidLoad();
    expect(loadingService.showLoading).toHaveBeenCalledTimes(1);
    expect(loadingService.hideLoading).toHaveBeenCalledTimes(1);
    expect(alertService.showError).not.toHaveBeenCalled();
  }));

  it('Loading called on error', inject([ModelService, LoadingService], (modelService: ModelService, loadingService: LoadingService) => {
    spyOn(loadingService, 'showLoading').and.callThrough();
    spyOn(loadingService, 'hideLoading').and.callThrough();
    spyOn(modelService, 'getMetadataFieldsOfImageTable').and.returnValue(Observable.throw(new Error('Fail')));
    page.ionViewDidLoad();
    expect(loadingService.showLoading).toHaveBeenCalledTimes(1);
    expect(loadingService.hideLoading).toHaveBeenCalledTimes(1);
  }));

  it('Alert called in case of error. ', inject([ModelService, AlertService], (modelService: ModelService, alertService: AlertService) => {
    spyOn(alertService, 'showError').and.callThrough();
    spyOn(modelService, 'getMetadataFieldsOfImageTable').and.returnValue(Observable.throw(new Error('Fail')));
    page.ionViewDidLoad();
    expect(alertService.showError).toHaveBeenCalled();
  }));

});
