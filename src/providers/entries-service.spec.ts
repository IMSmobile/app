import { MockImsBackend } from '../mocks/mock-ims-backend';
import { TestBed, inject, async } from '@angular/core/testing';
import { Http, HttpModule, BaseRequestOptions } from '@angular/http';
import { TokenService } from './token-service';
import { ImsService } from './ims-service';
import { EntriesService } from './entries-service';

describe('Provider: EntriesService', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        TokenService,
        ImsService,
        MockImsBackend,
        EntriesService,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (mockImsBackend, options) => {
            return new Http(mockImsBackend, options);
          },
          deps: [MockImsBackend, BaseRequestOptions]
        }
      ],
      imports: [HttpModule]
    }).compileComponents();
  }));

  it('Gets parent image entries', inject([EntriesService, MockImsBackend], (entriesService: EntriesService, mockImsBackend: MockImsBackend) => {
    entriesService.getParentImageEntries(mockImsBackend.credential, mockImsBackend.filterId).subscribe(
      entries => expect(entries).toBe(mockImsBackend.parentImageEntries),
      err => fail(err));
  }));

  it('Gets next page of parent image entries', inject([EntriesService, MockImsBackend], (entriesService: EntriesService, mockImsBackend: MockImsBackend) => {
    let credential = mockImsBackend.credential;
    entriesService.getParentImageEntries(credential, mockImsBackend.filterId).flatMap(entries => entriesService.getEntries(credential, entries.pagination.nextPage)).subscribe(
      entries => expect(entries).toBe(mockImsBackend.parentImageEntriesNextPage),
      err => fail(err));
  }));
});

