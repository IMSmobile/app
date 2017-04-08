import { TestBed, inject, async } from '@angular/core/testing';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ImsService } from './ims-service';
import { Credential } from '../model/credential';
import { Token } from '../model/token';

describe('Provider: ImsService Integration Test', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ImsService],
      imports: [HttpModule]
    }).compileComponents();
  }));

  it('Ims Version', async(inject([ImsService], (imsService: ImsService) => {
    imsService.getInfo(new Credential("https://sinv-56028.edu.hsr.ch", "admin", "admin")).subscribe(
      info => expect(info.version).toEqual("V17Q1_p1_rc29"),
      err =>  fail(err));
  })));

 it('Ensure token will be sent', async(inject([ImsService], (imsService: ImsService) => {
   let token = imsService.getToken(new Credential("https://sinv-56028.edu.hsr.ch", "admin", "admin")).subscribe(
      token => console.log(token),
      err =>  fail(err));
  }))); 

 it('Ensure container location will be sent', async(inject([ImsService], (imsService: ImsService) => {
   let token = imsService.createContainerLocation(new Credential("https://sinv-56028.edu.hsr.ch", "admin", "admin")).subscribe(
      adress => console.log(adress),
      err =>  fail(err));
  })));

   it('Ensure container location will be sent', async(inject([ImsService], (imsService: ImsService) => {
   let token = imsService.createContainerLocation(new Credential("https://sinv-56028.edu.hsr.ch", "admin", "admin")).subscribe(
      adress => console.log(adress),
      err =>  fail(err));
  })));
 
   it('Ensure cat is uploaded', async(inject([ImsService], (imsService: ImsService) => {
   let token = imsService.postImageToContainer(new Credential("https://sinv-56028.edu.hsr.ch", "admin", "admin")).subscribe(
      res => console.log(res),
      err =>  fail(err));
  })));
});