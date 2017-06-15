import { Observable } from 'rxjs/Observable';
import { LoadingMock } from '../mocks/mocks';
import { TestBed, inject, async } from '@angular/core/testing';
import { LoadingController } from 'ionic-angular';
import { LoadingService } from './loading-service';
import 'rxjs/add/observable/of';

describe('Provider: LoadingService', () => {

    beforeEach(async(() => {

        TestBed.configureTestingModule({

            declarations: [],
            providers: [LoadingService, { provide: LoadingController, useClass: LoadingMock }],
            imports: []
        }).compileComponents();
    }));

    it('Success function called in execute wiht loading', inject([LoadingService, LoadingController], (loadingService: LoadingService, loadingController: LoadingController) => {
        let toCheck = '';
        loadingService.subscribeWithLoading(Observable.of('success'), suc => toCheck = suc, err => { });
        expect(toCheck).toBe('success');
    }));

    it('Error function called in execute with loading', inject([LoadingService, LoadingController], (loadingService: LoadingService, loadingController: LoadingController) => {
        let toCheck = '';
        loadingService.subscribeWithLoading(Observable.throw(new Error('oops')), suc => next => { }, err => toCheck = 'error');
        expect(toCheck).toBe('error');
    }));

    it('Show and hide loading when successful', inject([LoadingService, LoadingController], (loadingService: LoadingService, loadingController: LoadingController) => {
        spyOn(loadingService, 'showLoading').and.callThrough();
        spyOn(loadingService, 'hideLoading').and.callThrough();
        loadingService.subscribeWithLoading(Observable.of('success'), next => { }, err => { });
        expect(loadingService.showLoading).toHaveBeenCalled();
        expect(loadingService.hideLoading).toHaveBeenCalled();
    }));

    it('Show and hide loading with alert on error', inject([LoadingService, LoadingController], (loadingService: LoadingService, loadingController: LoadingController) => {
        spyOn(loadingService, 'showLoading').and.callThrough();
        spyOn(loadingService, 'hideLoading').and.callThrough();
        loadingService.subscribeWithLoading(Observable.throw(new Error('oops')), next => { }, err => { });
        expect(loadingService.showLoading).toHaveBeenCalled();
        expect(loadingService.hideLoading).toHaveBeenCalled();
    }));

    it('Should call show and hide loading only once with concated observables', inject([LoadingService, LoadingController], (loadingService: LoadingService, loadingController: LoadingController) => {
        spyOn(loadingService, 'showLoading').and.callThrough();
        spyOn(loadingService, 'hideLoading').and.callThrough();
        loadingService.subscribeWithLoading(Observable.concat(Observable.of(1), Observable.of(2)), next => { }, err => { });
        expect(loadingService.showLoading).toHaveBeenCalledTimes(1);
        expect(loadingService.hideLoading).toHaveBeenCalledTimes(1);
    }));

    it('Should call show and hide loading only once with concated observables that fail', inject([LoadingService, LoadingController], (loadingService: LoadingService, loadingController: LoadingController) => {
        spyOn(loadingService, 'showLoading').and.callThrough();
        spyOn(loadingService, 'hideLoading').and.callThrough();
        loadingService.subscribeWithLoading(Observable.concat(Observable.of(1), Observable.throw(new Error('oops')), Observable.of(2)), next => { }, err => { });
        expect(loadingService.showLoading).toHaveBeenCalledTimes(1);
        expect(loadingService.hideLoading).toHaveBeenCalledTimes(1);
    }));

    it('Should create on show loading', inject([LoadingService, LoadingController], (loadingService: LoadingService, loadingController: LoadingController) => {
        spyOn(loadingController, 'create').and.callThrough();
        loadingService.showLoading();
        expect(loadingController.create).toHaveBeenCalled();
    }));

    it('Should dismmisa on hide loading', inject([LoadingService], (loadingService: LoadingService) => {
        loadingService.showLoading();
        spyOn(loadingService.loading, 'dismiss').and.callThrough();
        loadingService.hideLoading();
        expect(loadingService.loading.dismiss).toHaveBeenCalled();
    }));

    it('Ensure single loading instance is running', inject([LoadingService, LoadingController], (loadingService: LoadingService, loadingController: LoadingController) => {
        spyOn(loadingController, 'create').and.callThrough();
        loadingService.showLoading();
        spyOn(loadingService.loading, 'dismiss').and.callThrough();
        loadingService.showLoading();
        loadingService.hideLoading();
        loadingService.showLoading();
        loadingService.hideLoading();
        loadingService.hideLoading();
        expect(loadingController.create).toHaveBeenCalledTimes(1);
        expect(loadingService.loading.dismiss).toHaveBeenCalledTimes(1);
    }));
});
