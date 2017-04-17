import { TestBed, inject, async, ComponentFixture } from '@angular/core/testing';
import { LoginPage } from './login';
import { App, Config, Form, IonicModule, Keyboard, DomController, MenuController, LoadingController, NavController, Platform, NavParams, AlertController, ToastController } from 'ionic-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule, BaseRequestOptions } from '@angular/http';
import { MockImsBackend } from '../../model/test/mock-ims-backend';
import { AuthService } from '../../providers/auth-service';
import { ImsService } from '../../providers/ims-service';
import { ConfigMock, PlatformMock, NavParamsMock } from '../../model/test/mocks';
describe('Page: Login', () => {

  let fixture: ComponentFixture<LoginPage> = null;
  let instance: any = null;

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [LoginPage],

      providers: [
        App, DomController, Form, Keyboard, NavController, LoadingController, AlertController, ToastController, AuthService, ImsService, MockImsBackend, BaseRequestOptions,
        {
          provide: Http,
          useFactory: (MockImsBackend, options) => {
            return new Http(MockImsBackend, options);
          },
          deps: [MockImsBackend, BaseRequestOptions]
        },
        { provide: Config, useClass: ConfigMock },
        { provide: Platform, useClass: PlatformMock },
        { provide: NavParams, useClass: NavParamsMock },
      ],
      imports: [HttpModule, FormsModule, IonicModule, ReactiveFormsModule]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(LoginPage);
      instance = fixture;
      fixture.detectChanges();
    });
  }));

  afterEach(() => {
    fixture.destroy();
  });

  it('should create LoginPage', () => {
    expect(fixture).toBeTruthy();
    expect(instance).toBeTruthy();
  });


});
