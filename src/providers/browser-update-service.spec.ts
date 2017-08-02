import { inject, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { BrowserUpdateService } from './browser-update-service';

describe('Provider: Browser Update Service', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        BrowserUpdateService,
      ],
      imports: []
    });
  });

  it('Should do nothing when checked for updates', inject([BrowserUpdateService], (browserUpdateService: BrowserUpdateService) => {
    expect(browserUpdateService.updateIfAvailable()).toEqual(Observable.of(undefined));
  }));
});
