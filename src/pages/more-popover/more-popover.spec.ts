import { TestBed, inject, async, ComponentFixture } from '@angular/core/testing';
import { NavController, NavParams, ViewController, IonicModule, Config, Platform, GestureController, App, DomController, Form, Events } from 'ionic-angular';
import { NavParamsMock, ViewControllerMock, ConfigMock, PlatformMock, AppMock } from '../../mocks/mocks';
import { MorePopoverPage } from './more-popover';

describe('Page: More Popover', () => {

  let fixture: ComponentFixture<MorePopoverPage> = null;
  let page: MorePopoverPage = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MorePopoverPage],
      providers: [
        Events,
        NavController,
        GestureController,
        DomController,
        Form,
        { provide: NavParams, useClass: NavParamsMock },
        { provide: ViewController, useClass: ViewControllerMock },
        { provide: Config, useClass: ConfigMock },
        { provide: App, useClass: AppMock },
        { provide: Platform, useClass: PlatformMock },
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

  it('Load Settings Page event triggered', inject([Events], (events: Events) => {
    spyOn(events, 'publish').and.callThrough();
    page.loadSettings();
    expect(events.publish).toHaveBeenCalledWith('nav:settings-page');
  }));

  it('Load Login Page event triggered', inject([Events], (events: Events) => {
    spyOn(events, 'publish').and.callThrough();
    page.logoutUser();
    expect(events.publish).toHaveBeenCalledWith('nav:login-page');
  }));

});
