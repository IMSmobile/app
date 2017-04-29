import { LoadingMock } from '../mocks/mocks';
import { TestBed, inject, async } from '@angular/core/testing';
import { LoadingController } from 'ionic-angular';
import { LoadingService } from './loading-service';


describe('Provider: LoadingService', () => {

    beforeEach(async(() => {

        TestBed.configureTestingModule({

            declarations: [],
            providers: [LoadingService, { provide: LoadingController, useClass: LoadingMock }],
            imports: []
        }).compileComponents();
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
});
