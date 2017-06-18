import { TestBed, inject, async } from '@angular/core/testing';
import { HttpModule} from '@angular/http';
import { ImsService } from './ims-service';
import { Credential } from '../models/credential';

describe('Provider: ImsService Integration Test', () => {

  let originalTimeout;

  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ImsService],
      imports: [HttpModule]
    }).compileComponents();
  }));

  it('Ims Version', async(inject([ImsService], (imsService: ImsService) => {
    imsService.getInfo(new Credential('https://sinv-56028.edu.hsr.ch', 'admin', 'admin')).subscribe(
      info => expect(info.version).toEqual('V17Q1_p1_rc29'),
      err => fail(err));
  })));

});
