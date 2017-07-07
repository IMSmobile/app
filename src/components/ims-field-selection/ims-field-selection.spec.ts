import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseRequestOptions, Http } from '@angular/http';
import { App, Config, DomController, Form, GestureController, Haptic, IonicModule, Keyboard, NavController, Platform } from 'ionic-angular';
import { ImsBackendMock } from './../../mocks/ims-backend-mock';
import { AppMock, ConfigMock, PlatformMock } from './../../mocks/mocks';
import { SettingService } from './../../providers/setting-service';
import { ImsFieldSelectionComponent } from './ims-field-selection';

describe('Component: ImsFieldSelectionComponent', () => {

  let fixture: ComponentFixture<ImsFieldSelectionComponent> = null;
  let component: ImsFieldSelectionComponent = null;

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [ImsFieldSelectionComponent],

      providers: [
        App, DomController, Form, Keyboard, NavController, SettingService, Haptic,
        GestureController, ImsBackendMock, BaseRequestOptions,
        {
          provide: Http,
          useFactory: (imsBackendMock, options) => {
            return new Http(imsBackendMock, options);
          },
          deps: [ImsBackendMock, BaseRequestOptions]
        },
        { provide: App, useClass: AppMock },
        { provide: Config, useClass: ConfigMock },
        { provide: Platform, useClass: PlatformMock },
      ],
      imports: [FormsModule, IonicModule, ReactiveFormsModule]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ImsFieldSelectionComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  afterEach(() => {
    fixture.destroy();
  });

  it('should NOT initialize the display fields', () => {
    expect(component.displayFields).toBeUndefined();
  });

  it('should  initialize allFields and displayFields', inject([ImsBackendMock], (imsBackendMock: ImsBackendMock) => {
    const fields = [imsBackendMock.modelFieldIdentifier, imsBackendMock.modelFieldOptionalString];
    component.fields = fields;
    expect(component.displayFields.length).toEqual(fields.length);
    expect(component.allFields.length).toEqual(fields.length);
  }));

  it('should call emit on event after field toggle', inject([ImsBackendMock], (imsBackendMock: ImsBackendMock) => {
    spyOn(component.fieldToggled, 'emit').and.callThrough();
    component.sendFieldToggledEvent(imsBackendMock.modelFieldIdentifier);
    expect(component.fieldToggled.emit).toHaveBeenCalledWith(imsBackendMock.modelFieldIdentifier);
  }));

  it('After search fields are filtered', inject([ImsBackendMock], (imsBackendMock: ImsBackendMock) => {
    const fields = [imsBackendMock.modelFieldIdentifier, imsBackendMock.modelFieldOptionalString];
    component.fields = fields;
    expect(component.displayFields.length).toEqual(fields.length);
    const event = { target: { value: imsBackendMock.modelFieldOptionalString.name } };
    component.filterFields(event);
    expect(component.displayFields.length).toEqual(1);
    expect(component.displayFields[0]).toEqual(imsBackendMock.modelFieldOptionalString);
  }));
});
