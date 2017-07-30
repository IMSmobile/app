import { inject, TestBed } from '@angular/core/testing';
import { Deploy } from '@ionic/cloud-angular';
import { Platform } from 'ionic-angular';
import { DeployMock } from './../mocks/mocks';
import { UpdateService } from './update-service';

describe('Provider: Update Service', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        Platform,
        UpdateService,
        { provide: Deploy, useClass: DeployMock },
      ],
      imports: []
    });
  });

  it('Should not download anything if version is already new', inject([UpdateService, Deploy], (updateService: UpdateService, deploy: Deploy) => {
    spyOn(deploy, 'check').and.returnValue(Promise.resolve(false));
    spyOn(deploy, 'download').and.callThrough();
    updateService.updateIfAvailable().subscribe(() => {
      expect(deploy.download).toHaveBeenCalledTimes(1);
    });
  }));

  it('Should download, extract and load app if new version is reachable', inject([UpdateService, Deploy], (updateService: UpdateService, deploy: Deploy) => {
    spyOn(deploy, 'check').and.returnValue(Promise.resolve(true));
    spyOn(deploy, 'download').and.callThrough();
    spyOn(deploy, 'extract').and.callThrough();
    spyOn(deploy, 'load').and.callThrough();
    updateService.updateIfAvailable().subscribe(() => {
      expect(deploy.download).toHaveBeenCalledTimes(1);
      expect(deploy.extract).toHaveBeenCalledTimes(1);
      expect(deploy.load).toHaveBeenCalledTimes(1);
    });
  }));
});
