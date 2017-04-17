import { TestBed, inject, async, ComponentFixture } from '@angular/core/testing';
import { LoginPage } from './login';
import { App, Config, Form, IonicModule, Keyboard, DomController, MenuController, LoadingController, NavController, Platform, NavParams, AlertController, ToastController } from 'ionic-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule, BaseRequestOptions } from '@angular/http';
import { MockImsBackend } from '../../model/test/mock-ims-backend';
import { AuthService } from '../../providers/auth-service';
import { ImsService } from '../../providers/ims-service';
import { ConfigMock, PlatformMock, NavParamsMock, ToastMock, AppMock, AlertMock } from '../../model/test/mocks';
import { HomePage } from '../home/home';

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
    const spy = spyOn(toastController, 'create').and.callThrough();
    page.login();
    expect(toastController.create).toHaveBeenCalled();
  }));

  it('Load HomePage after successfull login', inject([NavController, MockImsBackend], (nav: NavController, mockImsBackend: MockImsBackend) => {
    const spy = spyOn(nav, 'setRoot').and.callThrough();
    let credential = mockImsBackend.credential;
    page.loginForm.controls['server'].setValue(credential.server);
    page.loginForm.controls['user'].setValue(credential.username);
    page.loginForm.controls['password'].setValue(credential.password);
    expect(page.loginForm.valid).toBeTruthy();
    page.login();
    expect(nav.setRoot).toHaveBeenCalledWith(HomePage);
  }));

});
