import { QueryBuilderService } from './query-builder-service';
import { ImsBackendMock } from '../mocks/ims-backend-mock';
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
        ImsBackendMock,
        EntriesService,
        BaseRequestOptions,
        QueryBuilderService,
        {
          provide: Http,
          useFactory: (mockImsBackend, options) => {
            return new Http(mockImsBackend, options);
          },
          deps: [ImsBackendMock, BaseRequestOptions]
        }
      ],
      imports: [HttpModule]
    }).compileComponents();
  }));

  it('Gets parent image entries', inject([EntriesService, ImsBackendMock], (entriesService: EntriesService, mockImsBackend: ImsBackendMock) => {
    entriesService.getParentImageEntries(mockImsBackend.credential, mockImsBackend.filterId, mockImsBackend.query).subscribe(
      entries => expect(entries).toBe(mockImsBackend.parentImageEntries),
      err => fail(err));
  }));

  it('Gets next page of parent image entries', inject([EntriesService, ImsBackendMock], (entriesService: EntriesService, mockImsBackend: ImsBackendMock) => {
    let credential = mockImsBackend.credential;
    entriesService.getParentImageEntries(credential, mockImsBackend.filterId, mockImsBackend.query).flatMap(entries => entriesService.getEntries(credential, entries.pagination.nextPage)).subscribe(
      entries => expect(entries).toBe(mockImsBackend.parentImageEntriesNextPage),
      err => fail(err));
  }));
});

