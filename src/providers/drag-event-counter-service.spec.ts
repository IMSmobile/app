import { async, inject, TestBed } from '@angular/core/testing';
import { DragEventInvalidStateError } from './../models/errors/drag-event-invalid-state-error';
import { DragEventCounterService } from './drag-event-counter-service';

describe('Service: DragEventCounter', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        DragEventCounterService
      ],
      imports: []
    });
  }));

  it('first event should be true if inc is called once', inject([DragEventCounterService], (dragEventCounterService: DragEventCounterService) => {
    dragEventCounterService.inc('a1');
    let called = false;
    dragEventCounterService.callIfFirstEvent('a1', () => called = true);
    expect(called).toBeTruthy();
  }));

  it('first event should be false if inc is called multiple times', inject([DragEventCounterService], (dragEventCounterService: DragEventCounterService) => {
    dragEventCounterService.inc('a1');
    dragEventCounterService.inc('a1');
    let called = false;
    dragEventCounterService.callIfFirstEvent('a1', () => called = true);
    expect(called).toBeFalsy();
  }));

  it('last event should be false if dec has never been called', inject([DragEventCounterService], (dragEventCounterService: DragEventCounterService) => {
    let called = false;
    dragEventCounterService.callIfLastEvent('a1', () => called = true);
    expect(called).toBeFalsy();
  }));

  it('last event should be true if inc and dec has been called the same time', inject([DragEventCounterService], (dragEventCounterService: DragEventCounterService) => {
    dragEventCounterService.inc('a1');
    dragEventCounterService.inc('a1');
    dragEventCounterService.dec('a1');
    dragEventCounterService.dec('a1');
    let called = false;
    dragEventCounterService.callIfLastEvent('a1', () => called = true);
    expect(called).toBeTruthy();
  }));

  it('last event should be false if inc and dec has been called differnt times', inject([DragEventCounterService], (dragEventCounterService: DragEventCounterService) => {
    dragEventCounterService.inc('a1');
    dragEventCounterService.inc('a1');
    dragEventCounterService.dec('a1');
    let called = false;
    dragEventCounterService.callIfLastEvent('a1', () => called = true);
    expect(called).toBeFalsy();
  }));

  it('should throw error if dec is called before inc', inject([DragEventCounterService], (dragEventCounterService: DragEventCounterService) => {
    expect(() => dragEventCounterService.dec('a1')).toThrowError(DragEventInvalidStateError);
  }));

  it('should increment correctly with different ids', inject([DragEventCounterService], (dragEventCounterService: DragEventCounterService) => {
    dragEventCounterService.inc('a1');
    dragEventCounterService.inc('a1');
    dragEventCounterService.inc('a2');
    let called = false;
    dragEventCounterService.callIfFirstEvent('a1', () => called = true);
    expect(called).toBeFalsy();

    called = false;
    dragEventCounterService.callIfFirstEvent('a2', () => called = true);
    expect(called).toBeTruthy();
  }));

  it('should reset counter ', inject([DragEventCounterService], (dragEventCounterService: DragEventCounterService) => {
    dragEventCounterService.inc('a1');
    dragEventCounterService.inc('a1');
    dragEventCounterService.inc('a1');
    let called = false;
    dragEventCounterService.callIfFirstEvent('a1', () => called = true);
    expect(called).toBeFalsy();
    dragEventCounterService.reset('a1');
    dragEventCounterService.inc('a1');

    called = false;
    dragEventCounterService.callIfFirstEvent('a1', () => called = true);
    expect(called).toBeTruthy();
  }));
});
