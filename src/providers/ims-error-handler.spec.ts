import { AlertMock } from './../mocks/mocks';
import { ImsError } from './../models/ims-error';
import { AlertService } from './alert-service';
import { AlertController, IonicErrorHandler } from 'ionic-angular';
import { TestBed, async, inject } from '@angular/core/testing';
import { ImsErrorHandler } from './ims-error-handler';

describe('IMS Error Handler: Error Handler', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [],
      providers: [ImsErrorHandler, AlertService, IonicErrorHandler,
        { provide: AlertController, useClass: AlertMock }],
      imports: []
    }).compileComponents();
  }));

  it('should handle a imsError and show alert with name', inject([ImsErrorHandler, AlertService], (imsErrorHandler: ImsErrorHandler, alertService: AlertService) => {
    let imsError = new ImsError('Ims Error Text', 'Error Object');
    spyOn(alertService, 'showError').and.callThrough();
    imsErrorHandler.handleError(imsError);
    expect(alertService.showError).toHaveBeenCalledWith(imsError.name);
  }));

  it('should handle a normal error and show alert with message', inject([ImsErrorHandler, AlertService], (imsErrorHandler: ImsErrorHandler, alertService: AlertService) => {
    let error = new Error('Error Text');
    spyOn(alertService, 'showError').and.callThrough();
    imsErrorHandler.handleError(error);
    expect(alertService.showError).toHaveBeenCalledWith(error.message);
  }));

  it('should show no alertservice in developermode', inject([ImsErrorHandler, AlertService], (imsErrorHandler: ImsErrorHandler, alertService: AlertService) => {
    let imsError = new ImsError('Ims Error Text', 'Error Object');
    window['IonicDevServer'] = 'developermode active';
    spyOn(alertService, 'showError').and.callThrough();
    imsErrorHandler.handleError(imsError);
    expect(alertService.showError).toHaveBeenCalledTimes(0);
  }));

  it('should call super.handleError', inject([ImsErrorHandler], (imsErrorHandler: ImsErrorHandler) => {
    let imsError = new ImsError('Ims Error Text', 'Error Object');
    spyOn(IonicErrorHandler.prototype, 'handleError').and.callThrough();
    imsErrorHandler.handleError(imsError);
    expect(IonicErrorHandler.prototype.handleError).toHaveBeenCalledWith(imsError);
  }));

});
