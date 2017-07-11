import { async, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule } from '@angular/http';
import { ImsBackendMock } from '../mocks/ims-backend-mock';
import { EntriesService } from './entries-service';
import { ImsService } from './ims-service';
import { QueryBuilderService } from './query-builder-service';
import { TokenService } from './token-service';

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
          useFactory: (imsBackendMock, options) =>
            new Http(imsBackendMock, options),
          deps: [ImsBackendMock, BaseRequestOptions]
        }
      ],
      imports: [HttpModule]
    }).compileComponents();
  }));

  it('Gets parent image entries', inject([EntriesService, ImsBackendMock], (entriesService: EntriesService, mockImsBackend: ImsBackendMock) => {
    entriesService.getParentImageEntries(mockImsBackend.credential, mockImsBackend.filterId, mockImsBackend.query).subscribe(
      entries => expect(entries).toBe(mockImsBackend.parentImageEntries),
      fail);
  }));

  it('Gets next page of parent image entries', inject([EntriesService, ImsBackendMock], (entriesService: EntriesService, mockImsBackend: ImsBackendMock) => {
    const credential = mockImsBackend.credential;
    entriesService.getParentImageEntries(credential, mockImsBackend.filterId, mockImsBackend.query).flatMap(entries => entriesService.getEntries(credential, entries.pagination.nextPage)).subscribe(
      entries => expect(entries).toBe(mockImsBackend.parentImageEntriesNextPage),
      fail);
  }));
});
