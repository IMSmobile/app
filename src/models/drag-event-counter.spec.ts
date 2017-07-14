import { DragEventCounter } from './drag-event-counter';
import { DragEventInvalidStateError } from './errors/drag-event-invalid-state-error';

describe('Model: DragEventCounter', () => {

  it('first event should be true if inc is called once', () => {
    const dragEventCounter = new DragEventCounter();
    dragEventCounter.inc('a1');
    let called = false;
    dragEventCounter.callIfFirstEvent('a1', () => called = true);
    expect(called).toBeTruthy();
  });

  it('first event should be false if inc is called multiple times', () => {
    const dragEventCounter = new DragEventCounter();
    dragEventCounter.inc('a1');
    dragEventCounter.inc('a1');
    let called = false;
    dragEventCounter.callIfFirstEvent('a1', () => called = true);
    expect(called).toBeFalsy();
  });

  it('last event should be false if dec has never been called', () => {
    const dragEventCounter = new DragEventCounter();
    let called = false;
    dragEventCounter.callIfLastEvent('a1', () => called = true);
    expect(called).toBeFalsy();
  });

  it('last event should be true if inc and dec has been called the same time', () => {
    const dragEventCounter = new DragEventCounter();
    dragEventCounter.inc('a1');
    dragEventCounter.inc('a1');
    dragEventCounter.dec('a1');
    dragEventCounter.dec('a1');
    let called = false;
    dragEventCounter.callIfLastEvent('a1', () => called = true);
    expect(called).toBeTruthy();
  });

  it('last event should be false if inc and dec has been called differnt times', () => {
    const dragEventCounter = new DragEventCounter();
    dragEventCounter.inc('a1');
    dragEventCounter.inc('a1');
    dragEventCounter.dec('a1');
    let called = false;
    dragEventCounter.callIfLastEvent('a1', () => called = true);
    expect(called).toBeFalsy();
  });

  it('should throw error if dec is called before inc', () => {
    const dragEventCounter = new DragEventCounter();
    expect(() => dragEventCounter.dec('a1')).toThrowError(DragEventInvalidStateError);
  });

  it('should increment correctly with different ids', () => {
    const dragEventCounter = new DragEventCounter();
    dragEventCounter.inc('a1');
    dragEventCounter.inc('a1');
    dragEventCounter.inc('a2');
    let called = false;
    dragEventCounter.callIfFirstEvent('a1', () => called = true);
    expect(called).toBeFalsy();

    called = false;
    dragEventCounter.callIfFirstEvent('a2', () => called = true);
    expect(called).toBeTruthy();
  });

  it('should reset counter ', () => {
    const dragEventCounter = new DragEventCounter();
    dragEventCounter.inc('a1');
    dragEventCounter.inc('a1');
    dragEventCounter.inc('a1');
    let called = false;
    dragEventCounter.callIfFirstEvent('a1', () => called = true);
    expect(called).toBeFalsy();
    dragEventCounter.reset('a1');
    dragEventCounter.inc('a1');

    called = false;
    dragEventCounter.callIfFirstEvent('a1', () => called = true);
    expect(called).toBeTruthy();
  });
});
