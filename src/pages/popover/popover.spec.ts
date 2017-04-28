import { MockSettingService } from './../../mocks/providers/mock-setting-service';
import { Storage } from '@ionic/storage';
import { StorageMock } from './../../mocks/mocks';
import { SettingService } from './../../providers/setting-service';
import { LoginPage } from './../login/login';
import { TestBed, inject, async, ComponentFixture } from '@angular/core/testing';
import { NavController, NavParams, ViewController, IonicModule, Config, Platform, GestureController, App, DomController, Form } from 'ionic-angular';
import { NavParamsMock, ViewControllerMock, ConfigMock, PlatformMock, AppMock } from '../../mocks/mocks';
import { PopoverPage } from './popover';
import { SettingsPage } from '../settings/settings';

describe('Page: Popover', () => {

  let fixture: ComponentFixture<PopoverPage> = null;
  let page: PopoverPage = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PopoverPage],
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
        { provide: Storage, useClass: StorageMock },
        { provide: SettingService, useClass: MockSettingService }
      ],
      imports: [IonicModule]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(PopoverPage);
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

 it('Clear settings on logout button', inject([SettingService], (settingService: SettingService) => {
    spyOn(settingService, 'clearLoginData').and.callThrough();
    page.logoutUser();
    expect(settingService.clearLoginData).toHaveBeenCalled();
  }));
});
