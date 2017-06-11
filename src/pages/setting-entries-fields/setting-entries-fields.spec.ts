import { ImsLoadingError } from './../../models/errors/ims-loading-error';
import { SettingEntriesFieldsPage } from './setting-entries-fields';
import { Observable } from 'rxjs/Observable';
import { Info } from './../../models/info';
import { ModelService } from './../../providers/model-service';
import { ImsService } from './../../providers/ims-service';
import { AuthService } from './../../providers/auth-service';
import { LoadingMock } from './../../mocks/mocks';
import { LoadingService } from './../../providers/loading-service';
import { ImsBackendMock } from './../../mocks/ims-backend-mock';
import { Http, BaseRequestOptions } from '@angular/http';
import { TestBed, inject, async, ComponentFixture } from '@angular/core/testing';
import { App, Config, Form, IonicModule, Keyboard, Haptic, GestureController, DomController, NavController, Platform, NavParams, LoadingController } from 'ionic-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingService } from '../../providers/setting-service';
import { ConfigMock, PlatformMock, NavParamsMock, AppMock, StorageMock } from '../../mocks/mocks';
import { Storage } from '@ionic/storage';
import 'rxjs/add/observable/of';
import { ImsFieldSelectionComponent } from '../../components/ims-field-selection/ims-field-selection';

describe('Page: Parent Entries Settings Fields', () => {

  let fixture: ComponentFixture<SettingEntriesFieldsPage> = null;
  let page: SettingEntriesFieldsPage = null;

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [SettingEntriesFieldsPage, ImsFieldSelectionComponent],

      providers: [
        App, DomController, Form, Keyboard, NavController, SettingService, Haptic,
        GestureController, LoadingService, AuthService, ImsBackendMock, BaseRequestOptions, ImsService, ModelService,
        {
          provide: Http,
          useFactory: (ImsBackendMock, options) => {
            return new Http(ImsBackendMock, options);
          },
          deps: [ImsBackendMock, BaseRequestOptions]
        },
        { provide: App, useClass: AppMock },
        { provide: Config, useClass: ConfigMock },
        { provide: Platform, useClass: PlatformMock },
        { provide: LoadingController, useClass: LoadingMock },
        { provide: NavParams, useClass: NavParamsMock },
        { provide: Storage, useClass: StorageMock }
      ],
      imports: [FormsModule, IonicModule, ReactiveFormsModule]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(SettingEntriesFieldsPage);
      page = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  afterEach(() => {
    fixture.destroy();
  });

  it('Image Field Settings should be persisted', inject([SettingService, ImsBackendMock, AuthService], (settingService: SettingService, imsBackendMock: ImsBackendMock, authService: AuthService) => {
    authService.archive = 'archive';
    page.tableName = 'table';
    spyOn(settingService, 'setFieldState').and.callThrough();
    imsBackendMock.parentImageModelFieldIdentifier.active = true;
    page.fieldToggled(imsBackendMock.parentImageModelFieldIdentifier);
    expect(settingService.setFieldState).toHaveBeenCalledWith(authService.archive, page.tableName, imsBackendMock.parentImageModelFieldIdentifier.name, true);
  }));

  it('Fields have been intialized from archive and  settings store', inject([SettingService, ImsBackendMock, AuthService], (settingService: SettingService, imsBackendMock: ImsBackendMock, authService: AuthService) => {
    authService.archive = imsBackendMock.modelArchiveName;
    page.tableName = imsBackendMock.parentImageTableName;
    let testInfo: Info = { version: '9000' };
    authService.setCurrentCredential(testInfo, imsBackendMock.credential);
    spyOn(settingService, 'getFieldState').and.returnValue(Observable.of(true));
    page.ionViewDidLoad();
    expect(settingService.getFieldState).toHaveBeenCalledWith(authService.archive, page.tableName, imsBackendMock.parentImageModelFieldOptionalString.name);
    expect(page.fields.find(field => field.name === imsBackendMock.parentImageModelFieldOptionalString.name).active).toBeTruthy();
  }));

  it('Check if loading service is called. ', inject([ModelService, LoadingService, ImsBackendMock], (modelService: ModelService, loadingService: LoadingService, imsBackendMock: ImsBackendMock) => {
    spyOn(loadingService, 'subscribeWithLoading').and.callThrough();
    spyOn(modelService, 'getMetadataFieldsOfParentImageTable').and.returnValue(Observable.of(imsBackendMock.modelFields));
    page.ionViewDidLoad();
    expect(loadingService.subscribeWithLoading).toHaveBeenCalled();
  }));

  it('Loading called and Error thrown on failure', inject([ModelService, LoadingService], (modelService: ModelService, loadingService: LoadingService) => {
    spyOn(loadingService, 'subscribeWithLoading').and.callThrough();
    spyOn(modelService, 'getMetadataFieldsOfParentImageTable').and.returnValue(Observable.throw('Fail'));
    expect(() => page.ionViewDidLoad()).toThrowError(ImsLoadingError);
    expect(loadingService.subscribeWithLoading).toHaveBeenCalled();
  }));

});
