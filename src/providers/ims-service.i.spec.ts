import { TestBed, inject, async } from '@angular/core/testing';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ImsService } from './ims-service';
import { Credential } from '../model/credential';

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

});