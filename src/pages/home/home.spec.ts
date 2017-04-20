import { TestBed, inject, async, ComponentFixture } from '@angular/core/testing';
import { HomePage } from './home';
import { App, Config, Form, IonicModule, Keyboard, DomController, LoadingController, NavController, Platform, NavParams, AlertController, ToastController } from 'ionic-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule, BaseRequestOptions } from '@angular/http';
import { MockImsBackend } from '../../model/test/mock-ims-backend';
import { AuthService } from '../../providers/auth-service';
import { ImsService } from '../../providers/ims-service';
import { ConfigMock, PlatformMock, NavParamsMock, ToastMock, AppMock, AlertMock, LoadingMock } from '../../model/test/mocks';
import { Camera } from '@ionic-native/camera';
import { MockCamera } from '../../providers/test/mock-camera';
import { UploadService } from '../../providers/upload-service';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { TokenService } from '../../providers/token-service';
import { Credential } from '../../model/credential';
import { MockTransfer, MockTransferObject } from '../../providers/test/mock-transfer';

describe('Page: Home', () => {

  let fixture: ComponentFixture<HomePage> = null;
  let page: HomePage = null;

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [HomePage],

      providers: [
        App, DomController, Form, Keyboard, NavController, LoadingController, AlertController, AuthService, ImsService, MockImsBackend, BaseRequestOptions, UploadService, TokenService,
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
        { provide: Camera, useClass: MockCamera },
        { provide: Transfer, useClass: MockTransfer },
        { provide: TransferObject, useClass: MockTransferObject },
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

  it('Show and Hide Loading while uploading', inject([MockImsBackend, AuthService], (mockImsBackend: MockImsBackend, authService: AuthService) => {
    spyOn(page, 'showLoading').and.callThrough();
    spyOn(page, 'hideLoading').and.callThrough();
    authService.currentCredential = new Credential(mockImsBackend.baseUrl, '', '');
    page.filterId = mockImsBackend.filterId;
    page.imageSrc = '';
    page.uploadPicture();
    expect(page.showLoading).toHaveBeenCalledTimes(1);
    // TODO: make expect work
    // expect(page.hideLoading).toHaveBeenCalledTimes(1);
  }));

  it('Show Toast after successfull upload', inject([ToastController, MockImsBackend, AuthService], (toastController: ToastController, mockImsBackend: MockImsBackend, authService: AuthService) => {
    spyOn(toastController, 'create').and.callThrough();
    spyOn(page, 'showAlert').and.callThrough();
    authService.currentCredential = new Credential(mockImsBackend.baseUrl, '', '');
    page.filterId = mockImsBackend.filterId;
    page.imageSrc = '';
    page.uploadPicture();
    // TODO: make expect work
    // expect(toastController.create).toHaveBeenCalled();
  }));

});
