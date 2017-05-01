import { TestBed, inject, async } from '@angular/core/testing';
import { Http, HttpModule, BaseRequestOptions } from '@angular/http';
import { MockImsBackend } from '../mocks/mock-ims-backend';
import { AuthService } from './auth-service';
import { ImsService } from './ims-service';
import { Credential } from '../models/credential';
import { Info } from '../models/info';

describe('Provider: AuthService', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [],

      providers: [
        AuthService,
        ImsService,
        MockImsBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (MockImsBackend, options) => {
            return new Http(MockImsBackend, options);
          },
          deps: [MockImsBackend, BaseRequestOptions]
        }
      ],
      imports: [HttpModule]
    }).compileComponents();
  }));

  it('Should store credentials if succeed', inject([AuthService, MockImsBackend], (authService: AuthService, mockImsBackend: MockImsBackend) => {
    let credential = mockImsBackend.credential;
    authService.login(credential).subscribe(
      info => expect(authService.currentCredential.username).toEqual(credential.username),
      err => fail(err)
    );
  }));

  it('Should not store credentials if failed', inject([AuthService, MockImsBackend], (authService: AuthService, mockImsBackend: MockImsBackend) => {
    let credential = mockImsBackend.credential;
    credential.server = credential.server + 'failed';
    authService.login(credential).subscribe(
      info => fail('Should fail'),
      err => expect(authService.currentCredential).toBeUndefined()
    );
  }));

  it('Should clear credentials on logout', inject([AuthService], (authService: AuthService) => {
    let testInfo: Info = { version: '9000' };
    authService.setCurrentCredential(testInfo, new Credential('https://test', 'testuser', 'testpass', 'testsegment'));
    authService.logout();
    expect(authService.currentCredential).toBeNull();
  }));
});
