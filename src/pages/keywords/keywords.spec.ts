import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { App, Config, DomController, Events, Form, GestureController, IonicModule, Keyboard, LoadingController, NavController, NavParams, Platform, ToastController, ViewController } from 'ionic-angular';
import { ImsBackendMock } from '../../mocks/ims-backend-mock';
import { ConfigMock, NavParamsMock, PlatformMock, ToastMock } from '../../mocks/mocks';
import { Keyword } from './../../models/keyword';
import { KeywordsPage } from './keywords';

describe('Page: Keywords', () => {

  let fixture: ComponentFixture<KeywordsPage>;
  let page: KeywordsPage;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KeywordsPage],
      providers: [
        App, DomController, Form, Keyboard, NavController, LoadingController, ImsBackendMock, Events, GestureController,
        { provide: NavParams, useClass: NavParamsMock },
        { provide: ToastController, useClass: ToastMock },
        { provide: Config, useClass: ConfigMock },
        { provide: Platform, useClass: PlatformMock },
      ],
      imports: [FormsModule, IonicModule, ReactiveFormsModule]
    });

    fixture = TestBed.createComponent(KeywordsPage);
    page = fixture.componentInstance;
    page.keywords = [];
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('Should go to upload page after selecting leaf', inject([NavController, ImsBackendMock], (navCtrl: NavController, imsBackendMock: ImsBackendMock) => {
    page.uploadrootpage = new ViewController();
    spyOn(navCtrl, 'popTo').and.callThrough();
    page.selectKeyword(imsBackendMock.keywordLeaf);
    expect(navCtrl.popTo).toHaveBeenCalledWith(page.uploadrootpage);
  }));

  it('Should send event after selecting leaf', inject([Events, ImsBackendMock], (events: Events, imsBackendMock: ImsBackendMock) => {
    page.field = imsBackendMock.modelFieldOptionalString;
    spyOn(events, 'publish').and.callThrough();
    page.selectKeyword(imsBackendMock.keywordLeaf);
    expect(events.publish).toHaveBeenCalledWith('keyword: selected', imsBackendMock.modelFieldOptionalString, imsBackendMock.keywordLeaf);
  }));

  it('Should load children if they exist', inject([NavController, ImsBackendMock], (navCtrl: NavController, imsBackendMock: ImsBackendMock) => {
    page.uploadrootpage = new ViewController();
    page.field = imsBackendMock.modelFieldOptionalString;
    spyOn(navCtrl, 'push').and.callThrough();
    page.selectKeyword(imsBackendMock.keywordParent);
    expect(navCtrl.push).toHaveBeenCalledWith(KeywordsPage, { field: imsBackendMock.modelFieldOptionalString, keywords: imsBackendMock.keywordParent.children, uploadrootpage:  page.uploadrootpage});
  }));

});
