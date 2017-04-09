import { TestBed, inject, async } from '@angular/core/testing';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ImsService } from './ims-service';
import { Credential } from '../model/credential';
import { Token } from '../model/token';
import { TokenService } from './token-service';


describe('Provider: ImsService Integration Test', () => {

    var originalTimeout;

    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
    });

    afterEach(function() {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ImsService, TokenService],
      imports: [HttpModule]
    }).compileComponents();
  }));


  it('Ims Version', async(inject([ImsService], (imsService: ImsService) => {
    imsService.getInfo(new Credential("https://sinv-56028.edu.hsr.ch", "admin", "admin")).subscribe(
      info => expect(info.version).toEqual("V17Q1_p1_rc29"),
      err =>  fail(err));
  })));

 it('Ensure container location will be sent', async(inject([ImsService], (imsService: ImsService) => {
   let token = imsService.createContainerLocation(new Credential("https://sinv-56028.edu.hsr.ch", "admin", "admin", "Rest Floating Client Read Write")).subscribe(
      adress => console.log(adress),
      err =>  fail(err));
  })));

   it('Ensure container location will be sent', async(inject([ImsService], (imsService: ImsService) => {
   let token = imsService.createContainerLocation(new Credential("https://sinv-56028.edu.hsr.ch", "admin", "admin", "Rest Floating Client Read Write")).subscribe(
      adress => console.log(adress),
      err =>  fail(err));
  })));
 
   it('Ensure image is uploaded', async(inject([ImsService], (imsService: ImsService) => {
   let token = imsService.postImageToContainer(new Credential("https://sinv-56028.edu.hsr.ch", "admin", "admin", "Rest Floating Client Read Write")).subscribe(
      res => console.log(res),
      err =>  fail(err));
  })));
  

  it('Ensure image is stored as entry', async(inject([ImsService], (imsService: ImsService) => {
   let token = imsService.uploadImage(new Credential("https://sinv-56028.edu.hsr.ch", "admin", "admin", "Rest Floating Client Read Write")).subscribe(
      res => console.log(res),
      err =>  fail(err));
  })));
  
});
