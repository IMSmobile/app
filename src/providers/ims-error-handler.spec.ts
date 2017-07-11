import { async, inject, TestBed } from '@angular/core/testing';
import { AlertController, IonicErrorHandler } from 'ionic-angular';
import { AlertMock } from './../mocks/mocks';
import { ImsError } from './../models/errors/ims-error';
import { AlertService } from './alert-service';
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

  it('should handle a imsError and show alert with displayed message', inject([ImsErrorHandler, AlertService], (imsErrorHandler: ImsErrorHandler, alertService: AlertService) => {
    const imsError = new ImsError('Ims Error Text', 'Error Object');
    spyOn(alertService, 'showError').and.callThrough();
    imsErrorHandler.handleError(imsError);
    expect(alertService.showError).toHaveBeenCalledWith(imsError.displayedErrorMessage);
  }));

  it('should handle a normal error and show alert with message', inject([ImsErrorHandler, AlertService], (imsErrorHandler: ImsErrorHandler, alertService: AlertService) => {
    const error = new Error('Error Text');
    spyOn(alertService, 'showError').and.callThrough();
    imsErrorHandler.handleError(error);
    expect(alertService.showError).toHaveBeenCalledWith(error.message);
  }));

  it('should show no alertservice in developermode', inject([ImsErrorHandler, AlertService], (imsErrorHandler: ImsErrorHandler, alertService: AlertService) => {
    const imsError = new ImsError('Ims Error Text', 'Error Object');
    window.IonicDevServer = 'developermode active';
    spyOn(alertService, 'showError').and.callThrough();
    imsErrorHandler.handleError(imsError);
    expect(alertService.showError).toHaveBeenCalledTimes(0);
  }));

  it('should call super.handleError', inject([ImsErrorHandler], (imsErrorHandler: ImsErrorHandler) => {
    const imsError = new ImsError('Ims Error Text', 'Error Object');
    spyOn(IonicErrorHandler.prototype, 'handleError').and.callThrough();
    imsErrorHandler.handleError(imsError);
    expect(IonicErrorHandler.prototype.handleError).toHaveBeenCalledWith(imsError);
  }));

});
