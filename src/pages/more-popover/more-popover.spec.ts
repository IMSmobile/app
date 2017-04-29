import { TestBed, inject, async, ComponentFixture } from '@angular/core/testing';
import { NavController, NavParams, ViewController, IonicModule, Config, Platform, GestureController, App, DomController, Form } from 'ionic-angular';
import { NavParamsMock, ViewControllerMock, ConfigMock, PlatformMock, AppMock } from '../../mocks/mocks';
import { MorePopoverPage } from './more-popover';
import { SettingsPage } from '../settings/settings';
import { AuthService } from '../../providers/auth-service';
import { MockAuthService } from '../../mocks/providers/mock-auth-service';
import { LoginPage } from '../login/login';

describe('Page: More Popover', () => {

  let fixture: ComponentFixture<MorePopoverPage> = null;
  let page: MorePopoverPage = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MorePopoverPage],
      providers: [
        NavController,
        GestureController,
        DomController,
        Form,
        { provide: NavParams, useClass: NavParamsMock },
        { provide: ViewController, useClass: ViewControllerMock },
        { provide: Config, useClass: ConfigMock },
        { provide: App, useClass: AppMock },
        { provide: Platform, useClass: PlatformMock },
        { provide: AuthService, useClass: MockAuthService }
      ],
      imports: [IonicModule]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(MorePopoverPage);
      page = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  afterEach(() => {
    fixture.destroy();
  });

  it('Go to Settings Page on load Settings', inject([NavController], (nav: NavController) => {
    spyOn(nav, 'push').and.callThrough();
    page.loadSettings();
    expect(nav.push).toHaveBeenCalledWith(SettingsPage);
  }));

  it('Go to Login Page on logout button', inject([NavController], (nav: NavController) => {
    spyOn(nav, 'setRoot').and.callThrough();
    page.logoutUser();
    expect(nav.setRoot).toHaveBeenCalledWith(LoginPage);
  }));

  it('Clear settings on logout button', inject([AuthService], (authService: AuthService) => {
    spyOn(authService, 'logout').and.callThrough();
    page.logoutUser();
    expect(authService.logout).toHaveBeenCalled();
  }));

});
