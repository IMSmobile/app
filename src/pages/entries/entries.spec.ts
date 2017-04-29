import { TestBed, inject, async, ComponentFixture } from '@angular/core/testing';
import { EntriesPage } from './entries';
import { App, Config, Form, IonicModule, Keyboard, DomController, LoadingController, NavController, Platform, NavParams, PopoverController, GestureController } from 'ionic-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../providers/auth-service';
import { ImsService } from '../../providers/ims-service';
import { ConfigMock, PlatformMock, NavParamsMock, AppMock, LoadingMock, PopoverControllerMock } from '../../mocks/mocks';
import { Http, HttpModule, BaseRequestOptions } from '@angular/http';
import { MockImsBackend } from '../../mocks/mock-ims-backend';
import { Camera } from '@ionic-native/camera';
import { TokenService } from '../../providers/token-service';
import { EntriesService } from '../../providers/entries-service';
import { Info } from '../../models/info';

describe('Page: Entries', () => {

  let fixture: ComponentFixture<EntriesPage> = null;
  let page: EntriesPage = null;

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [EntriesPage],

      providers: [
        App, DomController, Form, Keyboard, NavController, EntriesService, LoadingController, AuthService, ImsService, TokenService, MockImsBackend, BaseRequestOptions, Camera, GestureController,
        { provide: App, useClass: AppMock },
        { provide: Config, useClass: ConfigMock },
        { provide: Platform, useClass: PlatformMock },
        { provide: NavParams, useClass: NavParamsMock },
        { provide: LoadingController, useClass: LoadingMock },
        { provide: PopoverController, useClass: PopoverControllerMock },
        {
          provide: Http,
          useFactory: (MockImsBackend, options) => {
            return new Http(MockImsBackend, options);
          },
          deps: [MockImsBackend, BaseRequestOptions]
        },
      ],
      imports: [HttpModule, FormsModule, IonicModule, ReactiveFormsModule]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(EntriesPage);
      page = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  afterEach(() => {
    fixture.destroy();
  });

  it('Presents Popover', inject([PopoverController], (popoverController: PopoverController) => {
    spyOn(popoverController, 'create').and.callThrough();
    page.presentPopover(null);
    expect(popoverController.create).toHaveBeenCalled();
  }));

  it('Load entries when ion view did load', inject([EntriesService, MockImsBackend, AuthService], (entriesService: EntriesService, mockImsBackend: MockImsBackend, authService: AuthService) => {
    let testInfo: Info = { version: '9000' };
    authService.setCurrentCredential(testInfo, mockImsBackend.credential);
    page.ionViewDidLoad();
    expect(page.entries).toEqual(mockImsBackend.parentImageEntries.entries);
  }));

});
